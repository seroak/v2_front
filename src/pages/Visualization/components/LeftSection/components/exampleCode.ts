export const data_codes = [
  [
    "기본 변수 선언",
    "# 예제 1: 기본적인 변수 선언\n" +
      'name = "Alice"\n' +
      "age = 25\n" +
      "is_student = True\n" +
      "print(name)\n" +
      "\n" +
      'name = "Bob"\n' +
      "print(name)\n",
  ],
  [
    "변수의 이름 규칙",
    "# 예제 2: 변수 이름 규칙 (유효한 변수 이름)\n" +
      "my_var = 10\n" +
      "my_var2 = 20\n" +
      "_var_starting_with_underscore = 30\n" +
      "\n" +
      "# 2var = 10  # 숫자로 시작 불가\n" +
      "# my-var = 20  # 하이픈 사용 불가\n" +
      "# my var = 30  # 공백 사용 불가\n",
  ],
  ["대소문자 구분", "# 예제 3: 대소문자 구분\n" + "Var = 5\n" + "var = 10\n" + "\n" + "print(Var, var)\n"],
  ["여러 변수 선언", "# 예제 4: 여러 변수 선언\n" + "x, y, z = 1, 2, 3\n" + "\n" + "print(x, y, z)\n"],
  [
    "종합",
    "# 1. 변수 선언 및 할당\n" +
      'name = "Edupi"        # 문자열 변수\n' +
      "age = 10              # 정수형 변수\n" +
      "height = 1.75         # 실수형 변수\n" +
      "is_student = True     # 불리언(boolean) 변수\n" +
      "\n" +
      'print("이름:", name)\n' +
      'print("나이:", age)\n' +
      'print("키:", height)\n' +
      'print("학생 여부:", is_student)\n' +
      "\n" +
      "# 2. 변수 값 변경\n" +
      "age = age + 1  # 나이에 1을 더함\n" +
      'print("내년 나이:", age)\n' +
      "\n" +
      "# 3. 변수 사용\n" +
      "total_height = height * 2  # 키를 두 배로 계산\n" +
      'print("두 배 키:", total_height)\n',
  ],
];

export const string_codes = [
  ["문자열 인덱싱", "# 예제 1: 문자열 인덱싱\n" + "text = input()\n" + "\n" + "print(text[0])\n" + "print(text[-1])\n"],
  [
    "문자열 슬라이싱",
    "# 예제 2: 문자열 슬라이싱\n" +
      'text = "Hello, Edupi!"\n' +
      "\n" +
      'print("전체 문자열: ", text)\n' +
      'print("처음 5글자:", text[:5])      \n' +
      'print("5번째부터 끝까지:", text[5:])\n',
  ],
  [
    "문자열 연산",
    "# 예제 4: 문자열 연산\n" +
      'greeting = "Hello"\n' +
      'name = "World"\n' +
      'message = greeting + name + "!"\n' +
      "print(message)\n" +
      "\n" +
      'repeat = "Ha" * 3\n' +
      "print(repeat)\n",
  ],
];

export const operation_codes = [
  [
    "산술 연산자",
    "# 예제 1: 산술 연산자\n" +
      "a = int(input())\n" +
      "b = int(input())\n" +
      "\n" +
      "print(a + b)\n" +
      "print(a - b) \n" +
      "print(a * b) \n" +
      "print(a / b) \n" +
      "print(a % b) \n" +
      "print(a // b) \n" +
      "\n" +
      "# 16진수, 8진수\n" +
      "c = 0o177\n" +
      "d = 0xABC\n" +
      "print(c) \n" +
      "print(d)\n ",
  ],
  [
    "비교 연산자",
    "# 예제 2: 비교 연산자\n" +
      "a = 10\n" +
      "b = 20\n" +
      "\n" +
      "print(a > b)\n" +
      "print(a < b)\n" +
      "print(a == b)\n" +
      "print(a != b)\n",
  ],
  [
    "다향 연산자",
    "# 예제 3: 다항 연산자\n" +
      "a, b = 10, 5\n" +
      "c, d = 2.0, 3.0\n" +
      "\n" +
      "# 우선순위: *, +, -\n" +
      "result = a + b * c + d\n" +
      "print(result)\n",
  ],
];

export const control_codes = [
  [
    "if-else문",
    "# 예제 1: if-else문\n" +
      "number = int(input())\n" +
      "if number > 0:\n" +
      '   print("Positive")\n' +
      "else:\n" +
      '   print("Negative or Zero")\n',
  ],
  [
    "if-elif-else문",
    "# 예제 2: if-elif-else문\n" +
      "grade = int(input())\n" +
      "if grade >= 90:\n" +
      '   print("A")\n' +
      "elif grade >= 80:\n" +
      '   print("B")\n' +
      "elif grade >= 70:\n" +
      '   print("C")\n' +
      "else:\n" +
      '   print("F")\n' +
      "\n" +
      'print("END")\n',
  ],
  [
    "중첩 if문",
    "# 예제 3: 중첩 if문\n" +
      "age = 20\n" +
      "if age >= 18:\n" +
      "   if age >= 65:\n" +
      '      print("Senior citizen")\n' +
      "   else:\n" +
      '      print("Adult")\n' +
      "\n" +
      'print("END")\n',
  ],
];

export const list_codes = [
  [
    "리스트 인덱싱",
    "# 예제 1: 리스트 인덱싱\n" +
      "nums = [10, 20, 30, 40]\n" +
      "\n" +
      "# 첫 번째, 마지막 요소\n" +
      "print(nums[0], nums[-1])\n",
  ],
  [
    "리스트 슬라이싱",
    "# 예제 2: 리스트 슬라이싱\n" +
      "nums = [10, 20, 30, 40]\n" +
      "\n" +
      "n1 = nums[1:3]\n" +
      "print(n1)\n" +
      "\n" +
      "n2 = nums[:2]\n" +
      "print(n1)\n" +
      "\n" +
      "n3 = nums[2:]\n" +
      "print(n1)\n",
  ],
  [
    "리스트 정렬",
    "# 예제 3: 리스트 정렬\n" +
      "nums = [3, 1, 4, 1, 5, 9]\n" +
      "\n" +
      "sorted_nums = sorted(nums)\n" +
      "print(sorted_nums)\n",
  ],
];

export const repeat_codes = [
  ["for문 기본", "# 예제 1: for문 기본 사용\n" + "for i in range(1, 10, 2):\n" + "   print(i)\n"],
  [
    "리스트 요소 반복",
    "# 예제 2: 리스트 요소 반복\n" +
      "marks = [90, 25, 67, 45, 80]\n" +
      "\n" +
      "for number in range(len(marks)):\n" +
      "   if marks[number] < 60: \n" +
      "      continue\n" +
      '   print(f"{number+1}번 학생 축하합니다. 합격입니다.")\n',
  ],
  [
    "while문 기본",
    "# 예제 3: while문 기본 사용\n" +
      "count = 0\n" +
      "while count < 3:\n" +
      "   print(count)\n" +
      "   count = count + 1\n" +
      "\n" +
      'print("END")\n',
  ],
  [
    "반복문에서 break",
    "# 예제 4: 반복문에서 break 사용\n" +
      "for i in range(10):\n" +
      "   if i == 2:\n" +
      "      break\n" +
      "   print(i)\n" +
      "\n" +
      'print("END")\n',
  ],
  [
    "반복문에서 continue",
    "# 예제 5: 반복문에서 continue 사용\n" +
      "for i in range(10):\n" +
      "   if i % 2 == 0:\n" +
      "      continue\n" +
      "   print(i)\n" +
      "   \n" +
      'print("END")\n',
  ],
];

export const function_codes = [
  [
    "기본 함수",
    "# 예제 1: 기본 함수\n" +
      "def greet(name):\n" +
      '   return f"Hello, {name}!"\n' +
      "\n" +
      'result = greet("Alice")\n' +
      "print(result)\n",
  ],
  [
    "지역 변수",
    "# 예제 2: 지역 변수\n" +
      "def local_example():\n" +
      "   x = 10  # 지역 변수\n" +
      "   print(x)\n" +
      "\n" +
      "local_example()\n" +
      "# print(x)  # 오류 발생 (x는 함수 외부에서 사용 불가)\n",
  ],
  [
    "최대값 찾기",
    "# 리스트에서 최대값을 찾는 함수\n" +
      "def find_max(numbers):\n" +
      "   max_num = numbers[0]\n" +
      "   for num in numbers:\n" +
      "      if num > max_num:\n" +
      "         max_num = num\n" +
      "   return max_num\n" +
      "\n" +
      "# 함수 호출\n" +
      "numbers = [3, 5]\n" +
      "max_number = find_max(numbers)\n" +
      'print("Max number:", max_number)\n',
  ],
  [
    "사각형의 면적과 둘레",
    "def calculate_area(width, height):\n" +
      "   return width * height\n" +
      "\n" +
      "def calculate_perimeter(width, height):\n" +
      "   return 2 * (width + height)\n" +
      "\n" +
      "width = 5\n" +
      "height = 3\n" +
      "\n" +
      "area = calculate_area(width, height)\n" +
      "perimeter = calculate_perimeter(width, height)\n" +
      "\n" +
      'print(f"Area: {area}")\n' +
      'print(f"Perimeter: {perimeter}")\n',
  ],
  [
    "두 점 사이의 거리",
    "# 제곱근 구하는 함수\n" +
      "def sqrt(a):\n" +
      "   return a**(1/2)\n" +
      "\n" +
      "# 두 점 사이의 거리를 계산하는 함수\n" +
      "def calculate_distance(point1, point2):\n" +
      "   x_dist = pow(point1[0] - point2[0], 2)\n" +
      "   y_dist = pow(point1[1] - point2[1], 2)\n" +
      "   distance = sqrt(x_dist + y_dist)\n" +
      "   return distance\n" +
      "\n" +
      "# 사용 예제\n" +
      "point1 = [1, 2]\n" +
      "point2 = [4, 6]\n" +
      "\n" +
      "distance = calculate_distance(point1, point2)\n" +
      'print(f"Distance: {distance}")\n',
  ],
];
