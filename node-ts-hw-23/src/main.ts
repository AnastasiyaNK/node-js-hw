function task1(): Promise<string> {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Task 1 done"), 1000)
  );
}

function task2(): Promise<string> {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Task 2 done"), 1500)
  );
}

function task3(): Promise<string> {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Task 3 done"), 500)
  );
}

async function runSequentialTasks() {
  console.log("Running tasks sequentially...");
  const res1 = await task1();
  console.log(res1);
  const res2 = await task2();
  console.log(res2);
  const res3 = await task3();
  console.log(res3);
  console.log("All tasks done ✅");
}

// =========================
function processString(str: string): Promise<string> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(str.toUpperCase()), 1000)
  );
}

async function processArray(strings: string[]) {
  console.log("Processing array...");
  const results = await Promise.all(strings.map((s) => processString(s)));
  console.log("Processed:", results);
}
// =========================
function okPromise(msg: string, delay: number): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve(msg), delay));
}

function errorPromise(): Promise<string> {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Something went wrong ❌")), 800)
  );
}

async function runWithError() {
  console.log("Running tasks with error...");
  try {
    const results = await Promise.all([
      okPromise("Task A done", 500),
      errorPromise(),
      okPromise("Task C done", 1000),
    ]);
    console.log(results);
  } catch (err: any) {
    console.error("Caught error:", err.message);
  }
}

// =========================
function delayNumber(num: number): Promise<string> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(`Finished after ${num}ms`), num)
  );
}

async function runDynamicDelays(nums: number[]) {
  console.log("Running dynamic delays...");
  const results = await Promise.all(nums.map((n) => delayNumber(n)));
  console.log("Results:", results);
}

// =========================
(async () => {
  await runSequentialTasks(); 
  await processArray(["apple", "banana", "cherry"]); 
  await runWithError(); 
  await runDynamicDelays([500, 1000, 1500]); 
})();
