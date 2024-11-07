export const basic_codes = [
    ["변수",  "# 1. 변수 선언 및 할당\n" +
                "name = \"Edupi\"        # 문자열 변수\n" +
                "age = 10              # 정수형 변수\n" +
                "height = 1.75         # 실수형 변수\n" +
                "is_student = True     # 불리언(boolean) 변수\n" +
                "\n" +
                "print(\"이름:\", name)\n" +
                "print(\"나이:\", age)\n" +
                "print(\"키:\", height)\n" +
                "print(\"학생 여부:\", is_student)\n" +
                "\n" +
                "# 2. 변수 값 변경\n" +
                "age = age + 1  # 나이에 1을 더함\n" +
                "print(\"내년 나이:\", age)\n" +
                "\n" +
                "# 3. 변수 사용\n" +
                "total_height = height * 2  # 키를 두 배로 계산\n" +
                "print(\"두 배 키:\", total_height)\n"
    ],

    ["사칙 연산", "a = 10\n" +
                "b = 3\n\n" +
                "print(a + b)\n" +
                "print(a - b) \n" +
                "print(a * b) \n" +
                "print(a / b) \n" +
                "print(a % b) \n" +
                "print(a // b) \n"
    ],
    ["문자열 연산","text = \"Hello, Edupi!\"\n" +
                "\n" +
                "# 1. 특정 인덱스의 문자 가져오기\n" +
                "print(\"첫 번째 문자:\", text[0])      \n" +
                "print(\"마지막 문자:\", text[5])   \n\n" +
                "# 2. 문자열 슬라이싱 (일부분 잘라내기)\n" +
                "print(\"처음 5글자:\", text[:5])      \n" +
                "print(\"5번째부터 끝까지:\", text[5:]) \n" +
                "\n" +
                "# 3. 문자열의 모든 문자를 하나씩 출력하기\n" +
                "for char in text:\n" +
                "    print(char, end=\" \")"
    ],

]

export const control_codes=[
    ["if문", "# 숫자가 양수, 음수 또는 0인지 판별\n" +
                "num = int(input(\"Enter a number: \"))\n" +
                "\n" +
                "if num > 0:\n" +
                "    print(\"The number is positive.\")\n" +
                "elif num < 0:\n" +
                "    print(\"The number is negative.\")\n" +
                "else:\n" +
                "    print(\"The number is zero.\")"
    ],
    ["for문1", "marks = [90, 25, 67, 45, 80]   # 학생들의 시험 점수 리스트\n" +
                "\n" +
                "number = 0   \n" +
                "for mark in marks:   \n" +
                "    number = number +1 \n" +
                "    if mark >= 60: \n" +
                "        print(\"%d번 학생은 합격입니다.\" % number)\n" +
                "    else: \n" +
                "        print(\"%d번 학생은 불합격입니다.\" % number)"

    ],
    [
        "for문2", "marks = [90, 25, 67, 45, 80]\n" +
                    "\n" +
                    "for number in range(len(marks)):\n" +
                    "    if marks[number] < 60: \n" +
                    "        continue\n" +
                    "    print(f\"{number+1}번 학생 축하합니다. 합격입니다.\", )"
    ]
    ,
    ["총 합 구하기" , "total = 0\n" +
                    "for i in range(1, 10):\n" +
                    "    total = total + i\n" +
                    "\n" +
                    "print(\"Sum of numbers from 1 to 10:\", total)"
    ],
    ["별 찍기1", "# 별 찍기1\n" +
                "n = 10\n" +
                "\n" +
                "for i in range(1, n + 1):\n" +
                "    print(i *  '*' ) "
    ],
    ["별 찍기2", "a = 6\n" +
                "for i in range(a//2):\n" +
                "    print(' ' * (a//2 - i), end = '')\n" +
                "    print('*' * (2*i+1))\n" +
                "\n" +
                "for i in range(a//2-1):\n" +
                "    print(' ' * (i + 2), end = '')\n" +
                "    print('*' * ((a//2*2)-3-2*i))"
    ]
]

export const function_codes =[

    [
        "구구단", "# 2단부터 9단까지 구구단 출력\n" +
                "for i in range(2, 10)\n" +
                "    for j in range(1, 10):\n" +
                "        print(f\"{i} x {j} = {i * j}\")\n" +
                "    print()"

    ]
    ,
    [
        "홀수 짝수 합", "# 숫자가 홀수인지 짝수인지 확인하는 함수\n" +
                "def sum_even_odd(nums):\n" +
                "   odd_sum = 0;\n" +
                "   even_sum = 0;\n" +
                "\n" +
                "   for num in nums:\n" +
                "      if num % 2 == 0:\n" +
                "         even_sum = even_sum + num\n" +
                "      else:\n" +
                "         odd_sum = odd_sum + num\n" +
                "   return even_sum, odd_sum\n" +
                "\n" +
                "# 함수 호출\n" +
                "list2 = [1,2,3,4,5,6]\n" +
                "sum_even_odd(list2)"
    ],
    [
        "최대값 찾기", "# 리스트에서 최대값을 찾는 함수\n" +
                    "def find_max(numbers):\n" +
                    "    max_num = numbers[0]\n" +
                    "    for num in numbers:\n" +
                    "        if num > max_num:\n" +
                    "            max_num = num\n" +
                    "    return max_num\n" +
                    "\n" +
                    "# 함수 호출\n" +
                    "numbers = [3, 5, 7, 2, 8]\n" +
                    "max_number = find_max(numbers)\n" +
                    "print(\"Max number:\", max_number)"
    ],
    [
        "사각형의 면적과 둘레", "def calculate_area(width, height):\n" +
                            "    return width * height\n" +
                            "\n" +
                            "def calculate_perimeter(width, height):\n" +
                            "    return 2 * (width + height)\n" +
                            "\n" +
                            "width = 5\n" +
                            "height = 3\n" +
                            "\n" +
                            "area = calculate_area(width, height)\n" +
                            "perimeter = calculate_perimeter(width, height)\n" +
                            "\n" +
                            "print(f\"Area: {area}\")        # 출력: Area: 15\n" +
                            "print(f\"Perimeter: {perimeter}\")  # 출력: Perimeter: 16"
    ],
    [
        "두 점 사이의 거리", "# 두 점 사이의 x축 차이를 계산하는 함수\n" +
                            "def delta_x(x1, x2):\n" +
                            "   if x1 > x2:\n" +
                            "      return x1 - x2\n" +
                            "   else:\n" +
                            "      return x2 - x1\n" +
                            "\n" +
                            "# 두 점 사이의 y축 차이를 계산하는 함수\n" +
                            "def delta_y(y1, y2):\n" +
                            "   if y1 > y2:\n" +
                            "      return y1 - y2\n" +
                            "   else:\n" +
                            "      return y2 - y1\n" +
                            "\n" +
                            "# 두 점 사이의 거리를 계산하는 함수\n" +
                            "def calculate_distance(x1, y1, x2, y2):\n" +
                            "    dx = delta_x(x1, x2)\n" +
                            "    dy = delta_y(y1, y2)\n" +
                            "    return (dx**2 + dy**2)**0.5\n" +
                            "\n" +
                            "# 사용 예제\n" +
                            "x1 = 1\n" +
                            "y1 = 2\n" +
                            "x2 = 4\n" +
                            "y2 =6\n" +
                            "\n" +
                            "distance = calculate_distance(x1, y1, x2, y2)\n" +
                            "print(f\"Distance: {distance}\")  # 출력: Distance: 5.0"
    ],
    // ["소수 구하기", "# 소수인지 확인하는 함수\n" +
    //                 "def is_prime(number):\n" +
    //                 "    if number <= 1:\n" +
    //                 "        return False\n" +
    //                 "    for i in range(2, number):\n" +
    //                 "        if number % i == 0:\n" +
    //                 "            return False\n" +
    //                 "    return True\n" +
    //                 "\n" +
    //                 "# 특정 숫자 이하의 모든 소수를 찾는 함수\n" +
    //                 "def list_primes(limit):\n" +
    //                 "    primes = []\n" +
    //                 "    for num in range(2, limit + 1):\n" +
    //                 "        result = is_prime(num)\n" +
    //                 "        if result:\n" +
    //                 "            primes.append(num)\n" +
    //                 "    return primes\n" +
    //                 "\n" +
    //                 "# 사용 예제\n" +
    //                 "limit = 10\n" +
    //                 "prime_numbers = list_primes(limit)\n" +
    //                 "print(f\"Primes up to {limit}: {prime_numbers}\")\n"
    // ]

]



