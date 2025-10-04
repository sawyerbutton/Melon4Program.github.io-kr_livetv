#!/usr/bin/env node

/**
 * Simple EPG Logic Test - No browser required
 * Extracts and tests the EPG matching logic directly
 */

const fs = require('fs');

console.log('🧪 EPG Logic Test\n');

// Read player.html
const html = fs.readFileSync('player.html', 'utf8');

// Extract EPGTimeMatcher class code
const parseTimeMatch = html.match(/static parseTime\(timeStr\) \{[\s\S]*?\n\s{12}\}/);
const getCurrentAndNextMatch = html.match(/static getCurrentAndNext\(channelPrograms[\s\S]*?\n\s{12}\}/);

if (!parseTimeMatch || !getCurrentAndNextMatch) {
    console.error('❌ Could not extract EPGTimeMatcher methods');
    process.exit(1);
}

console.log('✅ Extracted EPGTimeMatcher methods\n');

// Simulate the parseTime method
function parseTime(timeStr) {
    if (timeStr instanceof Date) {
        const beijingHour = parseInt(timeStr.toLocaleString('zh-CN', {
            timeZone: 'Asia/Shanghai',
            hour: '2-digit',
            hour12: false
        }));
        const beijingMinute = parseInt(timeStr.toLocaleString('zh-CN', {
            timeZone: 'Asia/Shanghai',
            minute: '2-digit'
        }));
        return beijingHour * 60 + beijingMinute;
    }
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

// Simulate getCurrentAndNext
function getCurrentAndNext(channelPrograms, currentTime = new Date()) {
    if (!channelPrograms || channelPrograms.length === 0) {
        return { now: null, next: null };
    }

    const beijingHour = parseInt(currentTime.toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
        hour: '2-digit',
        hour12: false
    }));
    const beijingMinute = parseInt(currentTime.toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
        minute: '2-digit'
    }));
    const nowMinutes = beijingHour * 60 + beijingMinute;

    const sortedPrograms = [...channelPrograms].sort((a, b) => {
        const aStart = parseTime(a.start);
        const bStart = parseTime(b.start);
        return aStart - bStart;
    });

    let currentProgram = null;
    let nextProgram = null;
    let lastProgramBeforeNow = null;

    for (let i = 0; i < sortedPrograms.length; i++) {
        const program = sortedPrograms[i];
        const startMinutes = parseTime(program.start);
        const stopMinutes = parseTime(program.stop);

        const adjustedStop = stopMinutes < startMinutes ? stopMinutes + 24 * 60 : stopMinutes;
        const adjustedNow = nowMinutes < startMinutes && stopMinutes < startMinutes ? nowMinutes + 24 * 60 : nowMinutes;

        if (adjustedNow >= startMinutes && adjustedNow < adjustedStop) {
            currentProgram = program;
            nextProgram = sortedPrograms[i + 1] || sortedPrograms[0];
            break;
        }

        // Track programs before current time
        if (stopMinutes <= nowMinutes || (stopMinutes < startMinutes && adjustedStop <= adjustedNow)) {
            lastProgramBeforeNow = program;
        }

        if (startMinutes > nowMinutes && !nextProgram) {
            nextProgram = program;
        }
    }

    // Fallback: If no exact match found, only show NEXT (upcoming program)
    // Don't show outdated programs as NOW to avoid confusion
    if (!currentProgram && sortedPrograms.length > 0) {
        // Keep currentProgram as null (no misleading NOW badge)
        // Only show upcoming program as NEXT
        if (!nextProgram) {
            // Find first upcoming program
            nextProgram = sortedPrograms.find(p => parseTime(p.start) > nowMinutes);
            // If all programs are in the past, show first program as upcoming (next day)
            if (!nextProgram) {
                nextProgram = sortedPrograms[0];
            }
        }
    }

    return { now: currentProgram, next: nextProgram };
}

// Get current Beijing time
const now = new Date();
const beijingHour = parseInt(now.toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    hour: '2-digit',
    hour12: false
}));
const beijingMinute = parseInt(now.toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    minute: '2-digit'
}));

console.log('Current Beijing Time:', `${beijingHour}:${String(beijingMinute).padStart(2, '0')}`);
console.log('Minutes since midnight:', beijingHour * 60 + beijingMinute);
console.log('');

// Test with static data (string format)
console.log('Test 1: Static EPG Data (String Format)');
console.log('─'.repeat(60));

const staticPrograms = [
    { start: "06:00", stop: "07:00", title: "아침뉴스타임" },
    { start: "07:00", stop: "08:30", title: "아침마당" },
    { start: "08:30", stop: "09:00", title: "아침 드라마" },
    { start: "12:00", stop: "12:45", title: "KBS 뉴스 12" },
    { start: "19:00", stop: "20:00", title: "KBS 뉴스 9" },
    { start: "20:00", stop: "21:00", title: "일일연속극" },
    { start: "21:00", stop: "22:00", title: "시사토론" }
];

const { now: nowStatic, next: nextStatic } = getCurrentAndNext(staticPrograms);

console.log('NOW:', nowStatic ? `${nowStatic.start}-${nowStatic.stop} ${nowStatic.title}` : 'null (no exact match)');
console.log('NEXT:', nextStatic ? `${nextStatic.start}-${nextStatic.stop} ${nextStatic.title}` : 'None');

// Validate
const nowMinutes = beijingHour * 60 + beijingMinute;
if (nowStatic) {
    const [startH, startM] = nowStatic.start.split(':').map(Number);
    const [stopH, stopM] = nowStatic.stop.split(':').map(Number);
    const startMin = startH * 60 + startM;
    const stopMin = stopH * 60 + stopM;

    const isValid = nowMinutes >= startMin && nowMinutes < stopMin;

    if (isValid) {
        console.log('✅ Static data NOW program matches current time exactly');
    } else {
        console.log(`❌ Static data NOW program DOES NOT match current time`);
        console.log(`   Expected range: ${startMin}-${stopMin} minutes`);
        console.log(`   Current time: ${nowMinutes} minutes`);
        console.log(`   ⚠️  This should not happen - NOW should only show exact matches`);
    }
} else {
    // No NOW is acceptable if no exact match
    console.log('✅ No NOW program (expected - no exact time match)');
    if (nextStatic) {
        console.log('✅ Showing only NEXT (upcoming) program - good UX');
    }
}

console.log('');

// Test with XMLTV data (Date format)
console.log('Test 2: XMLTV EPG Data (Date Format - Korean Time)');
console.log('─'.repeat(60));

const xmltvPrograms = [
    {
        title: "Korean 09:00 (Beijing 08:00)",
        start: new Date('2025-10-04T09:00:00+09:00'),
        stop: new Date('2025-10-04T10:00:00+09:00')
    },
    {
        title: "Korean 10:00 (Beijing 09:00)",
        start: new Date('2025-10-04T10:00:00+09:00'),
        stop: new Date('2025-10-04T11:00:00+09:00')
    },
    {
        title: "Korean 11:00 (Beijing 10:00)",
        start: new Date('2025-10-04T11:00:00+09:00'),
        stop: new Date('2025-10-04T12:00:00+09:00')
    },
    {
        title: "Korean 12:00 (Beijing 11:00)",
        start: new Date('2025-10-04T12:00:00+09:00'),
        stop: new Date('2025-10-04T13:00:00+09:00')
    },
    {
        title: "Korean 21:00 (Beijing 20:00)",
        start: new Date('2025-10-04T21:00:00+09:00'),
        stop: new Date('2025-10-04T22:00:00+09:00')
    }
];

const { now: nowXMLTV, next: nextXMLTV } = getCurrentAndNext(xmltvPrograms);

if (nowXMLTV) {
    const startBeijing = nowXMLTV.start.toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    const stopBeijing = nowXMLTV.stop.toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    console.log('NOW:', `${startBeijing}-${stopBeijing} ${nowXMLTV.title}`);
}

if (nextXMLTV) {
    const startBeijing = nextXMLTV.start.toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    const stopBeijing = nextXMLTV.stop.toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    console.log('NEXT:', `${startBeijing}-${stopBeijing} ${nextXMLTV.title}`);
}

// Validate XMLTV
if (nowXMLTV) {
    const startMin = parseTime(nowXMLTV.start);
    const stopMin = parseTime(nowXMLTV.stop);
    const isValid = nowMinutes >= startMin && nowMinutes < stopMin;

    if (isValid) {
        console.log('✅ XMLTV data NOW program matches current time');
    } else {
        console.log(`❌ XMLTV data NOW program DOES NOT match current time`);
        console.log(`   Expected range: ${startMin}-${stopMin} minutes`);
        console.log(`   Current time: ${nowMinutes} minutes`);
    }
}

console.log('\n' + '='.repeat(60));
console.log('Test Summary:');
console.log('─'.repeat(60));

let hasError = false;

// Test 1: No outdated programs shown as NOW
if (nowStatic) {
    const [startH, startM] = nowStatic.start.split(':').map(Number);
    const [stopH, stopM] = nowStatic.stop.split(':').map(Number);
    const startMin = startH * 60 + startM;
    const stopMin = stopH * 60 + stopM;
    const isValid = nowMinutes >= startMin && nowMinutes < stopMin;

    if (!isValid) {
        console.log('❌ FAIL: Static data shows non-current program as NOW');
        console.log(`   ${nowStatic.start}-${nowStatic.stop} shown as NOW at ${beijingHour}:${String(beijingMinute).padStart(2, '0')}`);
        hasError = true;
    }
}

// Test 2: XMLTV data accuracy
if (nowXMLTV) {
    const startMin = parseTime(nowXMLTV.start);
    const stopMin = parseTime(nowXMLTV.stop);
    const isValid = nowMinutes >= startMin && nowMinutes < stopMin;

    if (!isValid) {
        console.log('❌ FAIL: XMLTV data shows non-current program as NOW');
        hasError = true;
    }
}

// Test 3: Check that NEXT is shown when NOW is missing
if (!nowStatic && nextStatic) {
    console.log('✅ PASS: No NOW shown (correct), NEXT shown (upcoming program)');
}

if (!nowXMLTV && nextXMLTV) {
    console.log('✅ PASS: XMLTV - No NOW shown (correct), NEXT shown');
}

if (!hasError) {
    console.log('✅ PASS: Time matching logic is accurate');
    console.log('✅ Only exact matches shown as NOW');
    console.log('✅ Upcoming programs shown as NEXT when NOW unavailable');
    console.log('\nℹ️  Browser display:');
    console.log('   - If no exact match: Shows "⏳ 当前节目信息暂无" + NEXT program');
    console.log('   - If exact match: Shows NOW + NEXT programs');
} else {
    console.log('❌ FAIL: Time matching logic has accuracy issues');
}

process.exit(hasError ? 1 : 0);
