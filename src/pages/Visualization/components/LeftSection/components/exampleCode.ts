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
                "\n" +
                "# 2. 문자열 슬라이싱 (일부분 잘라내기)\n" +
                "print(\"처음 5글자:\", text[:5])      \n" +
                "print(\"5번째부터 끝까지:\", text[5:]) \n" +
                "\n" +
                "# 3. 문자열의 모든 문자를 하나씩 출력하기\n" +
                "for char in text:\n" +
                "    print(char, end=\" \")"
    ],

]

export const function_codes =[
    ["기초 함수1", "# 함수 정의\n" +
                "def greet(name):\n" +
                "    return f\"Hello, {name}!\"\n" +
                "\n" +
                "# 함수 호출\n" +
                "name = \"Alice\"\n" +
                "message = greet(name)\n" +
                "print(message)"
    ],
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
    ]

]



