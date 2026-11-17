---
slug: "02-mappings-and-functions"
title: "映射与函数"
summary: "第 2 讲：映射与函数。"
updatedAt: "2026-11-15"
content_type: "reference"
group: "course"
displayNumber: "02"
tags:
  - "数学分析"
sources:
  - kind: article
    title: "2映射与函数.pdf"
    url: "https://drive.google.com/file/d/14eLwir0g8AIti3I7L52xZyaje67Fl2z3/view?usp=drivesdk"
---

集合给出了研究对象，接下来要描述对象之间的对应关系。映射是这种对应关系的一般语言；把映射的两个集合都取成实数集，就得到一元实函数。这一讲的重点是：映射的像必须唯一、复合映射的构成条件、反函数存在的条件，以及函数定义域在复合与求逆中的变化。

## 映射

### 定义与基本要素

设 $X,Y$ 是两个给定的集合。若按照某种规则 $f$，使得对 $X$ 中的每一个元素 $x$，都能找到 $Y$ 中**唯一确定**的元素 $y$ 与之对应，则称这个对应规则 $f$ 是集合 $X$ 到集合 $Y$ 的一个**映射**，记

$$
f:X\to Y,\qquad x\mapsto y=f(x).
$$

其中：

- $y$ 称为在映射 $f$ 之下 $x$ 的**像**；
- $x$ 称为在映射 $f$ 之下 $y$ 的一个**逆像**（或**原像**）；
- $X$ 称为映射 $f$ 的**定义域**，记 $D_f$；
- $Y$ 称为映射 $f$ 的**陪域**；
- $X$ 中所有元素的像的全体称为 $f$ 的**值域**，记 $R_f$，即

$$
R_f=\{y\in Y:\exists x\in X,\ y=f(x)\}=f(X).
$$

构成一个映射必须具备三个要素：

1. 集合 $X$，即定义域 $D_f=X$；
2. 集合 $Y$，它限制值域的范围，$R_f\subseteq Y$；
3. 对应规则 $f$，使每个 $x\in X$ 有唯一确定的 $y=f(x)$ 与它对应。

![映射 f: X → Y](/images/campus-mathematical-analysis/lec02-mapping.svg)

例如，设 $X$ 是平面上所有三角形的全体，$Y$ 是平面上所有圆的全体，规定

$$
f:X\to Y,\qquad x\mapsto y\ (y\ \text{是三角形}\ x\ \text{的外接圆}),
$$

则 $f$ 是一个映射，$D_f=X$，$R_f=Y$。每个三角形有唯一的外接圆；但一个圆有无穷多个内接三角形，所以一个 $y$ 的逆像不唯一。

再如，实数列

$$
a_1,a_2,a_3,\dots,a_n,\dots
$$

可以看成映射

$$
f:\mathbb N\to\mathbb R,\qquad f(n)=a_n.
$$

数列的项就是自然数的像。

### 像唯一，逆像不必唯一

映射只要求“每个 $x$ 的像唯一”，不要求“每个 $y$ 的逆像唯一”。

考察对应关系

$$
f:\mathbb R^+\to\mathbb R,\qquad x\mapsto y\ (y\ \text{为}\ x\ \text{的平方根}).
$$

因为正数 $x$ 有两个平方根 $\pm\sqrt x$，像不唯一，所以这不是映射。

若把陪域限制为正实数集，

$$
f:\mathbb R^+\to\mathbb R^+,\qquad x\mapsto\sqrt x,
$$

则它是映射；若把陪域限制为负实数集，

$$
f:\mathbb R^+\to\mathbb R^-,\qquad x\mapsto-\sqrt x,
$$

它也是映射。

> **理解关键**：这说明：当对应规则本身给出多个候选值时，可以通过限制陪域或定义域，使像唯一，从而得到映射。

### 单射、满射与双射

设 $f:X\to Y$ 是映射。

- 若 $f$ 的逆像具有唯一性，即

$$
x_1\ne x_2\Longrightarrow f(x_1)\ne f(x_2),
$$

则称 $f$ 为**单射**；

- 若 $R_f=Y$，即陪域中每个元素都被取到，则称 $f$ 为**满射**；
- 若 $f$ 既是单射又是满射，则称 $f$ 为**双射**，也称一一对应。

三角形到外接圆的映射是满射，但不是单射；上面的平方根映射（限制陪域为正实数或负实数）是双射。

一个集合 $A$ 为**可列集**，当且仅当 $A$ 与 $\mathbb N$ 之间存在双射。也就是说，可列集的元素可以按自然数编号，一个不漏地排成一列。

### 逆映射

设 $f:X\to Y$ 是单射。把陪域缩小为值域，$f:X\to R_f$ 就是双射，于是可以定义对应关系

$$
g:R_f\to X,\qquad y\mapsto x\quad(f(x)=y).
$$

这个 $g$ 是 $R_f$ 到 $X$ 的映射，称为 $f$ 的**逆映射**，记 $f^{-1}$。它的定义域是 $D_{f^{-1}}=R_f$，值域是 $R_{f^{-1}}=X$。

只有单射才能定义逆映射；如果 $f$ 不是单射，同一个 $y$ 对应多个 $x$，逆映射就无法唯一确定。

### 复合映射

设有两个映射

$$
g:X\to U_1,\qquad x\mapsto u=g(x),
$$

$$
f:U_2\to Y,\qquad u\mapsto y=f(u).
$$

如果

$$
R_g\subseteq U_2=D_f,
$$

那么可以构造一个新的对应关系

$$
f\circ g:X\to Y,\qquad x\mapsto y=f(g(x)).
$$

它仍然是一个映射，称为 $f$ 和 $g$ 的**复合映射**。

复合映射的实质是引入中间变量 $u$：先由 $x$ 得到 $u=g(x)$，再由 $u$ 得到 $y=f(u)$。

> **关键结论**：因此，能否复合的关键就是 $R_g\subseteq D_f$ 是否成立。这个条件不满足，复合映射就没有定义。

![复合映射 f ∘ g](/images/campus-mathematical-analysis/lec02-composition.svg)

例如，设

$$
g:\mathbb R\to\mathbb R,\qquad x\mapsto u=\sin x,
$$

$$
f:\mathbb R\to\mathbb R,\qquad u\mapsto y=\frac{u}{1+u^2}.
$$

因为 $R_g=[-1,1]\subseteq\mathbb R=D_f$，所以可以复合：

$$
f\circ g:\mathbb R\to\mathbb R,\qquad
x\mapsto y=\frac{\sin x}{1+\sin^2x}.
$$

再看一个不能直接复合的例子。设

$$
g:\mathbb R\to\mathbb R,\qquad x\mapsto u=1-x^2,
$$

$$
f:\mathbb R^+\to\mathbb R,\qquad u\mapsto y=\lg u.
$$

这里 $R_g=(-\infty,1]$，不包含于 $D_f=\mathbb R^+$，所以 $f\circ g$ 不能构成。若把 $g$ 的定义域限制为 $X=(-1,1)$，令

$$
g^*:(-1,1)\to\mathbb R,\qquad x\mapsto u=1-x^2,
$$

则 $R_{g^*}=(0,1]\subseteq\mathbb R^+$，于是可以复合：

$$
f\circ g^*:(-1,1)\to\mathbb R,\qquad
x\mapsto y=\lg(1-x^2).
$$

复合是有顺序的。$f\circ g$ 有意义，并不意味着 $g\circ f$ 有意义；即使两者都有意义，一般也不相等。例如

$$
f(x)=\frac1{x+1},\qquad g(x)=x^2,
$$

则

$$
(f\circ g)(x)=\frac1{x^2+1},
$$

而

$$
(g\circ f)(x)=\frac1{(x+1)^2}.
$$

两者不同，所以函数的复合不满足交换律。

复合满足结合律：对三个能复合的函数，

$$
(f\circ g)\circ h=f\circ(g\circ h).
$$

特别地，若 $f:X\to Y$ 是双射，$f^{-1}:Y\to X$ 是它的逆映射，则

$$
f\circ f^{-1}=\mathrm{id}_Y,\qquad
f^{-1}\circ f=\mathrm{id}_X,
$$

即

$$
f(f^{-1}(y))=y,\quad y\in Y;\qquad
f^{-1}(f(x))=x,\quad x\in X.
$$

例如，$\sin x$ 限制在 $[-\frac\pi2,\frac\pi2]$ 上是到 $[-1,1]$ 的双射，其反函数为 $\arcsin y$，于是

$$
\sin(\arcsin y)=y,\quad y\in[-1,1],
$$

$$
\arcsin(\sin x)=x,\quad x\in\left[-\frac\pi2,\frac\pi2\right].
$$

## 函数

### 定义

若在映射的定义中取 $X\subseteq\mathbb R$，$Y\subseteq\mathbb R$，则映射

$$
f:X\to Y,\qquad x\mapsto y=f(x)
$$

称为**一元实函数**，简称**函数**。由于它是实数集与实数集之间的对应关系，常写成

$$
y=f(x),\qquad x\in X=D_f.
$$

$f$ 表示对应规则；对每个 $x\in D_f$，它确定唯一的 $y=f(x)\in\mathbb R$。通常称 $x$ 为**自变量**，$y$ 为**因变量**。自变量是主动变化、容易观测的量，因变量是随自变量变化、需要探知的量。

在函数情形，逆映射称为**反函数**，复合映射称为**复合函数**。

自变量和因变量用什么字母无关紧要，关键是映射规则 $f$。但两个函数相同，必须同时满足：**定义域相同，对应规则相同**。也就是说，在相同的定义域中，每个 $x$ 对应的函数值都相同。

例如

$$
f(x)=1,\quad x\in(-\infty,+\infty);
$$

$$
g(x)=\frac{x}{x},\quad x\in(-\infty,0)\cup(0,+\infty);
$$

$$
h(x)=\sin^2x+\cos^2x,\quad x\in(-\infty,+\infty).
$$

$f$ 与 $g$ 不相同，因为定义域不同；$f$ 与 $h$ 相同，因为定义域相同，且 $\sin^2x+\cos^2x=1$ 对一切实数成立，尽管表达形式不同。

### 函数的表示方式

函数可以用表格、图像、公式或分段方式表示。

**表格**：例如国际信函的邮费由邮件重量决定：

| 重量/克 | 20 及以下 | 20～50 | 50～100 | 100～250 | 250～500 | 500～1000 |
|---|---|---|---|---|---|---|
| 邮费/元 | 4.40 | 8.20 | 10.40 | 20.80 | 39.80 | 75.70 |

这是一个表格形式的函数：重量落在哪个区间，就对应哪个邮费。

**图像**：例如火箭在垂直发射阶段运行的距离 $h$ 是时间 $t$ 的函数，可以用一条曲线描述。

**分段函数**：例如符号函数

$$
\operatorname{sgn}x=
\begin{cases}
1,&x>0,\\
0,&x=0,\\
-1,&x<0.
\end{cases}
$$

绝对值函数也可写成分段形式：

$$
|x|=
\begin{cases}
-x,&x<0,\\
x,&x\ge0.
\end{cases}
$$

利用符号函数，可以把绝对值写成

$$
|x|=x\operatorname{sgn}x.
$$

![符号函数与取整函数](/images/campus-mathematical-analysis/lec03-sign-floor.svg)

**狄利克雷函数**：

$$
D(x)=
\begin{cases}
1,&x\ \text{为有理数},\\
0,&x\ \text{为无理数}.
\end{cases}
$$

它定义在整个数轴上，但既不能用一条连续曲线表示，也不能用列表方式完整表示。它说明“函数”并不等于“能画出来的曲线”。

由函数表达式本身确定的、使函数有定义的最大范围，称为**自然定义域**。例如 $y=\frac1{x+1}$ 的自然定义域是 $x\ne-1$；$y=\sqrt{x}$ 的自然定义域是 $x\ge0$。

### 复合函数

两个函数 $f$ 和 $g$ 可以按

$$
(f\circ g)(x)=f(g(x))
$$

定义复合函数，其定义域为

$$
D(f\circ g)=\{x:x\in D(g),\ g(x)\in D(f)\}.
$$

一个典型的实际例子是：火箭在时刻 $t$ 距发射点 $h(t)$，观察站设在距发射点 $1$ km 处，则观察站到火箭的距离为

$$
d=\sqrt{1+h^2}=\sqrt{1+h^2(t)}.
$$

这里 $d$ 是 $h(t)$ 与 $u\mapsto\sqrt{1+u^2}$ 的复合。一个函数的输出作为另一个函数的输入，反映了诸量之间的链式联系。

例如

$$
f(x)=\frac1{x+1},\qquad g(x)=x^2.
$$

$g$ 的值域 $R(g)=[0,+\infty)$ 包含在 $f$ 的定义域 $\mathbb R\setminus\{-1\}$ 中，因此

$$
(f\circ g)(x)=\frac1{x^2+1},
$$

$$
(g\circ f)(x)=\frac1{(x+1)^2}.
$$

两者定义域不同：前者是 $\mathbb R$，后者要求 $x\ne-1$。

再看一个体现结合律的例子：

$$
f(x)=\frac1{x+1},\qquad g(x)=\frac1{x-1},\qquad h(x)=x^2+1.
$$

在满足复合条件时，

$$
(f\circ g)(x)=\frac1{\frac1{x-1}+1}=\frac{x-1}{x}=1-\frac1x,
$$

$$
(g\circ h)(x)=\frac1{x^2+1-1}=\frac1{x^2},
$$

于是

$$
(f\circ g\circ h)(x)
=1-\frac1{x^2+1}=\frac{x^2}{1+x^2}.
$$

按另一种结合方式，

$$
f\circ(g\circ h)(x)
=\frac1{\frac1{x^2}+1}
=\frac{x^2}{1+x^2},
$$

结果相同。这就是复合运算的结合律。

这些等式都在复合有意义的定义域上成立。本例中，$f\circ g$ 要求 $x\ne0,1$，$g\circ h$ 要求 $x\ne0$，而 $(f\circ g)\circ h$ 与 $f\circ(g\circ h)$ 都要求 $x\ne0$。

> **易错点**：写复合函数的表达式时，不能只做代数化简而丢掉这些限制。

### 反函数

设函数 $f:A\to B=R(f)$。如果对任意 $x_1,x_2\in A$，$x_1\ne x_2$ 时都有

$$
f(x_1)\ne f(x_2),
$$

则称 $f$ 是**可逆的**或**一对一的**。对可逆函数 $f$，定义函数

$$
g:R(f)\to A,\qquad y\mapsto x\quad(f(x)=y).
$$

由于 $f$ 是单射，对每个 $y\in R(f)$，满足 $f(x)=y$ 的 $x\in A$ 是唯一确定的，所以 $g$ 是函数。称 $g$ 为 $f$ 的**反函数**，记

$$
g=f^{-1}.
$$

函数 $f$ 与其反函数 $g=f^{-1}$ 满足

$$
g(y)=x\Longleftrightarrow f(x)=y.
$$

并且

$$
(f\circ g)(y)=y,\quad y\in B;\qquad
(g\circ f)(x)=x,\quad x\in A.
$$

若 $f$ 可逆且逆为 $g$，则 $g$ 也可逆，且其逆为 $f$。

函数 $y=f(x)$ 与它的反函数 $y=f^{-1}(x)$ 在同一个坐标平面上的图像关于直线 $y=x$ 对称。若写成 $x=f^{-1}(y)$，则它与 $y=f(x)$ 是同一个图形，只是自变量和因变量的记号互换。

![原函数与反函数的图像关于 y = x 对称](/images/campus-mathematical-analysis/lec02-inverse.svg)

例如：

- $y=ax+b$（$a\ne0$）的反函数是 $x=\frac{y-b}{a}$，按习惯写成 $y=\frac{x-b}{a}$；
- $y=a^x$（$a>0$，$a\ne1$）的反函数是 $x=\log_a y$，写成 $y=\log_a x$；
- $y=\sin x$ 限制在 $[-\frac\pi2,\frac\pi2]$ 上，反函数是 $y=\arcsin x$，$x\in[-1,1]$；
- $y=x^3+1$ 的反函数是 $x=\sqrt[3]{y-1}$，写成 $y=\sqrt[3]{x-1}$。

> **易混点**：注意 $f^{-1}(x)$ 表示反函数，不表示 $\frac1{f(x)}$。这是初学者最容易混淆的记号之一。

### 多元函数

把映射的集合取成实数集合的笛卡尔乘积，就得到多元函数。例如二元函数

$$
f:A_1\times A_2\to\mathbb R,\qquad y=f(x_1,x_2),
$$

三元函数

$$
f:A_1\times A_2\times A_3\to\mathbb R,\qquad
y=f(x_1,x_2,x_3),
$$

以及 $n$ 元函数

$$
f:A_1\times A_2\times\cdots\times A_n\to\mathbb R,\qquad
y=f(x_1,x_2,\dots,x_n).
$$

例如

$$
z=ax+by+c,\qquad z=x\arctan y+x^2y
$$

都是二元函数；

$$
u=\sqrt{x_1^2+x_2^2+\cdots+x_n^2}
$$

是 $n$ 元函数。

## 课堂练习

设

$$
f(x)=\frac{x}{\sqrt{1+x^2}},
$$

求 $f_n(x)=\underbrace{f\{[\cdots f(x)]\}}_{n\ \text{次}}$，并求定义域。

先算前几项：

$$
f_1(x)=f(x)=\frac{x}{\sqrt{1+x^2}},
$$

$$
f_2(x)=f(f(x))
=\frac{\dfrac{x}{\sqrt{1+x^2}}}
{\sqrt{1+\left(\dfrac{x}{\sqrt{1+x^2}}\right)^2}}
=\frac{x}{\sqrt{1+2x^2}},
$$

$$
f_3(x)=f(f_2(x))
=\frac{x}{\sqrt{1+3x^2}}.
$$

猜测

$$
f_n(x)=\frac{x}{\sqrt{1+nx^2}}.
$$

用数学归纳法证明。$n=1$ 时已成立。设 $n=k$ 时成立，即

$$
f_k(x)=\frac{x}{\sqrt{1+kx^2}},
$$

则

$$
f_{k+1}(x)=f(f_k(x))
=\frac{\dfrac{x}{\sqrt{1+kx^2}}}
{\sqrt{1+\dfrac{x^2}{1+kx^2}}}
=\frac{x}{\sqrt{1+(k+1)x^2}}.
$$

归纳完成。由于 $1+nx^2\ge1>0$，分母恒不为零，所以定义域为 $\mathbb R$。

## 课堂小结

这一讲的主线是“对应关系”：映射要求像唯一，但不要求逆像唯一；单射保证逆映射存在，满射保证陪域被取遍，双射才能建立一一对应。复合映射的关键条件是内层映射的值域包含在外层映射的定义域中；复合有顺序，一般不可交换，但满足结合律。

函数是实数集之间的映射。判断两个函数是否相同，必须同时看定义域和对应规则；求复合函数的定义域，要先看内层函数的值域是否落在外层函数的定义域内；求反函数，先要确认函数在指定区间上单射。常见错误是把 $f^{-1}$ 当成倒数、忽略复合时的定义域限制、把多值的平方根直接当成映射。

## 资料

- [2映射与函数.pdf](https://drive.google.com/file/d/14eLwir0g8AIti3I7L52xZyaje67Fl2z3/view?usp=drivesdk)
