const formatterCache = new Map();

function getFormatter(timeZone) {
  if (!formatterCache.has(timeZone)) {
    formatterCache.set(
      timeZone,
      new Intl.DateTimeFormat("en-GB", {
        timeZone,
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hourCycle: "h23",
      })
    );
  }
  return formatterCache.get(timeZone);
}

export function getZonedParts(date, timeZone) {
  const out = {};
  for (const part of getFormatter(timeZone).formatToParts(date)) {
    if (part.type !== "literal") out[part.type] = parseInt(part.value, 10);
  }
  if (out.hour === 24) out.hour = 0;
  return out;
}

export function computeCountdown(now, { birthDay, birthMonth, birthYear, timeZone }) {
  const z = getZonedParts(now, timeZone);
  const nowWall = Date.UTC(z.year, z.month - 1, z.day, z.hour, z.minute, z.second);

  if (z.month === birthMonth && z.day === birthDay) {
    return { status: "birthday", age: z.year - birthYear };
  }

  // otomatis ganti buat tahun depan 
  let year = z.year;
  let target = Date.UTC(year, birthMonth - 1, birthDay);
  if (nowWall > target) {
    year += 1;
    target = Date.UTC(year, birthMonth - 1, birthDay);
  }

  const totalSeconds = Math.max(0, Math.floor((target - nowWall) / 1000));
  return {
    status: "counting",
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    targetYear: year,
    turning: year - birthYear,
  };
}
