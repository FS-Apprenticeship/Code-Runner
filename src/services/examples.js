// examples to be used to create challenges

export const ifStatementPython = [
    easyIfStatementPython1,
    easyIfStatementPython2,
    mediumIfStatementPython1,
    mediumIfStatementPython2,
    hardIfStatementPython1,
    hardIfStatementPython2
];

export const loopPython = [
    easyLoopPython1,
    easyLoopPython2,
    mediumLoopPython1,
    mediumLoopPython2,
    hardLoopPython1,
    hardLoopPython2
]

export const arithmeticPython = [
    easyArithmeticPython1,
    easyArithmeticPython2,
    mediumArithmeticPython1,
    mediumArithmeticPython2,
    hardArithmeticPython1,
    hardArithmeticPython2
]

const easyIfStatementPython1 = `Easy Level - Python Language - If Statements

Assume that you have a variable called num. Write an if statement to determine whether the num variable is even or odd.
You MUST use an if statement for this challenge.

Solution:
if (num % 2) == 1:
  return "Odd"
else:
  return "Even"`;

const easyIfStatementPython2 = `Easy Level - Python Language - If Statements

Assume that you have a variable called temperature. Write an if statement to determine whether the temperature is below freezing or not.
If the temperature is less than 0, return "Freezing". Otherwise, return "Not Freezing".

Solution:
if temperature < 0:
  return "Freezing"
else:
  return "Not Freezing"`;

const mediumIfStatementPython1 = `Medium Level - Python Language - If Statements

Assume that you have a variable called score. Write an if statement to determine the grade based on the score value.
Use the following grading rules:
- If score is 90 or above, return "A"
- If score is 80 to 89, return "B"
- If score is 70 to 79, return "C"
- If score is 60 to 69, return "D"
- Otherwise, return "F"

Solution:
if score >= 90:
  return "A"
elif score >= 80:
  return "B"
elif score >= 70:
  return "C"
elif score >= 60:
  return "D"
else:
  return "F"`;

const mediumIfStatementPython2 = `Medium Level - Python Language - If Statements

Assume that you have a variable called temperature. Write an if statement to describe the weather based on the temperature value.
Use the following rules:
- If temperature is below 0, return "Freezing"
- If temperature is between 0 and 15 (inclusive), return "Cold"
- If temperature is between 16 and 25 (inclusive), return "Warm"
- If temperature is above 25, return "Hot"

Solution:
if temperature < 0:
  return "Freezing"
elif temperature <= 15:
  return "Cold"
elif temperature <= 25:
  return "Warm"
else:
  return "Hot"`;

const hardIfStatementPython1 = `Hard Level - Python Language - If Statements

Assume that you have two variables: age and has_license. Write an if statement to determine if a person can rent a car.
Use the following rules:
- If the person is under 18, return "Too Young"
- If the person is 18 or older but does not have a license, return "License Required"
- If the person is between 18 and 24 (inclusive) and has a license, return "Additional Fee Required"
- If the person is 25 or older and has a license, return "Eligible"

Solution:
if age < 18:
  return "Too Young"
else:
  if not has_license:
    return "License Required"
  elif age <= 24:
    return "Additional Fee Required"
  else:
    return "Eligible"`;

const hardIfStatementPython2 = `Hard Level - Python Language - If Statements

Assume that you have three variables: day, is_holiday, and weather.
Write an if statement to decide if you should go for a picnic.
Use the following rules:
- If it is Saturday or Sunday and the weather is "Sunny", return "Go for a Picnic"
- If it is a holiday and the weather is not "Rainy", return "Go for a Picnic"
- Otherwise, return "Stay Home"

Solution:
if (day == "Saturday" or day == "Sunday") and weather == "Sunny":
  return "Go for a Picnic"
elif is_holiday and weather != "Rainy":
  return "Go for a Picnic"
else:
  return "Stay Home"`;

const easyLoopPython1 = `Easy Level - Python Language - For Loops

Assume that you have a list called numbers. Write a for loop to calculate the sum of all elements in the list and return the result.

Solution:
total = 0
for num in numbers:
  total += num
return total`

const easyLoopPython2 = `Easy Level - Python Language - While Loops

Assume that you have a variable called count. Write a while loop that prints "Hello" count times.

Solution:
i = 0
while i < count:
  print("Hello")
  i += 1`

const mediumLoopPython1 = `Medium Level - Python Language - For Loops

Assume that you have a list called numbers. Write a for loop to count how many numbers in the list are even, and return that count.

Solution:
even_count = 0
for num in numbers:
  if num % 2 == 0:
    even_count += 1
return even_count`

const mediumLoopPython2 = `Medium Level - Python Language - While Loops

Assume that you have a variable called n. Write a while loop that returns the factorial of n.
Example: if n = 5, return 120.

Solution:
result = 1
while n > 0:
  result *= n
  n -= 1
return result`

const hardLoopPython1 = `Hard Level - Python Language - For Loops

Assume that you have a list of integers called numbers. Write a for loop to create a new list that contains only the square of the positive numbers from the original list. Return the new list.

Solution:
squares = []
for num in numbers:
  if num > 0:
    squares.append(num * num)
return squares`

const hardLoopPython2 = `Hard Level - Python Language - While Loops

Assume that you have a variable called num. Write a while loop to reverse the digits of num and return the reversed number.
Example: if num = 1234, return 4321.

Solution:
reversed_num = 0
while num > 0:
  digit = num % 10
  reversed_num = reversed_num * 10 + digit
  num //= 10
return reversed_num`

const easyArithmeticPython1 = `Easy Level - Python Language - Arithmetic

Assume that you have two variables called a and b. Write code to return the sum of a and b.

Solution:
return a + b`


const easyArithmeticPython2 = `Easy Level - Python Language - Arithmetic

Assume that you have two variables called x and y. Write code to return the product of x and y.

Solution:
return x * y`


const mediumArithmeticPython1 = `Medium Level - Python Language - Arithmetic

Assume that you have three variables: a, b, and c. Write code to return the average of these three numbers.

Solution:
return (a + b + c) / 3`


const mediumArithmeticPython2 = `Medium Level - Python Language - Arithmetic

Assume that you have a variable called radius. Write code to calculate and return the area of a circle using the formula πr². Assume π = 3.14.

Solution:
pi = 3.14
return pi * (radius ** 2)`


const hardArithmeticPython1 = `Hard Level - Python Language - Arithmetic

Assume that you have two variables called principal and rate. Write code to calculate and return the simple interest for 5 years using the formula:
Simple Interest = (principal * rate * time) / 100
Use time = 5.

Solution:
time = 5
return (principal * rate * time) / 100`


const hardArithmeticPython2 = `Hard Level - Python Language - Arithmetic

Assume that you have two variables: num1 and num2. Write code to calculate and return the remainder when num1 is divided by num2. 
If num2 is 0, return "Undefined" (since division by zero is not allowed).

Solution:
if num2 == 0:
  return "Undefined"
else:
  return num1 % num2`
