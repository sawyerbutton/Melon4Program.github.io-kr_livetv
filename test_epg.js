#!/usr/bin/env node

/**
 * EPG E2E Test - Automated headless browser test for EPG tooltip validation
 * Tests that NOW/NEXT programs match current Beijing time
 */

const puppeteer = require('puppeteer');

async function testEPG() {
    console.log('🧪 Starting EPG E2E Test...\n');

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();

        // Listen to console messages from the page
        page.on('console', msg => {
            const type = msg.type();
            const text = msg.text();
            if (type === 'log' && (text.includes('EPG') || text.includes('🎯') || text.includes('💾'))) {
                console.log(`  [Browser Console] ${text}`);
            }
        });

        console.log('1. Navigating to player page...');
        await page.goto('http://localhost:8000/player.html', {
            waitUntil: 'networkidle0'
        });

        console.log('2. Clearing LocalStorage...');
        await page.evaluate(() => {
            localStorage.clear();
        });

        console.log('3. Reloading page with fresh data...');
        await page.reload({ waitUntil: 'networkidle0' });

        // Wait for EPG initialization
        await page.waitForTimeout(2000);

        console.log('\n4. Getting current Beijing time...');
        const currentBeijingTime = await page.evaluate(() => {
            const now = new Date();
            const hour = parseInt(now.toLocaleString('zh-CN', {
                timeZone: 'Asia/Shanghai',
                hour: '2-digit',
                hour12: false
            }));
            const minute = parseInt(now.toLocaleString('zh-CN', {
                timeZone: 'Asia/Shanghai',
                minute: '2-digit'
            }));
            return { hour, minute, formatted: `${hour}:${String(minute).padStart(2, '0')}` };
        });
        console.log(`   Beijing Time: ${currentBeijingTime.formatted}`);

        console.log('\n5. Checking EPG tooltips...');

        // Get tooltip data from first few channels
        const tooltipData = await page.evaluate(() => {
            const results = [];
            const buttons = document.querySelectorAll('.channel-btn');

            for (let i = 0; i < Math.min(5, buttons.length); i++) {
                const btn = buttons[i];
                const channelName = btn.textContent.trim().split('\n')[0];
                const tooltip = btn.querySelector('.epg-tooltip');

                if (tooltip) {
                    const nowProgram = tooltip.querySelector('.epg-badge:contains("NOW")')?.closest('.epg-program');
                    const programs = Array.from(tooltip.querySelectorAll('.epg-program')).map(prog => {
                        const timeEl = prog.querySelector('.epg-time');
                        const titleEl = prog.querySelector('.epg-title');
                        const badgeEl = prog.querySelector('.epg-badge');

                        const timeText = timeEl ? timeEl.textContent.replace(/NOW|NEXT/g, '').trim() : '';
                        const title = titleEl ? titleEl.textContent.trim() : '';
                        const badge = badgeEl ? badgeEl.textContent.trim() : '';

                        return { time: timeText, title, badge };
                    });

                    results.push({
                        channel: channelName,
                        programs
                    });
                }
            }

            return results;
        });

        console.log('\n6. Test Results:\n');

        let hasError = false;

        tooltipData.forEach(({ channel, programs }) => {
            console.log(`   Channel: ${channel}`);
            programs.forEach(prog => {
                const status = prog.badge || '    ';
                console.log(`     ${status.padEnd(4)} ${prog.time} - ${prog.title}`);

                // Parse time and validate
                if (prog.badge === 'NOW' && prog.time) {
                    const match = prog.time.match(/(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})/);
                    if (match) {
                        const [, startH, startM, endH, endM] = match.map(Number);
                        const nowMinutes = currentBeijingTime.hour * 60 + currentBeijingTime.minute;
                        const startMinutes = startH * 60 + startM;
                        const endMinutes = endH * 60 + endM;

                        const isCorrect = nowMinutes >= startMinutes && nowMinutes < endMinutes;

                        if (!isCorrect) {
                            console.log(`     ❌ ERROR: NOW badge on ${prog.time} but current time is ${currentBeijingTime.formatted}`);
                            hasError = true;
                        } else {
                            console.log(`     ✅ Correct: NOW matches current time ${currentBeijingTime.formatted}`);
                        }
                    }
                }
            });
            console.log('');
        });

        // Check for 21:00-22:00 incorrectly shown as NOW
        console.log('7. Checking for specific bug (21:00-22:00 as NOW)...');
        const has21Bug = tooltipData.some(({ programs }) =>
            programs.some(p => p.badge === 'NOW' && p.time.includes('21:00'))
        );

        if (has21Bug && currentBeijingTime.hour < 21) {
            console.log('   ❌ BUG DETECTED: 21:00-22:00 incorrectly shown as NOW');
            hasError = true;
        } else {
            console.log('   ✅ No 21:00 bug detected');
        }

        console.log('\n8. EPG Data Source Check...');
        const epgSource = await page.evaluate(() => {
            // Check if live XMLTV data loaded
            const liveCache = localStorage.getItem('kr_livetv_epg_cache_live');
            const staticCache = localStorage.getItem('kr_livetv_epg_cache');

            return {
                hasLiveCache: !!liveCache,
                hasStaticCache: !!staticCache,
                liveCacheSize: liveCache ? (liveCache.length / 1024).toFixed(2) + ' KB' : 'N/A',
                staticCacheSize: staticCache ? (staticCache.length / 1024).toFixed(2) + ' KB' : 'N/A'
            };
        });

        console.log(`   Live XMLTV Cache: ${epgSource.hasLiveCache ? '✅ ' + epgSource.liveCacheSize : '❌ Not found'}`);
        console.log(`   Static Cache: ${epgSource.hasStaticCache ? '✅ ' + epgSource.staticCacheSize : '❌ Not found'}`);

        console.log('\n' + '='.repeat(60));
        if (hasError) {
            console.log('❌ TEST FAILED: EPG time matching has errors');
            process.exit(1);
        } else {
            console.log('✅ TEST PASSED: EPG time matching is correct');
            process.exit(0);
        }

    } catch (error) {
        console.error('\n❌ Test Error:', error.message);
        console.error(error.stack);
        process.exit(1);
    } finally {
        await browser.close();
    }
}

// Check if puppeteer is installed
(async () => {
    try {
        await testEPG();
    } catch (error) {
        if (error.message.includes('Cannot find module')) {
            console.error('\n❌ Puppeteer not installed. Installing...\n');
            console.error('Please run: npm install puppeteer\n');
            process.exit(1);
        }
        throw error;
    }
})();
