function miniMaxSum(arr) {
  // Calculate the sum of all elements
  let sum = arr.reduce((acc, curr) => acc + curr, 0);

  // The minimum sum is the total sum minus the largest element
  let minSum = sum - arr[arr.length - 1];

  // The maximum sum is the total sum minus the smallest element
  let maxSum = sum - arr[0];

  console.log(minSum + " " + maxSum);
}

miniMaxSum([1, 2, 3, 4, 5]);
