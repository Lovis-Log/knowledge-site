---
slug: "05-pointers"
title: "指针"
summary: "指针、数组、字符串、动态存储与综合程序设计例题。"
updatedAt: "2026-11-17"
content_type: "reference"
group: "course"
displayNumber: "5"
sources: []
---

# 第 5 章 指针

## 5.1 指针变量的定义与初始化

### 5.1.1 指针变量与间址访问

#### 指针类型变量与定义形式

指针类型变量是**能够存放对象地址的变量**，简称"指针变量"。定义形式为

```cpp
类型* 标识符;
```

其中 `类型` 叫指针类型说明符，它说明这个指针所关联的数据类型。关联类型可以是任何类型：基本数据类型（`int`、`float`、`char` 等）、复合数据类型，或自定义数据类型（数组、结构体、类等）。

```cpp
int *iptr1, *iptr2;   // iptr1、iptr2 是指向 int 型对象的指针
double *dptr;         // dptr 是指向 double 型对象的指针
float *fptr;          // fptr 是指向 float 型对象的指针
char *cptr;           // cptr 是指向 char 型对象的指针
```

`*` 在定义语句里只跟它后面那一个变量名结合，所以 `int *iptr1, *iptr2;` 两个都是指针，而 `int *p1, p2;` 中只有 `p1` 是指针，`p2` 是普通 `int`。要定义多个指针就逐个写 `*`。

#### 指针的初始化与赋值

指针在声明时可以初始化，也可以在声明后赋值。

```cpp
int var = 18;
int *iptr = &var;   // iptr 指向 int 型变量 var，存放 var 的地址
int *iptr1;         // 定义指针 iptr1
iptr1 = iptr;       // 把 iptr 中 var 的地址赋给 iptr1，iptr1 也指向 var
iptr1 = var;        // 非法：不能把 int 型变量赋给指针
```

最后一行是初学最常见的错：`iptr1 = var` 想把变量的**值**塞进指针，类型不匹配；取地址要写 `&var`。

#### 名访问与间址访问

同一块内存有两种访问方式：

- **名访问**：直接用变量名，如 `val_1 = 10;`、`cout << val_1`；
- **间址访问**：通过指针间接访问，如 `*iptr1 = 10;`、`cout << *iptr1`。

`*` 在这里是一元解引用运算符，作用分两步：取出指针变量中保存的地址，再按指针的关联类型解释该地址处的数据。因此 `*iptr1` 与 `val_1` 是同一个对象，如下面的内存布局（地址是某次运行的示例值）：

```cpp
int val_1, val_2;
int *iptr1, *iptr2;
iptr1 = &val_1;
iptr2 = &val_2;
val_1 = 10;
val_2 = 20;
```

![指针与所指对象的内存布局：iptr1 存放 val_1 的地址，iptr2 存放 val_2 的地址](/images/campus-cpp-programming/pointer-memory-layout.jpg)

`iptr1` 自身占一块存储（示例地址 `0X0066FDE0`），里面存的是 `val_1` 的地址 `0X0066FDF4`；`iptr2` 在 `0X0066FDE4`，存 `val_2` 的地址 `0X0066FDF0`。所以 `val_1 = 10;` 与 `*iptr1 = 10;` 完全等价，`val_2 = 20;` 与 `*iptr2 = 20;` 完全等价。具体地址值、指针本身占几个字节都由编译器和运行环境决定，标准不作保证，也不必背。

区分两种写法：

| 写法 | 含义 |
| --- | --- |
| `iptr1` | 指针变量本身的值，即 `val_1` 的地址 |
| `*iptr1` | 指针所指的对象，即 `val_1` |
| `&val_1` | 取 `val_1` 的地址，类型是 `int*` |
| `&iptr1` | 取指针变量自己的地址，类型是 `int**` |

#### 例5.1 测试指针变量访问所指对象

```cpp
#include <iostream>
using namespace std;
int main()
{
    int val_1 = 10;
    int val_2 = 20;
    int* ptr1 = &val_1;   // 将指针 ptr1 指向变量 val_1
    int* ptr2 = &val_2;   // 将指针 ptr2 指向变量 val_2
    *ptr1 = *ptr1 + *ptr2;              // 间址访问 val_1 和 val_2
    cout << "Val_1: " << val_1 << endl; // 名访问 val_1
    cout << "The Address of Val_1: " << ptr1 << endl;
    cout << "Val_2: " << val_2 << endl; // 名访问 val_2
    cout << "The Address of Val_2: " << ptr2 << endl;
}
```

运行结果：

```text
Val_1: 30
The Address of Val_1: 0x61ff04
Val_2: 20
The Address of Val_2: 0x61ff00
```

**解析**　这题的目的是把"指针存地址"和"`*` 取所指对象"两件事放在一条赋值语句里验证。

`*ptr1 = *ptr1 + *ptr2;` 的右边先各做一次解引用：`*ptr1` 读到 `val_1` 的 10，`*ptr2` 读到 `val_2` 的 20，和为 30；左边 `*ptr1` 又是 `val_1` 这个对象本身，于是把 30 写回 `val_1`。整个语句等价于 `val_1 = val_1 + val_2;`，结果是 `val_1` 变 30，`val_2` 仍为 20。

后四行输出用变量名读值、用指针名输出地址，正好对照"名访问"与"间址访问"：`val_1` 的值为 30，而 `ptr1` 输出的是地址。两行地址的具体值和差值都由运行环境决定（此处恰好相邻），换编译器或加几个变量就会变，不要当成规律记。

#### 初始化时必须类型匹配

指针的类型决定了所指对象的类型，所以初始化或赋值时必须保证类型匹配：普通对象指针通常从同类型对象的地址或兼容指针初始化，也允许增加 const 限定、转为 void* 等语言规定的转换；不能把任意不同类型的指针直接混用。

```cpp
double dval_1;
double *dptr1 = &dval_1;   // 合法：用 double 型变量地址初始化 dptr1
double *dptr2 = dptr1;     // 合法：用 double 型指针初始化 dptr2
int *iptr = dptr1;         // 非法：iptr 和 dptr1 所指向对象的类型不同
iptr = &dval_1;            // 非法：试图将 double 型变量的地址赋给 int 型指针
```

原因不只是"编译器挑剔"：解引用时要按关联类型决定读几个字节、怎样解释这段二进制，类型错了读出的就是无意义的值。确需跨类型解释要显式转换，并自己保证语义正确（见 5.1.3 的 `void*`）。

#### 指针初始化的几种情形

指针最容易出错的地方不是语法，而是"指针里到底有没有一个有效对象"。按初始化方式分四类看：

```cpp
int a;              // 变量 a 未初始化，值是随机垃圾值
int *p = NULL;      // 指针 p 被初始化为空指针
*p = a;             // 错误：间址访问空指针 p
```

```cpp
int *p = NULL;      // 空指针初始化（安全）
*p = 40;            // 错误：NULL 指针不能间址访问
```

```cpp
int a = 10;        // 先初始化变量 a（避免垃圾值）
int *p = &a;       // 指针 p 初始化：指向 a 的内存地址
*p = 20;           // 正确：通过 p 修改 a 的值，此时 a = 20
```

```cpp
int a;             // 定义变量 a，但未初始化（a 的值是随机垃圾值）
int *p;            // 定义指针 p，但未初始化（p 的值是随机内存地址）
*p = a;            // 错误：间址访问未初始化的指针 p
```

三条规则要分清：

1. **未初始化的局部指针**具有不确定值，不能把它当成某个可安全读取的随机地址，解引用等于往一个不知道哪里的内存写数据，属于未定义行为，可能立刻崩溃，也可能悄悄改坏别的变量。
2. **空指针**（`NULL` 或 `nullptr`）是明确的"不指向任何有效内存"，解引用它一定错，但它至少可以被判断。`NULL` 是表示空指针常量的宏，不是一个供程序访问的特殊内存地址；空指针值也不要求底层位模式全为 0。C++11 起更推荐 `nullptr`，它有独立的类型，不会和整数 `0` 混淆。
3. **指向已释放内存的指针**（悬空指针）既不是空的、也没有有效对象，比空指针更隐蔽。

动态内存的写法把后两条连起来：

```cpp
#include <stdlib.h>   // 包含 malloc/free 的头文件
int a = 5;
int *p = (int *)malloc(sizeof(int));   // 申请 1 个 int 大小的合法内存
if (p != NULL) {        // 必须检查 malloc 是否成功（失败返回 NULL）
    *p = a;             // 正确：向动态内存写入 a 的值（此时 *p = 5）
    free(p);            // 用完释放内存，避免内存泄漏
    p = NULL;           // 释放后让 p 变回空指针，避免野指针
}
```

`malloc` 可能失败，失败时返回空指针，所以必须先判空再解引用；`free` 之后那块内存不再属于本程序，指针变量里的旧地址仍留着，若该变量仍将被保留，宜立即置空以减少误用；这不会修复其他指向已释放对象的别名指针。

### 5.1.2 空指针

空指针是一种特殊的指针变量，**不指向任何有效的内存地址**（无论是对象还是函数）。

#### 例5.2 测试空指针

```cpp
#include <iostream>
using namespace std;
int main()
{
    int* ptr = nullptr;          // 定义空指针
    if (ptr == nullptr) {
        cout << "The pointer is null." << endl;
    }
    else {
        cout << "The pointer is not null." << endl;
    }
    int value = 10;
    ptr = &value;                // 为空指针赋值
    if (ptr != nullptr) {
        cout << "Value pointed by ptr: " << *ptr << endl;
    }
    else {
        cout << "The pointer is null." << endl;
    }
}
```

运行结果：

```text
The pointer is null.
Value pointed by ptr: 10
```

**解析**　题意是空指针的两种状态。前半段 `ptr` 初始化为 `nullptr`，`ptr == nullptr` 成立，输出第一行；后半段把 `ptr` 改成 `&value`，`ptr` 有了有效对象，`ptr != nullptr` 成立，于是可以安全解引用，输出 10。

两个要点：其一，空指针是**可以判断**的，所以"先判空、再解引用"是处理可能为空的指针的标准写法；其二，判空只对确定意义的空指针有用，未初始化的指针里是随机值，即使碰巧不等于 `nullptr`，也不代表它能解引用。

`nullptr` 可以赋给任何类型的指针，但它不是整数，`int n = nullptr;` 不能编译。老代码里的 `NULL` 通常是宏 `0`，在重载解析等场合会与整数混淆，这也是 C++11 引入 `nullptr` 的原因。

### 5.1.3 void* 指针

`void*` 指针变量能够存放**任意**内存地址。因为没有关联类型，编译器无法解释所指对象，程序中必须对它作强制类型转换，才可以按指定类型的数据使用。`void*` 指针不具有类型安全。

#### 例5.3 测试 void* 指针

```cpp
#include <iostream>
using namespace std;
int main()
{
    int intValue = 100;
    double doubleValue = 3.14;
    void *ptr = nullptr;      // 定义一个 void* 指针
    ptr = &intValue;          // 指向 int 变量
    cout << "As int: " << *(int *)ptr << endl;
    ptr = &doubleValue;       // 指向 double 变量
    cout << "As double: " << *(double *)ptr << endl;
    ptr = nullptr;            // 再次将 void* 指针设置为 nullptr
}
```

运行结果：

```text
As int: 100
As double: 3.14
```

**解析**　`void*` 只保存"地址"这一个信息，丢掉了"这块内存里是什么类型"。所以 `*ptr` 直接写是编译错误——编译器不知道要读几个字节、按什么格式解释。必须先转成实际类型再解引用：

- `ptr = &intValue;` 之后要写 `*(int *)ptr`，按 `int` 解释，读出 100；
- `ptr = &doubleValue;` 之后要写 `*(double *)ptr`，按 `double` 解释，读出 3.14。

转换的目标类型必须与对象的**实际类型一致**。如果同一个地址被错转成别的类型再解引用，读出的内容没有意义，写回则破坏对象，属于未定义行为。`void*` 的用途是"暂存/传递地址"（例如 `malloc` 的返回值、只关心地址的接口），而不是"随便当哪种类型用"。

标准 C++ 中 `void*` 不能解引用，也不能做指针算术；某些编译器（如 GCC）把 `void*` 的算术按 1 字节推进当作扩展放行，换到 MSVC 就会报错，这类写法不要依赖。

### 5.1.4 指向指针的指针

指针用来存储变量的地址，而指向指针的指针，就是**存储指针变量地址的指针**。把指针看作指向数据存储位置的箭头，那么指向指针的指针就是指向这个箭头的另一个箭头；层数由定义中 `*` 的个数决定。

```cpp
int **iptr2;      // 声明一个指向 int* 类型的指针，即指向指针的指针
int *iptr1;       // 声明一个指向 int 类型的指针
int i = 3;        // 声明一个整型变量 i，并初始化为 3
iptr1 = &i;       // 将 i 的地址赋给 iptr1，此时 iptr1 指向 i
iptr2 = &iptr1;   // 将 iptr1 的地址赋给 iptr2，此时 iptr2 指向 iptr1
```

#### 例5.4 测试多级指针

```cpp
#include <iostream>
using namespace std;
int main()
{
    // 声明四个指针变量和一个整型变量 i，并初始化 i 为 3
    int ****p4, ***p3, **p2, *p1, i = 3;
    p4 = &p3;   // p4 指向 p3
    p3 = &p2;   // p3 指向 p2
    p2 = &p1;   // p2 指向 p1
    p1 = &i;    // p1 指向 i
    cout << ****p4 << endl;   // 间址访问 i，打印出 i 的值
}
```

运行结果：

```text
3
```

**解析**　四级指针的链条是 `p4 → p3 → p2 → p1 → i`，每一级都保存下一级的地址。解引用的次数要和目标相差的层数对应：

| 表达式 | 得到的东西 | 类型 |
| --- | --- | --- |
| `p4` | `p3` 的地址 | `int****` |
| `*p4` | `p3` | `int***` |
| `**p4` | `p2` | `int**` |
| `***p4` | `p1` | `int*` |
| `****p4` | `i` 本身 | `int` |

所以要取到 `i` 的值必须写四个 `*`。少写一个 `*` 得到的是指针（输出的将是地址），多写一个 `*` 就变成对 `int` 再解引用，编译不通过。多级指针的价值在于"让函数修改一个指针变量本身"，这一点在参数传递一节才会真正用到，此处的重点是数清层级、逐层加 `*`。

### 5.1.4–5.1.5 const 与指针的四种组合

四种组合共用两个小节号（原件 5.1.4、5.1.5 各出现两次），下面按主题分小节。

#### 指向常量的指针

定义形式：

```cpp
const 类型 * 指针;
// 或
类型 const * 指针;
```

这种指针**不能通过它修改所指对象**（间址访问只读），但指针本身可以改指向别的对象。

```cpp
const int *ptr1;   // 指向 const int 的指针，*ptr1 只读
int const *ptr2;   // 与上一行等价
```

注意：把一个 `const` 对象的地址赋给一个普通的、非 `const` 对象的指针，会导致编译错误。因为那样就绕开了 `const` 的保护，能用 `*p` 改掉本该只读的对象。

#### 例5.5 测试指向常量的指针

```cpp
#include <iostream>
using namespace std;
int main()
{
    const int val_1 = 10;
    int val_2 = 15;
    const int *ptr1 = &val_1;   // 定义常量指针，指向常量
    const int *ptr2 = &val_2;   // 定义常量指针，指向变量
    // int* ptr3 = &val_1;      // 错误，不能用普通指针指向常量 val_1
    // *ptr1 = 20;              // 错误：不能通过指向常量的指针修改常量 val_1
    // *ptr2 = 20;              // 错误：不能通过指向常量的指针修改变量 val_2
    val_2 = 20;                 // 可以直接修改变量值
    cout << "Val_1: " << *ptr1 << endl;
    cout << "Val_2: " << *ptr2 << endl;
}
```

运行结果：

```text
Val_1: 10
Val_2: 20
```

**解析**　这题的关键是区分"`const` 限制的是谁"。`ptr2` 指向的是普通变量 `val_2`，但 `ptr2` 的类型是 `const int*`，于是**经 `ptr2` 这条路**不能写：`*ptr2 = 20;` 编译错误。而 `val_2` 自己不是常量，`val_2 = 20;` 合法，改完之后通过 `*ptr2` 读出来就是 20，所以输出 `Val_2: 20`。

也就是说，"指向常量的指针"约束的是**访问路径**，不是对象本身。反过来，`const int val_1` 是对象只读，`int* ptr3 = &val_1;` 会因为可能借此改写常量而被编译器拒绝；必须用 `const int*` 接。允许的方向只有一个：普通指针可以隐式转成指向常量的指针（`int*` → `const int*`），反向不行。

#### 指针常量

定义形式：

```cpp
类型 * const 指针;
```

指针常量的值（即它保存的地址）只能在定义的时候初始化，之后**不能改指向**；但间址访问没有额外约束，可以通过它修改所指对象。

#### 例5.6 测试指针常量

```cpp
#include <iostream>
using namespace std;
int main()
{
    int val_1 = 10;
    int val_2 = 20;
    int* const ptr = &val_1;   // 定义指针常量
    // ptr = &val_2;           // 错误：不能改变指针常量的指向
    *ptr = 30;                 // 间址访问 val_1
    cout << "Val_1: " << val_1 << endl;
}
```

运行结果：

```text
Val_1: 30
```

**解析**　`int* const ptr` 中 `const` 紧挨 `ptr`，修饰的是指针变量本身：`ptr` 这个"存放地址的盒子"被冻结，初始化成 `&val_1` 之后不能再装别的地址，所以 `ptr = &val_2;` 非法。但盒子里的地址指向的 `val_1` 是普通变量，`*ptr = 30;` 完全合法，`val_1` 变成 30。

指针常量的用处是"这个指针必须一直盯着同一个对象"（例如硬件寄存器映射、固定缓冲区首地址），此时仍允许改对象内容。

#### 指向常量的指针常量

定义形式：

```cpp
const 类型 * const 指针;
```

指针本身和所指对象的值在定义之后**都限制为只读**：既不能改指向，也不能经它改对象。

#### 例5.7 测试指向常量的指针常量

```cpp
#include <iostream>
using namespace std;
int main()
{
    const int MIN = 10;
    int max;
    // 定义指向常量的指针常量 pmax，初始化为 max 的地址
    const int* const pmax = &max;
    // *pmax = 1000;   // 非法：间址访问约束为只读
    max = 1000;        // 合法：修改变量值
    cout << "max = " << *pmax << endl;
    // 定义指向常量的指针常量 pmin，初始化为 MIN 的地址
    const int* const pmin = &MIN;
    // pmin = &max;    // 非法：不能修改指针常量
    // *pmin = 0;      // 非法：间址访问约束为只读
    cout << "MIN = " << *pmin << endl;
}
```

运行结果：

```text
max = 1000
MIN = 10
```

**解析**　`pmax` 指向普通变量 `max`，但两侧都有 `const`：`*pmax = 1000` 被禁止（路径只读），`max = 1000` 合法（对象本身可写），所以输出 1000——说明"经指针不能改"并不等于"对象不能变"。`pmin` 指向的是常量 `MIN`，两条路都封死：`pmin = &max` 改指针不行，`*pmin = 0` 改对象也不行。

注意 `int max;` 没有初始化，这里先执行 `max = 1000;` 再读取，所以没有问题；如果把 `cout << *pmax` 挪到赋值之前，读到的就是未初始化的值，输出不可预期。

#### 四种组合对照

判断规则：`const` 修饰它左边最近的东西，左边没有就修饰右边。因此 `const int *p` 与 `int const *p` 中的 `const` 修饰 `int`（对象只读），`int * const p` 中的 `const` 修饰 `p`（指针只读）。

| 写法 | 指针能否改指向 | 能否经指针改对象 | 读法 |
| --- | --- | --- | --- |
| `int *p` | 能 | 能 | 普通指针 |
| `const int *p`、`int const *p` | 能 | 不能 | 指向常量的指针 |
| `int * const p` | 不能 | 能 | 指针常量 |
| `const int * const p` | 不能 | 不能 | 指向常量的指针常量 |

三条易错点：

1. `const int *p` 里 `p` 不是常量，`p` 可以改指向别的 `int`，只是不能用 `*p` 写。
2. `int * const p` 里 `p` 必须初始化，且 `p` 指向的对象可写。
3. 指向常量的指针 ≠ 常量对象。前者只是访问路径只读，后者是对象本身只读；`const int* ptr2 = &val_2;` 之后 `val_2` 照样能改（例5.5）。

## 5.2 引用

### 引用的定义与绑定

引用说明为对象建立**引用名**，即别名。定义形式：

```cpp
类型 & 引用名 = 对象名;
```

`&` 在这里是引用说明符。

```cpp
int a;
int *ptr;
int &refToA = a;   // refToA 是 a 的引用，只能在定义时初始化
ptr = &a;          // ptr 指向 a
```

三条性质决定了引用的用法：

- 引用在定义初始化时与对象名绑定，程序中**不能对引用重定义**——绑定哪个对象就一直是哪个对象；
- 引用是一个对象的别名，从使用方式和效果上，与使用对象名一致，不需要解引用；
- 引用必须在定义时初始化，不存在"先定义、后绑定"的引用。

注意"不能重新绑定"与"只读"是两件事：普通引用不仅能读，还能写，写 `refToA = 100;` 就是写 `a`。只有加了 `const` 的引用才是只读的。

引用的用处来自"别名"这个语义：函数拿到形参引用就等于直接拿到实参本身，既能修改实参，又不必像指针那样层层解引用，还省掉了大对象的拷贝。

### 常引用

定义常引用：

```cpp
const 类型 & 引用名 = 对象名;
```

```cpp
int val = 356;
const int &refval = val;   // refval 是 val 的常引用
refval = 450;              // 非法：不能通过常引用修改对象 val 的值
val = 450;                 // 合法：可以直接修改变量的值
```

常引用限制的同样是"经这条路不能写"，`val` 本身不是常量，仍可直接赋值。常引用在参数传递中很重要：既能避免拷贝，又保证函数不改实参。

引用的底层是否占用存储、是否用地址实现，由编译器决定，标准只规定它语义上是别名，不要把它当成"一定是一个指针大小的变量"。

### 例5.8 引用测试

```cpp
#include <iostream>
using namespace std;
int main()
{
    int a = 10;
    int b = 20;
    int& refToA = a;    // refToA 是 a 的别名
    int& refToB = b;    // refToB 是 b 的别名
    refToA = 100;       // 通过引用修改变量
    refToB = 200;       // 通过引用修改变量
    cout << "a: " << a << endl;   // 输出 100，因为 refToA 是 a 的别名
    cout << "b: " << b << endl;   // 输出 200，因为 refToB 是 b 的别名
    const int& constRefToA = a;   // 定义一个常引用
    // constRefToA = 1000;        // 尝试修改常引用绑定的值（编译错误）
}
```

运行结果：

```text
a: 100
b: 200
```

**解析**　`refToA` 绑定 `a` 后，`refToA = 100;` 与 `a = 100;` 是同一条语句的两种写法，所以输出 `a: 100`；`refToB` 同理把 `b` 改成 200。这验证了"引用在使用上与对象名等价"。

`const int& constRefToA = a;` 建立的是常引用，`constRefToA = 1000;` 被编译器拒绝。要看清它拒绝的是"通过 `constRefToA` 写"，而不是"`a` 不能改"：本行注释掉之后，`a = 1000;` 仍然合法。

### 引用与指针的差别

| 对比项 | 指针 | 引用 |
| --- | --- | --- |
| 本质 | 一个独立的对象（变量），存放地址 | 对象的别名，不是独立对象 |
| 初始化 | 可以先定义后赋值，也可以不初始化 | 必须在定义时绑定 |
| 改指向 | 可以改指向别的对象 | 绑定后不能改绑 |
| 空值 | 可以是空指针 | 不存在空引用，绑定对象必须存在 |
| 访问方式 | 需 `*p` 解引用 | 直接当对象名用 |
| 取地址 | `&p` 得指针变量自身的地址 | `&r` 得被引用对象的地址 |
| 只读性 | 由 `const` 决定能改什么 | 普通引用可读写；`const` 引用只读 |

最容易说错的两条：

1. 引用**不等于只读**。`int& r = a;` 之后 `r = 5;` 就是改 `a`，这与指针 `*p = 5;` 等价。只有 `const int&` 才只读。
2. 引用**不能重新绑定**，但不要因此把 `int&` 简单当成 `int* const`：`int& r = a;` 之后再写 `r = b;` 不是让 `r` 改指 `b`，而是把 `b` 的值赋给 `a`。这是引用与指针最容易混的地方。

`&` 在三种位置含义不同：定义引用时是引用说明符（`int& r`），作一元运算符时是取地址（`&a`），作二元运算符时是按位与。看它出现在类型里还是表达式里即可区分。

### 引用的课堂练习

### 练习1（单选，1 分）

阅读下面代码，下列说法正确的是（　）

```cpp
int x = 5;
int *p = &x;
int **q = &p;
**q = 10;
*q = nullptr;
```

A. 执行 `**q = 10;` 后，x 的值仍为 5
B. 执行 `*q = nullptr;` 后，指针 p 被置为 nullptr
C. 执行 `*q = nullptr;` 后，指针 q 本身被置为 nullptr
D. 代码编译报错，不能通过编译

**答案：B**

**解析**　先理清层级：`p` 指向 `x`，`q` 指向 `p`，所以 `*q` 就是 `p` 本身，`**q` 就是 `x`。

- `**q = 10;` 等价于 `x = 10;`，`x` 由 5 变 10，A 错。
- `*q = nullptr;` 是给 `*q`（即 `p`）赋空指针，执行后 `p` 为 `nullptr`，B 对。
- `q` 自己的值没被赋值，仍指向 `p`，C 错。
- 各语句类型都匹配：`q` 是 `int**`，`*q` 是 `int*`，赋 `nullptr` 合法，D 错。

补充一句：执行 `*q = nullptr;` 之后再写 `**q` 就是解引用空指针，属于未定义行为，可能崩溃，也可能出现其他结果，所以置空后不能再顺着它访问对象。

### 练习2（主观题，10 分）

```cpp
#include <iostream>
using namespace std;
int main()
{
    double d1 = 3.14, d2 = 2;
    double & r_d1 = d1;
    double * p_d1 = &d1, *p_d2 = &d2;
    *p_d1 = *p_d1 * *p_d2;
    double *& rt = p_d2;
    *rt = 10;
    cout << "r_d1=" << r_d1 << "\t*p_d2=" << *p_d2 << "\n*p_d2=" << *p_d2 << "\t*rt=" << *rt << endl;
}
```

运行结果：

```text
r_d1=6.28	*p_d2=10
*p_d2=10	*rt=10
```

**解析（原页给出运行截图，推理为补充）**　关键是认出两种"间接"：`double & r_d1` 是**对象的引用**，`double *& rt` 是**指针的引用**（`rt` 是 `p_d2` 这个指针变量的别名，不是 `d2` 的别名）。

按顺序跟踪：

1. `d1 = 3.14`，`d2 = 2`；`r_d1` 是 `d1` 的别名；`p_d1` 指向 `d1`，`p_d2` 指向 `d2`。
2. `*p_d1 = *p_d1 * *p_d2;` 读 3.14 与 2，积 6.28 写回 `d1`，此时 `d1 = 6.28`，`d2` 仍是 2。
3. `double *& rt = p_d2;` 让 `rt` 成为指针 `p_d2` 的别名，`rt` 与 `p_d2` 指同一个 `double`（即 `d2`）。
4. `*rt = 10;` 等价于 `*p_d2 = 10;`，把 `d2` 改成 10。

输出时 `r_d1` 读到 `d1` 的 6.28；`*p_d2` 两次都读到 10；`*rt` 也是 10（同一个 `d2`）。`\t` 是制表符，输出里的空白由此而来。

如果把 `double *& rt` 误读成 `double & rt`（`d2` 的别名），`*rt = 10;` 根本无法编译，因为 `double` 不是指针、不能解引用；正因为 `rt` 是**指针的引用**，`*rt` 才是指针所指的 `double`。写 `*&` 连在一起时，`*` 属于类型（这是指针），`&` 才是引用说明符；顺带可知，只有指针的引用才能做 `rt = &d1;` 这种改指向的赋值，对象的引用做不到。

### 练习3（主观题，10 分）

```cpp
#include <iostream>
using namespace std;
int main()
{
    int a = 5, b = 8;
    int& ra = a;
    int* p = &a, * q = &b;

    ra = ra + *q;

    int*& rq = q;
    *rq = *p + *q;

    cout << "a=" << a << "\tb=" << b << endl;
    cout << "*p=" << *p << "\t*q=" << *q << endl;
    return 0;
}
```

运行结果：

```text
a=13	b=21
*p=13	*q=21
```

**解析（原页给出运行截图，推理为补充）**　与练习2同一套路，只是换成 `int`，并且要注意两条语句的**先后依赖**。

1. 初始 `a = 5`，`b = 8`；`ra` 是 `a` 的别名；`p` 指向 `a`，`q` 指向 `b`。
2. `ra = ra + *q;` 即 `a = a + b = 5 + 8 = 13`，此时 `a = 13`，`b` 仍为 8。
3. `int*& rq = q;` 使 `rq` 成为指针 `q` 的别名。
4. `*rq = *p + *q;` 即 `*q = *p + *q`，也就是 `b = 13 + 8 = 21`。

第 4 步里 `*p` 已经是 13，因为第 2 步先改过 `a`；若把改 `a` 的那一步挪到最后，`*p + *q` 用到的就是 `a` 的旧值 5，`b` 会变成 13，结果不同。这也是这类题必须按语句顺序逐步代入、不能只看初值的原因。

输出中 `a=13`、`b=21`，`*p`、`*q` 分别跟着 `a`、`b` 走，所以是 13 和 21。

## 5.3 指针、引用与函数

设计一个函数接口要回答三件事：实参以什么方式交给形参；函数能不能改调用方的对象；函数返回的地址或引用在函数结束之后还能不能用。前两件由参数的传递方式决定，第三件由返回类型和"被返回对象活多久"决定。

传递方式底下只有一条规则：**形参是函数调用时新建的局部对象，用实参去初始化它。** 形参写成 `int a`，就用实参的值初始化 `a`；写成 `int* p`，就用实参的地址初始化 `p`；写成 `int& r`，就让 `r` 成为实参对象的别名。三种写法看起来差别很大，落到初始化这一步其实是同一件事的三种取值：值、地址、对象本身。

### 5.3.1 函数参数的传递

| 形参形式 | 用什么初始化形参 | 形参是不是实参的别名 | 函数内改形参本身 | 函数内改 `*p` / 被绑定对象 |
| --- | --- | --- | --- | --- |
| `int a` | 实参值的副本 | 否 | 只改副本 | 影响不到实参 |
| `int* p` | 实参地址的副本（指针值） | 否 | 只改副本的指向 | 通过 `*p` 改的是实参对象 |
| `int& r` | 实参对象本身 | 是 | 就是改实参 | 同一个对象 |

所以三者的分界不在"传了什么"，而在"形参和实参是不是同一个对象"。值传递和指针传递都复制，区别只是复制的是值还是地址；引用传递不复制，形参和实参是同一个对象。

#### 例5.9 函数参数的三种传递方式

同一个交换函数写成三个版本，观察调用方的 `x`、`y` 到底有没有被换过来。

**（1）值传递**

```cpp
#include <iostream>
using namespace std;

void swapByValue(int a, int b)          // 值传递
{
    int temp = a;
    a = b;
    b = temp;
    cout << "Inside swapByValue: a = " << a << ", b = " << b << endl;
}

int main()
{
    int x = 10;
    int y = 20;
    cout << "Before swap: x = " << x << ", y = " << y << endl;
    swapByValue(x, y);
    cout << "After swap by swapByValue: x = " << x << ", y = " << y << endl;
}
```

```
Before swap: x = 10, y = 20
Inside swapByValue: a = 20, b = 10
After swap by swapByValue: x = 10, y = 20
```

函数内部确实完成了交换，但那是在 `a`、`b` 两个副本上做的。`a`、`b` 是调用时新建的局部变量，初值分别是 10、20；交换只改这两个副本，函数返回时它们一起销毁，`x`、`y` 一个字节都没动。输出里 "Inside" 一行是 20、10，"After" 一行仍是 10、20，这个反差就是值传递的定义。

**（2）指针传递**

```cpp
#include <iostream>
using namespace std;

void swapByPointer(int* a, int* b)      // 指针传递
{
    int temp = *a;
    *a = *b;
    *b = temp;
    cout << "Inside swapByPointer: a = " << *a << ", b = " << *b << endl;
}

int main()
{
    int x = 10;
    int y = 20;
    cout << "Before swap: x = " << x << ", y = " << y << endl;
    swapByPointer(&x, &y);
    cout << "After swap by swapByPointer: x = " << x << ", y = " << y << endl;
}
```

```
Before swap: x = 10, y = 20
Inside swapByPointer: a = 20, b = 10
After swap by swapByPointer: x = 20, y = 10
```

形参 `a`、`b` 仍然是被复制的局部指针，但它们复制的是 `&x`、`&y`，所以 `*a`、`*b` 就是 `x`、`y` 本身。交换 `*a` 和 `*b` 等于交换 `x` 和 `y`，函数返回后结果保留。这里的复制没有白费：复制的是"门牌号"，按门牌号找到的房间还是调用方那两间。

**（3）引用传递**

```cpp
#include <iostream>
using namespace std;

void swapByReference(int& a, int& b)    // 引用传递
{
    int temp = a;
    a = b;
    b = temp;
    cout << "Inside swapByReference: a = " << a << ", b = " << b << endl;
}

int main()
{
    int x = 10;
    int y = 20;
    cout << "Before swap: x = " << x << ", y = " << y << endl;
    swapByReference(x, y);
    cout << "After swap by swapByReference: x = " << x << ", y = " << y << endl;
}
```

```
Before swap: x = 10, y = 20
Inside swapByReference: a = 20, b = 10
After swap by swapByReference: x = 20, y = 10
```

`a`、`b` 不是新对象，而是 `x`、`y` 的别名，函数体里写 `a` 就等于在 `main` 里写 `x`。所以交换代码和值传递版本一模一样，效果却和指针版本相同——省掉了 `&`、`*` 这些记号，也省掉了复制。

三个版本放在一起：

| 版本 | 形参 | 函数内交换的对象 | 调用方结果 | 失败原因 |
| --- | --- | --- | --- | --- |
| `swapByValue` | `int a, int b` | 两个副本 | `x=10, y=20` 不变 | 改的不是实参 |
| `swapByPointer` | `int* a, int* b` | `*a`、`*b` | `x=20, y=10` | — |
| `swapByReference` | `int& a, int& b` | `a`、`b`（即 x、y） | `x=20, y=10` | — |

**指针参数本身仍然是值传递。** 这一点最容易混。`swapByPointer` 的形参 `a` 是一个独立的指针变量，函数调用时把 `&x` 复制给它；`a` 自己占一块存储，`*a` 才是 `x`。于是有两件完全不同的事：

```cpp
void reassign(int* p)   { p = nullptr; }    // 只改形参这个副本，调用方指针不变
void reassign2(int*& p) { p = nullptr; }    // 形参是指针的引用，改的是调用方指针
void reassign3(int** p) { *p = nullptr; }   // 通过二级指针改调用方指针
```

`reassign` 返回后，调用方的指针还指向原来的对象，因为 `p = nullptr` 改的是那块复制的存储，和调用方指针无关；`reassign2` 的形参绑定到调用方指针本身，赋值才落到调用方；`reassign3` 先用 `*p` 找到调用方指针，再改它。要让函数改"调用方的指针指向谁"，形参必须是"指针的引用"（`int*&`）或"指向指针的指针"（`int**`），单写 `int*` 做不到。

同理，`swapByPointer` 能成功，是因为它改的是 `*a`、`*b` 这两个**对象**，而不是 `a`、`b` 这两个**指针**。如果函数里写 `int* t = a; a = b; b = t;`，交换的只是两个副本指针的指向，`x`、`y` 依旧不变。

**引用一旦绑定，就不再重新绑定。** 函数体里写 `a = b`，含义是"把 `b` 的值赋给 `a` 所绑定的那个对象"，不是让 `a` 改去引用 `b`；C++ 也没有让引用改绑的语法。引用必须在定义时初始化，`int& r;` 直接编译不过。所以引用形参在整个函数体内始终是同一个实参对象的别名：既不会出现"改指向"的混淆，也不可能中途换成别的对象。想把"换一个对象"这件事表达出来，只能用指针（或指针的引用）。

**用 const 约束形参：把"只读"写进接口。** 函数如果只想读实参，却留着可写的入口，调用方从声明上看不出这个值会不会被改。const 加在形参上，等于把承诺写进类型，让编译器替调用方检查。

#### 例5.10 使用 const 限定指针参数，保护实参对象

先看没有约束的版本：

```cpp
#include <iostream>
using namespace std;

void processValue(int* ptr, int count) {
    int localSum = 0;
    *ptr = 20;                       // 修改 ptr 所指的对象
    for (int i = 0; i < count; ++i) {
        cout << "Value: " << *ptr << ", Sum so far: " << localSum << endl;
        localSum += *ptr;
    }
    cout << "Final sum after accumulating " << count << " times: " << localSum << endl;
}

int main() {
    int value = 10;
    int count = 5;
    processValue(&value, count);
}
```

```
Value: 20, Sum so far: 0
Value: 20, Sum so far: 20
Value: 20, Sum so far: 40
Value: 20, Sum so far: 60
Value: 20, Sum so far: 80
Final sum after accumulating 5 times: 100
```

`value` 被函数从 10 改成了 20。若这个函数本意只是"按次数累加并打印"，这次修改就是调用方没有预期的副作用：累加结果 100 建立在被篡改的 20 上。更麻烦的是，签名 `void processValue(int*, int)` 只说明"允许写"，看不出函数到底写没写、写了什么，调用方无法从接口上防范。

把形参改成指向常量的指针：

```cpp
#include <iostream>
using namespace std;

void processValue(const int* ptr, int count) {
    int localSum = 0;
    // *ptr = 20;  // 错误：ptr 是指向常量的指针，不能通过它修改所指对象的值
    for (int i = 0; i < count; ++i) {
        cout << "Value: " << *ptr << ", Sum so far: " << localSum << endl;
        localSum += *ptr;
    }
    cout << "Final sum after accumulating " << count << " times: " << localSum << endl;
}

int main() {
    int value = 10;
    int count = 5;
    processValue(&value, count);
    // 尝试直接在 main 函数中修改 value，以展示保护效果
    // value = 30;  // 这行代码是合法的，因为它是在 value 的作用域内
}
```

```
Value: 10, Sum so far: 0
Value: 10, Sum so far: 10
Value: 10, Sum so far: 20
Value: 10, Sum so far: 30
Value: 10, Sum so far: 40
Final sum after accumulating 5 times: 50
```

几点要分清：

- `const int* ptr` 里的 const 修饰 `*ptr`，含义是"不能通过 `ptr` 写它所指的对象"。`ptr` 自己仍可改指向，`ptr = &other;` 合法，只有 `*ptr = ...` 被禁止。
- 传参 `processValue(&value, count)` 合法，因为实参类型是 `int*`，形参是 `const int*`。这是**增加限定**的转换，允许隐式进行，不需要把 `value` 也声明成 const。
- 反方向 `const int*` → `int*` 不允许隐式转换，因为那等于丢掉"只读"承诺；可显式用 `const_cast` 去掉限定，但若原对象本来就是 const，再经转换后的指针修改它仍是未定义行为；接口设计应尽量避免这种转换。所以"指针参数必须和实参完全同类型"是不对的：允许加 const 这类限定，只是不能随意去掉限定。
- const 管的是"通过这个指针的写操作"，不是给对象上锁。如果别处还有一个非 const 指针指向同一对象，仍然可以通过那个指针修改它。接口约束的是这条通路。

#### 例5.11 使用 const 限定引用参数，保护实参对象

```cpp
#include <iostream>
using namespace std;

// 通过引用传递整数，用 const 保护它不被修改
void processValue(const int& value) {
    cout << "Value: " << value << endl;
    // value = 20;  // 错误：value 是 const 引用，不能通过它修改值
}

void processExpression(const int& value) {
    cout << "Expression Value: " << value << endl;
}

int main() {
    const int constantValue = 10;
    processValue(constantValue);         // 传递常量
    int variableValue = 20;
    processValue(variableValue);         // 传递变量
    processExpression(5 + 3);            // 传递表达式
    int anotherVariable = 30;
    processValue(anotherVariable + 10);  // 表达式结果作为实参
}
```

```
Value: 10
Value: 20
Expression Value: 8
Value: 40
```

常引用形参能同时接受常量、变量和表达式，这是它和普通引用参数最大的区别：

- 非 const 引用形参 `int&` 只能接受同类型的**左值**（有名字、有确定存储的对象），`processValue(5 + 3)` 会编译失败，因为 `5 + 3` 是右值，不能绑定到这里的非 const 左值引用。
- `const int&` 可以绑定右值。传 `anotherVariable + 10` 时，编译器先算出 40 存进一个临时对象，再让形参绑定这个临时对象；临时对象的生存期延续到包含这次函数调用的完整表达式结束，所以函数体内读到 40 是安全的。
- 常引用既避免了复制，又在类型上保证"不改实参"。对大对象（字符串、容器、自定义类）意义明显；对 `int` 这种小对象，值传递本来也便宜，这里主要是演示规则。
- `const int&` 的 const 修饰被引用的对象，不是"引用本身不能改"——引用本来就不能改绑，这一点在上一节已经定死。

### 函数返回指针与引用

这一组页面的页眉仍印着第 3 章的"3.2.4 函数的返回类型"，例题编号也沿用了例3-12；讲的内容属于本章的指针与函数，按"返回指针"和"返回引用"两条线读即可。

返回类型写成 `int*`，函数交回一个地址值；写成 `int&`，函数交回一个对象的别名。两者都不复制被返回的对象，这是和"返回值"最根本的差别：

| 返回类型 | 返回的是什么 | 调用表达式能否作左值 | 主要风险 |
| --- | --- | --- | --- |
| `int` | 对象值的副本 | 否 | 大对象有复制开销 |
| `int*` | 地址值（指针的副本） | 解引用后可以 | 地址所指对象已销毁 |
| `int&` | 被返回对象的别名 | 可以 | 被引用对象已销毁 |

共同前提只有一条：**函数返回之后，地址所指、引用所绑定的对象必须还活着。** 形参和函数体内定义的自动变量都随函数返回销毁，它们的地址和引用一律不能返回；能安全返回的是调用方传进来的对象、静态存储期对象、动态分配的对象，以及全局对象。

#### 例3-12 返回较大值变量的指针

```cpp
#include <iostream>
using namespace std;

int * maxPoint(int * x, int * y);       // 返回 int* 类型

int main()
{
    int a, b;
    cout << "Input a, b : ";
    cin >> a >> b;
    cout << *maxPoint(&a, &b) << endl;
}

int * maxPoint(int * x, int * y)
{
    if (*x > *y) return x;
    return y;
}
```

输入 `20 10`，输出 `20`。

返回过程可以拆成三步：先对 `return x;`、`return y;` 里的地址表达式求值，得到一个地址；用这个地址初始化一个匿名的指针对象，作为返回值临时对象；回到调用点后，`*maxPoint(&a, &b)` 对这个地址解引用，读出 `a` 或 `b`。函数返回时形参 `x`、`y` 被销毁，但它们指向的 `a`、`b` 是 `main` 的局部对象，仍然存活，所以返回的地址有效。

比较的是 `*x`、`*y`，返回的是"较大值所在对象的地址"，而不是较大值本身。调用方拿到地址后既能读也能写，例如

```cpp
*maxPoint(&a, &b) = 0;   // 把较大的那个变量清零
```

会把较大的变量置 0。返回指针把"选中了哪个对象"这件事交给调用方继续使用，这是返回值版本做不到的。

**返回指针的接口约定。** 函数也可能"没有结果"，这时通常返回空指针。`NULL` 是空指针常量宏（在 `<cstddef>` 等头文件中定义，通常展开为 `0` 或 `nullptr`），和 `nullptr` 一样表示"不指向任何对象"；但空指针的位模式**不保证全零**，不要用逐字节比较或 `memset` 的方式判断，判断就写 `p == nullptr`。对空指针解引用是未定义行为，不保证一定崩溃——"这次没崩"不能说明代码写对了。

#### 反面示例：返回局部变量的地址

```cpp
#include <iostream>
using namespace std;

int * f1Warning()
{
    int temp = 100;
    return &temp;      // 错误：temp 随函数返回销毁
}

int main()
{
    cout << "temp=" << *f1Warning() << endl;
}
```

编译器给出警告 C4172：返回局部变量或临时变量的地址。`temp` 是自动变量，存储期只到函数体结束；函数一返回，这块存储就不再归 `temp` 所有，返回的地址成为**悬空指针**。随后 `*f1Warning()` 解引用悬空指针属于**未定义行为**：某次运行可能打印 100，也可能打印别的值，可能崩溃，也可能看起来一切正常。不能把某次打印 100 当成"这样写也能用"，更不能据此写出确定的输出。

#### 函数返回引用

C++ 函数返回对象引用时，不复制所引用的对象；调用表达式直接指代该对象。这里不能照搬按值返回的“匿名对象暂存结果”模型，引用本身不是对象。这句话的意思可以拆开看：`return x;` 里的 `x` 是 `int&`，函数把"`x` 所绑定的那个对象"当作返回值，调用点拿到的是同一个对象的别名，而不是它的一份拷贝。

#### 返回较大值变量的引用

```cpp
#include <iostream>
using namespace std;

int & maxRef(int &, int &);

int main()
{
    int a, b;
    cout << "Input a, b : ";
    cin >> a >> b;
    cout << maxRef(a, b) << endl;
}

int & maxRef(int & x, int & y)
{
    if (x > y) return x;
    return y;
}
```

输入 `20 10`，输出 `20`。

返回过程：先决定引用对象，`x > y` 成立就选 `a`，否则选 `b`；使调用表达式指代这个对象；回到调用点后 `cout << maxRef(a, b)` 直接读它；函数结束时撤销的是形参 `x`、`y` 这两个引用本身，`a`、`b` 不受影响。

对照三个问题：返回类型是 `int&`；结果正确，因为被引用的 `a`、`b` 是 `main` 中的对象，函数返回后仍然存在；与返回值版本的机制差别在于没有副本——如果把返回类型改成 `int`，`return x;` 会复制一份 `x` 的值，调用方拿到的是副本，改它不会影响 `a`。正因为返回的是别名，调用表达式本身是左值，可以继续被赋值：

```cpp
maxRef(a, b) = 0;   // 把较大的那个变量置 0
```

返回引用适合"把调用方的对象或容器元素暴露出去"的场景；代价是调用方必须知道这个别名指向谁，接口不能返回一个即将消失的对象。

#### 反面示例：返回局部变量的引用

```cpp
#include <iostream>
using namespace std;

int & f2Warning()
{
    int temp = 100;
    return temp;       // 错误：返回局部变量的引用
}

int main()
{
    cout << "temp=" << f2Warning() << endl;
}
```

同样触发 C4172。引用本身不延长对象的寿命：`temp` 随函数返回销毁，返回的引用绑定到一块已经失效的存储，之后对它的任何读写都是未定义行为。同理，`int& f(int x) { return x; }` 返回值形参的引用也是悬空的——形参 `x` 是函数内的局部对象，不是调用方的实参。

**返回值的存储期与释放责任。** 如果确实需要把函数内部创建的对象的地址或引用交出去，只有两类对象可以：

- **静态存储期对象**：`static int temp = 100;` 或全局对象。它们在程序运行期间一直存在，函数返回后地址、引用仍然有效，调用方不需要释放。代价是所有调用共享同一个对象：后一次调用会覆盖前一次的结果，多线程下还会互相干扰。
- **动态存储期对象**：`new int(100)` 得到的对象。它一直存在到 `delete` 为止，函数返回后地址有效；但释放责任转移给了调用方，接口必须说明"谁 new、谁 delete"，否则就是内存泄漏。

这两条是"如果一定要返回内部对象"的退路，不是对例3-12 的修正。例3-12 本身没有生命周期问题：它返回的是调用方对象的地址，不涉及函数内部的临时对象，既不需要 static，也不需要 new。为了"避免悬空"把原例改成 static 或动态分配，会改变语义，还会引入共享状态或释放责任，等于把一道正确的例题改坏。

### 课堂练习：参数传递与返回类型

#### 主观题1（10 分）

```cpp
#include <iostream>
using namespace std;

void f1(int x, int& y, int *z)
{
    x++;
    y++;
    (*z)++;
}

int main()
{
    int i = 1, j = 1, k = 1;
    f1(i, j, &k);
    cout << "i is " << i << endl;
    cout << "j is " << j << endl;
    cout << "k is " << k << endl;
}
```

```
i is 1
j is 2
k is 2
```

三个形参正好是三种方式，逐个看：`x` 是值传递，`x++` 只把副本从 1 加到 2，`main` 的 `i` 不变；`y` 是引用，绑定到 `j`，`y++` 就是 `j++`；`z` 是 `int*`，`(*z)++` 改的是 `z` 所指的 `k`。所以只有 `j`、`k` 变成 2。

括号不能省。`(*z)++` 先解引用再让对象自增；写成 `*z++` 则按 `*(z++)` 结合，自增的是指针 `z` 本身，取到的仍是 `k` 的值，但 `z` 之后已不指向 `k`。这道题考的就是"形参能改到什么"：改副本、改所指对象、改实参本身，三者不是一回事。

#### 主观题2（10 分）

```cpp
#include <iostream>
using namespace std;

void func(int &, int *, int *&);

int main()
{
    int a = 2, b = 5;
    int &c = a;
    int *p = &a, *q = &b;
    func(c, q, p);
    cout << "c=" << c << ", p=" << *p << ", *q=" << *q << endl;
}

void func(int &t1, int *t2, int *& rt)
{
    t1 = t1 * 10;
    *t2 = *t2 * 10;
    rt = &t1;
    *rt = *rt * 10;
    cout << "t1=" << t1 << ", *t2=" << *t2 << ", *rt=" << *rt << endl;
}
```

```
t1=200, *t2=50, *rt=200
c=200, p=200, *q=50
```

按绑定的对象一步步推：`t1` 引用 `a`（通过 `c`，而 `c` 又引用 `a`）；`t2` 复制 `q` 的值，指向 `b`；`rt` 是"指针的引用"，绑定到 `main` 的指针 `p` 本身。

1. `t1 = t1 * 10`：改的是 `a`，`a` 变成 20。
2. `*t2 = *t2 * 10`：`t2` 指向 `b`，`b` 变成 50。`t2` 自己按值复制，但这不影响它改所指对象。
3. `rt = &t1`：改的是 `rt` 所引用的指针，也就是 `main` 的 `p`，让 `p` 指向 `a`。`p` 原来就指向 `a`，所以数值上看不出变化，但这条语句确实作用在调用方的指针上。
4. `*rt = *rt * 10`：通过 `p` 改 `a`，`a` 从 20 变成 200。
5. 输出时 `t1` 是 `a`（200），`*t2` 是 `b`（50），`*rt` 是 `a`（200）；回到 `main`，`c` 是 `a`（200），`*p` 是 `a`（200），`*q` 是 `b`（50）。

关键是第三个形参的类型 `int*&`。如果写成 `int* rt`，`rt = &t1` 只改副本，`main` 的 `p` 不会变；写成 `int*& rt`，赋的才是调用方的指针。这与例5.9 的那条区分完全对应：`*t2 = ...` 改的是"指针所指的对象"，`rt = ...` 改的是"调用方的指针本身"。本题两件事都做了，所以要分别指认。也正因为 `p` 原本已经指向 `a`，第 3 步的赋值在数值上没有体现，不能因此认为它没有生效。

### 5.3.2 函数指针

指针可以指向变量，也可以指向函数。函数在内存里占的是一段可执行代码，同样有入口地址，于是"保存函数地址的变量"就成立。但函数和数据对象能做的事不一样：数据对象可以读、可以写，函数只能调用。函数指针这一节要打通的是"函数名—地址—类型—指针"这条链：先确认函数名就是地址，再给"这类函数"起一个类型名，最后用这个类型去声明指针、赋值、调用，乃至把函数当参数传进另一个函数。

#### 函数的地址

函数被视为存储在内存中的一段可执行代码，每个函数都有唯一的地址。对已经定义的函数，**函数名就是函数的入口地址**。因此一条调用语句可以拆成两部分：

```
函数地址（实际参数表）
```

这里的"函数地址"是一个地址表达式，可以是函数名，也可以是任何能表示函数入口地址的表达式，比如 `&simple`、`*&simple`，或者一个已经指向该函数的指针变量。

![代码对象地址与数据对象地址](/images/campus-cpp-programming/function-code-data-address.jpg)

图中代码对象地址与 `int a` 的数据对象地址落在内存的不同区域：函数体在代码区，普通变量在数据区。地址的具体数值由编译器、链接方式和运行环境决定，图中和后面程序输出里的数字只作示例，换一台机器就不同。

函数与数据对象在"地址"和"对象"这两层上的对应关系并不对称，这正是初学时最容易套错的地方：

| | 函数 `FunctionObj` | 数据 `DataObj` |
| --- | --- | --- |
| 地址 | `FunctionObj`、`&FunctionObj`、`*FunctionObj`、`*&FunctionObj` | `&DataObj` |
| 对象 | `FunctionObj()`、`&FunctionObj()`、`*FunctionObj()`、`*&FunctionObj()` | `DataObj`、`*&DataObj` |
| 访问 | 调用：地址表达式（参数表），执行代码 | 读：右值表达式；写：左值表达式；由类型解释数据 |

对数据对象，`DataObj` 是对象本身，要加 `&` 才得到地址；函数名表示函数本身，在需要函数指针的上下文会自动转换为该函数的指针；这与显式写 &函数名 得到的指针值相同，但不能说函数类型和指针类型就是同一类型。反过来，函数也没有"值"可供读写：`*&simple` 得到的仍是那个函数（一个函数指示符），所以它还能被调用，但不能被赋值。`cout << a` 输出对象的值；函数指针如何被输出则取决于适用的流插入重载，不能仅凭这张表断言会打印地址。

#### 例5.12 函数地址测试程序

用三种写法调用同一个函数，再打印函数名、`&函数名`、`*&函数名`，看它们是不是同一个地址。

```cpp
#include <iostream>
using namespace std;

void simple()
{
    cout << "This is a simple program." << endl;
}

int main()
{
    cout << "Call function:" << endl;
    simple();          // 名方式调用
    (&simple)();       // 地址方式调用
    (*&simple)();      // 间址方式调用
    cout << "Address of function:" << endl;
    cout << simple << endl;     // 函数名是地址
    cout << &simple << endl;    // 取函数地址
    cout << *&simple << endl;   // 函数地址所指对象
}
```

```
Call function:
This is a simple program.
This is a simple program.
This is a simple program.
Address of function:
00007FF60963146A
00007FF60963146A
00007FF60963146A
```

三种调用都执行了 `simple` 的函数体，三次打印的地址完全相同，说明它们走的是同一个入口。

为什么 `simple` 与 `&simple` 相等？函数名在表达式里（除作为 `&` 的操作数、`sizeof` 的操作数等少数场合外）会自动转换成"指向该函数的指针"，这叫函数到指针的标准转换；`&simple` 是直接取地址。两条路殊途同归。`*&simple` 是"函数地址所指的对象"，也就是函数本身，可它又是一个函数指示符，一旦后面跟了参数表，就再次转换成指针去调用，所以 `(*&simple)()` 合法。

三段调用可以互相替换：

```cpp
simple();
(&simple)();
(*&simple)();
```

这里有一个只在特定编译器下成立的细节。原件中的地址输出仅保留为环境示例，不能仅凭截图确认编译器采用了哪种扩展；标准 C++ 并没有函数指针到 `void*` 的隐式转换，严格按标准，`cout << simple` 会退到 `operator<<(bool)` 而打印 `1`。地址那一行能否打印出来、打印成什么样子，都随环境变化，不能当成语言的固定结论。

#### 函数的类型

函数的类型指函数的接口，包括参数定义和返回类型。下面三个函数名字不同、实现不同，类型却相同：

```cpp
double max(double, double);
double min(double, double);
double average(double, double);
```

它们的类型都记作 `double(double, double)`：返回 `double`，接受两个 `double` 参数。参数名不参与类型，参数的个数与类型序列、返回类型才决定类型。

要给这种类型起名字，用 `typedef`：

```cpp
typedef double functionType(double, double);
```

形式是 `typedef 返回类型 函数类型名(形式参数表);`。`typedef` 是关键字，`double` 是函数返回值类型，`functionType` 是用户定义的标识符，括号里是参数表。它与 `typedef int integer;`（让 `integer` 成为 `int` 的同义词）是同一套机制，只不过这次被命名的类型是"函数类型"：

```cpp
typedef int integer;                              // integer 是 int 的同义词
typedef double real;                              // real 是 double 的同义词
typedef double functionType(double, double);      // functionType 是 double(double,double) 的同义词
```

#### 函数指针的定义

有了函数类型，指向这类函数的指针就是"函数类型 + `*`"：

```cpp
functionType *fp1, *fp2;
```

不用 `typedef` 时，必须把 `*` 和指针名用括号捆在一起：

```cpp
double (*fp)(double, double);
```

括号不能省。写成

```cpp
double *fp(double, double);
```

含义完全不同：`fp` 是一个函数，接受两个 `double`，返回 `double*`——这是"返回指针的函数"，不是函数指针。原因在声明符的结合顺序：`()` 的优先级高于 `*`，`*fp(double, double)` 先读成"`fp` 是函数，返回 `double*`"；加上括号后 `(*fp)` 先结合成"`fp` 是指针"，再往外读"指向 `double(double,double)` 的函数"。读复杂声明的口诀是从标识符出发，先向右看到 `)`，再折回向左，`*fp` 被括号保护住，就不会被参数表抢走。

多个指针变量要逐个写 `*`：

```cpp
functionType *fp1, *fp2;     // fp1、fp2 都是函数指针

functionType *fa, fa2;       // 不是两个指针：fa2 前面没有 *
```

后一行里 `fa2` 前面没有 `*`，`functionType fa2;` 单独看就是一条函数声明，编译器会认为这里声明了一个返回 `double`、接受两个 `double` 的函数 `fa2`。等到给 `fa2` 赋值时才报错，而错误位置离真正的笔误已经很远。

#### 定义函数指针类型

也可以直接把"函数指针"整体定义成一个类型：

```cpp
typedef double (*pType)(double, double);
```

此后 `pType` 就是"指向 `double(double,double)` 的指针"这个类型的名字，声明变量时不必再写 `*`：

```cpp
pType pf1, pf2;    // 定义了两个 pType 类型的指针变量 pf1 和 pf2
pf1 = max;         // pf1 指向函数 max
pf2 = min;         // pf2 指向函数 min
```

等价的写法是先定义函数类型再取指针：`typedef functionType *pType;`。两种 `typedef` 的差别只在"名字代表什么"：`functionType` 代表函数类型，声明变量还要加 `*`；`pType` 代表指针类型，声明变量不加 `*`。混用这两个名字是后面选择题的主要失分点。

#### 初始化与两种调用

函数指针的初始化就是让"函数的地址"进入这个变量：

```cpp
double (*pf)(double, double) = max;   // 定义时初始化
pf = max;                             // 赋值：函数名自动转成地址
pf = &max;                            // 赋值：显式取地址，与上一行等价
```

这里和普通指针不同：`int *p = a;` 是错的，必须写 `&a`；而函数名本身就会转换成指针，所以 `max` 和 `&max` 都能用。

调用有两种写法，效果相同：

```cpp
double r1 = pf(3, 4);        // 直接用指针调用
double r2 = (*pf)(3, 4);     // 先解引用再调用
```

`*pf` 得到函数指示符，作为调用表达式的操作数时又自动转回指针，绕了一圈仍回到 `pf` 所存的地址。所以两种写法不必纠结，但要能读懂别人写的 `(*pf)(...)`。

#### 例5.13 用函数指针调用不同函数

把三个运算函数赋给同一个函数指针变量，观察同一句调用表达式如何算出不同结果。

```cpp
#include <iostream>
using namespace std;

int add(int a, int b) {
    return a + b;
}
int substract(int a, int b) {
    return a - b;
}
int multiply(int a, int b) {
    return a * b;
}
typedef int functionType(int, int);   // 定义函数类型
functionType *operatorp;              // 函数指针声明

int main()
{
    int num1 = 10, num2 = 5;
    operatorp = add;      // 函数指针指向add函数
    cout << "Add: " << operatorp(num1, num2) << endl;         // 使用函数指针调用add函数
    operatorp = substract; // 函数指针指向substract函数
    cout << "Substract: " << operatorp(num1, num2) << endl;   // 使用函数指针调用substract函数
    operatorp = multiply;  // 函数指针指向multiply函数
    cout << "Multiply: " << operatorp(num1, num2) << endl;    // 使用函数指针调用multiply函数
}
```

```
Add: 15
Substract: 5
Multiply: 50
```

`typedef int functionType(int, int);` 定义函数类型 `int(int,int)`，紧接着用"函数类型 + `*`"声明 `operatorp`，它等价于直接写

```cpp
int (*operatorp)(int, int);
```

`operatorp` 声明在函数外，具有静态存储期，未显式初始化时被置为空指针；在 `main` 里第一次赋值之前调用它属于未定义行为，通常直接崩溃。

三次改变 `operatorp` 的指向，`operatorp(num1, num2)` 这句代码一个字没改，执行的函数却换了三次。这正是函数指针的用处：把"调用哪个函数"从编译期写死改成运行期可换，省掉一长串 `if`／`switch` 分支，新增一种运算也不必改动调用处。

把 `operatorp(num1, num2)` 换成 `(*operatorp)(num1, num2)` 完全等价，理由与例5.12 的 `(*&simple)()` 相同。

但换成 `(&operatorp)(num1, num2)` 就错了，且错得很隐蔽。`operatorp` 是一个指针变量，它自己也是数据对象，在内存里占一块空间，`&operatorp` 取的是这块空间的地址，类型是 `int(**)(int,int)`——指向"函数指针"的指针。`int**` 不是函数指针，后面不能跟调用运算符，编译器会直接报错；即便强行把它转成函数指针，跳转到的也是存放指针的那几个字节，不是代码入口。

对比 `sum` 这样的函数名：`sum` 是函数的直接地址，`&sum` 与 `sum` 相等，所以 `(&sum)(a, b)` 合法。两者的分野就是"函数没有存放自己的变量，而函数指针变量有"。真要沿着二级指针调用，得再解引用一次：写成 `(**pp)(a, b)`（`pp` 为 `int(**)(int,int)` 时）。

#### 例5.14 使用函数指针参数调用函数

把"要做哪种运算"作为参数交给一个通用函数，让它在内部决定调用谁。

```cpp
#include <iostream>
using namespace std;

int add(int a, int b) {
    return a + b;
}
int substract(int a, int b) {
    return a - b;
}
int multiply(int a, int b) {
    return a * b;
}
typedef int functionType(int, int);   // 定义函数类型

int operate(int a, int b, functionType *operatorp)  // 定义一个函数，使用函数指针operatorp作为参数
{
    return operatorp(a, b);
}

int main()
{
    int num1 = 10, num2 = 5;
    cout << "Add: " << operate(num1, num2, add) << endl;            // 函数指针调用add函数
    cout << "Substract: " << operate(num1, num2, substract) << endl; // 函数指针调用substract函数
    cout << "Multiply: " << operate(num1, num2, multiply) << endl;   // 函数指针调用multiply函数
}
```

```
Add: 15
Substract: 5
Multiply: 50
```

`operate` 的函数体只有一行 `return operatorp(a, b);`，它不知道、也不需要知道 `operatorp` 指向的是加、减还是乘。运算由调用方通过第三个实参指定：传 `add`，函数名转成地址去初始化形参；传 `substract`、`multiply` 同理。这种"把函数当数据传进去、由被调函数在内部回调"的用法叫回调（callback）。

形参写成 `functionType *operatorp`，也可以直接写

```cpp
int operate(int a, int b, int (*operatorp)(int, int))
```

两者等价。形参类型精确到"返回 `int`、接受两个 `int`"，所以传入的函数签名必须匹配：传一个 `double(double,double)` 的函数进来，编译器会拒绝把它的地址转成 `int(*)(int,int)`。这层类型检查是函数指针比 `void*` 安全的地方。

和例5.13 相比，这里的切换发生在调用方：`operate` 只写一次，运算种类随实参变化，函数内部连一个分支都不用写。若以后要加除法，只需再写一个 `divide`，`operate` 一行不改。

#### 函数指针与"返回指针的函数"

这两种东西的写法只差一对括号，含义却完全不同：

| 写法 | 读法 | 类型 |
| --- | --- | --- |
| `int* f(int);` | `f` 是函数，参数 `int`，返回 `int*` | 返回指针的函数 |
| `int (*p)(int);` | `p` 是指针，指向 `int(int)` 的函数 | 函数指针 |
| `int (*f(int))(int);` | `f` 是函数，参数 `int`，返回一个函数指针 | 返回函数指针的函数 |

判断方法只有一条：看 `*` 和名字之间有没有被括号包住。包住了，名字先是指针；没包住，名字先是函数。返回指针的写法和"返回局部变量地址"的陷阱前文已经讲过，这里只强调区别，不再重复。

#### 函数指针不能当对象指针用

`void*` 是"指向未知类型对象的指针"，它只装对象地址。C++ 把指针分成对象指针、函数指针、成员指针几类，它们之间不是随便能转的：

- `T*` 与 `void*`：对象指针转 `void*` 是隐式转换，`void*` 转回 `T*` 需要显式转换。
- 函数指针转 `void*`：标准没有这条隐式转换，`void* p = f;` 直接编译失败。`reinterpret_cast<void*>(f)` 是"条件支持"的转换，实现可以拒绝；POSIX 一类平台保证它可用（`dlsym` 就依赖这一点），但这属于平台保证，不是 C++ 语言保证。
- 成员函数指针：连与普通函数指针互转都不允许。

限制的根源在存储布局：函数代码与数据对象位于不同区域，地址的表示宽度也可能不同。标准只保证"函数指针能存下函数地址、能比较、能解引用调用"，其余一概不管。所以 `sizeof` 一个函数指针，也不保证等于 `sizeof(void*)`。

同一件事还有另一面：例5.12 之所以能把函数地址 `cout` 出来，靠的是编译器把函数指针转成 `void*` 的扩展。换一个严格实现的编译器，同一行会打印 `1`。看到"地址输出"时先分清哪部分是语言规则、哪部分是环境行为。

#### 单选题 1

有以下语句，则以下正确的赋值语句是（　）。

```cpp
typedef double funt(double);
funt fun13, *pfun;
```

A. `pfun=fun13;`
B. `*pfun=fun13;`
C. `pfun=funt;`
D. `*pfun=funt;`

**答案：A**（补充解答）

`typedef double funt(double);` 让 `funt` 成为函数类型 `double(double)` 的名字，**不是**指针类型。接着 `funt fun13, *pfun;` 声明了两样东西：`fun13` 是一个函数（返回值 `double`，参数一个 `double`），`pfun` 是指向 `funt` 型函数的指针，类型 `double(*)(double)`。

逐个看：

- A：`fun13` 是函数名，赋值时自动转成 `double(*)(double)`，与 `pfun` 类型一致，正确。
- B：`*pfun` 解引用后是函数，函数不能被赋值（不是可修改的左值），错误。
- C：`funt` 是类型名，类型名不能出现在表达式的右值位置，错误。
- D：右边同样是类型名，且左边仍是函数，两处都错。

这道题的关口在 `typedef` 到底命名了什么。`typedef double funt(double);` 里的 `funt` 后面直接跟参数表，没有 `*`，所以它命名的是函数类型；要命名函数指针类型，必须写成 `typedef double (*funt)(double);`，那时 `funt fun13, *pfun;` 中的 `fun13` 才会是一个函数指针变量。

#### 单选题 2

有以下语句，则以下**不正确**的赋值语句是（　）。

```cpp
typedef double funt(double);
funt fun13, fun14, *pfun;
```

A. `pfun=fun13;`
B. `pfun=&fun14;`
C. `pfun=*fun13;`
D. `fun13=fun14;`

**答案：D**（补充解答）

- A：`fun13` 自动转成函数指针，类型匹配，正确。
- B：`&fun14` 是函数地址，在此赋值上下文中，显式取地址和函数名自动转为指针的结果同值同类型，正确。
- C：`*fun13` 先把 `fun13` 转成指针，再解引用回到函数本身，得到一个函数指示符；把它赋给 `pfun` 时又转成指针，绕一圈仍等于 `fun13` 的地址，合法。
- D：`fun13`、`fun14` 都是函数，赋值要求左边是可修改的左值，函数不满足，编译错误。

本题问"不正确"，选 D。C 看起来最可疑，实际是合法的，考的就是"函数在这类需要函数指针的赋值上下文中会自动转成指针"这条规则：`*fun13` 里的 `fun13` 先转指针，`*` 之后得到的函数指示符再转指针，两次转换互相抵消。

#### 主观题

```cpp
#include <iostream>
using namespace std;

int f1(int a, int b)
{ return a + b; }
int f2(int a, int b)
{ return a - b; }
int f3(int (*t)(int, int), int a, int b)
{ return (*t)(a, b); }

int main()
{
    int (*p)(int, int);
    p = f1;
    cout << f3(p, 4, 8) << endl;
    p = f2;
    cout << f3(p, 8, 4) << endl;
}
```

**输出**（补充解答）

```
12
4
```

`f3` 有三个形参：第一个是函数指针 `int(*t)(int,int)`（这里没用 `typedef`，直接写完整声明），后两个是普通 `int`。函数体 `(*t)(a, b)` 与 `t(a, b)` 等价。

第一次：`p = f1`，`f3(p, 4, 8)` 中 `a` 得 4、`b` 得 8，执行 `f1(4, 8)`，返回 `4 + 8 = 12`。

第二次：`p = f2`，`f3(p, 8, 4)` 中 `a` 得 8、`b` 得 4，执行 `f2(8, 4)`，返回 `8 - 4 = 4`。

本题的坑在后一次调用的实参顺序：`8` 和 `4` 被交换了位置。减法不满足交换律，若顺手按 `f3(p, 4, 8)` 的顺序读，就会算成 `4 - 8 = -4`。函数指针只负责"调用谁"，实参按位置原样传给目标函数，谁在前谁就绑定 `a`。

`f3` 的第一个形参也可以借助 `typedef` 写得短一些：先 `typedef int fun(int, int);`，形参写成 `fun *t`。两种写法的类型完全相同，只是可读性不同。

## 5.4 数组

数组把一批同类型元素按顺序放在一起。一维数组只有一行元素；二维数组可以看成一维数组的数组。无论几维，元素在内存中连续存放，访问方式只有两条：下标和指针。两条路本质相同——`a[i]` 就是 `*(a+i)`——但指针写法多出“指针算术”和“类型步长”两个问题，也正是本节最容易错的地方。

### 5.4.1 一维数组

#### 一维数组的定义

数组是由一定数目的同类型元素顺序排列而成的数据类型。一个数组在内存中占据一片连续的存储区域，数组名代表这块存储空间的首地址；在表达式中它会转换成指向首元素的指针，具体规则见后文。

定义格式：

```cpp
类型 标识符[表达式];
```

- `类型` 是数组元素的类型，可以是内置类型（`int`、`double`、`char` 等），也可以是用户定义的类类型。
- `标识符` 是数组名。
- `表达式` 是数组元素个数，必须是**常整型表达式**，即编译期就能求出整数值的常量表达式，且值大于 0。数组长度在定义时确定，运行期间不能改变。
- 数组的类型由“元素类型 + 长度”共同决定。`int[10]` 和 `int[20]` 是不同类型；元素类型不同更不必说。

若数组有 $n$ 个元素，下标范围是 $0 \sim n-1$，不存在 `a[n]` 这个元素。标准 C++ 不允许变长数组；长度不能用普通变量或运行时函数返回值。

例如：

```cpp
const int N = 20;
const int M = 40;
const int MaxStringSize = 80;
const int MaxListSize = 1000;

int A[10];                     // 10 个 int，下标 0～9
char B[MaxStringSize];         // 80 个 char，下标 0～79
double C[M * N];               // 800 个 double，下标 0～799
int Values[MaxListSize];       // 1000 个 int，下标 0～999
```

`M * N` 是常量表达式，所以可以做长度；`MaxStringSize`、`MaxListSize` 是 `const int`，也可以在常量表达式中使用。

长度是否合法，关键看“是不是编译期常量”，而不是看“有没有用 `const`”：

```cpp
const int max_size = 512, min_size = 20;   // 定义常量 max_size 和 min_size
int arr_size = 30;                         // 定义变量 arr_size
const int brr_size = get_size();           // 值要运行时由函数返回

char in_buffer[max_size];        // 合法：max_size 为常量
float out_buffer[min_size + 1];  // 合法：常量表达式
double salaries[arr_size];       // 非法：arr_size 不是常量
int test_values[brr_size];       // 非法：brr_size 的值运行时才给出
int buf_size[get_size()];        // 非法：不是常量表达式
```

`const int brr_size = get_size();` 虽然变量本身只读，但初值来自普通函数调用，编译期算不出来，因此不是常量表达式；用它做数组长度不合法。`arr_size` 是普通变量，更不行。部分编译器把变长数组当扩展支持，但标准 C++ 不保证，写课程代码不要依赖。

#### 一维数组的初始化

定义数组时可以用花括号给出初始值：

```cpp
int arr_1[3] = {0, 1, 2};        // 三个元素分别初始化为 0、1 和 2
int arr_2[3] = {2};              // 第一个元素初始化为 2，剩余元素初始化为 0
int arr_3[] = {1, 2, 3};         // 合法：编译器根据列出的元素个数确定数组长度为 3
int arr_4[10] = {0};             // 合法：将全部元素初始化为 0
int arr_5[3] = {1, 2, 3, 4};     // 非法：初始化元素个数超出数组长度
static int arr_8[6];             // 合法：自动把静态数组各元素值初始化为 0
const int arr_9[5] = {2, 4, 6, 8, 10};  // 数组元素约束为只读
```

几条规则：

- 初始值少于长度时，后面的元素按零初始化。`arr_2[3] = {2}` 得到 `{2, 0, 0}`；`arr_4[10] = {0}` 不是“只有第一个元素是 0”，而是第一个显式写 0，其余九个也零初始化，结果全 0。
- 方括号里不写长度、只写初始化列表时，长度由列表元素个数推出；`arr_3` 的长度是 3。
- 初始值多于长度是编译错误，`arr_5` 不合法。
- 静态存储期数组（如 `static int arr_8[6];`）在程序启动时零初始化。**局部非静态数组** `int a[5];` 不初始化，元素值不确定；在赋值前读取（包括 `cout`）是未定义行为，不能假定它是 0，也不能给出确定输出。
- `const` 数组的元素只读，`arr_9[0] = 1;` 这类写入会编译失败。

数组不能整体赋值，也不能用另一个数组初始化；复制要逐元素进行，见例5.16。

#### 以下标方式访问数组

访问格式：

```cpp
数组名[表达式]
```

方括号里的表达式是整型表达式，表示相对数组首地址的**元素偏移量**，不是字节偏移量。`a[0]` 是第一个元素，`a[1]` 是第二个，依此类推。`a[i]` 是一个左值：既能读，也能写（元素本身为 `const` 时只读）。

C++ 不检查下标是否越界。`a[-1]`、`a[10]`（对 `int a[10]`）都能通过编译，但访问了数组以外的内存，属于未定义行为，可能崩溃、可能改坏别的变量、也可能“看起来正常”；**不能根据某次运行给出确定结果**，更不能把它当成合法用法。

#### 例5.15 用下标运算符访问一维数组

```cpp
#include <iostream>
using namespace std;

int main()
{
    const int array_size = 10;
    int ia[array_size];
    for (int i = 0; i < array_size; i++)
    {
        ia[i] = i;
        cout << ia[i] << " ";
    }
}
```

运行结果：

```
0 1 2 3 4 5 6 7 8 9
```

循环变量 `i` 同时充当两个角色：写 `ia[i] = i` 时是下标，读 `ia[i]` 时也是下标。循环从 0 到 9，恰好覆盖 10 个元素；每个元素先写后读，所以不会读到未初始化的值。`array_size` 是 `const int` 且初值为字面量，可以做数组长度。

如果把循环条件写成 `i <= array_size`，就会访问 `ia[10]`，越界，结果不可预期。

#### 例5.16 数组的复制

```cpp
#include <iostream>
using namespace std;

int main()
{
    int arr1[5] = {1, 2, 3, 4, 5};
    int arr2[5];
    // arr2 = arr1;   // 非法：不能将一个数组直接赋值给另一个数组
    for (int i = 0; i < 5; ++i)   // 使用循环复制初始化数组
    {
        arr2[i] = arr1[i];
    }
    for (int i = 0; i < 5; ++i)
    {
        cout << "arr2[" << i << "]: " << arr2[i] << " ";
    }
}
```

运行结果：

```
arr2[0]: 1 arr2[1]: 2 arr2[2]: 3 arr2[3]: 4 arr2[4]: 5
```

数组不能用另一个数组初始化，也不能直接赋值：

```cpp
int arr2[5] = arr1;   // 非法：不能用另一个数组初始化
arr2 = arr1;          // 非法：不能把数组整体赋给另一个数组
```

原因有两层：数组类型本身没有整体赋值；数组名在表达式中转换成指向首元素的指针，但 `arr2` 不是可赋值的指针变量，`arr2 = arr1` 既不是“复制元素”，也不是合法的指针赋值。正确做法是用循环逐个元素复制，如本例。

`arr1` 和 `arr2` 长度、类型都相同也不行；数组之间没有“值语义”的整体拷贝。

#### 以指针方式访问数组

数组名在大多数表达式里会转换成指向首元素的指针。数组名常被叫作“隐含意义的常指针（直接地址）”，意思是它在表达式里表现为首元素地址；**它不是指针变量**，不能赋值、不能自增，`sizeof` 也不按指针计算。它的关联类型是数组元素的类型：`int a[10]` 的数组名转换成 `int*`，`double d[5]` 转换成 `double*`，`char s[80]` 转换成 `char*`。

对

```cpp
int a[10] = {1, 3, 5, 7, 9};
```

有：

```cpp
a == &a[0];       a + 1 == &a[1];       a + i == &a[i];
*a == a[0];       *(a + 1) == a[1];     *(a + i) == a[i];
```

`a+i` 不是“地址加 $i$ 个字节”，而是加 $i$ 个**元素**。若 `int` 占 4 字节，`a` 的值是 `0x0065FDE4`，则 `a+1` 是 `0x0065FDE8`，`a+2` 是 `0x0065FDEC`；每加 1 前进 `sizeof(int)` 字节。一般地，`a+i` 的字节地址是 `a` 的地址加上 $i \times \text{sizeof(int)}$。具体地址值由运行环境决定，不必背，但“按元素步进”这条规则必须记住。

![数组名与首元素地址、元素步进的对应关系；a+i 按元素前进，每个 int 占 4 字节](/images/campus-cpp-programming/array-pointer-address.jpg)

**数组名到首元素指针的转换，适用场景与例外。** 在赋值给同类型指针、传给指针形参、参与 `+`/`-`/下标运算、与同数组指针比较、按地址输出等场景中，数组名转换成首元素指针。以下场景**不发生**这种转换，数组类型保留：

- `sizeof(a)`：得到整个数组的字节数，不是指针大小。
- `&a`：得到“整个数组的地址”，类型是 `int (*)[10]`；值与 `a` 相同，但类型不同，`&a + 1` 跳过整个数组。
- 把数组绑定到数组引用，如 `int (&r)[10] = a;`。
- `decltype(a)`：得到数组类型 `int[10]`，不是 `int*`。

**数组名不是可赋值的普通指针变量。** 下面都非法：

```cpp
int a[10], b[10];
int* p = a;
a = p;      // 非法：数组名不是指针变量，不能赋值
a++;        // 非法：数组名不能自增
p = b;      // 合法：p 是指针变量，可以改指向
```

`a` 是数组名，代表整个数组对象；转换成指针后得到的是右值，不能作为赋值目标。`p` 是指针变量，本身有存储空间，可以重新赋值。

**`sizeof` 数组与 `sizeof` 指针不同。** 例如：

```cpp
int a[10];
int* p = a;
cout << sizeof(a) << " " << sizeof(p);
```

`sizeof(a)` 等于 `10 * sizeof(int)`（常见 32 位/64 位平台上为 40），`sizeof(p)` 等于 `sizeof(int*)`（常见 64 位平台为 8，32 位平台为 4）。标准只保证前者是 10 个 `int` 的大小、后者是一个指针的大小，具体字节数随平台和编译器变化，不能写死。也正因如此，`sizeof(a) / sizeof(a[0])` 能在数组本体所在的范围内求出元素个数；一旦数组名转换成指针（例如传进函数后），这个写法就失效。

**指针算术与比较的有效范围。** 指针运算只在同一数组（或同一块连续对象）内有意义：

- `p + n`、`p - n`：结果必须落在 `[a, a+n]` 内；`a+n` 是“一过尾”位置，可以形成、可以比较，但**不能解引用**。
- `p - q`：两个指针指向同一数组时，结果是两者之间的元素个数，类型为 `ptrdiff_t`，不是字节差。
- `p++`、`p--`、`p += n`：按元素移动；移动后仍须落在合法范围。
- `p < q`、`p > q` 等关系比较：只有指向同一数组（或一过尾）时才有确定意义；指向不同数组或无关对象时，关系比较没有可依赖的结果。
- 解引用只允许 `a[0]` 到 `a[n-1]`。解引用一过尾指针、越界指针，或对越界位置做算术，都是未定义行为，不能给出确定输出。

几条示例语句（逐条独立看；原题两条都写 `ip2`，放在同一作用域会重复定义，这里把后一条改为 `ip3`，只比较语义）：

```cpp
int arr1[] = {0, 2, 4, 6, 8};
int* ip = arr1;          // ip 指向 arr1[0]
ip = &arr1[4];           // ip 指向 arr1 的最后一个元素
ip = arr1;               // 合法：ip 重新指向 arr1[0]
int* ip2 = ip + 4;       // 合法：ip2 指向 arr1[4]
int* ip3 = arr1 + 10;    // 非法：越过数组允许的范围，arr1+10 不是有效地址
```

`arr1` 只有 5 个元素，下标 0～4，一过尾位置是 `arr1+5`；`arr1+10` 已远超这个范围。原题注释写“数组的长度只有 4”，按上下文应理解为“最大下标只有 4”（元素仍是 5 个）。这类越界指针即使能算出一个数值，也不能解引用，标准不保证其行为。

#### 例5.17 用不同的方式访问数组

```cpp
#include <iostream>
using namespace std;

int main()
{
    int arr[] = {10, 20, 30, 40, 50};
    int* ptr = arr;   // 指针指向数组的首元素 arr[0]
    for (int i = 0; i < 5; ++i, ptr++) {
        cout << "Element " << i << ": " << *ptr << " ";   // 使用指针的间址方式遍历数组
    }
    cout << endl;

    ptr = &arr[0];   // 指针重新指向数组的首元素
    for (int i = 0; i < 5; ++i) {
        cout << "Element " << i << ": " << ptr[i] << " "; // 使用指针的下标方式访问数组
    }
    cout << endl;

    for (int i = 0; i < 5; ++i) {
        cout << "Element " << i << ": " << *(ptr + i) << endl; // 使用指针的间址方式访问数组
    }
    cout << endl;
}
```

运行结果（前三组分别对应三个循环；第一、二组用空格分隔，循环结束才换行，原输出窗口较窄时会显示成多行）：

```
Element 0: 10 Element 1: 20 Element 2: 30 Element 3: 40 Element 4: 50
Element 0: 10 Element 1: 20 Element 2: 30 Element 3: 40 Element 4: 50
Element 0: 10
Element 1: 20
Element 2: 30
Element 3: 40
Element 4: 50
```

三个循环遍历同一数组，写法不同：

1. `*ptr` 取当前元素，`ptr++` 在每轮循环末尾把指针移到下一个元素。循环结束时 `ptr == arr + 5`，是一过尾指针；它只用于结束循环，没有被解引用。
2. `ptr` 重新置为 `&arr[0]`，用 `ptr[i]` 访问。指针变量也可以下标，`ptr[i]` 等价于 `*(ptr + i)`；这里 `ptr` 没有被移动。
3. `*(ptr + i)` 直接按偏移取元素，`ptr` 本身始终指向首元素。它与 `ptr[i]` 完全等价。

三种写法结果相同。区别在于：`ptr++` 会改变指针本身，`*(ptr + i)` 和 `ptr[i]` 不改变；用 `ptr++` 遍历后如果想重新从头访问，必须把指针重置，否则它已经在一过尾位置。

#### 课堂练习（下标与指针）

**练习1（单选）** 已知 `int a[10] = {0,1,2,3,4,5,6,7,8,9}, *p = a;` 以下不能表示数组 `a` 中元素的表达式是（ ）。

A. `*a`　B. `*p`　C. `a`　D. `a[p-a]`

**答案：C。** `*a` 是 `a[0]`，`*p` 也是 `a[0]`，`a[p-a]` 中 `p-a` 为 0，仍是 `a[0]`，三者都是元素。`a` 是数组名，在表达式中转换成首元素地址，类型为 `int*`，不是元素值。本题在原题中标记的选项是 D，但 D 确实表示 `a[0]`；按 C++ 语义应选 C。这里保留原题标记作为疑点，建议核对题干或选项是否抄写有误。

**练习2（单选）** 已知 `int a[] = {0,2,4,6,8,10}, *p = a + 1;` 其值等于 0 的表达式是（ ）。

A. `*(p++)`　B. `*(++p)`　C. `*(p--)`　D. `*(--p)`

**答案：D。** 初始 `p` 指向 `a[1]`（值为 2）。逐项看：A 先取 `*p` 得 2，再让 `p` 指向 `a[2]`；B 先把 `p` 移到 `a[2]`，取值得 4；C 先取 `*p` 得 2，再让 `p` 回到 `a[0]`；D 先把 `p` 移到 `a[0]`，取值得 0。只有 D 的表达式值是 0。

**练习3（辨析）** `*p++` 与 `*(p++)`、`*++p` 与 `*(++p)`、`(*p)++` 与 `++(*p)` 有什么区别？

- `*p++` 和 `*(p++)` 是同一件事：后缀 `++` 的优先级高于一元 `*`，所以先取 `p` 的旧值解引用，再让 `p` 前进一个元素。表达式的值是移动前 `*p` 的值，副作用是 `p` 改变。
- `*++p` 和 `*(++p)` 也是同一件事：前缀 `++` 先把 `p` 前进一个元素，再解引用新位置。表达式的值是移动后 `*p` 的值，副作用是 `p` 改变。
- `(*p)++` 和 `++(*p)` 都改变 `*p` 这个元素，不改变 `p`。区别在表达式值：`(*p)++` 的值是元素自增前的旧值，`++(*p)` 的值是自增后的新值。

记忆时先看 `++` 作用在谁身上：作用在 `p` 上就移动指针，作用在 `*p` 上就改元素；再看前缀/后缀决定“先变后用”还是“先用后变”。

**练习4（主观题）** 写出下列程序的运行结果：

```cpp
#include <iostream>
using namespace std;

int main()
{
    int a[9] = {1, 2, 3, 4, 5, 6, 7, 8, 9};
    int* p = a, sum = 0;
    for (; p < a + 9; p++)
        if (*p % 2 == 0)
            sum += *p;
    cout << "sum = " << sum << endl;
}
```

**答案：**

```
sum = 20
```

`p` 从 `a` 开始，依次指向 `a[0]` 到 `a[8]`；`p < a + 9` 是同一数组内的指针比较，`a+9` 是一过尾位置。循环筛出偶数 2、4、6、8 并累加，和为 20。循环结束时 `p == a + 9`，指针值合法，但没有再解引用它。

#### 指针数组

指针数组是“元素为指针”的数组。说明形式为：

```cpp
类型 *标识符[表达式];
```

例如：

```cpp
int* pi[3];       // 数组元素是关联类型为 int 的指针
double* pf[5];    // 数组元素是关联类型为 double 的指针
char* ps[7];      // 数组元素是关联类型为 char 的指针
```

`int* pi[3]` 要读成“`pi` 是含 3 个元素的数组，每个元素是 `int*`”，不能读成“指向数组的指针”。原因是 `[]` 的优先级高于 `*`：`pi` 先与 `[3]` 结合成数组，`*` 再说明元素类型。

这一点与“数组指针”正好相反：`int (*p)[3]` 是**数组指针**，它本身只是一个指针，指向一个含 3 个 `int` 的数组。两者的声明只差一对括号，含义却完全不同：

| 声明 | 读法 | 关键差别 |
| --- | --- | --- |
| `int* p[3];` | 数组 `p`，3 个元素，每个是 `int*` | 元素是指针；`sizeof(p)` 为 3 个指针大小 |
| `int (*p)[3];` | 指针 `p`，指向一个 `int[3]` | 只有一个指针；`p+1` 跳过整个 `int[3]` |
| `int a[3][4];` | 二维数组 | `a[i]` 是一行 `int[4]`；`a+1` 跳过一行 |

指针数组的元素本身是连续的指针对象，但它们指向的对象不必连续，甚至可以是互不相干的变量。`p[i]` 是第 `i` 个指针元素；`*p[i]` 或 `*(p[i])` 才是它指向的对象。注意 `*p[i]` 与 `(*p)[i]` 含义不同：前者先取第 `i` 个指针元素再解引用，后者先解引用第一个指针元素，再对它所指向的对象下标。

`sizeof` 也要分清：`int* p[3]` 的 `sizeof(p)` 是 3 个指针的大小；`int (*p)[3]` 的 `sizeof(p)` 只是一个指针的大小；`sizeof(*p)` 才是 `int[3]` 的大小。

#### 例5.18 测试指向基本类型的指针数组

```cpp
#include <iostream>
using namespace std;

int main()
{
    int* ptrArray[5];
    int a = 10;
    int b = 20;
    int c = 30;
    int d = 40;
    int e = 50;
    ptrArray[0] = &a;
    ptrArray[1] = &b;
    ptrArray[2] = &c;
    ptrArray[3] = &d;
    ptrArray[4] = &e;
    for (int i = 0; i < 5; ++i) {
        cout << "Value at ptrArray[" << i << "]: " << *ptrArray[i] << endl;
    }
}
```

运行结果：

```
Value at ptrArray[0]: 10
Value at ptrArray[1]: 20
Value at ptrArray[2]: 30
Value at ptrArray[3]: 40
Value at ptrArray[4]: 50
```

`ptrArray` 是含 5 个 `int*` 元素的数组。`ptrArray[0] = &a;` 把整型变量 `a` 的地址存进第 0 个元素；`ptrArray[i]` 本身是指针，`*ptrArray[i]` 才访问它指向的整数。五个被指向的变量 `a`～`e` 是彼此独立的标量，不要求相邻；指针数组只保存它们的地址，不复制它们的值。这样做的用处是把分散的变量地址集中到一个数组里，之后可以用统一的下标循环访问，而不必为每个变量写一条输出语句。

注意 `int* ptrArray[5];` 定义后，5 个元素本身未初始化；在给它们赋值之前读取 `ptrArray[i]` 或 `*ptrArray[i]` 是未定义行为。本例把 5 个元素全部赋值后才进入循环，所以安全。

#### 例5.19 利用指针数组管理数组的测试程序

```cpp
#include <iostream>
using namespace std;

int main()
{
    int* ptrArray[3];
    int arr1[3] = {1, 2, 3};
    int arr2[3] = {4, 5, 6};
    int arr3[3] = {7, 8, 9};
    ptrArray[0] = arr1;
    ptrArray[1] = arr2;
    ptrArray[2] = arr3;
    for (int i = 0; i < 3; ++i) {
        cout << "Array " << i + 1 << ": ";
        for (int j = 0; j < 3; ++j) {
            cout << *(ptrArray[i] + j) << " ";
        }
        cout << endl;
    }
}
```

运行结果：

```
Array 1: 1 2 3
Array 2: 4 5 6
Array 3: 7 8 9
```

`ptrArray` 是含 3 个 `int*` 元素的数组。`ptrArray[0] = arr1;` 利用数组名到首元素指针的转换，把 `arr1[0]` 的地址存进第 0 个元素；`ptrArray[1]`、`ptrArray[2]` 分别指向 `arr2`、`arr3` 的首元素。于是 `ptrArray[i]` 是 `int*`，`ptrArray[i] + j` 按 `j` 个 `int` 前进，`*(ptrArray[i] + j)` 就是 `arr_i[j]`。

![指针数组的每个元素存放一个数组首地址；元素类型是 int*，被指向的三个数组各自连续](/images/campus-cpp-programming/pointer-array-of-arrays.jpg)

这里 `ptrArray` 自己的三个元素是连续的指针对象，但 `arr1`、`arr2`、`arr3` 是三块独立的数组；指针数组只负责“管理地址”，不把三个数组拼接成一块。`sizeof(ptrArray)` 是 3 个指针的大小，不是 3×3 个 `int` 的大小。

用指针数组的好处是三个同形数组可以共用一套下标逻辑：`ptrArray[i][j]` 的写法虽然这里没有直接用，但 `*(ptrArray[i] + j)` 已经表达了“第 `i` 个数组的第 `j` 个元素”。指针数组存的是各行首地址，元素本身没有被复制，所以通过 `ptrArray[i][j]` 或 `*(ptrArray[i] + j)` 修改元素，会直接改到原来的 `arr_i`。

#### 例5.20 使用指向数组的指针数组管理数组（一维数组部分）

```cpp
#include <iostream>
using namespace std;

int main()
{
    int (*ptrArray[3])[3];
    int arr1[3] = {1, 2, 3};
    int arr2[3] = {4, 5, 6};
    int arr3[3] = {7, 8, 9};
    // ptrArray[0] = arr1;  Error: 不能将“int*”类型的值分配到“int (*)[3]”类型的实体
    ptrArray[0] = &arr1;
    ptrArray[1] = &arr2;
    ptrArray[2] = &arr3;
    for (int i = 0; i < 3; ++i) {
        cout << "Array " << i + 1 << ": ";
        for (int j = 0; j < 3; ++j) {
            cout << *(*ptrArray[i] + j) << " ";
        }
        cout << endl;
    }
}
```

运行结果：

```
Array 1: 1 2 3
Array 2: 4 5 6
Array 3: 7 8 9
```

声明 `int (*ptrArray[3])[3];` 要拆开读：`ptrArray` 先与 `[3]` 结合，是一个含 3 个元素的数组；每个元素的类型是 `int (*)[3]`，即“指向 `int[3]` 的指针”。所以它是**指向数组的指针数组**，元素仍然是指针，不是一行数组。

![指向数组的指针数组：每个元素存放一个含 3 个 int 的数组的地址 &arr_i；被指向的三个数组各自连续](/images/campus-cpp-programming/pointer-array-of-array-pointers.jpg)

`&arr1` 的类型是 `int (*)[3]`，可以赋给元素；`arr1` 在表达式中转换成 `int*`，类型不匹配，赋值报错，错误信息就是“不能将 `int*` 类型的值分配到 `int (*)[3]` 类型的实体”。这是数组名转换与“取整个数组地址”的典型区别：`arr1` 的值和 `&arr1` 的地址值相同，但类型不同。

访问时 `ptrArray[i]` 是 `int (*)[3]`；`*ptrArray[i]` 得到 `int[3]`，在表达式中转换成指向该行首元素的 `int*`；再加 `j`、解引用，得到 `arr_i[j]`。因此 `*(*ptrArray[i] + j)` 也可以写成 `(*ptrArray[i])[j]`。括号不能省：`*ptrArray[i] + j` 是“先解引用得到行首指针，再前进 `j` 个 `int`”；而 `ptrArray[i] + j` 会让指针按整个 `int[3]` 前进，步长是 3 个 `int`（常见 12 字节），不是 1 个 `int`（常见 4 字节）。这正是“指针算术按所指类型步进”的直接体现。

用这种写法的动机是：当每个元素要指向“一整行”而不是单个整数时，元素类型必须写成 `int (*)[3]`，赋值时也必须取整个数组的地址 `&arr1`；一旦写对，`*ptrArray[i]` 就恢复成行数组，后续可以按普通一维数组的方式偏移访问。它和例5.19 的区别只在元素类型：例5.19 的元素是 `int*`，例5.20 的元素是 `int (*)[3]`。

本例题号 5.20 在下一节二维数组部分还会再出现一次，两题内容不同。这里保留原编号并标明“一维数组部分”，不合并、不改号；阅读时按主题区分。

#### 课堂练习（指针数组）

**练习1（单选）** 说明一个长度为 10 的数组，元素类型为整型指针的正确语句是（ ）。

A. `int *pary[10];`　B. `int (*pary)[10];`　C. `int *pary(10);`　D. `int **pary[10]`

**答案：A。** `int *pary[10];` 是含 10 个 `int*` 元素的数组。B 是“指向 `int[10]` 的指针”，只有一个指针，不是长度为 10 的数组。C 不是数组定义形式，不能得到长度为 10 的数组。D 的元素类型是 `int**`（指向 `int*` 的指针），不是 `int*`。判断时先看 `pary` 先和谁结合：先和 `[10]` 结合就是数组，先和 `*` 结合（有括号）就是指针。

**练习2（单选）** 有以下语句，则能够输出 `a+b+c` 的值的语句是（ ）。

```cpp
int a = 1, b = 2, c = 3;
int *pary[3] = {&a, &b, &c};
```

A. `cout << (pary[0] + pary[1] + pary[2]);`
B. `cout << (*pary[0] + *pary[1] + *pary[2]);`
C. `cout << (pary[1] + pary[2] + pary[3]);`
D. `cout << (*pary[1] + *pary[2] + *pary[3]);`

**答案：B。** `pary[0]` 是 `int*`，`*pary[0]` 是 `a` 的值 1；同理 `*pary[1]` 是 2，`*pary[2]` 是 3，三者相加为 6。A 把三个指针相加，指针之间不能做加法。C 和 D 都用了 `pary[3]`，而 `pary` 的合法下标只有 0、1、2，越界，不能给出确定结果。

### 5.4.2 二维数组

二维数组的元素本身是一维数组，所以它有“行”和“列”两个下标，也必然有两层指针可以落脚：指向整行的**行指针**，和指向单个元素的**元素指针**。混用这两层是本节绝大多数错误的来源——`a` 和 `a[0]` 打印出来是同一个地址，但 `a+1` 跨一整行，`a[0]+1` 只跨一个元素；类型不同，步长就不同。

#### 二维数组的定义

定义格式为：

```cpp
类型标识符[常量表达式1][常量表达式2];
```

- 第一个方括号指定第一维的长度，即**行数**；
- 第二个方括号指定第二维的长度，即**列数**；
- 两个长度都必须是编译期能求出正整数值的常量表达式，规则与一维数组相同。

例如：

```cpp
int arr1[3][4];       // 3 行 4 列的 int 类型数组
double arr2[5][5];    // 5 行 5 列的 double 类型数组
char arr3[20][20];    // 20 行 20 列的 char 类型数组
```

`arr1` 有 $3\times 4=12$ 个元素，行下标取 $0\sim 2$，列下标取 $0\sim 3$。它的类型是“含 3 个元素的数组，每个元素是含 4 个 `int` 的数组”，即 `int[3][4]`；长度是类型的一部分，`int[3][4]` 和 `int[4][3]` 是不同类型，虽然元素总数相同。

二维数组在内存中仍是一整块连续空间，元素按**行主序**存放：先放第 0 行的全部元素，再放第 1 行，依此类推。对于 `a[3][4]`，存放次序是

```text
a[0][0], a[0][1], a[0][2], a[0][3],
a[1][0], a[1][1], a[1][2], a[1][3],
a[2][0], a[2][1], a[2][2], a[2][3]
```

![3×4 的二维数组在逻辑上是三行四列，在内存中按行主序排成 12 个连续单元；右侧框中是示意地址](/images/campus-cpp-programming/array-2d-row-major.jpg)

设数组首字节地址的数值为 $p$（不是 C++ 指针表达式），元素类型占 $s$ 字节，则 `a[i][j]` 的地址是 $p+(i\times N+j)\times s$，其中 $N$ 是列数。这个式子说明两件事：列数 $N$ 决定了跨一行要走多少字节，所以定义时第二维不能省；行内元素相邻，跨行时也恰好接上前一行的末尾，中间没有空隙。

#### 二维数组的初始化

用嵌套的花括号按行给出初值，最直观：

```cpp
int arr1[3][4] = {
    {0, 1, 2, 3},     // 初始化第 0 行
    {4, 5, 6, 7},     // 初始化第 1 行
    {8, 9, 10, 11}    // 初始化第 2 行
};
```

因为内存是平铺的，内层花括号只是帮助人看清行边界，可以省略；下面两种写法完全等价：

```cpp
int arr1[3][4] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11};
```

省略行花括号后，编译器按“每 $N$ 个初值一行”自动分组，所以初值个数不必是列数的整数倍：

```cpp
int arr1[3][4] = {{0}, {1}, {2}};   // 每行只初始化第一个元素，其余元素补 0
int arr1[3][4] = {1, 2, 3, 4};      // 只填满第 0 行，其余 8 个元素补 0
```

`{{0}, {1}, {2}}` 得到的是第 0 列依次为 `0`、`1`、`2`、其余位置全 `0` 的数组，而不是“前三个元素为 0、1、2”。补零规则与一维数组一致：显式给出的初值填完后，剩余元素一律零初始化。

第一维的长度在给出初值表时可以省略，编译器按行数推出；第二维不能省，因为不知道列数就无法确定每行多长、也无法计算跨行步长：

```cpp
int a[][3] = {{0, 1}, {2, 3, 4}, {5, 6}, {7}};  // 合法：推出 4 行
int b[3][] = {{0, 1}, {2, 3}};                  // 非法：列数未知
int c[2][3] = {{0, 1}, {2, 3}, {4, 5}};         // 非法：3 组行初值给了 2 行的数组
```

`a` 的四行分别是 `{0,1,0}`、`{2,3,4}`、`{5,6,0}`、`{7,0,0}`：行内初值不足时只补该行剩余位置，不会溢出到下一行。

#### 以下标方式访问二维数组

访问形式是“数组名[行表达式][列表达式]”，两个方括号各说明一个维度：

```cpp
数组名[表达式1][表达式2]
```

每个 `[]` 都是一次间址，所以 `a[i][j]` 可以逐层拆成 `*(*(a+i)+j)`：先由行下标定位到第 $i$ 行这个一维数组，再由列下标定位到该行中的第 $j$ 个元素。编译器按行主序算出偏移，不做任何边界检查。

#### 例5.20 使用下标访问二维数组

> 本例的主题是二维数组的下标访问。原件中它与一维数组部分的例题同号（例5.20 出现两次），这里保留原编号、不重排，按主题区分。

```cpp
#include <iostream>
using namespace std;
int main()
{
    int arr[3][4] = {          // 定义一个 3 行 4 列的二维数组
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };
    for (int i = 0; i < 3; i++) {          // 遍历行
        for (int j = 0; j < 4; j++) {      // 遍历列
            cout << arr[i][j] << " ";      // 访问并输出二维数组的所有元素
        }
        cout << endl;                      // 每打印完一行后换行
    }
    cout << "Accessing an individual element:" << endl;
    cout << "The value of arr[1][2] is: " << arr[1][2] << endl;  // 访问输出第二行第三列的元素
    arr[1][2] = 99;                                              // 修改第二行第三列的元素为 99
    cout << "The array after modification:" << endl;             // 再次输出数组以查看修改后的结果
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 4; j++) {
            cout << arr[i][j] << " ";
        }
        cout << endl;
    }
}
```

运行结果：

```text
1 2 3 4
5 6 7 8
9 10 11 12
Accessing an individual element:
The value of arr[1][2] is: 7
The array after modification:
1 2 3 4
5 6 99 8
9 10 11 12
```

`arr[1][2]` 是第二行第三列，不是第一行第二列：行、列下标都从 0 开始，所以“第二行”对应行下标 1，“第三列”对应列下标 2，值为 7。改写成 99 之后，再次输出的矩阵里只有这一个位置变化，说明下标定位精确到单个元素。两层循环的书写顺序（先行后列）与内存中的行主序一致，这也是遍历二维数组最快的走法。

#### 课堂练习：初始化与下标计算

**题目一（单选）** 以下不能对二维数组 `a` 进行正确初始化的语句是（ ）。

A. `int a[2][3] = { 0 };`
B. `int a[][3] = { {0, 1}, {0} };`
C. `int a[2][3] = { {0, 1}, {2, 3}, {4, 5} };`
D. `int a[][3] = { 0, 1, 2, 3, 4, 5 };`

**答案：C。** C 给出了 3 组行初值，但数组只有 2 行，初值个数超出容量，编译报错。A 只有一个初值，剩余元素补 0，得到全零数组；B 省略第一维，按两组初值推出 2 行，第二行只写一个 `0`、其余补零；D 省略第一维，6 个初值按每行 3 个分成 2 行。判断这类题的关键只有两条：第一维可省、第二维不可省；初值不能多于容量，少了则补零。

**题目二（单选）** 已知 `int a[][3] = {{0, 1}, {2, 3, 4}, {5, 6}, {7}};`，则 `a[2][1]` 的值是（ ）。

A. 0　B. 2　C. 6　D. 7

**答案：C，值为 6。** 按行补齐后，四行分别是 `{0,1,0}`、`{2,3,4}`、`{5,6,0}`、`{7,0,0}`，`a[2][1]` 取第三行第二个元素，即 6。这道题给出的答案标记是 B，但 B 的 2 对应 `a[1][0]`，与题面的 `a[2][1]` 不符；按数组内容计算应为 6，遇到标记与题面冲突时以题面为准。

**题目三（主观题）** 写出下列程序的输出。

```cpp
#include <iostream>
#include <iomanip>
using namespace std;
const int N = 5;
int main()
{
    int a[N][N] = { 0 }, i, j, k;
    for (k = 1, i = 0; i < N; i++)
        for (j = i; j >= 0; j--, k++)
            a[j][i - j] = k;
    for (i = 0; i < N; i++)
    {
        for (j = 0; j < N; j++)
            cout << setw(3) << a[i][j];
        cout << endl;
    }
}
```

**输出：**

```text
  1  3  6 10 15
  2  5  9 14  0
  4  8 13  0  0
  7 12  0  0  0
 11  0  0  0  0
```

**思路。** 要填的规律是“反对角线”：同一条反对角线上的元素，行下标与列下标之和相同。外层 `i` 正是这个和，内层让 `j` 从 `i` 递减到 0，被写的位置是 `a[j][i-j]`，列下标由 `i-j` 自动算出，两者之和恒为 `i`，于是一条 `for` 就走完整条对角线。`k` 在每次内层循环后自增，提供 1、2、3……的连续填充值；`k` 的初始化写在 `for (k = 1, i = 0; ...)` 的初始化表达式里，与 `i` 一起只执行一次。

按这个次序展开：`i=0` 填 `a[0][0]=1`；`i=1` 填 `a[1][0]=2`、`a[0][1]=3`；`i=2` 填 `a[2][0]=4`、`a[1][1]=5`、`a[0][2]=6`；依此类推。所以每行是从左下往右上排的等差递增序列，上三角（含主对角线）被填满，下三角保持初始化时的 0。`setw(3)` 只对紧随其后的一个输出项生效，每个数占 3 个字符宽、右对齐，因此 1 位数前面有两个空格，不需要额外加分隔符。

#### 以指针方式访问二维数组

一维数组的两条结论可以直接搬过来：数组名代表首地址；任一元素的地址可用数组名加偏移量表示，偏移量的单位是被指元素的大小。难点在于二维数组有两层元素，要先分清当前指针指向的是“行”还是“单个元素”。

`a` 是“元素为行数组”的一维数组的数组名：它含 3 个元素，每个元素是一行、即含 4 个 `int` 的数组。`a` 本身的类型是 `int[3][4]`；在需要指针的普通表达式中，转换为指向首行 `a[0]` 的指针，其类型是 `int (*)[4]`：

```cpp
a == &a[0]      a + 1 == &a[1]      a + 2 == &a[2]
*a == a[0]      *(a + 1) == a[1]    *(a + 2) == a[2]
```

`a[0]` 本身又是一维数组 `{a[0][0], a[0][1], a[0][2], a[0][3]}` 的数组名，是这个一维数组的首元素指针，类型为 `int*`：

```cpp
a[0] == &a[0][0]          a[0] + 1 == &a[0][1]
*a == &a[0][0]            *a + 1 == &a[0][1]
*(a[0] + 1) == a[0][1]    *(*(a + 1) + 2) == a[1][2]
```

关键差别在步长：`a + 1` 跳过一整行，即 4 个 `int`（常见平台上 16 字节）；`a[0] + 1` 只跳过一个 `int`（4 字节）。同一个数值地址，指针类型不同，`+1` 的落点就不同，这是读二维数组指针表达式时必须先确认的事。

元素地址与元素值的各种等价写法汇总如下（以 `a[3][4]` 为例）：

| 含义 | 写法一 | 写法二 | 写法三 |
| --- | --- | --- | --- |
| 第 0 行第 1 列元素的地址 | `a[0] + 1` | `*a + 1` | `&a[0][1]` |
| 第 1 行第 2 列元素的地址 | `a[1] + 2` | `*(a + 1) + 2` | `&a[1][2]` |
| 第 $i$ 行第 $j$ 列元素的地址 | `a[i] + j` | `*(a + i) + j` | `&a[i][j]` |
| 第 1 行第 2 列元素的值 | `*(a[1] + 2)` | `*(*(a + 1) + 2)` | `a[1][2]` |
| 第 $i$ 行第 $j$ 列元素的值 | `*(a[i] + j)` | `*(*(a + i) + j)` | `a[i][j]` |

三列写法互相等价，因为 `a[i]` 就是 `*(a+i)`，`&a[i][j]` 就是 `a[i]+j`。记忆方式：**每多一个 `*`，就少一层“指向”，从行降到元素**；`a+i` 仍是行指针，`*(a+i)` 降为元素指针，`*(*(a+i)+j)` 才取到值。

行指针也可以显式声明，步长由方括号里的长度固定下来：

```cpp
int a[3][4];
int (*p)[4] = a;              // p 指向第 0 行，p+1 跨一整行
int x = (*(p + 1))[2];        // 等价于 a[1][2]
```

`int (*p)[N]` 的步长由 `N` 决定：`p + 1` 前进 `N` 个 `int`，正好一整行，所以 `p + 1` 与 `a + 1` 类型相同、指向同一行；而 `int*` 的 `+1` 只前进一个 `int`。读声明时先看括号：`int (*p)[N]` 是“`p` 为指针，指向 `int[N]`”，`int *p[N]` 去掉括号后变成“`N` 个 `int*` 组成的数组”，步长和存储都不同，两者不能互相赋值。

指针偏移必须留在数组范围内。下面这句是越界访问：

```cpp
int arr[3][4];
int val = *(*(arr + 3) + 4);   // 错误：访问了不存在的元素，即越界访问
```

`arr + 3` 已经是“最后一行之后”的位置，解引用它属于未定义行为；即使侥幸得到一个地址，再 `+4` 又越出了行尾。这类代码可能崩溃，也可能读到别的变量，不能给出确定输出。

#### 例5.22 使用指针访问二维数组

> 原件在本例之前的编号直接从例5.20 跳到例5.22，例5.21 没有对应内容；此处不补号，也不把后面未编号的课堂例题凑作例5.21。

```cpp
#include <iostream>
using namespace std;
int main()
{
    int arr[3][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };
    int rows = 3;
    int cols = 4;
    cout << "Accessing elements using pointers:" << endl;   // 使用指针访问输出所有元素
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            cout << *(arr[i] + j) << " ";                   // 访问元素 arr[i][j]
        }
        cout << endl;
    }
    cout << "Accessing elements using pointers (another way):" << endl;  // 使用指针访问（另一种方式）
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            cout << *(*(arr + i) + j) << " ";
        }
        cout << endl;
    }
}
```

运行结果：

```text
Accessing elements using pointers:
1 2 3 4
5 6 7 8
9 10 11 12
Accessing elements using pointers (another way):
1 2 3 4
5 6 7 8
9 10 11 12
```

两段循环输出相同，差别只在定位方式：`arr[i]` 先按行下标取到第 $i$ 行的首元素指针，再加 `j` 得到元素地址；`*(arr + i) + j` 把这一步拆开写——`arr + i` 是行指针，解引用后才是元素指针，再加 `j`。前者依赖“行数组名退化为元素指针”，后者显式展示两层间址，两者指的是同一个 `int`。写代码时用 `*(arr[i] + j)` 更短，读表达式时用 `*(*(arr+i)+j)` 更能看清类型是怎么一层层降下来的。

#### 行指针、`int**` 与指针数组的区别

二维数组名在逻辑上像一个二级指针：`a` 指向行，`a[i]` 指向元素。但它不能被赋给 `int**`：

```cpp
int a[3][5], **p2, *p1;
p1 = *a;      // OK：*a 就是 a[0]，类型 int*，指向 a[0][0]
p1 = a[0];    // OK：同上
p2 = a;       // Error：a 的类型是 int (*)[5]，不是 int**
p1 = a;       // Error：行指针不能赋给元素指针
```

原因是两种类型的机器含义不同。`int**` 表示“指向一个指针变量”，用它做 `p2[i]` 时，程序要先到 `p2` 所指的地址**读出一个指针值**，再按这个值去取 `int`；而二维数组里根本没有存放这些指针，只有连续的 `int`。`a[i]` 的地址是编译期按“首地址 + $i$ 个行宽”算出来的，不是从内存里读出来的。所以 `int**` 与二维数组名不等价，`int**` 的合法用法是二级指针指向一个真实存在的指针变量，例如 `int *p = &x; int **q = &p;`。

行指针与指针数组也只差一对括号，但语义相反：

```cpp
int (*row)[3];   // 行指针：一个指针，指向含 3 个 int 的数组，row+1 跨一行
int *arr[3];     // 指针数组：3 个 int* 元素，每个元素可指向不同的 int
```

`row = a;`（`a` 为 `int a[2][3]`）合法，因为类型匹配；`arr = a;` 非法，数组名不能整体赋值，且 `arr` 的元素是 `int*`，要逐个赋成像 `arr[0] = a[0];` 这样。指针数组的元素彼此独立，可以指向大小不同、位置不相邻的数组；行指针只能指向“长度固定为 3 的 `int` 数组”，被指向的行必须连续排列。判断时看 `+1` 的落点：跨一行的是行指针，跨一个 `int` 的是指针数组的元素。

多维数组的退化只发生**一层**：`int a[3][4][5]` 的数组名退化为 `int (*)[4][5]`，`a[i]` 退化为 `int (*)[5]`，`a[i][j]` 才是 `int*`。每降一维，方括号里就少一个长度，不能一次跳到底。这也是不要用“一个 `int*` 平铺扫过整个多维数组”来代替行指针或下标的原因：那个指针的类型只声明了“指向一个 `int`”，它的合法活动范围只有它真正指向的那一行，跨行之后指针算术就出了数组对象。

#### 课堂例题：用一级指针遍历二维数组

```cpp
#include <iostream>
using namespace std;
int main()
{
    int a[3][5] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15};
    int *p;
    for (p = a[0]; p < a[0] + 15; p++)      // 取第 0 行元素的首地址
        cout << *p << " ";
    cout << endl;
    for (p = *a; p < *a + 15; p++)          // *a 与 a[0] 等价
        cout << *p << " ";
    cout << endl;
    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 5; j++)
            cout << *(a[i] + j) << " ";
        cout << endl;
    }
}
```

运行结果：

```text
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
1 2 3 4 5
6 7 8 9 10
11 12 13 14 15
```

前两个循环把二维数组当成长度 15 的一维序列打印，第三个循环按行打印，三者内容相同。课堂上围绕第一个 `for` 的初值连续追问了三次，正好对应三种类型错误：

- **能改成 `p = a` 吗？** 不能。`a` 在这里转换为行指针 `int (*)[5]`，与元素指针 `int*` 不兼容，所以不能赋给 `p`；行指针也不是 `int**`。
- **能改成 `p = a[0][0]` 吗？** 不能。`a[0][0]` 是数组元素的值 1，不是地址，值不能当指针用。
- **能改成 `p = &a[0][0]` 吗？** 可以。`&a[0][0]` 的类型是 `int*`，与 `a[0]`、`*a` 指向同一处。

这段代码能跑通，靠的是二维数组的行在内存中首尾相接：`a[0]` 之后紧接着就是 `a[1]`，所以从 `a[0]` 出发连续走 15 步，恰好扫过全部元素。但按标准，`a[0]` 这个数组对象只有 5 个元素，`p` 一旦越过 `a[0] + 5` 就已经走出该数组，此后的指针比较和间接访问属于未定义行为；把 `p < a[0] + 15` 这种跨行算法当成通用写法是有风险的，换个编译器或优化级别就可能失效。要遍历整个二维数组，安全写法有两种：用行指针 `int (*q)[5] = a;` 逐行推进，或直接用两层下标 `a[i][j]`。课程代码里这种平铺写法常见，但它依赖“行连续”这一实现事实，不应当作可移植的遍历方式，更不能用它去跨子数组访问。

#### 课堂练习：二维数组的指针表示

**题目一（单选）** 有语句 `int ary[3][3]={1,4,9,2,5,6,4,3,1};`，能够输出数值 5 的语句是（ ）。

A. `cout << ary[2][2];`
B. `cout << *(*ary + 4);`
C. `cout << *(ary + 4);`
D. `cout << *(ary[0] + 5);`

**答案：B。** 数组按行排成 `{1,4,9}`、`{2,5,6}`、`{4,3,1}`，5 位于 `ary[1][1]`。B 中 `*ary` 是 `ary[0]`，类型 `int*`，加 4 走到第 5 个元素，即 `ary[1][1]`，解引用得 5。A 取 `ary[2][2]`，值为 1。C 的 `ary + 4` 指向下标为 4 的行，而这个数组只有下标 0～2 的行，解引用越界，属于未定义行为；况且 `*(ary+4)` 的类型是 `int[3]`，本身也不能直接输出。D 的 `ary[0] + 5` 走到 `ary[1][2]`，值为 6。

**题目二（单选）** 已知 `int a[3][3] = {1,2,3,4,5,6,7,8,9};`，以下不能表示数组元素 `a[2][1]` 的地址是（ ）。

A. `&a[2][1]`
B. `*(a[2] + 1)`
C. `a[2] + 1`
D. `*(a + 2) + 1`

**答案：B。** `a[2]` 是第 2 行的首元素指针，`a[2] + 1` 是 `a[2][1]` 的地址，C 正确；A 直接取地址，正确；D 的 `*(a+2)` 与 `a[2]` 等价，再加 1 仍是地址，正确。B 多解引用了一次，`*(a[2]+1)` 得到的是元素值 8，不是地址。判断这类题只需数星号：地址比同位置的元素值少一层 `*`。

**题目三（单选）** 有以下说明语句，则正确的赋值语句是（ ）。

```cpp
int a[5][5];
int *p, **q;
```

A. `p = a;`
B. `p = *a;`
C. `q = a;`
D. `q = *a;`

**答案：B。** `*a` 就是 `a[0]`，退化为 `int*`，与 `p` 类型匹配。A 把行指针 `int (*)[5]` 赋给 `int*`，类型不符；C 把行指针赋给 `int**`，同样不符；D 把 `int*` 赋给 `int**`，也缺一层，`int**` 必须指向一个真实存在的 `int*` 变量。

**题目四（单选）** 对同样的说明语句，正确的赋值语句是（ ）。

A. `p = a[0];`
B. `p = &a[0];`
C. `q = a[0];`
D. `q = &a[0][0];`

**答案：A。** `a[0]` 是第 0 行的数组名，退化为 `int*`，可以直接赋给 `p`。B 的 `&a[0]` 是“第 0 行这个数组的地址”，类型 `int (*)[5]`，与 `int*` 不兼容；C 把 `int*` 赋给 `int**`，少一层；D 的 `&a[0][0]` 是元素地址，类型 `int*`，同样不能赋给 `int**`。与上一题对照可以看出：`a` 和 `a[0]` 打印出来的地址值相同，但前者是行指针、后者是元素指针，能不能赋值只由类型决定。

### 5.4.3 字符串

C++ 从 C 继承下来的 C 风格字符串（C-style character string）是**以空字符 `'\0'` 结束的字符数组**。`'\0'` 是 ASCII 码为 0 的不可显示字符，也叫空操作符或结束符。字符串常量、字符数组名、字符指针都可以表示字符串；字符串既可以整体输入输出，也可以逐个字符访问。围绕字符串的绝大多数错误，都落在两件事上：**末尾有没有 `'\0'`**，以及**这块内存能不能写、够不够大**。

#### 字符串的存储

先用四种写法对照字符数组的初始化：

```cpp
char str0[] = {'H', 'e', 'l', 'l', 'o'};          // 逐个字符初始化，没有结束符
char str1[] = {'H', 'e', 'l', 'l', 'o', '\0'};    // 逐个字符初始化，显式加结束符
char str2[] = {"Hello"};                          // 用串常量初始化，自动添加结束符
char str3[] = "Hello";                            // 省略 {}，直接用串常量初始化
```

- `str0` 的长度由初始化列表推出，是 5。五个元素全是普通字符，末尾没有 `'\0'`，所以它只是一个字符数组，**不是合法的 C 风格字符串**。对它做 `cout << str0`、`strlen(str0)`，或任何按字符串处理的函数调用，都会越过数组边界继续读，属于未定义行为。
- `str1` 显式写了 `'\0'`，长度是 6。前五个元素是字符，第六个是结束符。
- `str2` 用字符串常量初始化，编译器会自动在末尾补 `'\0'`，长度是 6。`char str2[] = {"Hello"};` 里的花括号是允许的，等价于 `char str2[] = "Hello";`；不要把它理解成“数组里装了一个字符串对象”，它仍然是一个含 6 个 `char` 的数组。
- `str3` 省略花括号，直接用字符串常量初始化，效果与 `str2` 相同，长度也是 6。

数组容量与字符串长度是两件事。下面几种写法要分清：

```cpp
char a[] = "Hello";              // 长度 6：5 个字符 + '\0'
char b[10] = "Hello";            // 长度 10：前 6 个元素初始化，其余补 0
char c[5] = "Hello";             // 非法：5 个位置放不下 5 个字符和 '\0'
char d[5] = {'H','e','l','l','o'};  // 合法数组，长度 5，但没有 '\0'，不是字符串
char e[6] = {'H','e','l','l','o'};  // 合法：e[5] 被补 0，是字符串
```

标准 C++ 不允许 `char c[5] = "Hello";` 这种写法：用字符串常量初始化字符数组时，数组必须至少能容纳“字符个数 + 1 个结束符”。`d` 是合法的字符数组，但它的五个元素都被显式初始化，没有剩余位置自动补 0，所以不能当字符串用；`e` 只显式给了五个字符，第六个元素由初始化规则补 0，反而成了合法的字符串。

![字符数组的结束符：有结束符的数组长度为 6，最后一个是空字符；没有结束符的数组只有 5 个元素](/images/campus-cpp-programming/string-terminator.svg)

**`sizeof` 与 `strlen` 的区别。** `sizeof` 求的是对象或类型占多少字节，数组的 `sizeof` 包括全部元素；`strlen` 从给定地址开始数字符，直到遇到第一个 `'\0'`，**不把结束符计入长度**。对

```cpp
char a[] = "Hello";
char b[10] = "Hello";
const char* p = "Hello";
```

有：

| 表达式 | 结果 | 说明 |
| --- | --- | --- |
| `sizeof(a)` | 6 | 数组总字节数，含末尾 `'\0'` |
| `strlen(a)` | 5 | 数到第一个 `'\0'` 为止的字符数 |
| `sizeof(b)` | 10 | 数组容量是 10，不是字符串长度 |
| `strlen(b)` | 5 | 到 `b[5]` 的 `'\0'` 为止 |
| `sizeof(p)` | 一个指针的大小 | 常见 64 位平台为 8、32 位平台为 4，标准不保证具体值 |
| `strlen(p)` | 5 | 运行时从 `p` 指向的地址数到 `'\0'` |

`sizeof(p)` 求的是指针变量本身的大小，不是它指向的字符串有多长；`sizeof(a)` 能求出数组总大小，是因为 `a` 是数组而不是指针。也正因如此，`sizeof(a) / sizeof(a[0])` 能在数组本体所在的范围内算出元素个数；一旦数组名退化成指针（例如传进函数），这个写法就失效。

**字符指针作为串地址。** 实际应用中字符串长度变化很大，用字符指针保存串的首地址，管理起来更方便：

```cpp
char str1[] = "Hello";
char str2[] = "World";
char* pstr1 = str1;             // 指向 str1[0]，可读可写
char* pstr2 = str2;             // 指向 str2[0]
const char* pstr3 = "Hello";    // 指向字符串常量，只读
```

- `pstr1` 保存的是 `&str1[0]`，即 `str1` 首字符的地址；`*pstr1` 是 `'H'`，`pstr1 + 1` 指向 `'e'`。因为 `str1` 是可写的字符数组，通过 `pstr1` 改字符是合法的。`pstr2` 与 `pstr1` 同理，指向 `str2` 的首字符。
- `pstr3` 指向一个字符串常量（匿名对象）。字符串常量通常存放在只读区域，必须用 `const char*` 指向它；`pstr3[0] = 'h';` 这类写入会编译失败。若用强制转换去掉 `const` 再写，属于未定义行为。
- 旧式写法 `char* p = "Hello";` 在 C++03 中还能通过编译但修改字面量是未定义行为；C++11 起字符串常量的类型是 `const char[N]`，这种初始化不再允许。有的编译器可能仍以扩展形式放过，但不应依赖；现代 C++ 一律写 `const char*`。

| 写法 | 指向 | 能否改字符 | 说明 |
| --- | --- | --- | --- |
| `char* p = str1;` | 数组 `str1` 的首字符 | 可以 | 指针指向可写数组，生命周期随 `str1` |
| `const char* p = "Hello";` | 字符串常量的首字符 | 不可以 | 字面量有静态存储期，但只读 |
| `char* p = "Hello";` | 字符串常量 | 不应修改 | 现代 C++ 中非法或至少是危险写法，改用 `const char*` |

#### 字符串的访问

字符串常量、字符数组名、字符指针都表示字符串。字符串可以作为一个整体进行输入、输出；字符串里的各个元素可以通过下标或指针的间址方式访问。下面几段代码从“没有结束符”开始，逐步看清结束符的作用。

**（1）没有结束符的字符数组**

```cpp
#include <iostream>
using namespace std;

int main()
{
    char ca[5] = {'a', 'b', 'c', 'd', 'e'};
    for (int i = 0; i < 5; i++)
        cout << ca[i];       // 逐个数组元素输出
    cout << endl;
    cout << ca << endl;      // 整体输出字符数组
}
```

逐元素循环的输出是确定的：

```text
abcde
```

`cout << ca` 这一行则不能用同样的方式下结论。`ca` 没有 `'\0'`，而 `operator<<` 对 `char*` 的处理是“从该地址开始一直输出，直到遇到 `'\0'`”。数组后面是什么内容，标准没有规定；同一段没有结束符的代码，在某些运行里可能恰好读到 0 字节而看起来正常，也可能把后面的内存内容一起打印出来。两种现象都只是未定义行为在特定内存布局下的偶然结果，不能据此认为“不写 `'\0'` 也能安全输出”。**没有结束符时，整体输出和 `strlen` 都没有确定结果。**

**（2）静态数组与部分初始化**

```cpp
#include <iostream>
using namespace std;

int main()
{
    static char cb[10] = {'a', 'b', 'c', 'd', 'e'};
    for (int i = 0; i < 5; i++)
        cout << cb[i];
    cout << endl;
    cout << cb << endl;
}
```

运行结果：

```text
abcde
abcde
```

`cb` 有 10 个元素，初始化列表只显式给了 5 个，其余 5 个元素被补 0，所以 `cb[5]` 就是 `'\0'`，整体输出在 `e` 后停止。这里把其余元素补 0 的是**部分初始化**规则，不是 `static` 独有的效果：即使去掉 `static`，只要保留 `= {'a','b','c','d','e'}` 这个初始化列表，`cb[5]` 仍然是 0。`static` 在这里影响的是存储期；如果写成没有初始化列表的 `static char cb[10];`，静态存储期会保证全数组零初始化，而局部的 `char cb[10];` 则是未初始化的。不要把“有初始化列表”和“有 static”混为一谈。

**（3）显式添加结束符**

```cpp
#include <iostream>
using namespace std;

int main()
{
    char cc[] = {'i', 'j', 'k', 'l', 'm', '\0'};
    for (int i = 0; i < sizeof(cc) / sizeof(char) - 1; i++)
        cout << cc[i];
    cout << endl;
    cout << cc << endl;
}
```

运行结果：

```text
ijklm
ijklm
```

`cc` 的长度由初始化列表推出，是 6：五个字母加一个 `'\0'`。`sizeof(cc)` 是 6 个字节，`sizeof(char)` 恒为 1，所以 `sizeof(cc) / sizeof(char) - 1` 等于 5，循环正好跳过最后的结束符，只输出五个字母。第二个 `cout << cc` 按字符串输出，同样在 `'\0'` 处停止。若把初始化列表里的 `'\0'` 去掉，`cc` 的长度变成 5，`sizeof(cc)/sizeof(char)-1` 变成 4，循环会少输出一个 `m`，整体输出也会越界读取；这就是“逐个字符初始化时必须自己补结束符”的原因。

**（4）用字符串常量初始化**

```cpp
#include <iostream>
using namespace std;

int main()
{
    char cd[] = "I am a student.";
    for (int i = 0; cd[i] != '\0'; i++)
        cout << cd[i];
    cout << endl;
    cout << cd << endl;
}
```

运行结果：

```text
I am a student.
I am a student.
```

用字符串常量初始化时，编译器自动在末尾补 `'\0'`，所以 `cd` 的长度是 16（15 个字符加结束符）。循环条件 `cd[i] != '\0'` 逐个检查字符，遇到结束符就停；`cout << cd` 则按字符串整体输出，同样在结束符处停。这两种写法的结果相同，区别是前者能让你在循环里对每个字符做处理，后者只是一次整体输出。

**（5）用 `cin` 输入字符串**

```cpp
#include <iostream>
using namespace std;

int main()
{
    char ce[10];
    cin >> ce;
    cout << ce << endl;
}
```

输入：

```text
Simple program
```

输出：

```text
Simple
```

`cin >> ce` 会跳过前导空白，然后一直读到下一个空白字符（空格、制表符或换行），把读到的字符放进 `ce`，并自动在末尾补 `'\0'`。所以输入 `Simple program` 时，`ce` 里只有 `"Simple"`，后面的 `" program"` 还留在输入缓冲区里；输出自然只有 `Simple`。

这里 `ce` 的容量是 10，`"Simple"` 连结束符共 6 个字符，放得下。但 `cin >>` 并不知道 `ce` 有多大：数组名传给 `operator>>` 后已经退化成 `char*`，函数拿不到容量。如果输入超过 9 个字符，就会写越界，属于未定义行为。要限制读入长度，可以写 `cin.width(10); cin >> ce;`，或者改用能指定容量的 `cin.getline(ce, 10);`；后者还会把空格读进来，语义与 `>>` 不同。

（原件在字符数组访问和输入示例这两处，页眉仍写“4.6.2 字符串的访问”，注释也写“例4-19 字符数组的访问”，这是第 4 章旧编号的残留；内容属于本节 5.4.3 的字符数组访问，按本章处理，不并入第 4 章。）

#### 字符指针表示字符串

```cpp
#include <iostream>
using namespace std;

int main()
{
    const char* s = "program";
    for (int i = 0; i < 7; i++)
        cout << *(s + i);
    cout << endl;
}
```

运行结果：

```text
program
```

`s` 指向字符串常量 `"program"` 的首字符。`*(s + i)` 先做指针算术，再解引用，得到第 `i` 个字符；循环从 0 到 6，正好输出 7 个字符。字符串常量本身是一个含 8 个字符的匿名数组（类型为 `const char[8]`，7 个字母加 `'\0'`），`s + 7` 指向结束符，但循环没有走到那里。

把输出表达式从 `*(s + i)` 改成 `(s + i)`，结果就完全不同：

```cpp
for (int i = 0; i < 7; i++)
    cout << (s + i) << endl;
```

运行结果：

```text
program
rogram
ogram
gram
ram
am
m
```

原因是 `s + i` 的类型仍是 `const char*`，`cout` 对 `char*` 的重载会把它当作字符串的起始地址，从该地址一直输出到 `'\0'`。所以 `i = 0` 输出整个 `program`，`i = 1` 从 `'r'` 开始输出 `rogram`，依此类推，最后一次只输出 `'m'`。这里没有复制任何字符串，每一行都是同一个常量数组的不同后缀。

| 表达式 | 类型 | 输出或含义 |
| --- | --- | --- |
| `s` | `const char*` | 整个字符串 `program` |
| `*s` 或 `s[0]` | `char` | 首字符 `p` |
| `s + i` | `const char*` | 从第 `i` 个字符开始的后缀 |
| `*(s + i)` 或 `s[i]` | `char` | 第 `i` 个字符 |

`s` 指向的是字符串常量，不能通过它修改字符；`s[0] = 'P';` 会编译失败。若确实需要修改，应把字符复制到字符数组里再改，例如 `char buf[] = "program"; buf[0] = 'P';`。另外，`s + i` 只做地址计算，不改变 `s` 本身；如果写 `s++`，`s` 会真的移动，之后就找不到原来的首地址了。

#### 指针数组表示多个字符串

```cpp
#include <iostream>
using namespace std;

int main()
{
    const char* name[5] =
        {"Li Hua", "He Xiao Ming", "Zhang Li", "Sun Fei", "Chen Bao"};
    for (int i = 0; i < 5; i++)
        cout << name[i] << endl;
}
```

运行结果：

```text
Li Hua
He Xiao Ming
Zhang Li
Sun Fei
Chen Bao
```

`name` 是一个含 5 个元素的数组，每个元素都是 `const char*`。初始化列表里的每个字符串常量各自是一个匿名字符数组，`name[0]` 指向 `"Li Hua"` 的首字符，`name[1]` 指向 `"He Xiao Ming"` 的首字符，依此类推。这些字符串常量的长度不同，在内存中也不要求相邻；指针数组只保存它们的首地址。

因此：

- `name[i]` 是一个指针，`cout << name[i]` 按字符串输出，打印整个名字；
- `*name[i]` 或 `name[i][0]` 是首字符，例如 `*name[0]` 是 `'L'`；
- `sizeof(name)` 是 5 个指针的大小，`sizeof(name[0])` 是一个指针的大小，都不是名字的总字符数；
- `name[0] = "New Name";` 是合法的，改变的是指针元素本身；但 `name[0][0] = 'X';` 不合法，因为指向的字符是只读的。

![指针数组表示字符串：name 的每个元素是一个指针，分别指向一个字符串常量；各字符串不必连续存放](/images/campus-cpp-programming/char-pointer-array.svg)

它与二维字符数组的区别在于存储方式：

| 结构 | 存储内容 | 字符串长度 | 能否修改字符 |
| --- | --- | --- | --- |
| `const char* name[5]` | 5 个指针，另有一组字符串常量 | 每个字符串可以不同 | 字面量只读；指针元素可改指向 |
| `char names[5][12]` | 5 行、每行 12 个 `char`，连续存放 | 每行最多 11 个字符加 `'\0'` | 可以修改 |

指针数组更灵活，适合管理长度差异很大的多个字符串；二维数组把字符本身复制进来，行宽必须按最长的字符串来定，但内容可写。

#### 例5.23 字符串的访问

```cpp
#include <iostream>
using namespace std;

int main()
{
    char str1[100];  // 定义一个字符串变量str1
    cout << "Enter a string without spaces: ";
    cin >> str1;  // 使用cin读取用户输入的字符串，不包括空格
    cout << "You entered: " << str1 << '\n';  // 输出str1整个字符串

    char str2[] = "Hello, C++ world!";  // 定义一个C风格字符串
    char* ptr;
    for (ptr = str2; *ptr != '\0'; ptr++)  // 访问字符串中的每个字符
    {
        cout << *ptr;
    }
    cout << '\n';

    int length = 0;
    for (ptr = str2; *ptr != '\0'; ptr++)  // 计算字符串长度
    {
        length++;
    }
    cout << "String length is :" << length << endl;

    char firstChar = str2[0];  // 访问特定位置的字符：第一个字符
    char lastChar = str2[length - 1];  // 访问特定位置的字符：最后一个字符
    cout << "First character: " << firstChar << '\n';
    cout << "Last character: " << lastChar << '\n';

    str2[7] = 'c';  // 修改字符串内容：把 C++ 改为 c++
    cout << "Modified string: " << str2 << '\n';
}
```

运行结果：

```text
Enter a string without spaces: Hello!
You entered: Hello!
Hello, C++ world!
String length is :17
First character: H
Last character: !
Modified string: Hello, c++ world!
```

**解析**　这个例子把“整体输入输出、逐字符遍历、求长度、按下标访问、修改字符”串在一起。

1. `char str1[100];` 定义容量为 100 的字符数组。`cin >> str1` 读到空白为止，把 `Hello!` 和结束符放进 `str1`；`cout << str1` 按字符串整体输出。输入 `Hello!` 只有 6 个字符，远小于 99，安全。若输入超过 99 个字符，`cin` 同样会写越界。
2. `char str2[] = "Hello, C++ world!";` 由字符串常量推出长度 18（17 个字符加 `'\0'`）。`char* ptr` 是用来遍历的指针，它指向 `str2` 中可写的字符，不是字符串常量，所以不需要 `const`。
3. 第一个循环把 `ptr` 置为 `str2`，条件 `*ptr != '\0'` 在结束符处停止，循环体输出当前字符，`ptr++` 移到下一个字符。循环结束后 `ptr` 指向 `str2` 的结束符。
4. 第二个循环必须重新写 `ptr = str2`。如果沿用第一个循环结束时的 `ptr`，它已经在 `'\0'` 上，`length` 会一直是 0。重置后逐个计数，得到 17。
5. `firstChar = str2[0]` 是 `'H'`；`lastChar = str2[length - 1]` 是 `str2[16]`，即 `'!'`。这两个字符在修改之前读取，所以输出的是原字符串的首尾字符。
6. `str2[7] = 'c';` 把下标 7 的 `'C'` 改成 `'c'`。注意下标从 0 开始：

```text
下标:  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16
字符:  H  e  l  l  o  ,  ·  C  +  +  ·  w  o  r  l  d  !
```

（`·` 表示空格。）下标 7 是 `'C'`，下标 8、9 是两个 `'+'`，下标 10 是空格；把 `'C'` 改成 `'c'` 后，`"C++"` 变成 `"c++"`，后面的 `"world"` 本来就是小写，所以输出 `Hello, c++ world!`。整个修改只动了一个字符，字符串长度仍是 17，结束符仍在 `str2[17]`。

#### 字符串的赋值

字符数组可以像数值型数组一样，用循环语句把一个字符数组的各个元素赋值给另一个字符数组的对应元素，从而实现字符串的赋值。但数组本身不能整体赋值，也不能在定义之后再用字符串常量赋值：

```cpp
char a[10] = "Hello";   // 合法：定义时用字符串常量初始化
char b[10];
// b = a;               // 非法：数组不能整体赋值
// b = "Hello";         // 非法：定义之后不能再用字符串常量赋值
```

`a` 和 `b` 是数组名，不是可赋值的指针变量；`b = a` 既不是复制元素，也不是合法的指针赋值。正确做法是逐元素复制，并且不要忘记结束符：

```cpp
int len = 0;
while (a[len] != '\0')
    len++;
for (int i = 0; i <= len; ++i)
    b[i] = a[i];   // 连同 '\0' 一起复制
```

循环条件写成 `i <= len` 而不是 `i < len`，就是为了把 `a[len]` 的 `'\0'` 也复制过去。目标数组的容量至少要能放下 `len + 1` 个字符；若 `b` 只有 `len` 个位置，最后写入 `b[len]` 就会越界。

指针赋值则是另一回事：

```cpp
char* p = a;
char* q = p;   // 只复制地址，p 和 q 指向同一个数组
q[0] = 'h';    // 改的是 a[0]
```

`q = p` 复制的是指针值，不是字符串内容。复制后 `p` 和 `q` 指向同一块内存，通过任一指针修改字符都会影响另一个。若要得到独立的副本，必须复制字符本身，或者使用后面介绍的 `strcpy_s`。

| 操作 | 是否合法 | 效果 |
| --- | --- | --- |
| `char a[6] = "Hello";` | 合法 | 定义时复制 5 个字符和 `'\0'` |
| `char a[5] = "Hello";` | 非法 | 没有空间放 `'\0'` |
| `a = b;`（两者都是数组） | 非法 | 数组不能整体赋值 |
| `p = q;`（两者都是指针） | 合法 | 只复制地址，两个指针指向同一处 |
| 循环复制 + `dst[len] = '\0';` | 合法 | 逐元素复制，目标数组必须有 `len + 1` 个位置 |

#### 例5.24 字符串的赋值

```cpp
#include <iostream>
#include <cstring>
using namespace std;

int main()
{
    char str1[] = "Hello";
    int len = 0;
    while (str1[len] != '\0')  // 计算str1的长度
    {
        len++;
    }
    char str2[256];  // 创建一个足够大的数组str2来存储str1的副本
    for (int i = 0; i < len; ++i)  // 手动赋值
    {
        str2[i] = str1[i];
    }
    str2[len] = '\0';  // 在str2的末尾添加结束符
    cout << "str2: " << str2 << endl;
}
```

运行结果：

```text
str2: Hello
```

**解析**　字符数组不能直接赋值，所以这里用循环逐元素复制。

1. `char str1[] = "Hello";` 的长度是 6，前五个是字母，第六个是 `'\0'`。`while (str1[len] != '\0') len++;` 从下标 0 开始数，遇到结束符停止，得到 `len = 5`。
2. `char str2[256];` 只是分配了 256 个字符的位置，局部数组没有初始化，内容是不确定的。它的容量远大于 5，足够放下副本。
3. `for (int i = 0; i < len; ++i)` 只复制下标 0 到 4 的五个字符。循环结束后 `str2[0]` 到 `str2[4]` 是 `Hello`，但 `str2[5]` 还没有被写过。
4. `str2[len] = '\0';` 在 `str2[5]` 写入结束符。若省略这一行，`cout << str2` 会从 `str2` 开始一直读到偶然出现的 0 字节，输出内容不可预测，属于未定义行为。
5. 复制完成后 `str2` 是 `"Hello"`，与 `str1` 内容相同但存储独立。修改 `str2[0]` 不会影响 `str1`。

`<cstring>` 在这个例子里其实没有被用到，因为复制完全由手写循环完成；保留它不影响结果，但可以删掉。若改用库函数，`strcpy_s(str2, sizeof(str2), str1);` 一行就能完成同样的复制，并且由函数负责写入结束符，见例5.25。

#### C 风格字符串函数及平台扩展

C 语言标准库提供了一组处理 C 风格字符串的函数。要使用它们，必须包含相应的 C 头文件：

```cpp
#include <cstring>
```

`cstring` 是 `string.h` 的 C++ 版本。常用的函数如下：

| 函数原型 | 功能 |
| --- | --- |
| `errno_t strcpy_s(char *dest, rsize_t destsz, const char *src);` | 将 `src` 指向的字符串安全地复制到 `dest` 指向的位置，`destsz` 是 `dest` 的大小 |
| `errno_t strncpy_s(char *dest, rsize_t destsz, const char *src, rsize_t count);` | 将 `src` 指向的字符串的前 `count` 个字符安全地复制到 `dest`，`destsz` 是 `dest` 的大小 |
| `errno_t strcat_s(char *dest, rsize_t destsz, const char *src);` | 将 `src` 指向的字符串安全地连接到 `dest` 指向的字符串末尾，`destsz` 是 `dest` 的大小 |
| `errno_t strncat_s(char *dest, rsize_t destsz, const char *src, rsize_t count);` | 将 `src` 的前 `count` 个字符安全地连接到 `dest` 末尾，`destsz` 是 `dest` 的大小 |
| `int strcmp(const char *s1, const char *s2);` | 比较两个字符串：相等返回 0，`s1` 小于 `s2` 返回负数，大于返回正数 |
| `int strncmp(const char *s1, const char *s2, size_t n);` | 比较两个字符串的前 `n` 个字符 |
| `size_t strlen(const char *s);` | 返回字符串长度，不包括结尾的空字符 |

这些带 `_s` 的函数属于 C11 的“边界检查接口”（Annex K），在 Visual Studio 的 C 运行库中可用；`errno_t` 和 `rsize_t` 也是这套接口引入的类型。它们不是所有编译器都提供，跨平台代码要确认实现是否支持，或者改用其他方案。表里的 `destsz` 参数要传**目标数组的容量**，通常写 `sizeof(dest)`，不是 `strlen(dest)`；后者是当前长度，不是剩余空间。带 `_s` 的函数返回 `errno_t`：0 表示成功，非 0 表示失败；具体错误码由实现定义。

经典的同名函数没有 `_s` 后缀，也不接收目标容量，风险更大：

| 函数 | 主要风险 |
| --- | --- |
| `strcpy(dest, src)` | 不检查 `dest` 容量，`src` 过长就缓冲区溢出 |
| `strcat(dest, src)` | 不检查 `dest` 剩余空间，且要求 `dest` 本身已有 `'\0'` |
| `strncpy(dest, src, n)` | 最多复制 `n` 个字符；`src` 长度大于等于 `n` 时可能不写 `'\0'`，需要自己补 |
| `strlen(s)` | 必须能找到 `'\0'`，否则一直向后扫描，越界读取 |
| `cin >> buf` | 不知道数组容量，输入过长就写越界 |

`strncpy_s` 在成功时会保证目标串以 `'\0'` 结尾（`count` 小于 `destsz` 的前提下）；`strncpy` 不保证。`strcat_s` 会检查目标容量和现有字符串是否以 `'\0'` 结尾；`strcat` 不会。`strcmp` 返回的是负数、0 或正数，不是布尔值：`if (strcmp(a, b))` 表示“不相等”，`if (strcmp(a, b) == 0)` 才表示“相等”；也不能写 `strcmp(a, b) == true`，因为正数不一定是 1。

#### 例5.25 使用 C 风格字符串的标准库函数

```cpp
#include <iostream>
#include <cstring>   // 包含C风格字符串操作函数
using namespace std;

int main()
{
    char str1[50] = "Hello";   // 定义C风格字符串
    char str2[50] = "C++ World";
    char str3[100];
    char str4[50];
    int result;

    result = strcpy_s(str3, sizeof(str3), str1);  // 使用strcpy_s复制字符串
    if (result == 0) {
        cout << "After strcpy_s: " << str3 << endl;
    }
    else {
        cout << "Error occurred during strcpy_s." << endl;
    }

    result = strncpy_s(str4, sizeof(str4), str2, 3);  // 使用strncpy_s安全复制字符串
    if (result == 0) {
        cout << "After strncpy_s: " << str4 << endl;
    }
    else {
        cout << "Error occurred during strncpy_s." << endl;
    }

    result = strcat_s(str3, sizeof(str3), " ");  // 在str3的末尾添加一个空格
    if (result == 0) {
        cout << "After strcat_s (adding space): " << str3 << endl;
    }
    else {
        cout << "Error occurred during strcat_s (adding space)." << endl;
    }

    result = strcat_s(str3, sizeof(str3), str2);  // 使用strcat_s连接字符串
    if (result == 0) {
        cout << "After strcat_s: " << str3 << endl;
    }
    else {
        cout << "Error occurred during strcat_s." << endl;
    }

    result = strcmp(str1, str3);
    if (result == 0) {
        cout << "strcmp: str1 and str3 are equal." << endl;
    }
    else {
        cout << "strcmp: str1 and str3 are not equal." << endl;
    }
}
```

运行结果：

```text
After strcpy_s: Hello
After strncpy_s: C++
After strcat_s (adding space): Hello 
After strcat_s: Hello C++ World
strcmp: str1 and str3 are not equal.
```

（`After strcat_s (adding space): Hello ` 这一行末尾有一个空格，是 `strcat_s` 追加的那个空格；终端里不太容易看出来。）

**解析**　这个例子把常用的复制、连接、比较函数放在一条时间线上，每一步都检查返回值。

1. `str1` 是 `"Hello"`，`str2` 是 `"C++ World"`，`str3` 容量 100，`str4` 容量 50。`sizeof(str3)` 是 100，`sizeof(str4)` 是 50，传的是容量而不是当前长度。
2. `strcpy_s(str3, sizeof(str3), str1)` 把 `"Hello"` 连同 `'\0'` 复制到 `str3`，返回 0，输出 `After strcpy_s: Hello`。`str3` 的其余字节仍未初始化，但字符串在 `str3[5]` 的 `'\0'` 处结束，后续输出不会读到它们。
3. `strncpy_s(str4, sizeof(str4), str2, 3)` 只复制 `str2` 的前 3 个字符 `C++`，并在成功时补上 `'\0'`，所以输出 `After strncpy_s: C++`。这里 `count = 3` 小于 `destsz = 50`，不会越界；`str4` 后面原来的内容与结果无关。若 `count` 大于等于 `destsz`，函数会报错，而不是悄悄截断。
4. `strcat_s(str3, sizeof(str3), " ")` 在 `str3` 的 `"Hello"` 末尾追加一个空格，返回 0，输出 `Hello `。`strcat_s` 要求 `str3` 本身已经以 `'\0'` 结尾，上一步的 `strcpy_s` 已经保证了这一点。
5. `strcat_s(str3, sizeof(str3), str2)` 再追加 `"C++ World"`，得到 `"Hello C++ World"`，输出 `After strcat_s: Hello C++ World`。`str3` 容量 100，最终长度 15（加结束符共 16 个字节），空间充足。
6. `strcmp(str1, str3)` 比较 `"Hello"` 和 `"Hello C++ World"`。前 5 个字符相同，随后 `str1` 到达 `'\0'`，而 `str3` 的下一个字符是空格；`'\0'` 的码值 0 小于空格的码值 32，所以 `str1` 小于 `str3`，返回负数。`result == 0` 不成立，输出 `not equal`。

每一步都检查 `result == 0` 是必要的：`_s` 函数在失败时返回非 0，具体错误码由实现定义；在某些实现中，严重错误还可能触发“无效参数处理程序”，直接终止程序。课程代码至少把失败情况打印出来，工程代码还应进一步处理或记录错误。

#### C 风格字符串的注意事项

**内存管理。** 使用字符数组时，要确保数组大小足够容纳字符串的全部字符及其终止符 `'\0'`。使用字符指针时，要特别注意指针指向的内存是否有效：它可能指向字符数组、字符串常量、动态分配的内存，也可能尚未初始化。指向字符串常量的指针只能读，不能写；指向局部数组的指针在数组生命周期结束后失效。

**边界检查。** 许多 C 风格字符串操作函数不进行边界检查，可能造成缓冲区溢出和安全漏洞。例如：

```cpp
char buf[8];
strcpy(buf, "Hello, world!");   // 危险：源串 13 个字符加 '\0'，buf 只有 8 个字节
```

这段代码的行为是未定义的，不能写出“它会输出什么”或“它一定会崩溃”的确定结论。正确做法是保证目标容量足够，或使用带容量参数的 `strcpy_s`：

```cpp
char buf[16];
strcpy_s(buf, sizeof(buf), "Hello, world!");   // 目标容量 16，足够
```

其他常见陷阱可以集中记成一张表：

| 易错点 | 问题 | 正确做法 |
| --- | --- | --- |
| 字符数组没有 `'\0'` | `cout << a`、`strlen(a)` 会越界读取，结果不可预测 | 初始化时补 `'\0'`，或确保部分初始化留下 0 元素 |
| 把 `sizeof` 当字符串长度 | `sizeof(a)` 是数组容量，`sizeof(p)` 是指针大小 | 用 `strlen` 求当前字符数；用 `sizeof` 求数组容量 |
| 用 `strcmp` 当布尔值 | 返回负数/0/正数，正数不一定是 1 | 用 `strcmp(a, b) == 0` 判断相等，用 `< 0`、`> 0` 判断大小 |
| 字符数组直接赋值 | `a = b;`、`a = "Hello";` 非法 | 逐元素复制并补 `'\0'`，或用 `strcpy_s` |
| `cin >>` 读字符串 | 不知道数组容量，输入过长会溢出；遇到空白就停 | 用 `cin.width(n)` 限宽，或 `cin.getline(buf, n)` |
| 修改字符串常量 | `char* p = "Hello"; p[0] = 'h';` 是未定义行为 | 用 `const char*`，需要修改时复制到字符数组 |

还要分清三个容易混的符号：`'\0'` 是码值为 0 的字符，用作字符串结束符；`'0'` 是数字字符 0，码值是 48，不是结束符；`nullptr` 是空指针值，不是字符。把 `'0'` 当成结束符，字符串就不会在预期位置停止；把 `nullptr` 当成字符，类型也不对。

#### 课堂练习（字符串）

**练习1（单选）** 已知 `char *a[] = {"fortran", "basic", "pascal", "java", "c++"};` 则 `cout << a[3];` 的显示结果是（ ）。

A. `t`　B. 一个地址值　C. `java`　D. `c++`

**答案：C（补充解答）。** `a` 是一个含 5 个元素的数组，每个元素是 `char*`，分别指向五个字符串常量。下标从 0 开始：`a[0]` 指向 `"fortran"`，`a[1]` 指向 `"basic"`，`a[2]` 指向 `"pascal"`，`a[3]` 指向 `"java"`，`a[4]` 指向 `"c++"`。`cout << a[3]` 输出的是 `a[3]` 这个指针所指向的字符串，所以是 `java`。若写 `cout << *a[3]`，输出的是首字符 `'j'`；若写 `cout << a`，数组名会退化成 `char**`，输出的是指针地址，不是字符串。

原题写的是 `char *a[]`。现代 C++ 的字符串常量类型是 `const char[N]`，用 `char*` 指向它会丢失 `const`，C++11 起这种初始化不再允许；应写成 `const char *a[] = {...};`。这个改动不影响 `a[3]` 的输出。

**练习2（单选）** 设有 `char *s = "ABCDE"; cout << strlen(s) << endl;` 输出结果是（ ）。

A. 6　B. 5　C. 4　D. 1

**答案：B（补充解答）。** `strlen` 从 `s` 指向的 `'A'` 开始数，数到 `'\0'` 之前停止，得到 5。选项 A 的 6 是 `sizeof("ABCDE")` 的结果，因为字符串常量 `"ABCDE"` 含有 5 个字符加一个 `'\0'`，共 6 个 `char`；但 `strlen` 不把结束符算进长度。`sizeof(s)` 则是指针变量的大小，常见平台为 8 或 4，也不是 5。

同样，原题的 `char *s` 应改为 `const char *s`；字符串常量不可写，`strlen` 只读它，所以加上 `const` 后结果不变。

**练习3（主观题）** 写出下列程序的运行结果：

```cpp
#include <iostream>
using namespace std;

int main()
{
    char s[] = "ababcdc";
    int i; char c;
    cout << *s << endl;
    for (i = 1; (c = s[i]) != '\0'; i++)
    {
        switch (c)
        {
        case 'a': s[i] = s[i] + 2; break;
        case 'b': s[i] = s[i] + 4; break;
        case 'c': s[i] = s[i] + 1; break;
        case 'd': s[i] = s[i] - 2; break;
        }
    }
    cout << s << endl;
}
```

**答案：**

```text
a
afcfdbd
```

**补充解析**　第一行 `cout << *s` 只输出 `s[0]`，也就是 `'a'`，不是整个字符串；要输出整个字符串应写 `cout << s`。

循环从 `i = 1` 开始，所以 `s[0]` 不参与修改。每轮先把 `s[i]` 赋给 `c`，再用 `switch` 按字符分支；`break` 防止继续执行后面的 `case`。字符的加减是按其 ASCII 码进行的，小写字母在 ASCII 表中连续，所以 `'a' + 2` 是 `'c'`，`'b' + 4` 是 `'f'`，`'c' + 1` 是 `'d'`，`'d' - 2` 是 `'b'`。

逐个下标看：

| `i` | 原字符 | 分支 | 新字符 |
| --- | --- | --- | --- |
| 1 | `b` | `+4` | `f` |
| 2 | `a` | `+2` | `c` |
| 3 | `b` | `+4` | `f` |
| 4 | `c` | `+1` | `d` |
| 5 | `d` | `-2` | `b` |
| 6 | `c` | `+1` | `d` |

`s[0]` 保持 `'a'`，其余字符依次变成 `f c f d b d`，最终字符串是 `afcfdbd`。循环在 `s[7]` 的 `'\0'` 处停止；`switch` 没有 `default` 分支，遇到 `a`～`d` 以外的字符不会修改，本例没有这种字符。若某个 `case` 漏写 `break`，控制流会继续进入下一个 `case`，同一个字符可能被加两次，这是 `switch` 最常见的错误。

**练习4（主观题）** 写出下列程序的运行结果：

```cpp
#include <iostream>
using namespace std;

int main()
{
    char s1[] = "element", s2[] = "elephant";
    char *p, *q;
    cout << s1 << endl;
    cout << s2 << endl;
    p = s1; q = s2;
    while (*p && *q)
    {
        if (*p == *q)
            { (*p)--; (*q)++; }
        p++;
        q++;
    }
    cout << s1 << endl;
    cout << s2 << endl;
}
```

**答案：**

```text
element
elephant
dkdment
fmfphant
```

**补充解析**　前两行是修改前原样输出 `s1`、`s2`；后两行是循环修改后的结果。`p` 和 `q` 分别指向两个字符数组的首字符，`while (*p && *q)` 在任一指针遇到 `'\0'` 时停止，因为 `'\0'` 的码值是 0，作为条件为假。

循环每一轮做三件事：

1. 如果 `*p == *q`，执行 `(*p)--; (*q)++;`。括号很关键：`(*p)--` 是让 `p` 所指的**字符**减 1，`(*q)++` 是让 `q` 所指的字符加 1；若写成 `*p--`，后缀 `--` 会作用于指针 `p`，含义完全不同。
2. `p++`：指针 `p` 移到下一个字符。
3. `q++`：指针 `q` 移到下一个字符。

逐位比较：

| 下标 | `s1` 字符 | `s2` 字符 | 是否相等 | 修改后 |
| --- | --- | --- | --- | --- |
| 0 | `e` | `e` | 是 | `d` / `f` |
| 1 | `l` | `l` | 是 | `k` / `m` |
| 2 | `e` | `e` | 是 | `d` / `f` |
| 3 | `m` | `p` | 否 | 不变 |
| 4 | `e` | `h` | 否 | 不变 |
| 5 | `n` | `a` | 否 | 不变 |
| 6 | `t` | `n` | 否 | 不变 |

前三个位置相同，所以 `s1` 的前三个字符 `e l e` 变成 `d k d`，`s2` 的前三个字符 `e l e` 变成 `f m f`；从下标 3 开始字符不同，不再修改。`s1` 变为 `dkdment`，`s2` 变为 `fmfphant`。`s2` 比 `s1` 多一个字符，循环在 `s1` 的结束符处停止，`s2` 最后的 `'t'` 没有被访问，也没有被修改。

**练习5（主观题）** 写出下列程序的运行结果：

```cpp
#include <cstring>
#include <iostream>
using namespace std;

int main()
{
    char str[][10] = {"Python", "Java", "C++"}, s[10];
    strcpy_s(s, (strcmp(str[0], str[1]) < 0 ? str[0] : str[1]));
    if (strcmp(str[2], s) < 0)
        strcpy_s(s, str[2]);
    cout << s << endl;
}
```

**答案：**

```text
C++
```

**补充解析**　`str` 是一个二维字符数组，三行分别是 `"Python"`、`"Java"`、`"C++"`，每行宽度 10，足够容纳最长的 `"Python"`（6 个字符加 `'\0'`）。`s` 是容量 10 的字符数组，用来保存当前字典序最小的字符串。

1. `strcmp(str[0], str[1])` 比较 `"Python"` 和 `"Java"`。按字符编码逐位比较，首字符 `'P'` 的码值大于 `'J'`，所以 `"Python"` 大于 `"Java"`，`strcmp` 返回正数，条件 `< 0` 为假，三目运算符选择 `str[1]`，即 `"Java"`。`strcpy_s` 把 `"Java"` 复制到 `s`。
2. `strcmp(str[2], s)` 比较 `"C++"` 和 `"Java"`。首字符 `'C'` 的码值小于 `'J'`，所以 `"C++"` 小于 `"Java"`，`strcmp` 返回负数，条件 `< 0` 为真，执行 `strcpy_s(s, str[2]);`，把 `s` 改成 `"C++"`。
3. 输出 `s`，得到 `C++`。

这里两次 `strcpy_s` 都只传了两个实参。Visual Studio 的 `<cstring>` 提供了一个针对数组的模板重载：

```cpp
template <size_t size>
errno_t strcpy_s(char (&dest)[size], const char *src);
```

编译器能从 `char s[10]` 推出 `size = 10`，所以 `strcpy_s(s, src)` 在 MSVC 中能通过。这个重载不是标准 C++ 的一部分，换到 GCC/Clang 可能编译失败；在实现提供 `strcpy_s` 时，可以显式传入容量以避开 MSVC 的两参模板重载；但三参版本也不是 ISO C++ 必须提供的接口，不能据此保证 GCC/Clang 跨平台可用：

```cpp
strcpy_s(s, sizeof(s), (strcmp(str[0], str[1]) < 0 ? str[0] : str[1]));
if (strcmp(str[2], s) < 0)
    strcpy_s(s, sizeof(s), str[2]);
```

另外，源代码没有检查 `strcpy_s` 的返回值；本例中 `s` 的容量 10 足够放下 `"Python"`、`"Java"`、`"C++"` 中最长的 7 个字符（含 `'\0'`），所以不会失败。工程代码仍应检查返回值，避免复制失败后继续使用未完整写入的 `s`。

### 5.4.4 数组与函数

数组作为实参时不做整体复制：调用处把首元素的地址交给形参，函数通过这个地址间址访问调用方的数组元素。所以数组参数天然是"共享"的——函数里改了元素，调用方立刻可见。这既是它高效的原因，也是必须用 `const` 保护实参的原因。

#### 1. 数组作为函数参数：数组名退化为指针

数组名在多数表达式里会转换成指向首元素的指针（退化）；只有 `sizeof`、`&`、用字符串字面量初始化字符数组等少数场合还保留"数组"身份。

由此得到形参的三条规则。

1. 形参写成 `T a[]`（或 `T a[10]`）只是外观，编译器一律调整为 `T *a`。`void f(int a[10])` 与 `void f(int *a)` 是同一个函数，不能凭这一点重载出两个版本；方括号里的长度被忽略，写 `100` 也不产生任何越界检查。
2. 形参 `a` 是指针变量，不是数组名。`sizeof(a)` 得到指针大小（32 位 4 字节，64 位 8 字节），不是调用方数组的字节数；`a = p` 这类赋值合法，而真正的数组名不可赋值。
3. 长度不随地址传进来，元素个数必须另设参数。凡在函数内按下标遍历，就一定要同时拿到长度，否则循环边界只能靠猜。

二维数组同理，但退化结果不是 `T *`，而是"行指针"：`int a[3][10]` 退化为 `int (*)[10]`，它指向一整行（10 个 `int`）。因此形参第二维及以后必须写全，只有第一维可以省。

还有一条标准层面的限制：数组不能整体拷贝、赋值，也不能作函数返回类型。所谓"函数返回数组"，实际只能返回指向数组的指针或引用；若返回局部数组的地址，函数一结束就悬空。

#### 例5.26 用数组名作函数参数计算平均成绩

题面：把 5 个学生成绩放在数组里，用数组名作实参，求平均分。

```cpp
#include <iostream>
using namespace std;
double calculateAverage(double scores[], int size); // 函数声明，计算平均值

int main()
{
    double C1_scores[] = { 85.5, 90.0, 78.2, 92.5, 88.0 };
    int size = sizeof(C1_scores) / sizeof(C1_scores[0]); // 计算数组中元素的数量
    double average = calculateAverage(C1_scores, size);  // 计算平均值
    cout << "The average C1_score is: " << average << endl; // 输出平均值
}

double calculateAverage(double scores[], int size)
{
    double sum = 0.0; // 用于累加成绩的变量
    for (int i = 0; i < size; ++i) {
        sum += scores[i]; // 累加数组中的成绩
    }
    return sum / size; // 计算平均值并返回
}
```

运行结果：

```text
The average C1_score is: 86.84
```

为什么要两个参数：函数只收到 `C1_scores` 的首地址，从地址本身推不出"有 5 个元素"。`size` 必须在 `main` 里算好再传——此刻 `C1_scores` 还是真数组，`sizeof(C1_scores)` 是整个数组的字节数 40，除以 `sizeof(C1_scores[0])` 的 8 得 5。若把这句搬进 `calculateAverage`，`scores` 已是指针，`sizeof(scores)` 只有 4 或 8，算出来的"长度"毫无意义。

形参 `double scores[]` 与 `double scores[5]`、`double *scores` 三者等价，方括号里的数字不参与类型，也不做检查。

#### 例5.27 用指针形参改写同一函数

题面：把上一例的形参改成指针，循环内用指针自增遍历。

```cpp
#include <iostream>
using namespace std;
double calculateAverage(double *scores, int size); // 函数声明，计算平均值

int main()
{
    double C1_scores[] = { 85.5, 90.0, 78.2, 92.5, 88.0 };
    int size = sizeof(C1_scores) / sizeof(C1_scores[0]); // 计算数组中元素的数量
    double average = calculateAverage(C1_scores, size);  // 计算平均值
    cout << "The average C1_score is: " << average << endl; // 输出平均值
}

double calculateAverage(double *scores, int size)
{
    double sum = 0.0; // 用于累加成绩的变量
    for (int i = 0; i < size; ++i) {
        sum += *scores; // 累加数组中的成绩
        scores++;       // 指向数组的下一个元素
    }
    return sum / size; // 计算平均值并返回
}
```

运行结果与例5.26 完全相同：

```text
The average C1_score is: 86.84
```

`*scores` 取当前元素、`scores++` 移到下一个元素，合起来就是 `scores[i]` 的逐步展开。这里能放心自增，是因为形参 `scores` 是实参地址的副本：指针后移只改变函数内的副本，`main` 里的 `C1_scores` 仍指向原处。若在函数里对数组名本身做 `++`，编译就不会通过。

#### 例5.28 形参数组的 sizeof 陷阱

题面：分别用 `int[]`、`double[]`、`char[]` 作形参，在函数内和调用处各求一次 `sizeof`，观察差异。

```cpp
#include <iostream>
using namespace std;
void test(int ap[], double bp[], char cp[]) {
    cout << "sizeof (ap) = " << sizeof(ap) << endl; // 输出整数数组指针的大小
    cout << "sizeof (bp) = " << sizeof(bp) << endl; // 输出双精度浮点数数组指针的大小
    cout << "sizeof (cp) = " << sizeof(cp) << endl; // 输出字符数组指针的大小
}

int main() {
    int intArray[10] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };                            // 整数数组
    double doubleArray[10] = { 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0 };   // 双精度浮点数数组
    char charArray[10] = { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j' };         // 字符数组
    cout << "sizeof (intArray) = " << sizeof(intArray) << endl;
    cout << "sizeof (doubleArray) = " << sizeof(doubleArray) << endl;
    cout << "sizeof (charArray) = " << sizeof(charArray) << endl;
    test(intArray, doubleArray, charArray);
}
```

运行结果：

```text
sizeof (intArray) = 40
sizeof (doubleArray) = 80
sizeof (charArray) = 10
sizeof (ap) = 4
sizeof (bp) = 4
sizeof (cp) = 4
```

对照着看：调用处的 40、80、10 是三个数组的真实字节数，函数内的 4、4、4 完全一样，与元素类型无关——因为 `ap`、`bp`、`cp` 都只是指针。4 表明该示例采用 4 字节指针环境；常见 Windows 64 位目标下这三行通常是 8，具体仍由目标实现决定。这条差异正是"函数里 `sizeof` 拿不到数组长度"的直接证据。

形参也可以直接写指针：

```cpp
void test(int *ap, double *bp, char *cp)
```

它与 `int ap[]` 是同一类型，改后输出不变，所以页面上问"有区别吗"——没有区别。但调用处不能跟着改：

```cpp
int *intArray = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 }; // 错误
```

指针只能用地址（另一个指针或 `nullptr`）初始化，花括号列表是数组的初始化形式，不能拿来初始化指针，编译报错。要动态得到同样的数组，得用 `new int[10]{...}`（见 5.5 动态存储）。

#### 例5.29 修改数组元素与 const 保护

题面：把学生成绩数组传给两个函数，一个负责打印，一个把每个成绩乘以系数 1.05，最后再打印一次。

```cpp
#include <iostream>
using namespace std;
void printScores(const double scores[], int size);              // 函数声明，打印成绩
void scaleScores(double scores[], int size, double factor);     // 函数声明，修改学生成绩并输出

int main() {
    double C1_scores[] = { 85.5, 90.0, 78.2, 92.5, 88.0 };       // 学生成绩数组
    int size = sizeof(C1_scores) / sizeof(C1_scores[0]);         // 计算数组中元素的数量
    cout << "Original scores: ";                                 // 输出原始成绩
    printScores(C1_scores, size);
    scaleScores(C1_scores, size, 1.05);                          // 修改成绩，每个成绩乘以 1.05 的系数
    cout << "Scaled scores: ";                                   // 输出修改后的成绩
    printScores(C1_scores, size);
}

// 函数定义，打印成绩
void printScores(const double scores[], int size) {
    for (int i = 0; i < size; ++i) {
        cout << scores[i] << " ";
    }
    cout << endl;
}

// 函数定义，修改学生成绩
void scaleScores(double scores[], int size, double factor) {
    for (int i = 0; i < size; ++i) {
        scores[i] *= factor; // 将每个成绩乘以系数
    }
}
```

运行结果：

```text
Original scores: 85.5 90 78.2 92.5 88
Scaled scores: 89.775 94.5 82.11 97.125 92.4
```

两次打印的结果不同，说明 `scaleScores` 改的是 `main` 里的数组本体，不是副本：形参 `scores` 拿着同一段地址，`scores[i] *= factor` 直接写回原内存。`printScores` 的形参加了 `const`，函数体内只能读、不能写，一旦误写 `scores[i] = 0` 编译器就报错，实参因此得到保护。只读访问就加 `const`，这是数组参数默认该有的写法；`scaleScores` 要改元素，只能不加。

`90.0` 输出成 `90` 是 `cout` 默认浮点格式的结果，不是数值被截断。

> 标题此处写作"例5.28"，与前一例重号；同一例题的前几页标为 例5.29。按 5.29 记，不重排全章编号。

#### 2. 函数与二维数组：形参是行指针

二维数组名退化为指向第一行的指针。以 3 行 4 列为例：

```cpp
int myArray[3][4] = { {1,2,3,4}, {6,7,8,9}, {2,4,6,7} };
int total = sum(myArray, 3);
```

`myArray` 的类型是 `int (*)[4]`——加 1 跳过 4 个 `int`，正好一行。所以 `sum` 的正确原型只有两种写法：

```cpp
int sum(int (*arr)[4], int size);
int sum(int arr[][4], int size);
```

两种写法完全等价，第二种是第一种的"数组外观"。列数 4 必须出现在类型里：`arr[i]` 的类型是 `int[4]`，步长就是 4 个 `int`，编译器靠它算第 `i` 行的起始位置（$i \times 4$ 个元素），再靠它算 `arr[i][j]` 的地址。少了这个维度，`arr[i]` 不知道该跨多远，表达式的类型也就无从确定。顺带说明，这里的维度只参与地址计算，不产生运行时越界检查。

不能写成 `int **arr`。`int**` 表示"指向 `int*` 的指针"，即指针数组的首地址；`int (*)[4]` 表示"指向 4 个 int 的数组的指针"。两者布局不同：前者 `arr[i]` 先从内存里读一个地址再解引用，后者 `arr[i]` 是行内偏移。把二维数组强转成 `int**` 再按下标访问，会先把数组里的整数当成地址去解引用，属于未定义行为，可能立刻崩溃。

| 形参写法 | 实际类型 | 能否接收 `int a[3][10]` |
| --- | --- | --- |
| `int arr[][10]` | `int (*)[10]` | 可以 |
| `int (*arr)[10]` | `int (*)[10]` | 可以 |
| `int *arr` | `int *` | 不可以，`int(*)[10]` 不能隐式转 `int*` |
| `int **arr` | `int **` | 不可以，类型不兼容，强转后访问是未定义行为 |

#### 例5.30 二维数组作为函数参数

题面：定义一个 $3 \times 10$ 的二维数组，用函数求所有元素之和，再用另一个函数按行打印。

```cpp
#include <iostream>
using namespace std;

int sumOfArray(int arr[][10], int rows)
{
    int sum = 0;
    for (int i = 0; i < rows; ++i) {
        for (int j = 0; j < 10; ++j) {
            sum += arr[i][j];
        }
    }
    return sum;
}

void printArray(const int arr[][10], int rows)
{
    for (int i = 0; i < rows; ++i) {
        for (int j = 0; j < 10; ++j) {
            cout << arr[i][j] << " ";
        }
        cout << endl;
    }
}

int main()
{
    // 定义一个 3x10 的二维数组
    int myArray[3][10] = {
        {1, 2, 3, 4, 5, 6, 7, 8, 9, 10},
        {11, 12, 13, 14, 15, 16, 17, 18, 19, 20},
        {21, 22, 23, 24, 25, 26, 27, 28, 29, 30}
    };

    // 计算二维数组中所有元素的和
    int totalSum = sumOfArray(myArray, 3);
    cout << "The sum of all elements in the array is: " << totalSum << endl;

    // 打印二维数组的所有元素
    cout << "The elements of the array are:" << endl;
    printArray(myArray, 3);
}
```

运行结果：

```text
The sum of all elements in the array is: 465
The elements of the array are:
1 2 3 4 5 6 7 8 9 10
11 12 13 14 15 16 17 18 19 20
21 22 23 24 25 26 27 28 29 30
```

为什么只传 `rows` 不传列数：列数 10 已经写死在形参类型 `int arr[][10]` 里，编译器用它算行偏移；行数即使写进第一维的方括号也会被忽略，编译器不拿它做任何检查，所以只能作为参数传入。求和结果 465 就是 $1+2+\cdots+30$，可以当成一次手工校验。

`printArray` 的形参加 `const`，因为打印不该改数据；若不加，编译也能过，但函数就有了误改实参的可能。

> 原代码第 1、2 行重复包含 `<iostream>`，此处只保留一行，删除重复不影响任何行为。

#### 例5.31 数组的降维处理

题面：把二维数组按行优先的存储顺序当作一维数组，用一级指针加行列下标换算，求第 `i` 行到第 `j` 行元素之和。

```cpp
#include <iostream>
using namespace std;
// 函数用于求第 i 行到第 j 行元素的和（通过一维数组模拟二维数组存储来计算）
int sumRows(int* oneDArray, int cols, int i, int j)
{
    if (i < 0 || j >= cols || i > j) {
        cout << "Invalid row indices." << endl;
        return 0; // 返回 0 或者可以抛出异常
    }
    int sum = 0;
    for (int row = i; row <= j; ++row) {
        for (int col = 0; col < cols; ++col) {
            sum += oneDArray[row * cols + col];
        }
    }
    return sum;
}

int main()
{
    const int Rows = 3;
    const int Cols = 4;

    // 定义二维数组并初始化
    int twoDArray[Rows][Cols] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };

    int i = 0; // 起始行
    int j = 2; // 结束行

    // 求第 i 行到第 j 行元素的和
    int result = sumRows(&twoDArray[0][0], Cols, i, j);
    cout << "The sum from row " << i << " to row " << j << " is: " << result << endl;
}
```

运行结果：

```text
The sum from row 0 to row 2 is: 78
```

`twoDArray` 在内存里是连续 12 个 `int`，第 `row` 行第 `col` 列的元素位于线性下标 `row * cols + col` 处。`&twoDArray[0][0]` 的类型是 `int*`，正好对上形参 `int*`；这一步是关键——不能写 `&twoDArray`（类型 `int (*)[3][4]`），也不能写 `twoDArray`（类型 `int (*)[4]`），两者都传不进 `int*`。

三行分别求和得 $(1+2+3+4)+(5+6+7+8)+(9+10+11+12)=10+26+42=78$。

另一个更根本的限制是：二维数组的每一行是独立的内层数组对象。从 `&twoDArray[0][0]` 得到的 `int*` 不能按标准指针算术跨过首行去访问后续行；即使存储连续且某次运行打印了 78，这种平铺跨行访问也属于未定义行为。上面的输出是原示例的运行记录，不是标准保证。应改用指向行的指针，按 `array[row][col]` 访问，并单独传入行数校验。

这段代码的边界检查有缺陷：`j >= cols` 拿列数与行下标比较，`sumRows` 根本没收到行数，所以真正该检查的"`j` 是否超过最后一行"无法判断。本例 `Rows = 3`、`Cols = 4`，`j = 2` 侥幸通过；若行数大于列数（例如 5 行 3 列时取 `j = 4`），合法请求会被误判为非法。要修就得再加一个 `rows` 参数，把条件改成 `j >= rows`。正文保留原写法，只标注风险。

#### 例5.32 指向函数的指针数组

题面：把四个计算几何量的函数放进一个数组，循环调用同一套代码算出不同结果。

```cpp
#include <iostream>
using namespace std;
const double PI = 3.1415;                                  // 使用 const 定义常量 PI
double Square_Girth(double l) { return 4 * l; }             // 计算正方形的周长
double Square_Area(double l) { return l * l; }              // 计算正方形的面积
double Round_Girth(double r) { return 2 * PI * r; }         // 计算圆的周长
double Round_Area(double r) { return PI * r * r; }          // 计算圆的面积
typedef double (*ft)(double);                               // 定义函数类型

int main()
{
    double x = 1.23;
    ft pfun[4] = { Square_Girth, Square_Area, Round_Girth, Round_Area }; // 函数指针数组
    for (int i = 0; i < 4; i++) {
        if (pfun[i]) { // 检查函数指针是否为 nullptr
            cout << (*pfun[i])(x) << endl;
        }
        else {
            cout << "Function pointer is null." << endl;
        }
    }
}
```

运行结果：

```text
4.92
1.5129
7.72809
4.75278
```

四个数依次验证：$4 \times 1.23 = 4.92$，$1.23^2 = 1.5129$，$2 \times 3.1415 \times 1.23 = 7.72809$，$3.1415 \times 1.23^2 \approx 4.75278$。四个函数签名都是 `double(double)`，返回类型与参数类型完全相同，才可能装进同一个 `ft` 数组——函数指针数组要求元素类型严格一致，参数或返回类型差一点都放不进去。

`typedef double (*ft)(double);` 定义的是"指向 `double(double)` 函数的指针"这一类型名，`ft pfun[4]` 才是数组：4 个元素，每个都是一个函数指针。这里容易读错的是 `typedef` 的位置——`ft` 是类型名，不是变量，`(*ft)` 的括号不能省，否则 `double *ft(double)` 会变成"返回 `double*` 的函数声明"。

调用形式有三种等价写法：

```cpp
cout << (*pfun[i])(x) << endl;   // 先解引用再调用
cout << pfun[i](x) << endl;      // 函数指针可直接当函数名用
cout << (pfun[i])(x) << endl;    // 括号只起分组作用
```

但不能写 `(&pfun[i])(x)`。`pfun[i]` 本身就是函数指针，`&pfun[i]` 取的是"这个指针变量的地址"，类型是 `ft*`，也就是 `double (**)(double)`，它指向内存里存放函数地址的那个变量，而不是函数代码。用它调用会编译失败——指针变量的地址不是函数地址。

`if (pfun[i])` 在本例永远为真（四个元素都已初始化），留着是防御性写法；如果数组只初始化了一部分，未初始化的元素是空指针，直接调用会崩溃。

#### 课堂练习

**1. 单选题**

有说明语句 `int a[10];` 及函数 `int fun(int x[10], int n) { return sizeof(x); }`，则语句 `cout << fun(a, 10) << endl;` 的显示结果是（ ）。

A. 40　　B. 10　　C. 4　　D. 0

答案：C。

`x` 的声明看似数组，实际被调整为 `int *x`，`sizeof(x)` 求的是指针大小 4 字节；`a` 是 10 个 `int` 共 40 字节，与形参无关；`n` 完全没参与。选 A 是把形参当成了数组本体，选 B 是把长度当成了 `sizeof` 的结果。若在常见的 8 字节指针目标上编译，结果为 8，本题的选项说明它是按 32 位环境出的。

**2. 单选题**

有以下说明语句，则调用函数的正确语句是（ ）。

```cpp
int a[10];
void fun(int *, int n);
```

A. `fun(a, 10);`　　B. `fun(a[0], 10);`　　C. `fun(*a, 10);`　　D. `fun(&a, 10);`

答案：A。

形参是 `int*`，需要地址。`a` 退化为 `&a[0]`，类型 `int*`，正确。B 传的是 `a[0]` 的值（`int`），C 传的是 `*a` 即 `a[0]` 的值（`int`），都不是地址。D 的 `&a` 类型是 `int (*)[10]`，指向整个数组，与 `int*` 不兼容。

**3. 单选题**

有以下说明语句，则调用函数的正确语句是（ ）。

```cpp
int b[4][5];
void fun(int *, int n);
```

A. `fun(b, 20);`　　B. `fun(b[0], 20);`　　C. `fun(b[0][0], 20);`　　D. `fun(&b, 20);`

答案：B。

`b` 退化后是 `int (*)[5]`（行指针），A 类型不符。`b[0]` 是第 0 行这个一维数组，退化为 `int*`，正好匹配，20 恰好是全部 4×5 个元素，函数内可以像访问一维数组那样线性扫完整个二维数组。C 传的是元素值 `int`，D 的 `&b` 是 `int (*)[4][5]`。

**4. 主观题**

```cpp
#include <iostream>
using namespace std;
int f( int [][3], int, int );

int main()
{
    int a[][3] = { 0, 1, 2, 3, 4, 5, 6, 7, 8 };
    cout << f( a, 3, 3 ) << endl;
}

int f( int a[][3], int row, int col )
{
    int i, j, t=0, s=0;
    for( i=0; i<row; i ++)
    {
        for(j=0; j<col; j++)
        {
            a[i][j] ++;
            if( j%2 ) t += a[i][j];
            else s = s + a[i][j];
        }
        cout << t << endl;
    }
    return s ;
}
```

写出运行结果。

答案：

```text
2
7
15
30
```

`a` 按行优先填成三行：`{0,1,2}`、`{3,4,5}`、`{6,7,8}`。每轮先 `a[i][j]++` 再取值，所以参与运算的是"原值 + 1"。`j % 2` 为真时（`j = 1`）累加到 `t`，否则累加到 `s`：`t` 依次得到第 1 列的三行值 $2, 5, 8$，`s` 得到其余六个数 $1, 3, 4, 6, 7, 9$。

输出四行是因为 `cout << t << endl;` 写在外层循环体内，每行结束打印一次累计值：第一行后 $t=2$，第二行后 $t=2+5=7$，第三行后 $t=7+8=15$。函数返回 `s`，`main` 里的 `cout` 再打印 $1+3+4+6+7+9=30$，这就是第四行。误以为只输出两行，通常是没注意 `cout` 的缩进层级。

`a[i][j]++` 直接改动了 `main` 的数组，这也是传地址的结果。另外，原代码把 `else` 顶格写在外层循环的缩进上，视觉上容易误读成"和外层 `for` 配对"；实际它受 `if( j%2 )` 支配，与 `if` 成对，大括号配对也说明 `cout << t` 属于外层循环。书写时把 `else` 缩进到 `if` 下方即可消除歧义。

## 5.5 动态存储

自动局部对象通常在进入相应作用域时建立、离开时销毁。动态存储分配则允许程序根据运行时的需要建立对象，再在不需要时释放。动态对象的生存期由分配与释放操作决定，不会因为保存地址的局部指针离开作用域就自动结束。

### new 建立对象，delete 释放对象

常用形式如下：

```cpp
类型* p = new 类型(初始值);  // 建立一个对象，返回指向它的指针
类型* a = new 类型[长度];    // 建立数组，长度可在运行时确定

delete p;                  // 释放单个对象
delete[] a;                // 释放数组
```

初始值不要求是字面常量，可以是类型允许的表达式。数组长度也不必是编译期常量，这正是动态数组与普通局部定长数组的重要区别。

`new` 表达式不只是得到一块字节空间，还要建立相应类型的对象，并按写法执行初始化。对基本类型，应分清以下几种情形：

| 写法 | 建立的对象及初始状态 |
| --- | --- |
| `new int(10)` | 一个 `int`，初值为 10 |
| `new int` | 一个 `int`，没有指定初值，不能先读后写 |
| `new char`、`new double` | 对应的基本类型对象，同样没有指定初值 |
| `new int[4]` | 四个连续的 `int` 元素，元素没有指定初值 |
| `new int[4]{}` | 四个元素全部初始化为 0 |
| `new int[4]{1, 2}` | 前两个元素为 1、2，其余元素为 0 |

“创建动态数组时不能指定初值”不适用于现代 C++：C++11 起可以使用上述花括号初始化。没有花括号的 `new int[4]` 与带空花括号的 `new int[4]{}`，初始化效果不同。

对应的分配与释放必须配对：

```cpp
int* pvalue1 = new int(10);
char* pvalue2 = new char;
double* pvalue3 = new double;
int* pvalue4 = new int[4];

// pvalue2、pvalue3 和 pvalue4 的元素必须先赋值，才能读取。

delete pvalue1;
delete pvalue2;
delete pvalue3;
delete[] pvalue4;
```

`delete[]` 中的方括号表示释放数组，不需要在括号里填写长度。不能把 `new int[4]` 与 `delete pvalue4` 配对，也不能把 `new int(10)` 与 `delete[] pvalue1` 配对；混用属于未定义行为。

可释放的指针必须满足对应释放操作的要求，例如保存尚未释放的 `new` 对象地址或 `new[]` 数组起始地址；不能释放自动局部变量的地址、数组中间位置或已经释放的地址。空指针是允许的，`delete nullptr` 和对空指针执行 `delete[]` 都不做事。

#### 例5.33 使用指针动态申请内存

题目：动态建立一个初值为 10 的整数，输出后改成 20 再输出；再建立含 5 个元素的整数数组，令第 `i` 个元素等于 `i*i`，输出后释放所申请的空间。

```cpp
#include <iostream>
using namespace std;

int main()
{
    int* ptr = new int(10);
    cout << *ptr << endl;
    *ptr = 20;
    cout << *ptr << endl;

    int* arr = new int[5];
    for (int i = 0; i < 5; ++i) {
        arr[i] = i * i;
    }
    for (int i = 0; i < 5; ++i) {
        cout << arr[i] << " ";
    }
    cout << endl;

    delete ptr;
    delete[] arr;
}
```

输出：

```text
10
20
0 1 4 9 16
```

数组这一行的最后一个数字后仍有一个空格。

这里有两个不同的对象：局部指针变量 `ptr`，以及 `new int(10)` 建立的动态整数。`*ptr = 20` 修改动态整数，不修改 `ptr` 保存的地址；`delete ptr` 结束动态整数的生存期，并归还对应空间，不会删除局部变量 `ptr` 本身。

动态建立的整数没有源码中的变量名，但可以通过保存其地址的指针访问。`arr` 同样只是数组首元素的地址，五个元素的下标为 0～4。先用第一个循环给全部元素赋值，再用第二个循环读取，避免读取未初始化值。

#### 分配失败、悬空指针与内存泄漏

标准的普通 `new` 分配失败时通常抛出 `std::bad_alloc`，不会用返回空指针的方式进入紧随其后的 `if (p == nullptr)` 分支。若希望按返回值判断分配失败，应显式采用不抛出分配失败异常的形式：

```cpp
#include <new>

int* p = new (std::nothrow) int[10];
if (p == nullptr) {
    // 分配失败，不得访问 p[i]。
} else {
    // 使用数组。
    delete[] p;
}
```

这段补充只说明 `int` 数组的分配失败处理；不要把 `nothrow` 理解为任意类型的构造过程都不可能抛异常。

释放以后，指针变量不会自动变成空指针：

```cpp
int* p = new int(10);
int* q = p;        // 两个指针指向同一个动态对象
delete p;
p = nullptr;       // 只清空 p，不能修复 q
// cout << *q;     // 错误：q 已悬空，解引用属于未定义行为
// delete q;       // 错误：同一对象被重复释放
```

如果动态对象还活着，程序却丢失了所有能找到它的地址，就不能再正确释放它，形成内存泄漏。反过来，保存了某个旧地址并不代表对象仍然活着，使用前还要看它的生存期。

### 用 new 建立动态一维数组

题目：建立含 10 个整数的动态数组，以下标方式写入 100～109，再用移动指针的方式依次输出，最后释放数组。

```cpp
#include <iostream>
using namespace std;

int main()
{
    int* p = NULL;
    int* t;
    int i;

    p = new int[10];
    if (p == NULL) {
        cout << "allocation failure\n";
        return 1;
    }
    for (i = 0; i < 10; i++) {
        p[i] = 100 + i;
    }
    cout << endl;
    for (t = p; t < p + 10; t++) {
        cout << *t << " ";
    }
    cout << endl;
    delete[] p;
}
```

输出的数字为：

```text
100 101 102 103 104 105 106 107 108 109
```

第一个 `cout << endl` 会先输出一个空行，数字行的末尾还有一个空格。

上面保留了空指针判断的原写法，但这里的普通 `new` 失败时会抛异常，该判断不能代替异常处理；若要让此分支处理分配失败，应改为 `new (nothrow) int[10]` 并包含 `<new>`。

方法的关键是**保存起始地址，让另一个指针负责遍历**：

| 阶段 | `p` 的含义 | `t` 的含义 |
| --- | --- | --- |
| 分配完成 | 指向第 0 个元素 | 尚未赋值，不可读取 |
| `t = p` | 仍指向第 0 个元素 | 也指向第 0 个元素 |
| 第 `i` 次输出 | 起始地址不变 | 指向下标 `i` 的元素，读到 `100+i` |
| 循环结束 | 仍保存可释放的起始地址 | 等于 `p+10`，只可作为一过尾位置，不可解引用 |
| `delete[] p` 后 | 保存的地址已失效 | 同样不再指向存活数组中的位置 |

`p[i]` 与 `*(p+i)` 访问同一个元素。写入循环只改变偏移量 `i`，不改变 `p`；读取循环改变 `t`，也不改变 `p`。因此最后仍能把 `new[]` 返回的起始地址交给 `delete[]`。

#### 讨论：为什么不能移动唯一的起始指针后直接 delete[]

若把输出循环改成：

```cpp
for (i = 0; i < 10; p++, i++) {
    cout << *p << " ";
}
delete[] p;  // 错误：p 已不是原分配地址
```

输出阶段中，前 10 次解引用仍然分别访问原数组中的合法元素。但是循环结束时，`p` 已增加 10，成为一过尾指针。此时 `delete[] p` 不满足释放要求，属于未定义行为，不能根据某次运行未崩溃就判断合法。

如果同时没有其他指针保留原地址，程序还会丢失释放入口。安全做法是像前面的程序一样保留 `p`、移动 `t`；或者使用下标遍历。数组长度也要另行保存，`sizeof(p)` 只能得到指针自身的大小，不能恢复动态数组的元素个数。

动态数组的容量在一次分配后不会因移动指针而改变。需要更大空间时，应另行分配、迁移元素并释放旧空间；不能直接写到原容量之外。

### 调用函数建立动态数组

题目：主函数读入长度 `n`，由 `App` 建立含 `n` 个元素的数组并初始化为 0；回到主函数后，把各元素改为 `10+i` 并输出，最后释放。

```cpp
#include <iostream>
using namespace std;

void App(int*& pa, int n);

int main()
{
    int* ary = NULL;
    int i, n;
    cout << "n=";
    cin >> n;
    App(ary, n);
    for (i = 0; i < n; i++) {
        ary[i] = 10 + i;
        cout << ary[i] << " ";
    }
    delete[] ary;
}

void App(int*& pa, int len)
{
    pa = new int[len];
    if (pa == NULL) {
        cout << "allocation failure\n";
        return;
    }
    for (int i = 0; i < len; i++) {
        pa[i] = 0;
    }
}
```

**按代码推得：**若输入 `n=5`，`App` 先把五个元素置为 0；主函数随后逐个覆盖，输出数字 `10 11 12 13 14`，各数字后有空格。置零并没有丢失，是后面的赋值明确覆盖了它。

这里必须传递指针的引用：`int*& pa` 是调用方指针 `ary` 的别名，`pa = new int[len]` 会把新数组地址写入 `ary`。函数结束只撤销形参引用，动态数组仍然存活，主函数可以继续访问并承担最终 `delete[]` 的责任。

#### 讨论：把 int*& 改成 int* 会怎样

```cpp
void App(int* pa, int len)
{
    pa = new int[len];
    for (int i = 0; i < len; i++) {
        pa[i] = 0;
    }
}
```

这时 `pa` 只是 `ary` 的副本。调用时把 `ary` 的空指针值复制给 `pa`；函数内的新地址只赋给副本，没有写回 `ary`。函数返回后：

- `ary` 仍是空指针，主函数若在 `n>0` 时执行 `ary[i] = 10+i`，会解引用空指针，属于未定义行为，没有可保证的输出。
- 新数组的地址随局部形参 `pa` 消失而丢失，数组没有被释放，形成内存泄漏。
- 最后对仍为空的 `ary` 执行 `delete[]` 不会释放那个已经丢失地址的数组。

区别不在于有没有使用 `new`，而在于**新地址有没有传回调用方**。要改变调用方指针本身，可以用指针引用、二级指针，或设计为返回指针；本例用 `int*&` 直接表达这个目的。

原程序没有验证输入和分配失败后的调用方状态。实际使用前应先确认读入成功且 `n` 满足题目范围；负长度不能用来建立这种数组，长度为 0 的数组也不能访问任何元素。若将 `App` 改为 `nothrow` 分配，调用方还必须在返回后判空，再进入访问循环，不能只让 `App` 输出错误并返回。

### 用指针的指针创建动态二维数组

一维动态数组用 `new T[n]` 得到一块连续内存，`T*` 指向首元素，最后 `delete[]` 一次释放。若行数和列数都要在运行时输入，又希望保留 `arr[i][j]` 这样的双下标写法，可以换一种组织方式：先把每一行看成独立的一维数组，再用一个指针数组保存各行的首地址。这个指针数组本身也是动态申请的，于是得到“指针的指针”`int**`。

#### 两级分配

```cpp
int rows, cols;
cin >> rows >> cols;
int** arr = new int*[rows];          // 第一级：rows 个 int* 的数组
for (int i = 0; i < rows; ++i) {
    arr[i] = new int[cols];          // 第二级：每一行单独申请 cols 个 int
}
```

`arr` 的类型是 `int**`，它指向指针数组的第一个元素；每个 `arr[i]` 的类型是 `int*`，指向该行的第一个 `int`。因此：

- `arr[i]` 是第 $i$ 行的首地址，类型 `int*`；
- `arr[i][j]` 是第 $i$ 行第 $j$ 列的元素，类型 `int`；
- 写成指针形式就是 `*(*(arr + i) + j)`：`arr + i` 定位到第 $i$ 个指针元素，解引用得到行首地址，再加 $j$ 并解引用得到元素。

![int 二级指针动态二维数组的两级结构：外层是指针数组，每个元素指向一块单独申请的行内存；行与行之间没有连续关系](/images/campus-cpp-programming/dynamic-2d-int-star-star.svg)

这张图里有 `1 + rows` 块互相独立的内存：一块存放 `rows` 个 `int*`，另外 `rows` 块分别存放每行的 `cols` 个 `int`。行与行之间不保证相邻，甚至不保证按申请顺序排列；能按 `arr[i][j]` 访问，靠的是指针数组里保存的行首地址，而不是行主序的连续布局。

这一点与行指针模型必须分开。若列数在编译期已知，例如 5 列，可以写

```cpp
int (*p)[5] = new int[rows][5];   // 一整块 rows*5 个 int，p 是行指针
```

此时 `p + i` 跳过整整一行（$5$ 个 `int`），`p[i][j]` 落在一块连续内存里，释放只需 `delete[] p`。而 `int**` 的 `arr + i` 只跳过**一个指针**（`sizeof(int*)` 字节），行内元素才由 `arr[i]` 再定位。两者的下标写法相似，类型、步长、内存块数和释放方式都不同，不能把 `int**` 当成二维数组名，也不能把连续行指针模型申请到的整块内存拆成 `delete[] arr[i]` 逐行释放。

#### 例5.34 使用指针的指针创建动态二维数组

```cpp
#include <iostream>
using namespace std;

int main()
{
    int rows, cols;
    cout << "Enter the number of rows and columns: ";
    cin >> rows >> cols;
    int** arr = new int*[rows];  // 分配指针数组的内存，每个元素指向二维数组的一行
    for (int i = 0; i < rows; ++i) {  // 分配每行的内存，行的起始地址由指针数组元素保存
        arr[i] = new int[cols];
    }
    for (int i = 0; i < rows; ++i) {  // 访问内存，给动态数组各元素赋值
        for (int j = 0; j < cols; ++j) {
            arr[i][j] = i * cols + j;  // 赋值
        }
    }
    for (int i = 0; i < rows; ++i) {  // 访问内存，输出动态数组各元素的值
        for (int j = 0; j < cols; ++j) {
            cout << arr[i][j] << " ";
        }
        cout << endl;
    }
    for (int i = 0; i < rows; ++i) {  // 释放二维动态数组的内存
        delete[] arr[i];  // 释放每行的内存
    }
    delete[] arr;  // 释放指向行的指针数组的内存
}
```

运行结果：

```text
Enter the number of rows and columns: 3 5
0 1 2 3 4
5 6 7 8 9
10 11 12 13 14
```

输入 `3 5` 后，`rows = 3`、`cols = 5`。第一级申请 3 个 `int*`，第二级申请 3 块各含 5 个 `int` 的行内存。赋值用 `i * cols + j`，所以第 0 行是 0～4，第 1 行是 5～9，第 2 行是 10～14；这个编号只说明逻辑上的行列位置，并不表示三行在物理上连在一起。输出时每行末尾的 `endl` 负责换行，行内的空格由 `" "` 提供。

#### 释放：先逐行，再外层

释放顺序与申请顺序相反：

```cpp
for (int i = 0; i < rows; ++i) {
    delete[] arr[i];   // 先归还每一行的 cols 个 int
}
delete[] arr;          // 再归还存放 rows 个 int* 的指针数组
```

外层 `arr` 里保存的是各行的首地址，是释放行内存的唯一线索。如果先执行 `delete[] arr`，指针数组本身被归还，`arr[i]` 中保存的行地址随之丢失，各行内存再也无法释放，形成内存泄漏；此后再写 `delete[] arr[i]` 还会访问已经失效的指针。反过来，先逐行释放、最后释放外层，顺序才是安全的。

还有两点容易混：

- `new int*[rows]` 必须配 `delete[] arr`，`new int[cols]` 必须配 `delete[] arr[i]`；用 `delete` 去释放 `new[]` 申请的内存，形式不匹配。
- 每行的 `new int[cols]` 是**独立的一次申请**，不能只写一次 `delete[] arr[0]` 就以为把三行都释放了；必须对每个 `arr[i]` 各释放一次。也不能因为 `arr[0]`、`arr[1]` 打印出的地址看起来接近，就假定它们属于同一块内存。

### 动态申请字符串的存储空间

C 风格字符串以 `'\0'` 作为结束标志。`strlen(s)` 数的是 `'\0'` 之前的字符个数，不包括 `'\0'` 本身；因此要复制一个长度为 $L$ 的字符串，目标缓冲区至少要有 $L+1$ 个字符位置。少申请这一个字节，复制时写入的结束符就会越过缓冲区边界。

#### 例5.35 动态申请字符串的存储空间

```cpp
#include <iostream>
#include <cstring>
using namespace std;

int main()
{
    const char* source = "Hello, China!";
    char* str;
    str = new char[strlen(source) + 1];  // 动态分配内存
    if (str == nullptr) {
        cerr << "Memory allocation failed.\n";
        return 1;
    }
    strcpy_s(str, strlen(source) + 1, source);  // 复制字符串
    cout << "Copied string: " << str << endl;  // 使用字符串
    delete[] str;  // 释放内存
}
```

运行结果：

```text
Copied string: Hello, China!
```

`"Hello, China!"` 有 13 个可见字符：`Hello` 5 个、逗号 1 个、空格 1 个、`China` 5 个、感叹号 1 个。`strlen(source)` 返回 13，所以 `new char[strlen(source) + 1]` 申请 14 个字符位置：

```text
字符   H  e  l  l  o  ,     C  h  i  n  a  !  \0
下标   0  1  2  3  4  5  6  7  8  9 10 11 12  13
```

`strcpy_s` 的第二个参数是目标缓冲区的**总容量**，要包含末尾的 `'\0'`。这里传 `strlen(source) + 1`，正好容纳 13 个字符加 1 个结束符；如果只传 13，结束符没有位置，`strcpy_s` 会按它的运行时约束报错，而不是替你扩容。复制完成后，`str` 指向堆上的这 14 个字节，`cout << str` 从 `str[0]` 开始输出，遇到 `str[13]` 的 `'\0'` 停止。

`char* str;` 只是声明了一个指针，还没有指向任何有效空间；必须先 `new` 再使用，最后用 `delete[]` 归还，且只归还一次。`source` 指向字符串字面量，类型写成 `const char*`，不通过它修改内容。

这段代码里的 `if (str == nullptr)` 是防御性写法。标准 `new` 在失败时抛出 `std::bad_alloc`，并不会返回空指针；若希望用返回值判断失败，应写成 `new (std::nothrow) char[...]`（需要包含 `<new>`）。另外 `strcpy_s` 属于 MSVC 提供的安全 CRT 函数（Annex K），不是所有标准 C++ 实现都有；可移植代码可以用 `strncpy` 并手动补 `'\0'`，或直接用 `std::string`。这些不影响本例的容量计算和释放方式。

### 课堂练习：指针参数与指针引用

```cpp
#include <iostream>
using namespace std;

void newvar1(int *a1)
{
    *a1 *= 20;
    cout << "*a1 = " << *a1 << endl;
}

void newvar2(int * & a2)
{
    a2 = new int(10);
    cout << "*a2 = " << *a2 << endl;
}

int main()
{
    int a = 9, *p = &a;
    cout << *p << endl;
    newvar1(p);
    cout << *p << endl;
    newvar2(p);
    cout << *p << endl;
    cout << a << endl;
}
```

运行结果：

```text
9
*a1 = 180
180
*a2 = 10
10
180
```

**补充解答：** 关键在于两个函数的形参类型不同，一个按值接收指针，一个接收指针的引用。

`main` 中 `a = 9`，`p = &a`，所以第一次 `cout << *p` 输出 9。

调用 `newvar1(p)` 时，形参 `int *a1` 是实参 `p` 的**副本**。副本和 `p` 指向同一个 `a`，因此 `*a1 *= 20` 把 `a` 改成 $9\times 20=180$，函数内输出 `*a1 = 180`。函数返回后，副本消失，但 `p` 仍指向 `a`，所以 `main` 中 `*p` 输出 180。

调用 `newvar2(p)` 时，形参 `int * & a2` 是 `p` 这个指针变量本身的**引用**，`a2` 与 `p` 是同一个变量。执行 `a2 = new int(10)` 改变的是 `p` 的指向：`p` 不再指向 `a`，而指向堆上新申请的、初值为 10 的 `int`。函数内输出 `*a2 = 10`；返回后 `*p` 也输出 10。`a` 没有被这一步修改，仍是 180，所以最后一行输出 180。

如果把 `newvar2` 的形参改成 `int *a2`（按值传递），函数内的 `a2 = new int(10)` 只改变副本，`p` 仍指向 `a`，返回后 `*p` 会是 180，这与原输出不同。由此可见：`int*` 形参能改“指针所指对象”，不能改“调用者的指针本身”；`int*&` 形参才能改调用者的指针。

原题没有释放 `new int(10)` 申请的空间。若这段代码继续运行，应在最后一次使用 `*p` 之后补一句 `delete p;`；`a` 是栈上的局部变量，不需要也不能用 `delete`。

## 5.6 应用举例

选择排序和冒泡排序都直接在原数组上交换元素，不额外申请与 $n$ 等长的辅助数组：选择排序每趟从尚未排好的部分挑出最小元素，放到该趟的起点；冒泡排序反复比较相邻元素，让较大值一步步沉到未排序部分的末尾。

### 1. 选择排序法

#### 算法分析

设数组为 `a[0]`、`a[1]`、…、`a[n-1]`，按升序排列。

- 第 1 趟在 `a[0]`～`a[n-1]` 中找出最小元素，设其下标为 `min_idx`，把 `a[min_idx]` 与 `a[0]` 交换；
- 第 2 趟在 `a[1]`～`a[n-1]` 中找出最小元素，把它与 `a[1]` 交换；
- 依此类推，第 $i$ 趟在 `a[i]`～`a[n-1]` 中找最小值，与 `a[i]` 交换；
- 直到在 `a[n-2]` 与 `a[n-1]` 中选出较小者放到 `a[n-2]`，剩下的 `a[n-1]` 自然是最大值。

写成框架就是：

```text
for (i = 0; i < n - 1; i++) {
    在 a[i] 到 a[n-1] 中找到最小元素的下标 min_idx;
    交换 a[i] 与 a[min_idx];
}
```

“找最小元素”需要再扫一遍后缀。每一趟先把 `min_idx` 设为 `i`，然后让 `j` 从 `i+1` 走到 `n-1`，遇到更小的元素就更新下标：

```text
min_idx = i;
for (j = i + 1; j < n; j++)
    if (a[j] < a[min_idx])
        min_idx = j;
```

这里必须**先扫描完整个后缀，再交换**。如果一边比较一边交换，`a[i]` 的内容会不断变化，刚换到前面的元素又要重新参与比较，既容易写错，也会增加无谓的写操作。先确定后缀最小值的下标，最后只交换一次，是选择排序“每趟至多一次交换”的来源。

#### 选择排序程序

```cpp
#include <iostream>
#include <cstdlib>  // 包含标准函数库，用于随机数生成
#include <ctime>    // 包含时间函数库，用于生成随机数种子
using namespace std;

void sort(int[], int);

int main()
{
    int i, a[10];
    srand((int)(time(0)));  // 设置随机数种子，使用当前时间
    // 使用随机函数初始化数组a
    for (i = 0; i < 10; i++) {
        a[i] = rand() % 100;
    }
    for (i = 0; i < 10; i++) {
        cout << a[i] << " ";
    }
    cout << endl;
    sort(a, 10);  // 调用排序函数，对数组a进行升序排序
    cout << "Ordered:" << endl;
    for (i = 0; i < 10; i++) {
        cout << a[i] << " ";
    }
    cout << endl;
}

void sort(int x[], int n)
{
    for (int i = 0; i < n - 1; i++) {  // 对数组进行排序
        int min_idx = i;  // 初始化最小元素索引为当前索引
        for (int j = i + 1; j < n; j++) {  // 寻找最小元素
            if (x[j] < x[min_idx]) {  // 找到更小的元素，更新最小元素索引
                min_idx = j;
            }
        }
        if (min_idx != i) {  // 如果最小元素不在当前位置
            int temp = x[i];  // 使用临时变量交换当前位置和最小元素位置的值
            x[i] = x[min_idx];
            x[min_idx] = temp;
        }
    }
}
```

运行结果（随机数每次运行可能不同）：

```text
5 76 28 18 47 6 58 22 70 32
Ordered:
5 6 18 22 28 32 47 58 70 76
```

`sort(a, 10)` 把数组名 `a` 传给形参 `int x[]`。数组名退化为指向首元素的 `int*`，函数内部通过 `x[i]` 修改的就是 `main` 中的 `a[i]`，所以排序结果不需要返回。形参 `n` 单独传入长度，是因为 `x` 已经退化为指针，函数内部无法用 `sizeof` 求出数组元素个数。

#### 一趟推演

用 5 个元素 `47, 44, 5, 38, 3` 走一遍。每一行是一趟，不是一次比较：

| 轮次 `i` | 未排序区间 | 扫描过程中 `min_idx` 的变化 | 交换 | 本趟结束后的数组 |
| --- | --- | --- | --- | --- |
| 0 | `a[0..4]` | 0（47）→ 1（44）→ 2（5）→ 4（3） | `a[0]` 与 `a[4]` | 3, 44, 5, 38, 47 |
| 1 | `a[1..4]` | 1（44）→ 2（5） | `a[1]` 与 `a[2]` | 3, 5, 44, 38, 47 |
| 2 | `a[2..4]` | 2（44）→ 3（38） | `a[2]` 与 `a[3]` | 3, 5, 38, 44, 47 |
| 3 | `a[3..4]` | 3（44），`a[4]` 的 47 更大 | 不交换 | 3, 5, 38, 44, 47 |

第 0 趟先假定 47 最小，遇到 44 改成下标 1，遇到 5 改成下标 2，38 没有更小，最后遇到 3 改成下标 4；扫描结束才把 3 换到最前面。后三趟同理。第 3 趟时 `min_idx` 仍为 3，说明 `a[3]` 已经是剩余部分的最小值，`if (min_idx != i)` 为假，跳过交换。

#### 循环不变式与效率

把“第 $i$ 趟开始时”作为观察点，可以得到选择排序的循环不变式：

> `a[0]`～`a[i-1]` 已经按升序放好，并且它们都不大于 `a[i]`～`a[n-1]` 中的任何元素。

初始时 $i=0$，前缀为空，不变式成立。第 $i$ 趟在 `a[i..n-1]` 中找出最小值 `a[min_idx]`，与 `a[i]` 交换后，`a[i]` 成为剩余部分的最小值，前缀扩展到 `a[0..i]`，不变式对 $i+1$ 仍成立。当 $i=n-1$ 时，前缀已有 $n-1$ 个最小元素，最后一个元素只能是最大值，排序完成。

内层循环从 `j = i + 1` 开始，是因为 `min_idx` 初值为 `i`，`a[i]` 已经作为当前最小值参与比较；外层只走到 `i = n - 2`，第 $n-2$ 趟已经在 `a[n-2]` 与 `a[n-1]` 中选出较小者放到 `a[n-2]`，`a[n-1]` 自动是最大值，不需要再为 `i = n-1` 开一趟。

比较次数与输入顺序无关：第 0 趟比较 $n-1$ 次，第 1 趟 $n-2$ 次，……，最后一趟 1 次，总计

$$
(n-1)+(n-2)+\cdots+1=\frac{n(n-1)}{2}
$$

交换次数最多 $n-1$ 次。时间复杂度为 $O(n^2)$，额外空间为 $O(1)$。选择排序的交换次数少，适合“元素较大、交换代价高”的场合；但它不是稳定排序：一次长距离交换可能把两个相等元素的先后顺序颠倒。例如 `5a, 5b, 3` 第一趟会把 3 换到最前面，得到 `3, 5b, 5a`，两个 5 的相对次序变了。

### 随机函数

#### 例5.36 随机数初始化

上面的选择排序程序就是例5.36。它先用 `srand((int)(time(0)))` 设置种子，再用

```cpp
a[i] = rand() % 100;
```

生成 10 个 `0`～`99` 的整数作为待排序数据。随机数常用于构造测试数据和模拟数据；理解它的取值范围和种子，才能判断程序的输出为什么每次不同。

#### `rand` 与 `srand`

C++ 标准库在 `<cstdlib>` 中提供两个产生随机数的函数：

- `rand()`：随机函数，没有参数，返回 `0`～`RAND_MAX` 之间的整数。标准只保证 `RAND_MAX` 至少为 32767；Visual C++ 中它等于 32767。
- `srand(number)`：种子函数，要求一个无符号整型参数，用它设置随机数生成器的启动值。种子相同，随后 `rand()` 产生的序列也相同。

`rand()` 产生的是**伪随机数**：它由一个确定的递推公式算出来，并不是真正的物理随机。正因为确定，给定种子后序列可以复现，调试时很方便；也正因为确定，种子不能让别人轻易猜到，否则序列可被预测。

`time` 在 `<ctime>` 中声明，`time(0)`（或 `time(nullptr)`）返回当前系统时间的整型表示，通常以秒为单位。把它强制转换为 `unsigned` 或 `int` 后传给 `srand`，每次运行得到的种子不同，序列起点就不同。注意：种子值是 `srand` 的**参数**，`srand` 本身返回 `void`，并不是由它“返回”种子。

#### 线性同余法

常见的伪随机数递推公式是线性同余法：

$$
r_k=(a\,r_{k-1}+c)\bmod m
$$

其中 $a$ 是乘数，$c$ 是增量，$m$ 是模数，$r_{k-1}$ 是上一个随机数。原例取

$$
r_k=(25173\,r_{k-1}+13849)\bmod 32767
$$

并称这组参数可以产生 32767 个各不相同的整型随机数。这里说的是该例希望达到的长周期效果；实际周期由 $a$、$c$、$m$ 和初值共同决定，不能只凭模数断定，而且伪随机序列最终一定会重复。

这个公式暴露了一个问题：只要 $r_0$ 已知，后面所有 $r_k$ 都能算出来，序列完全可预测。解决办法是把递推式改成

$$
r_k=(a\cdot\text{number}+c)\bmod m
$$

其中 `number` 是种子值，由 `srand` 的参数给出。换一个种子，序列就从不同位置开始，但在同一库实现中，同一个种子仍然得到同一条序列；不同实现不保证使用同一个生成算法。

#### 区间的推导与取模偏差

`rand()` 的值域是 `0`～`RAND_MAX`，要得到指定区间，先用取模把范围缩到 $0$～$n-1$，再加上下界：

| 目标区间 | 写法 |
| --- | --- |
| `0`～`99` | `rand() % 100` |
| `1`～`100` | `1 + rand() % 100` |
| `a`～`b`（$a\le b$） | `a + rand() % (b - a + 1)` |

例如要生成 `10`～`20`，区间长度是 $20-10+1=11$，写成 `10 + rand() % 11`，结果可能是 10、11、…、20，共 11 个整数。少加 1 会漏掉上界，多加 1 会越出上界。

取模并不完全均匀。在 `RAND_MAX == 32767` 的实现上，以 `rand() % 100` 为例，`rand()` 共有 $32768$ 个可能值（0～32767），而

$$
32768=327\times 100+68
$$

所以余数 `0`～`67` 各有 328 个原值对应，余数 `68`～`99` 各有 327 个原值对应。在假设 rand() 的各个原值等概率时，前 68 个余数出现的概率略高，相对偏差约为 $1/327\approx 0.3\%$。课程练习和一般测试可以忽略这个偏差；如果做高精度模拟或抽奖，就不能直接用 `%`，应使用 `<random>` 中的 `uniform_int_distribution`，它会在给定范围内做正确的均匀映射。加密场景需要专门的密码学随机源，`rand()` 本身不适合。

还要注意两点适用边界：

- 区间长度 `b - a + 1` 不能超过 `RAND_MAX + 1`。若超过，单次 `rand() % n` 无法覆盖整个区间，需要组合多次 `rand()` 或改用更大的随机源。
- 不要写死 32767。不同实现的 `RAND_MAX` 可能不同，需要上界时直接用宏 `RAND_MAX`。

#### 种子只设一次

种子应该在程序开始时设置一次，例如：

```cpp
srand((unsigned)time(nullptr));
for (int i = 0; i < n; i++) {
    a[i] = rand() % 100;
}
```

不要在循环体内反复调用 `srand(time(0))`。同一秒内 `time(0)` 的值相同，`srand` 每次都把序列重置到同一个起点，紧接着的 `rand()` 可能反复得到同一个数；即使跨越了秒，重置序列也会破坏“连续取数”的统计性质。`rand()` 每调用一次就自动前进到序列的下一个值，循环里只需要反复调用 `rand()`。

因此，程序输出的随机数每次运行都可能不同，前面列出的 `5 76 28 18 47 6 58 22 70 32` 只是一次运行的样本，不是固定答案；排序后的 `5 6 18 22 28 32 47 58 70 76` 才是这组样本的确定结果。

### 2. 冒泡排序法

#### 算法分析

冒泡排序的过程就是对相邻元素进行比较和调整。把较小的值想象成水中的气泡，逐渐往上冒；每趟都有一个“最大”的石头沉到水底。

对具有 $n$ 个元素的数组 `b` 按升序排列：

- 第 1 趟：先比较 `b[0]` 和 `b[1]`，如果逆序（`b[0] > b[1]`）就交换；再比较 `b[1]` 和 `b[2]`，依此类推，直到比较完 `b[n-2]` 和 `b[n-1]`。这一趟结束时，最大值被放到最后一个位置 `b[n-1]`。
- 第 2 趟：对 `b[0]`～`b[n-2]` 做同样的操作，次大值被放到 `b[n-2]`。
- 依此类推，直到整个数组有序。

每一趟都从最左边开始，相邻两两比较；由于最大值会像石头一样一路“沉”到本趟的末尾，下一趟就不必再碰已经就位的尾部元素。

#### 冒泡排序程序

```cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

void bubbleSort(int* arr, int size)
{
    bool wasSwapped;  // 局部变量，用于监控是否发生了交换
    for (int i = 0; i < size - 1; i++) {
        wasSwapped = false;  // 每轮开始时重置wasSwapped为false
        for (int j = 0; j < size - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                wasSwapped = true;  // 发生了交换，设置wasSwapped为true
            }
        }
        if (!wasSwapped) {
            break;
        }
    }
}

int main()
{
    const int ARRAY_SIZE = 10;  // 定义数组大小
    int* arr = new int[ARRAY_SIZE];  // 使用new动态申请数组空间
    srand((int)(time(nullptr)));  // 使用当前时间作为随机数种子
    for (int i = 0; i < ARRAY_SIZE; i++) {  // 动态生成随机数组
        arr[i] = rand() % 100;  // 生成0到99之间的随机数
    }
    cout << "Original array:" << endl;  // 输出原始数组
    for (int i = 0; i < ARRAY_SIZE; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    bubbleSort(arr, ARRAY_SIZE);  // 调用冒泡排序函数
    cout << "Sorted array:" << endl;  // 输出排序后的数组
    for (int i = 0; i < ARRAY_SIZE; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    delete[] arr;  // 释放动态数组的内存
}
```

运行结果（随机数每次运行可能不同）：

```text
Original array:
38 2 66 76 58 16 16 52 16 22
Sorted array:
2 16 16 16 22 38 52 58 66 76
```

`bubbleSort` 的形参写成 `int* arr`，与 `int arr[]` 等价，接收的是数组首元素的地址；`size` 单独传入，函数内部据此控制边界。数组里出现重复的 16 是正常的：随机数可以重复，排序只保证非递减，不要求元素互不相同。

#### 一趟推演

用 8 个元素 `49, 38, 65, 97, 76, 13, 27, 52` 走第 1 趟。每一行是一次相邻比较：

| 比较 | 是否交换 | 比较后的数组 |
| --- | --- | --- |
| `b[0]` 与 `b[1]`：49, 38 | 是 | 38, 49, 65, 97, 76, 13, 27, 52 |
| `b[1]` 与 `b[2]`：49, 65 | 否 | 38, 49, 65, 97, 76, 13, 27, 52 |
| `b[2]` 与 `b[3]`：65, 97 | 否 | 38, 49, 65, 97, 76, 13, 27, 52 |
| `b[3]` 与 `b[4]`：97, 76 | 是 | 38, 49, 65, 76, 97, 13, 27, 52 |
| `b[4]` 与 `b[5]`：97, 13 | 是 | 38, 49, 65, 76, 13, 97, 27, 52 |
| `b[5]` 与 `b[6]`：97, 27 | 是 | 38, 49, 65, 76, 13, 27, 97, 52 |
| `b[6]` 与 `b[7]`：97, 52 | 是 | 38, 49, 65, 76, 13, 27, 52, 97 |

第 1 趟结束后，97 沉到 `b[7]`。后续各趟的结果是：

```text
第2趟：38 49 65 13 27 52 76 97
第3趟：38 49 13 27 52 65 76 97
第4趟：38 13 27 49 52 65 76 97
第5趟：13 27 38 49 52 65 76 97
第6趟：13 27 38 49 52 65 76 97（没有交换，提前结束）
```

第 6 趟仍会比较 `13` 与 `27`、`27` 与 `38`、`38` 与 `49`，但一次交换都没有发生，说明数组已经有序，`wasSwapped` 保持 `false`，`break` 直接结束外层循环。如果没有提前结束，程序还会继续执行第 7 趟，做无用的比较。

#### 内外层边界与提前结束

外层 `i` 表示“已经完成了几趟”，从 0 到 `size - 2`。每完成一趟，末尾就多一个已经就位的最大元素；第 `i` 趟开始时，末尾的 `i` 个元素已经是最大的 `i` 个，并且按升序排列。因此内层只需要处理前 `size - i` 个元素，`j` 的最大值是 `size - i - 2`，循环条件写成

```cpp
j < size - i - 1
```

这样 `j + 1` 最大为 `size - i - 1`，不会越过未排序部分的右边界。若写成 `j < size - 1`，每趟都比较到数组末尾，虽然不会越界，但会把已经排好的尾部反复比较；若写成 `j <= size - i - 1`，`j + 1` 就可能取到 `size - i`，当 `i = 0` 时已经是 `size`，直接越界。

`wasSwapped` 必须在每一趟开始时重置为 `false`。它记录的是“本趟有没有发生过交换”，不是“整个排序过程中有没有发生过交换”。如果只在循环外初始化一次，第一趟发生交换后它一直为 `true`，后面即使数组已经有序也不会提前结束。

冒泡排序的循环不变式可以表述为：

> 第 `i` 趟开始时，`b[size-i]`～`b[size-1]` 已经是最大的 `i` 个元素，并且按升序排在末尾；本趟结束后，`b[size-i-1]` 也变成剩余部分的最大值。

内层每比较一次，较大的元素就向右移动一格；走完前 `size-i` 个元素后，其中最大值一定停在 `b[size-i-1]`。这就是“最大值沉底”的准确含义。

#### 效率与稳定性

最坏情况下（完全逆序），第 1 趟交换 $n-1$ 次，第 2 趟交换 $n-2$ 次，……，总交换次数为

$$
(n-1)+(n-2)+\cdots+1=\frac{n(n-1)}{2}
$$

比较次数也是 $O(n^2)$。最好情况下（数组已经有序），第 1 趟只做 $n-1$ 次比较、没有交换，`wasSwapped` 为 `false`，第二趟开始前就退出，时间复杂度为 $O(n)$。平均情况仍是 $O(n^2)$，额外空间为 $O(1)$。

冒泡排序是稳定排序：只有 `arr[j] > arr[j + 1]` 时才交换，两个相等元素不会互相越过，相对顺序保持不变。这一点与选择排序不同；选择排序的长距离交换可能改变相等元素的次序。

两种排序的对比可以归纳为：

| | 选择排序 | 冒泡排序 |
| --- | --- | --- |
| 每趟做什么 | 在后缀中找最小值，与本趟起点交换 | 相邻比较，把最大值逐步送到本趟末尾 |
| 交换次数 | 至多 $n-1$ 次 | 等于逆序对数量，最坏 $\frac{n(n-1)}{2}$ 次 |
| 能否提前结束 | 不能，比较次数固定 | 能，某趟无交换即说明已有序 |
| 稳定性 | 不稳定 | 稳定 |

### 3. 矩阵相乘

#### 题面与维度条件

求两矩阵的乘积 $C=A\times B$。设 $A$ 为 $m\times p$ 矩阵，$B$ 为 $p\times n$ 矩阵，则 $C$ 为 $m\times n$ 矩阵。按矩阵乘法的定义，

$$
c_{ij}=\sum_{k=1}^{p}a_{ik}b_{kj}\quad(i=1,\ldots,m;\ j=1,\ldots,n).
$$

$C$ 的第 $i$ 行第 $j$ 列，是 $A$ 的第 $i$ 行与 $B$ 的第 $j$ 列对应项乘积之和。这里只有一个维度必须相等：**左矩阵的列数 $p$ 等于右矩阵的行数 $p$**。若 $A$ 的列数与 $B$ 的行数不等，乘积没有定义；结果的规模由外层的两个维度决定，是 $m$ 行 $n$ 列，而不是 $p$ 行 $p$ 列。

程序里用二维数组表示矩阵，下标从 0 起，公式随之写成

```cpp
c[i][j] += a[i][k] * b[k][j];   // k = 0 .. p-1
```

题面中提到 $3\times3$ 的 $A$ 乘 $3\times2$ 的 $B$ 得 $3\times2$ 的 $C$，这符合“左列等于右行”的规则；下面先用另一组 $3\times2$ 乘 $2\times3$ 的数据把下标走一遍，再看完整程序的 $4\times3$ 乘 $3\times2$。规模不同，循环的构造相同。

#### 三层循环怎样对应行列

矩阵乘法需要三层循环，每一层各管一个下标：

1. 外层 `i` 选 $A$ 的行，也选 $C$ 的行，范围是 $0\le i<m$。
2. 中层 `j` 选 $B$ 的列，也选 $C$ 的列，范围是 $0\le j<n$。
3. 内层 `k` 沿公共维度走，范围是 $0\le k<p$；它把 $A$ 第 $i$ 行的第 $k$ 项与 $B$ 第 $k$ 行的第 $j$ 项相乘，累加到同一个 $c_{ij}$。

`i` 与 `j` 不能互换：`i` 的范围由 $A$ 的行数决定，`j` 的范围由 $B$ 的列数决定，二者分别是结果的行和列。`k` 是唯一走“公共维度”的下标，它的上界是 $p$，不是 $m$ 或 $n$。

累加之前必须把 `c[i][j]` 置 0。若直接写 `c[i][j] += ...`，不能依赖它的初值：局部数组未初始化，全局数组虽然会被零初始化，但函数不应把正确性建立在调用环境上；若把 `c[i][j] = 0` 放在 `j` 循环之外，只有每行第一列被清零，其余列仍会累加上一次的结果；若把 `=` 写进 `k` 循环，每次都会覆盖前一项，最后只剩 $a_{i,p-1}b_{p-1,j}$。清零的位置应在 `j` 循环内、`k` 循环之前。

![矩阵相乘：A 的一行与 B 的一列做点积，结果放入 C 的对应格；公共维度 p 在求和中走完](/images/campus-cpp-programming/matrix-multiply.svg)

#### 动画推演：3×2 乘 2×3

取

```text
A = [ 5  7 ]        B = [ 12  3  6 ]        C = [  88  29  79 ]
    [ 8  3 ]            [  4  2  7 ]            [ 108  30  69 ]
    [ 7  4 ]                                     [ 100  29  70 ]
```

此时动画里的规模变量是 `cm = 3`（$A$ 的行数）、`cn = 2`（公共维度，$A$ 的列数、$B$ 的行数）、`cl = 3`（$B$ 的列数）。循环写成 `i < cm`、`j < cl`、`k < cn`，与前面的 $m,p,n$ 只是换了一套名字。

第一行三个元素的计算过程是：

```text
c[0][0] = 5*12 + 7*4  = 60 + 28 = 88
c[0][1] = 5*3  + 7*2  = 15 + 14 = 29
c[0][2] = 5*6  + 7*7  = 30 + 49 = 79
```

第二行、第三行同理。以 $c_{12}$ 为例，它是 $A$ 的第 1 行（下标从 0 起）与 $B$ 的第 2 列的点积：

```text
c[1][2] = 8*6 + 3*7 = 48 + 21 = 69
```

动画逐帧显示的是“每加完一项，C 的当前格更新一次”。真正要记住的是：`k` 每走一步，乘的是 $A$ 当前行向右的第 $k$ 项和 $B$ 当前列向下的第 $k$ 项；两项的下标一个固定为 `i`、一个固定为 `j`，只有 `k` 在动。

#### 完整程序：4×3 乘 3×2

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

const int m = 4, p = 3, n = 2;
int a[m][p], b[p][n], c[m][n];

bool multimatrix(const int a[m][p], const int arow, const int acol,
                 const int b[p][n], const int brow, const int bcol,
                 int c[m][n], const int crow, const int ccol);

int main()
{
    int i, j;
    cout << "Please input A:\n";           // 输入矩阵 A 元素
    for (i = 0; i < m; i++) {
        for (j = 0; j < p; j++) {
            cin >> a[i][j];
        }
    }
    cout << "\nPlease input B:\n";         // 输入矩阵 B 元素
    for (i = 0; i < p; i++) {
        for (j = 0; j < n; j++) {
            cin >> b[i][j];
        }
    }
    cout << "\nMatrix A:\n";               // 输出矩阵 A
    for (i = 0; i < m; i++) {
        for (j = 0; j < p; j++) {
            cout << setw(5) << a[i][j];
        }
        cout << endl;
    }
    cout << "\nMatrix B:\n";               // 输出矩阵 B
    for (i = 0; i < p; i++) {
        for (j = 0; j < n; j++) {
            cout << setw(5) << b[i][j];
        }
        cout << endl;
    }
    if (!multimatrix(a, m, p, b, p, n, c, m, n)) {
        cout << "Illegal matrix multiply.\n";
        return 1;                          // 返回非 0 值表示错误
    }
    cout << "\nMatrix C (Result of A*B):\n"; // 输出结果矩阵 C
    for (i = 0; i < m; i++) {
        for (j = 0; j < n; j++) {
            cout << setw(5) << c[i][j];
        }
        cout << endl;
    }
    return 0;
}

bool multimatrix(const int a[m][p], const int arow, const int acol,
                 const int b[p][n], const int brow, const int bcol,
                 int c[m][n], const int crow, const int ccol)
{
    if (acol != brow || crow != arow || ccol != bcol)
        return false;
    for (int i = 0; i < crow; i++) {
        for (int j = 0; j < ccol; j++) {
            c[i][j] = 0;                   // 累加前清零
            for (int k = 0; k < acol; k++) {
                c[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    return true;
}
```

运行结果（输入按行给出，空白分隔即可）：

```text
Please input A:
2 3 1 4 5 6 7 8 2 3 5 7

Please input B:
2 4 5 6 8 7

Matrix A:
    2    3    1
    4    5    6
    7    8    2
    3    5    7

Matrix B:
    2    4
    5    6
    8    7

Matrix C (Result of A*B):
   27   33
   81   88
   70   90
   87   91
```

输入 `A` 用 `m × p` 的嵌套循环，输入 `B` 用 `p × n` 的嵌套循环；两处都出现 `p`，这就是公共维度在输入阶段的体现。输出 `A`、`B` 之后才调用乘法函数，若维度不合法，程序打印错误并以 1 返回。`setw(5)` 来自 `<iomanip>`，只作用于紧随其后的一个输出项，所以每个数都单独写一次。

#### 参数合法性检查

`multimatrix` 的前三个参数是传入的矩阵与它们的行、列数，后三个参数是输出矩阵与它的行、列数。数组参数本身带着第二维长度，函数体的循环只使用传入的行、列规模，不直接引用全局常量；这样也能检查调用者给的规模是否自洽。合法性检查有三个条件：

- `acol != brow`：$A$ 的列数必须等于 $B$ 的行数，否则点积没有公共维度。
- `crow != arow`：$C$ 的行数必须等于 $A$ 的行数，输出矩阵不能少行或多行。
- `ccol != bcol`：$C$ 的列数必须等于 $B$ 的列数。

任一条件不满足就返回 `false`，主函数打印 `Illegal matrix multiply.` 并返回 1。检查通过后，`i` 用 `crow`、`j` 用 `ccol`、`k` 用 `acol`，与传入的实际使用规模一致。

这里检查的是“调用者声明的使用规模”是否彼此匹配，并不检查 `arow`、`acol` 等是否超过数组定义时的 `m`、`p`、`n`。例如把 `acol` 传成 5，而数组第二维只有 3，函数仍会按 5 去读，越界由调用者负责。本程序的调用 `multimatrix(a, m, p, b, p, n, c, m, n)` 把规模正好取为全局常量，所以不会越界。

课堂问“参数表还有什么书写形式”，题目没有给出答案，下面补充解答：参数表中的二维数组写法还有等价形式。`const int a[m][p]` 中的第一维 `m` 会被忽略，编译器只关心第二维 `p`，因此也可写成 `const int a[][p]` 或 `const int (*a)[p]`；`b`、`c` 同理。在调整后的函数形参类型中，第一维大小不被保留，不能靠它区分两个函数，也不能靠它做越界检查；这不意味着完整数组对象的类型不包含第一维。

#### 改成指针形参（课堂问）

原题问“函数体应该如何访问数组”，没有给出答案；下面是补充解答。

若把函数头改成

```cpp
bool multimatrix(const int* a, int arow, int acol,
                 const int* b, int brow, int bcol,
                 int* c, int crow, int ccol)
```

函数体就不能再写 `a[i][k]`，因为 `a` 现在只是指向首元素的 `const int*`，没有“每行有多少列”的类型信息。二维数组在内存中按行连续存放，元素 $(i,k)$ 的地址是 `a + i * acol + k`，于是

```cpp
bool multimatrix(const int* a, int arow, int acol,
                 const int* b, int brow, int bcol,
                 int* c, int crow, int ccol)
{
    if (acol != brow || crow != arow || ccol != bcol)
        return false;
    for (int i = 0; i < crow; i++) {
        for (int j = 0; j < ccol; j++) {
            c[i * ccol + j] = 0;
            for (int k = 0; k < acol; k++) {
                c[i * ccol + j] += a[i * acol + k] * b[k * bcol + j];
            }
        }
    }
    return true;
}
```

调用时传的是首元素地址：

```cpp
multimatrix(*a, m, p, *b, p, n, *c, m, n);
```

`a` 是 `int[4][3]`，在表达式中退化为指向第一行的 `int(*)[3]`；对行指针解引用得到第一行 `int[3]`，它再退化为指向 `a[0][0]` 的 `int*`。所以 `*a`、`a[0]`、`&a[0][0]` 三种写法等价。函数体里的线性下标 `i * acol + k` 和 `k * bcol + j` 分别对应 `a[i][k]` 与 `b[k][j]`；从数学索引看二者相对应，但这种平铺改写并不因此就符合标准 C++ 的指针运算规则。把真实二维数组的首行元素地址传给 int* 后，再跨过首行访问后续行，会越出该内层数组对象，属于未定义行为。只有底层本来就是覆盖全部矩阵元素的一维数组时，这种线性下标写法才适用；对于这里声明的二维数组，应沿用前面的行指针/二维下标版本。

### 4. 输出杨辉三角形

#### 二项式系数与递推关系

$(a+b)^n$ 展开后共有 $n+1$ 个系数，首项和末项都是 1，中间的系数由上一行的相邻两项相加得到。记第 $n$ 行的第 $i$ 个系数为 $yh_i^n$（$i=0,\ldots,n$），则

$$
yh_0^n=yh_n^n=1,\qquad yh_i^n=yh_{i-1}^{n-1}+yh_i^{n-1}\quad(1\le i\le n-1).
$$

把 $n=0,1,2,\ldots$ 的各行排在一起，就是杨辉三角形：

```text
n=0:          1
n=1:        1   1
n=2:      1   2   1
n=3:    1   3   3   1
n=4:  1   4   6   4   1
n=5: 1  5  10  10  5  1
```

#### 一维数组的原地迭代

不需要保存整个三角形，只需要一个长度为 $n+1$ 的数组保存“当前行”。生成第 $i$ 行时：

1. 先令 `yh[i] = 1`，补上新行最右边的 1。
2. 令 `j` 从 `i-1` 递减到 1，执行 `yh[j] = yh[j-1] + yh[j]`。
3. 输出 `yh[0]` 到 `yh[i]`。

第 0 个元素始终是 1，从初始化后就不再改变；每次只需补尾部的 1，再更新中间部分。数组长度取 `n+1`，下标 0 到 $n$ 都可用，更新时不会越界。

![杨辉三角的一维数组原地更新：先补 yh[i]=1，再让 j 从 i-1 递减到 1](/images/campus-cpp-programming/yanghui-inplace.svg)

以第 4 行为例，上一行是 `[1, 3, 3, 1]`。先补 `yh[4]=1`，数组变成 `[1, 3, 3, 1, 1]`；然后：

```text
j=3: yh[3] = yh[2] + yh[3] = 3 + 1 = 4
j=2: yh[2] = yh[1] + yh[2] = 3 + 3 = 6
j=1: yh[1] = yh[0] + yh[1] = 1 + 3 = 4
```

得到 `[1, 4, 6, 4, 1]`。顺序必须从右向左：计算 `yh[j]` 时，`yh[j-1]` 必须还是上一行的值；从右向左时，`j-1` 还没被本次更新碰过。若 `j` 从小到大，`yh[j-1]` 已经在上一轮被改成新值，算出来的结果会偏大。仍以第 4 行为例：从小到大时 `j=1` 先算出 `yh[1]=1+3=4`，接着 `j=2` 用的是这个新值，得到 `yh[2]=4+3=7`，而正确值是 6。

`yh[i] = 1` 也不能省。对 $i>0$，输出循环的下标到 `i` 为止，若没有先给 `yh[i]` 赋值，第一次用到它时就是未初始化的值；它既是新行的右边界，也是内层循环右端的起点。

#### 完整代码

```cpp
#include <iostream>
using namespace std;

// 函数用于输出杨辉三角形的前 n 行
void yhtriangle(int* yh, int n)
{
    for (int i = 0; i < n; i++) {
        yh[i] = 1;                         // 每行的最后一个元素为 1
        for (int j = i - 1; j > 0; j--) {
            yh[j] = yh[j - 1] + yh[j];     // 中间元素是上一行相邻两元素之和
        }
        // 输出 i 次幂二项式系数表
        for (int k = 0; k <= i; k++) {
            cout << yh[k] << " ";
        }
        cout << endl;
    }
}

int main()
{
    int n;
    cout << "Please input power (0 < n <= 20):\n";
    do {
        cin >> n;
    } while (n < 0 || n > 20);
    int* yh = new int[n + 1];              // 申请内存
    yh[0] = 1;                              // 初始化第一行的第一个元素为 1
    yhtriangle(yh, n);                      // 调用函数，输出杨辉三角形
    delete[] yh;                            // 释放内存
    return 0;
}
```

输入 6 时的运行结果：

```text
Please input power (0 < n <= 20):
6
1 
1 1 
1 2 1 
1 3 3 1 
1 4 6 4 1 
1 5 10 10 5 1 
```

输出循环是 `i < n`，所以打印的是前 $n$ 行，即幂 $0$ 到 $n-1$；输入 6 的最后一行是 $1\ 5\ 10\ 10\ 5\ 1$，对应 $(a+b)^5$。若要把 $n$ 次幂也打印出来，循环条件改为 `i <= n` 即可，`new int[n+1]` 已经留出了 `yh[n]` 的位置。输入检查写的是 `n < 0 || n > 20`，按提示应输入 $0<n\le20$；若真输入 0，函数不输出任何行。

`new int[n+1]` 与 `delete[] yh` 必须配对：`new[]` 申请的是数组，释放时要用 `delete[]`，不能用单个 `delete`。

#### 内层循环能不能从小到大（课堂问）

原题只问“可以吗？为什么？”，下面是补充解答。

把内层循环改成

```cpp
for (int j = 1; j < i; j++) {
    yh[j] = yh[j - 1] + yh[j];
}
```

不行。原因不是语法，而是更新顺序破坏了递推所依赖的“上一行”值。以 $i=3$、上一行 `[1, 2, 1]` 为例，先补 `yh[3]=1` 得到 `[1, 2, 1, 1]`：

```text
j=1: yh[1] = yh[0] + yh[1] = 1 + 2 = 3   → [1, 3, 1, 1]
j=2: yh[2] = yh[1] + yh[2] = 3 + 1 = 4   → [1, 3, 4, 1]
```

正确结果应是 `[1, 3, 3, 1]`，但 `j=2` 读到的 `yh[1]` 已经被 `j=1` 改成了 3，于是多加了 1。把 `j` 改成从 `i-1` 递减到 1，`yh[j-1]` 在计算 `yh[j]` 时仍是上一行的旧值，结果才正确。这也说明：原地递推时，循环方向不是随便选的，要保证“被读取的格子还没被写过”。

### 5. 对字符串排序

排序可以沿用前面的选择排序或冒泡排序，这里用冒泡排序。

#### `strcmp` 比较的是内容，返回值不是布尔值

`strcmp(s1, s2)` 按字符编码逐位比较两个以 `'\0'` 结尾的字符串，返回一个整数：

- 小于 0：`s1` 在字典序上小于 `s2`；
- 等于 0：两个字符串完全相同；
- 大于 0：`s1` 大于 `s2`。

升序排序时，相邻两个字符串若 `strcmp(arr[j], arr[j+1]) > 0`，说明前者应排在后者后面，需要交换。不能写成 `if (strcmp(...))`：只要两个字符串不相等，返回值就可能是正数或负数，非零并不等于“前者更大”；这样写会把本来有序的一对也交换，排序结果被破坏。也不宜写 `strcmp(...) == 1`，标准只保证返回值的符号，具体是不是 1 由实现决定。

使用 `strcmp` 要包含 `<cstring>`。字符串必须以 `'\0'` 结束，否则 `strcmp` 会越过数组边界继续读，行为未定义。

#### 交换的是指针，不是字符串内容

`const char* name[] = {"Li Hua", "Zhang Ming", ...};` 是一个指针数组：`name[0]`、`name[1]` 等元素本身是 `const char*`，分别保存某个字符串常量的首地址。排序时交换 `arr[j]` 与 `arr[j+1]`，只是把数组里的两个地址对调，字符串常量仍然留在原来的存储位置，一个字符也没有复制。

因此临时变量要写成 `const char* temp`，与数组元素类型一致；不能写成 `char*`，因为字符串常量是只读的，现代 C++ 不允许把 `const char*` 隐式转成 `char*`。函数形参 `const char* arr[]` 会调整为 `const char**`：**指针本身可以改**（所以能交换），**指针指向的字符不能改**（所以是 `const char`）。这两层 `const` 要分清。

交换指针的代价是 $O(1)$，但每次比较仍要逐字符扫描，`strcmp` 的成本与字符串长度有关。若字符串很长，比较次数多的排序算法会明显变慢。

![字符串排序：strcmp 比较字符串内容，交换只改变数组元素中的指针，字符串常量本身不动](/images/campus-cpp-programming/string-sort-pointers.svg)

#### 完整代码

```cpp
#include <iostream>
#include <cstring>                          // 用于 strcmp
using namespace std;

void bubbleSort(const char* arr[], int n)   // 对 C 风格字符串数组排序
{
    for (int i = 0; i < n - 1; ++i) {
        for (int j = 0; j < n - i - 1; ++j) {
            if (strcmp(arr[j], arr[j + 1]) > 0) {
                const char* temp = arr[j];  // 交换 arr[j] 和 arr[j+1]
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main()
{
    // 创建一个 C 风格字符串数组
    const char* name[] = {"Li Hua", "Zhang Ming", "Liu Lei",
                          "Sun Fei", "He Xiaoming"};
    int n = sizeof(name) / sizeof(name[0]); // 数组长度只能在真数组上这样算
    bubbleSort(name, n);                    // 使用冒泡排序对数组进行排序
    cout << "Sorted names:" << endl;        // 输出排序后的数组
    for (int i = 0; i < n; ++i) {
        cout << name[i] << endl;
    }
    return 0;
}
```

运行结果：

```text
Sorted names:
He Xiaoming
Li Hua
Liu Lei
Sun Fei
Zhang Ming
```

#### 结果为什么是这个顺序

`strcmp` 按字符编码比较，先比首字符：`'H' < 'L' < 'S' < 'Z'`，所以 `He Xiaoming` 排在最前，`Zhang Ming` 排在最后。`Li Hua` 与 `Liu Lei` 的前两个字符都是 `Li`，第三个字符分别是空格（编码 32）和 `u`（编码 117），空格更小，所以 `Li Hua` 在前。`Sun Fei` 的首字符 `'S'` 小于 `'Z'`，排在 `Zhang Ming` 之前。这个顺序不是按字符串长度，也不是按姓和名的拼音分开排，而是逐字符的字典序。

`sizeof(name) / sizeof(name[0])` 能得到 5，是因为在 `main` 里 `name` 还是真正的数组；进入 `bubbleSort` 后，形参 `arr` 已经退化为指针，`sizeof(arr)` 只是指针大小，所以元素个数必须由 `n` 传进去。这一点与前面数组作参数的规则一致。

冒泡排序的双层循环是标准的：外层 `i` 控制趟数，每趟把当前未排好的最大值“冒”到末尾；内层 `j` 只走到 `n-i-1`，因为最后 `i` 个位置已经排好，不必再比较。对 5 个元素，最坏需要 4 趟；本例的交换只发生在指针数组上，字符串本身没有被搬动。

## 输入与容器补充

5.6 之后还有一组补充内容，没有给小节号。它分三块：输入函数、`vector`、`string`。第一块解决“怎样读入带空格的一行、怎样读单个字符”，后两块给出数组和 C 风格字符串的类替代品。

### 输入函数：从 `cin >>` 到 `getchar`

几个接口的差别主要在三点：**是否跳过前导空白、分隔符留不留在缓冲区、有没有容量限制**。先看总表，再逐个说明。

| 接口 | 读取单位 | 跳过前导空白 | 分隔符处理 | 容量与结束 |
| --- | --- | --- | --- | --- |
| `cin >> x` | 按 `x` 的类型读一个格式化项 | 是 | 终止的空白留在缓冲区 | 按类型；读字符数组时没有自动容量保护 |
| `cin.get(ch)` | 一个字符 | 否 | 该字符被读走 | 单个字符 |
| `cin.get(a, n)` | 至多 `n-1` 个字符 | 否 | 换行留在缓冲区 | 自动补 `'\0'` |
| `cin.getline(a, n)` | 至多 `n-1` 个字符 | 否 | 换行被取出并丢弃 | 自动补 `'\0'`；超长时置 failbit |
| `getline(cin, s)` | 一行到 `string` | 否 | 换行被取出并丢弃 | 自动扩容 |
| `gets(a)` | 一行到字符数组 | 否 | 换行被丢弃 | 无容量参数，已从 C++ 标准移除 |
| `getchar()` | 一个字符 | 否 | 该字符被读走 | 返回 `int`，可返回 `EOF` |

#### `cin >>`：格式化输入，遇空白停止

```cpp
int a, b;
cin >> a >> b;
```

输入

```text
2
3
```

输出 `5`。`>>` 先跳过前导空白（空格、制表符、换行），再按变量类型解析；两个数字之间的换行不影响结果。

读字符数组时：

```cpp
char a[20];
cin >> a;
```

输入 `jkljkl jkljkl`，输出只有 `jkljkl`。`>>` 读到空格就停止，空格后面的内容留在缓冲区，等待下一次读取。因此 `cin >>` 适合读数字和单个单词，不适合读整行；它也不会因为数组只有 20 个元素就自动限制长度，输入 token 过长会越界，行为未定义。读入 `char` 数组时可用 `cin >> setw(20) >> a` 限制最多 19 个字符（需 `<iomanip>`），或直接改用 `std::string` 配合 `getline`。

#### `cin.get`：读一个字符或一行，但不丢分隔符

读单个字符：

```cpp
char ch;
ch = cin.get();          // 也可以写 cin.get(ch);
```

输入 `jkljkljkl`，输出 `j`。`cin.get()` 不跳过空白，空格、制表符、换行都会被当作普通字符读走。它返回的是 `int_type`，赋给 `char` 会丢掉 `EOF` 的信息；若需要判断输入结束，写成 `int ch = cin.get();`，再与 `EOF` 比较。

读一行到字符数组：

```cpp
char a[20];
cin.get(a, 20);
```

最多读入 19 个字符，再加一个 `'\0'`。输入 25 个字符时，只输出前 19 个。它遇到换行就停止，但**不把换行取走**，换行仍留在缓冲区；下一次读字符会先读到这个换行。若紧接着还要读下一行，需要先用 `cin.get()` 或 `cin.ignore()` 把换行吃掉。

#### `cin.getline`：读一行并丢弃换行

```cpp
char m[20];
cin.getline(m, 5);
```

第二个参数是缓冲区总大小，函数最多读入 `5-1=4` 个可见字符，最后一个位置写 `'\0'`。输入 `jkljkljkl`，输出 `jklj`。把 5 改成 20，就能读入整行 `jkljkljkl`；带空格的 `jklf fjlsjf fjsdklf` 也会原样读入。

`cin.getline` 与 `cin.get(a, n)` 的关键差别是：`getline` 会把行末的换行符取出来并丢弃，下一次读取从下一行开始；`get` 把换行留在缓冲区。若一行长度超过 `n-1`，`getline` 读满后停止并置 failbit，剩余字符仍在缓冲区，后续读取要先 `cin.clear()` 再 `cin.ignore(...)`。

#### `getline(cin, str)`：`std::string` 版本

```cpp
#include <string>
string str;
getline(cin, str);
```

它读入一整行（包括空格），丢弃行末换行，并把读到的内容存入 `str`（原有内容被覆盖）；`str` 会自动扩容，没有固定缓冲区大小。`getline(cin, str)` 是 `<string>` 提供的自由函数，`cin.getline` 是 `istream` 的成员函数，两者名字相近但所属接口不同。读 `std::string` 时优先用前者，不必先猜一个数组长度。

#### `gets` 与 `getchar`：C 风格接口的现状

```cpp
char m[20];
gets(m);          // 不能写成 m = gets();
```

`gets` 从标准输入读一行，读到换行停止，丢弃换行并补 `'\0'`。它**没有容量参数**，无法知道 `m` 有多大，输入超过 19 个字符就会越界写内存，行为未定义。`gets` 在 C++11 被弃用，C++14 起已从 C++ 标准库移除，现行标准中不应再使用；它也不靠 `<string>`，而是 C 的 `<cstdio>`/`<stdio.h>` 接口。替代写法是 `getline(cin, str)`；必须用字符数组时，用 `fgets(m, sizeof m, stdin)`，它最多读 `sizeof m - 1` 个字符，若读到了换行会保留在数组中，需要时再去掉。

```cpp
char ch;
ch = getchar();   // 不能写成 getchar(ch);
```

`getchar()` 从标准输入读一个字符，空格和换行也读；返回 `int`，输入结束返回 `EOF`。它属于 C 标准库 `<cstdio>`，通常等价于 `getc(stdin)`；标准把它描述为函数，具体实现可能用宏。用 `char ch = getchar()` 时，若 `char` 是有符号的，`EOF` 可能与某个合法字符的编码混淆；要判断结束就用 `int ch`。

#### 混用 `>>` 与 `getline`：缓冲区与状态

`cin >> n` 只把数字取走，数字后面的换行仍留在缓冲区。紧接着调用 `getline(cin, s)`，它会立刻读到这个换行并返回空串：

```cpp
int n;
string s;
cin >> n;
getline(cin, s);        // s 为空，读到的是 n 后面的换行
```

若下一行确实要读一整行，应在两者之间清掉换行：

```cpp
#include <limits>
cin >> n;
cin.ignore(numeric_limits<streamsize>::max(), '\n');
getline(cin, s);
```

`cin.ignore(count, delim)` 最多丢弃 `count` 个字符，遇到 `delim` 就停止并把 `delim` 也丢掉。`numeric_limits<streamsize>::max()` 表示“足够大”，比写一个猜的常数可靠。

输入失败时，`cin` 会置 failbit，后续读取直接失败。例如向 `int` 输入字母，`cin >> n` 失败，缓冲区里的字母还在；要先 `cin.clear()` 清除状态，再用 `cin.ignore(...)` 丢掉坏字符，才能继续读。`cin.getline` 因行太长而读满时也会置 failbit，处理方式相同。`good()` 表示流状态正常，`eof()` 表示到达文件尾，`fail()` 表示上一次格式化读取失败（包括遇到 EOF 或类型不匹配），`bad()` 表示流本身出错；`clear()` 只清状态位，不丢缓冲区，所以还要配合 `ignore()`。C 的 `getchar`/`gets` 与 C++ 的 `cin` 通常共享同一个标准输入缓冲区，混用时尤其要注意残留的换行；能统一用一种接口就不要来回切换。

### `vector`：可变长数组

`vector` 是表示可变大小数组的序列容器：元素在内存中连续存放，使用动态分配的数组存储，并会多分配一些空间以适应后续增长。它把长度和内存管理交给对象，适合元素个数在运行时才确定的场合。

包含头文件 `<vector>`，声明形式为

```cpp
vector<typeName> vt(n_element);
```

`n_element` 可以是整型常量，也可以是整型变量。例如：

```cpp
#include <vector>

vector<int> vi;          // 空的 int 序列
int n;
cin >> n;
vector<double> vd(n);    // n 个 double，元素值初始化
```

#### 构造与常用操作

构造函数：

- `vector()`：默认构造一个空 `vector`。
- `vector(size_type n)`：构造含 `n` 个元素的 `vector`，每个元素按默认构造函数初始化。
- `vector(size_type n, const T& value)`：构造含 `n` 个元素、每个都初始化为 `value` 的 `vector`。
- `vector(const vector& other)`：复制构造，内容与 `other` 相同。

常用操作：

- `operator=`：把另一个 `vector` 的内容赋给当前对象。
- `size()`：返回元素个数；`capacity()`：返回当前已分配的存储空间能容纳的元素数；`empty()`：判断是否为空。
- `operator[](n)`：返回第 `n` 个元素的引用，不做越界检查。
- `push_back(value)`：在末尾添加一个元素；`pop_back()`：删除末尾元素。
- `insert(pos, value)`：在迭代器 `pos` 之前插入一个元素。
- `erase(pos)`：删除 `pos` 位置的元素；`erase(first, last)`：删除 `[first, last)` 范围内的元素。
- `clear()`：移除所有元素，使 `vector` 变为空。
- `swap(other)`：交换两个 `vector` 的内容。
- `begin()`、`end()`：返回指向第一个元素和最后一个元素之后位置的迭代器。
- `front()`、`back()`：返回第一个、最后一个元素的引用。

`size()` 与 `capacity()` 不是一回事：`size()` 是实际元素个数，`capacity()` 是不重新分配内存时最多能放多少。`push_back` 在容量不够时会重新分配更大的空间，原有迭代器、指针和引用可能失效；不要在 `push_back` 之后继续使用之前保存的迭代器。

#### 课堂例题：插入、删除与遍历

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main()
{
    vector<int> vec;                        // 初始化一个空的 vector
    vec.push_back(10);                      // 添加元素
    vec.push_back(20);
    vec.push_back(30);
    cout << "第一个元素：" << vec.front() << endl;   // 访问元素
    cout << "最后一个元素：" << vec.back() << endl;
    cout << "Vector elements: ";            // 遍历 vector
    for (int i = 0; i < vec.size(); ++i) {
        cout << vec[i] << " ";
    }
    cout << endl;

    vec.insert(vec.begin() + 1, 25);        // 在第二个位置插入 25
    cout << "Vector after insertion: ";     // 访问插入后的 vector
    for (int i = 0; i < vec.size(); ++i) {
        cout << vec[i] << " ";
    }
    cout << endl;

    vec.erase(vec.begin() + 1);             // 删除第二个元素
    cout << "Vector after erasing an element: ";
    for (int i = 0; i < vec.size(); ++i) {
        cout << vec[i] << " ";
    }
    cout << endl;
    return 0;
}
```

运行结果：

```text
第一个元素：10
最后一个元素：30
Vector elements: 10 20 30 
Vector after insertion: 10 25 20 30 
Vector after erasing an element: 10 20 30 
```

`vec.begin()` 指向下标 0，`vec.begin() + 1` 指向下标 1，也就是第二个元素。`insert` 在这个位置之前插入 25，原来的 20、30 依次后移；`erase` 删除下标 1 的元素，后面的元素再前移。所以元素个数先由 3 变 4，再变回 3。`vec[i]` 只是下标运算，越界不会报错，行为未定义；需要检查边界时可用 `at(i)`，它在越界时抛出 `std::out_of_range`。

`vector` 的 `size()` 返回无符号的 `size_t`。写循环时用 `i < vec.size()` 是安全的；不要写 `i <= vec.size() - 1`，因为空 `vector` 的 `size()` 为 0，减 1 会回绕成很大的无符号数。

### `string`：字符串类

`std::string` 把字符序列、长度和结束符的管理封装在对象里，不再需要手动维护 `'\0'` 和数组容量。包含头文件 `<string>`。

#### 构造、赋值、大小与访问

构造函数：

- `string()`：默认构造空字符串。
- `string(const char* s)`：从 C 风格字符串构造。
- `string(const string& str)`：复制构造。
- `string(const char* s, size_type len)`：从 C 风格字符串的前 `len` 个字符构造。
- `string(size_type n, char c)`：构造由 `n` 个字符 `c` 组成的字符串。

赋值操作 `operator=(const char* s)` 把 C 风格字符串的内容赋给当前字符串；`operator=(const string&)` 则是对象之间的赋值。

大小和容量：

- `size()`：返回字符串长度；`length()` 与 `size()` 相同。
- `max_size()`：返回可以创建的最大字符串长度。
- `capacity()`：返回已分配的存储空间。

访问元素：

- `operator[](pos)`：返回位置 `pos` 的字符，不做越界检查。
- `at(pos)`：返回位置 `pos` 的字符，越界时抛出 `std::out_of_range`。
- `front()`、`back()`：返回第一个、最后一个字符。

修改器：

- `push_back(c)`：在末尾添加字符 `c`；`pop_back()`：删除末尾字符。
- `insert(index, const char* s)`、`insert(index, const string& str)`、`insert(index, n, c)`：在位置 `index` 插入 C 风格字符串、另一个字符串或 `n` 个字符 `c`。
- `erase(index = 0, count = npos)`：删除从 `index` 开始的 `count` 个字符。
- `compare(str)`：比较当前字符串与 `str`，返回负数、0 或正数。常见实现返回 -1、0、1，但标准只保证符号，不要依赖具体数值。
- `find(s, pos = 0)`：从 `pos` 开始查找 C 风格字符串或 `string`，返回位置；找不到时返回 `string::npos`，不能只判断“返回值是不是 0”。

#### 课堂例题：赋值、连接与插入

```cpp
#include <iostream>
#include <string>
using namespace std;

int main()
{
    string str1 = "Hello";
    string str2 = " World";
    str2 = str1;
    cout << "str2: " << str2 << endl;

    string str3 = str1 + str2;
    cout << "str3: " << str3 << endl;

    string str4 = " World";
    str1.insert(str1.end(), str4.begin(), str4.end());
    cout << "str1: " << str1 << endl;
    return 0;
}
```

运行结果：

```text
str2: Hello
str3: HelloHello
str1: Hello World
```

`str2 = str1` 把 `str1` 的内容复制给 `str2`，原先的 `" World"` 被覆盖；`str1 + str2` 产生一个新字符串 `"HelloHello"`，赋给 `str3`。随后用 `str4` 保存 `" World"`，`str1.insert(str1.end(), str4.begin(), str4.end())` 把 `str4` 的整个字符范围插入到 `str1` 末尾：`str1.end()` 是最后一个字符之后的迭代器，正好表示“追加到末尾”。这一步用的是迭代器范围版 `insert`，与前面按位置插入单个值的版本不同，但效果都是把字符插到指定位置之前。

`std::string` 的赋值和连接会自动处理长度与结束符，不需要 `strcpy`/`strcat`，也不容易越界。若代码中遇到 `strcpy_s`，要知道它是 C11 Annex K 的可选边界检查函数，MSVC 等实现提供，但不是所有 ISO C++ 实现都有；两参数形式还依赖编译器的模板重载。跨平台代码优先用 `std::string`；必须用字符数组时，先确认目标容量，再复制并补 `'\0'`。

### 用 `string` 重写字符串排序

C 风格版本要写 `strcmp`、交换 `const char*` 指针，还要自己保证字符串以 `'\0'` 结束。换成 `string` 后，比较可以直接用 `>`，交换可以直接用 `swap`，长度和结束符由对象管理。

#### 冒泡排序版

```cpp
#include <iostream>
#include <string>
#include <utility>                          // 用于 swap
using namespace std;

void bubbleSort(string arr[], int n)
{
    bool swapped;
    for (int i = 0; i < n - 1; i++) {
        swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // 交换字符串
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped)
            break;
    }
}

int main()
{
    string strings[] = {"Banana", "Orange", "Apple", "Mango", "Pineapple"};
    int n = sizeof(strings) / sizeof(strings[0]); // 计算数组中字符串的数量
    bubbleSort(strings, n);                       // 使用冒泡排序对数组排序
    cout << "Sorted strings:" << endl;            // 输出排序后的字符串
    for (int i = 0; i < n; i++) {
        cout << strings[i] << endl;
    }
    return 0;
}
```

运行结果：

```text
Sorted strings:
Apple
Banana
Mango
Orange
Pineapple
```

`arr[j] > arr[j + 1]` 调用 `string` 的 `operator>`，按字典序比较字符内容；不需要 `strcmp`，也不用手动处理 `'\0'`。`swap(arr[j], arr[j + 1])` 交换两个 `string` 对象，具体实现通常会交换内部缓冲区指针，避免逐个字符复制。`swapped` 记录本趟是否发生过交换：若一整趟都没有交换，说明已经有序，可以提前 `break`，这是冒泡排序的提前结束优化。注意 `swapped` 必须在每趟开始时重置为 `false`，否则上一趟的结果会影响下一趟的判断。

#### `sort` 版

```cpp
#include <iostream>
#include <string>
#include <algorithm>                    // 包含 sort
using namespace std;

int main()
{
    // 创建一个字符串数组
    string strings[] = {"Banana", "Orange", "Apple",
                        "Mango", "Pineapple"};
    int n = sizeof(strings) / sizeof(strings[0]); // 计算数组中字符串的数量
    sort(strings, strings + n);                   // 使用 sort 对数组排序
    cout << "Sorted strings:" << endl;            // 输出排序后的字符串
    for (int i = 0; i < n; i++) {
        cout << strings[i] << endl;
    }
    return 0;
}
```

输出与冒泡排序版相同。`sort` 接受一对迭代器（或指针）表示的范围 `[first, last)`，默认按 `operator<` 升序排列；`strings` 是数组名，`strings + n` 指向最后一个元素之后，正好构成整个数组的范围。`sort` 的平均复杂度是 $O(n\log n)$，比手写冒泡排序的 $O(n^2)$ 更适合元素较多的场合；代价是要包含 `<algorithm>`，并且排序范围必须有效。

用 `string` 排序时，比较的仍是字典序，和 `strcmp` 的结果符号一致；区别在于 `string` 自己保存长度，不需要担心忘记写 `'\0'`，交换和赋值也由类负责。C 风格字符串排序更适合用来理解“指针数组交换的是指针，不是字符内容”；实际写程序时，`std::string` 通常更省心。

## 课堂小结

本章的主线是“通过地址间接访问对象”。指针保存地址，指针的类型决定解引用时按什么类型解释内存；`const` 与指针结合时，要分清限制的是指向的对象还是指针本身。引用是已存在对象的别名，定义时必须绑定且不能改绑；值传递复制实参，指针和引用传递让函数访问调用方对象，返回指针或引用时，所指对象必须在调用方使用期间仍然存活，不能返回已结束生命周期的自动局部对象。函数名在相应上下文中可转换为函数指针，函数指针把“调用哪个函数”变成可保存、可传递的数据。

数组是连续存放的同类元素集合，数组名在多数普通表达式中退化为首元素地址，下标访问与指针运算等价；二维数组退化为行指针，形参必须写全低维长度，长度要另传。C 风格字符串是以 `'\0'` 结尾的字符数组，库函数依赖这个结束符，容量由调用方保证；动态内存用 `new`/`delete`、`new[]`/`delete[]` 成对管理。补充的 `vector` 和 `string` 把长度、容量与内存管理交给类对象，是裸数组和 C 风格字符串更安全的替代。

算法部分把前面的工具串起来：选择排序和冒泡排序做比较与交换，矩阵相乘用三层循环完成“行乘列”的累加，杨辉三角用一维数组从右向左原地递推，字符串排序用 `strcmp` 比较、交换指针。易错点集中在：`*p++` 与 `(*p)++` 混淆、`const` 位置看反、数组名当指针赋值、`sizeof` 把指针当数组、`strcmp` 返回值当布尔、矩阵累加前忘记清零、杨辉三角递推方向写反、`new[]` 与 `delete` 不配对。看懂这些边界，后面的容器和算法才有稳定的基础。

## 资料

- 《第五章 指针（PDF）》（本地课件，暂无在线链接）
