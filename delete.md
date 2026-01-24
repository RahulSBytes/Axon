Here is a simple Python program that sums two numbers:

```python
def sum_two_numbers(num1, num2):
    """
    This function takes two numbers as input and returns their sum.
    
    Parameters:
    num1 (float): The first number
    num2 (float): The second number
    
    Returns:
    float: The sum of num1 and num2
    """
    return num1 + num2


# Get two numbers from the user
num1 = float(input("Enter the first number: "))
num2 = float(input("Enter the second number: "))

# Call the function to sum the two numbers
sum_result = sum_two_numbers(num1, num2)

# Print the result
print("The sum is:", sum_result)
