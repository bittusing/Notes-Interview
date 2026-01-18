///console.log(twoSum([2, 7, 11, 15], 9));
function twoSum(arr , target){
      let left =0 ; 
     let right = arr.length - 1;
     while(left < right) {
        let sum = arr[left] + arr[right];
        if(sum=== target) {
          return [left, right];
        }else if(sum <target) {
            left++;
            console.log(left);
        } else if (sum> target) {
            right--;
            console.log(right);
        }
     }
     return [-1 , -1];
    }
    console.log(twoSum([1, 2, 3, 4, 5], 7));
    console.log(twoSum([2, 7, 11, 15], 9));

    ////////  how to split the array into two parts and do reverse of second part and merge the two parts
    function reverseSecondPart(arr) {
        let mid = Math.floor(arr.length / 2);
        let secondPart = arr.slice(mid);
        secondPart.reverse();
        return arr.slice(0, mid).concat(secondPart);
    }
    console.log(reverseSecondPart([1, 2, 3, 4, 5]));
    console.log(reverseSecondPart([1, 2, 3, 4, 5, 6]));
    console.log(reverseSecondPart([1, 2, 3, 4, 5, 6, 7]));
    console.log(reverseSecondPart([1, 2, 3, 4, 5, 6, 7, 8]));
    console.log(reverseSecondPart([1, 2, 3, 4, 5, 6, 7, 8, 9]));
    console.log(reverseSecondPart([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));        