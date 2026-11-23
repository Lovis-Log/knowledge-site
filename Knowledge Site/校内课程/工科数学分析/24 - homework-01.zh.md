---
slug: "24-homework-01"
title: "第 1 次作业（确界、函数性质与双射）"
summary: "第 1 次作业的原题与解析。"
updatedAt: "2026-11-15"
content_type: "reference"
group: "homework"
displayNumber: "01"
tags:
  - "数学分析"
sources:
  - kind: article
    title: "第一次.pdf"
    url: "https://drive.google.com/file/d/1ep8PlVj1jAcEDD993rMOBLg38KdEeag1/view?usp=drivesdk"
  - kind: article
    title: "第1次作业解答.pdf"
    url: "https://drive.google.com/file/d/16Yf8svNMFx_YgU4GAwi5G5IVarHBJ4gb/view?usp=drivesdk"
---

本次作业覆盖数集的确界、集合的对称变换、绝对值不等式、复合函数、函数迭代、可列集、奇偶性、单调性、反三角函数恒等式，以及双射的构造。题目与解答按原顺序排列；解答中补充了关键步骤，并在需要说明的地方标出。

## 题目 1

<!-- homework-topic: 求数集 $A,B,C,D$ 的上、下确界 -->

求下列数集的上、下确界：

（1）$A=\{x\mid x\in\{0,1,2,3,4,5\}\}$；

（2）$B=\{x\mid x^2<3\}$；

（3）$C=\{x\mid -5\le x<5\}$；

（4）$D=\{x\mid x>0\ \text{且}\ x^2<2\}$。

### 解

（1）$A=\{0,1,2,3,4,5\}$，所以

$$
\sup A=5,\qquad \inf A=0.
$$

最大值和最小值都存在，分别等于上确界和下确界。

（2）

$$
B=\{x:x^2<3\}=(-\sqrt3,\sqrt3),
$$

所以

$$
\sup B=\sqrt3,\qquad \inf B=-\sqrt3.
$$

两个确界都不属于 $B$。

（3）

$$
C=[-5,5),
$$

所以

$$
\sup C=5,\qquad \inf C=-5.
$$

其中 $5\notin C$，$-5\in C$。

（4）

$$
D=(0,\sqrt2),
$$

所以

$$
\sup D=\sqrt2,\qquad \inf D=0.
$$

两个确界都不属于 $D$。注意 $0$ 是下确界，但 $D$ 中没有最小的正数。

## 题目 2

<!-- homework-topic: 由 $E^-=\{x\mid -x\in E\}$ 证明 $\inf E^-=-\sup E$ -->

设 $E$ 为非空的有界数集，定义

$$
E^-=\{x\mid -x\in E\}.
$$

证明：

$$
\inf E^-=-\sup E.
$$

### 解

因为 $E$ 非空且有界，所以 $\sup E$ 存在。设

$$
\alpha=\sup E.
$$

先证 $-\alpha$ 是 $E^-$ 的下界。任取 $y\in E^-$，则 $-y\in E$。由 $\alpha$ 是 $E$ 的上界，

$$
-y\le\alpha,
$$

两边乘以 $-1$，得

$$
y\ge-\alpha.
$$

所以 $-\alpha$ 是 $E^-$ 的一个下界。

再证 $-\alpha$ 是最大下界。任取 $\varepsilon>0$。由上确界的定义，存在 $x_0\in E$，使得

$$
x_0>\alpha-\varepsilon.
$$

令 $y_0=-x_0$，则 $y_0\in E^-$，并且

$$
y_0=-x_0<-\alpha+\varepsilon.
$$

这说明任何大于 $-\alpha$ 的数都不是 $E^-$ 的下界。因此

$$
\inf E^-=-\alpha=-\sup E.
$$

## 题目 3

<!-- homework-topic: 证明 $\dfrac{|a+b|}{1+|a+b|}\le\dfrac{|a|}{1+|a|}+\dfrac{|b|}{1+|b|}$ -->

证明：对任意 $a,b\in\mathbb R$，有

$$
\frac{|a+b|}{1+|a+b|}
\le\frac{|a|}{1+|a|}+\frac{|b|}{1+|b|}.
$$

### 解

令

$$
f(t)=\frac{t}{1+t}=1-\frac1{1+t},\qquad t\ge0.
$$

因为 $1+t$ 随 $t$ 增大而增大，所以 $\frac1{1+t}$ 随 $t$ 增大而减小，从而 $f(t)$ 在 $[0,+\infty)$ 上严格单调递增。

由三角不等式

$$
|a+b|\le|a|+|b|,
$$

得

$$
f(|a+b|)\le f(|a|+|b|),
$$

即

$$
\frac{|a+b|}{1+|a+b|}
\le\frac{|a|+|b|}{1+|a|+|b|}.
$$

又因为

$$
\frac{|a|+|b|}{1+|a|+|b|}
=\frac{|a|}{1+|a|+|b|}+\frac{|b|}{1+|a|+|b|},
$$

且

$$
\frac{|a|}{1+|a|+|b|}\le\frac{|a|}{1+|a|},
\qquad
\frac{|b|}{1+|a|+|b|}\le\frac{|b|}{1+|b|},
$$

所以

$$
\frac{|a|+|b|}{1+|a|+|b|}
\le\frac{|a|}{1+|a|}+\frac{|b|}{1+|b|}.
$$

综上，

$$
\frac{|a+b|}{1+|a+b|}
\le\frac{|a|}{1+|a|}+\frac{|b|}{1+|b|}.
$$

## 题目 4

<!-- homework-topic: 由 $f(x)=x^3+1,\ g(x)=\sqrt x$ 求 $g[f(x)]$、$f[g(x)]$、$f[f(x)]$、$g(x+1)$ 及定义域 -->

设

$$
f(x)=x^3+1,\qquad g(x)=\sqrt x,
$$

求：

（1）$g[f(x)]$；

（2）$f[g(x)]$；

（3）$f[f(x)]$；

（4）$g(x+1)$。

### 解

（1）

$$
g[f(x)]=\sqrt{x^3+1}.
$$

要求 $x^3+1\ge0$，即

$$
x\ge-1.
$$

所以定义域为 $[-1,+\infty)$。

（2）

$$
f[g(x)]=(\sqrt x)^3+1=x^{3/2}+1.
$$

要求 $x\ge0$，所以定义域为 $[0,+\infty)$。

（3）

$$
f[f(x)]=(x^3+1)^3+1
=x^9+3x^6+3x^3+2.
$$

定义域为 $\mathbb R$。

（4）

$$
g(x+1)=\sqrt{x+1}.
$$

要求 $x+1\ge0$，即

$$
x\ge-1.
$$

所以定义域为 $[-1,+\infty)$。

## 题目 5

<!-- homework-topic: 求 $f(x)=\dfrac{x}{\sqrt{1+x^2}}$ 的 $n$ 次迭代 $f_n$ 与定义域 -->

设

$$
f(x)=\frac{x}{\sqrt{1+x^2}},
$$

求

$$
f_n(x)=\underbrace{f\{[\cdots f(x)]\}}_{n\ \text{次}},
$$

并求定义域 $D(f)$。

### 解

先算前几项，寻找规律：

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

用数学归纳法证明。当 $n=1$ 时，猜测就是 $f_1(x)$，成立。

设 $n=k$ 时成立，即

$$
f_k(x)=\frac{x}{\sqrt{1+kx^2}}.
$$

则

$$
\begin{aligned}
f_{k+1}(x)
&=f(f_k(x))\\
&=\frac{\dfrac{x}{\sqrt{1+kx^2}}}
{\sqrt{1+\left(\dfrac{x}{\sqrt{1+kx^2}}\right)^2}}\\
&=\frac{\dfrac{x}{\sqrt{1+kx^2}}}
{\sqrt{\dfrac{1+kx^2+x^2}{1+kx^2}}}\\
&=\frac{x}{\sqrt{1+(k+1)x^2}}.
\end{aligned}
$$

归纳完成，所以

$$
f_n(x)=\frac{x}{\sqrt{1+nx^2}}.
$$

由于对任意 $x\in\mathbb R$ 和任意 $n\in\mathbb N$，都有

$$
1+nx^2\ge1>0,
$$

分母恒不为零，所以定义域为

$$
D(f)=\mathbb R.
$$

## 题目 6

<!-- homework-topic: 构造双射 $f:\mathbb N\times\mathbb N\to\mathbb N$ -->

为了比较无限集的元素个数的“多少”，通常通过映射来比较：如果两个集合之间可以建立双射，就认为这两个集合的元素个数“一样多”。试建立一个双射

$$
f:\mathbb N\times\mathbb N\to\mathbb N.
$$

这也表明 $\mathbb N\times\mathbb N$ 是一个可列集。

### 解

利用正整数的素因数分解。任一自然数 $n$ 都可以唯一地写成

$$
n=2^p q,
$$

其中 $p$ 为非负整数，$q$ 为正奇数。这里的“唯一”来自算术基本定理：把所有因子 $2$ 提出来，剩下的部分就是奇数 $q$。

定义

$$
f:\mathbb N\times\mathbb N\to\mathbb N,
$$

$$
f((i,j))=2^{i-1}(2j-1).
$$

先看它为什么是满射。任取 $n\in\mathbb N$，把 $n$ 写成 $2^p q$，其中 $p\ge0$，$q$ 为正奇数。令

$$
i=p+1,\qquad j=\frac{q+1}{2}.
$$

因为 $q$ 是正奇数，所以 $j\in\mathbb N$。于是

$$
f((i,j))=2^{i-1}(2j-1)=2^p q=n.
$$

再看它为什么是单射。若

$$
f((i,j))=f((i',j')),
$$

即

$$
2^{i-1}(2j-1)=2^{i'-1}(2j'-1),
$$

其中 $2j-1$ 与 $2j'-1$ 都是奇数。由“一个正整数写成 $2$ 的幂乘以奇数”的唯一性，得

$$
i-1=i'-1,\qquad 2j-1=2j'-1,
$$

从而

$$
i=i',\qquad j=j'.
$$

所以 $f$ 既是单射又是满射，从而是双射。

此题答案不唯一，其他满足双射要求的构造也可以。

## 题目 7

<!-- homework-topic: 判断三个函数的奇偶性 -->

讨论下列函数的奇偶性：

（1）$y=\sqrt[3]{(1+x)^2}+\sqrt[3]{(1-x)^2}$；

（2）$y=2^{-x}$；

（3）$y=\ln\left(x+\sqrt{1+x^2}\right)$。

### 解

（1）定义域为 $\mathbb R$，关于原点对称。并且

$$
\begin{aligned}
y(-x)
&=\sqrt[3]{(1-x)^2}+\sqrt[3]{(1+x)^2}\\
&=y(x).
\end{aligned}
$$

所以它是偶函数。

（2）定义域为 $\mathbb R$。并且

$$
y(-x)=2^{x}.
$$

而

$$
y(x)=2^{-x}.
$$

两者一般不相等，也不互为相反数。例如取 $x=1$，则

$$
y(1)=\frac12,\qquad y(-1)=2.
$$

$2\ne\frac12$，且 $2\ne-\frac12$，所以它既不是偶函数，也不是奇函数。

（3）定义域为 $\mathbb R$。因为

$$
\sqrt{1+x^2}>|x|,
$$

所以 $x+\sqrt{1+x^2}>0$，对数有意义。并且

$$
\begin{aligned}
y(-x)
&=\ln\left(-x+\sqrt{1+x^2}\right)\\
&=\ln\left(\sqrt{1+x^2}-x\right)\\
&=\ln\frac{1}{\sqrt{1+x^2}+x}\\
&=-\ln\left(x+\sqrt{1+x^2}\right)
=-y(x).
\end{aligned}
$$

所以它是奇函数。

## 题目 8

<!-- homework-topic: 判断减函数与增函数的复合 $f[g(x)]$ 的单调性并证明 -->

设 $f(x),g(x)$ 分别是定义在 $(-\infty,+\infty)$ 上的单调减函数和单调增函数。问：$f[g(x)]$ 在 $(-\infty,+\infty)$ 上的单调性如何？证明你的结论。

### 解

结论：$f\circ g$ 在 $\mathbb R$ 上单调递减；若 $f,g$ 都是严格单调的，则 $f\circ g$ 严格单调递减。

证明：任取 $x_1<x_2$。因为 $g$ 单调递增，所以

$$
g(x_1)\le g(x_2).
$$

又因为 $f$ 单调递减，所以

$$
f(g(x_1))\ge f(g(x_2)).
$$

因此 $f\circ g$ 单调递减。

如果 $g$ 严格递增、$f$ 严格递减，则上面的两个不等号都变成严格不等号：

$$
g(x_1)<g(x_2)
\Longrightarrow
f(g(x_1))>f(g(x_2)).
$$

此时 $f\circ g$ 严格单调递减。

要注意：题目只给出“单调”，没有说“严格单调”，所以只能保证非严格递减；要得到严格递减，需要额外假设 $f,g$ 都严格单调。

## 题目 9

<!-- homework-topic: 证明 $\arctan\dfrac12+\arctan\dfrac13=\dfrac\pi4$ -->

证明恒等式：

$$
\arctan\frac12+\arctan\frac13=\frac\pi4.
$$

### 解

因为

$$
0<\frac13<\frac12<1,
$$

所以

$$
0<\arctan\frac13<\arctan\frac12<\arctan1=\frac\pi4.
$$

于是

$$
0<\arctan\frac12+\arctan\frac13<\frac\pi2.
$$

在这个区间内，正切函数是单射。利用正切的和角公式，

$$
\tan\left(\arctan\frac12+\arctan\frac13\right)
=\frac{\dfrac12+\dfrac13}{1-\dfrac12\cdot\dfrac13}
=\frac{\dfrac56}{\dfrac56}=1.
$$

在 $(0,\frac\pi2)$ 内，正切值为 $1$ 的角只有 $\frac\pi4$，所以

$$
\arctan\frac12+\arctan\frac13=\frac\pi4.
$$

## 题目 10

<!-- homework-topic: 构造 $[0,1]\to[0,1]$ 的双射，使它在任何子区间上都不单调 -->

构造一个双射函数

$$
f:[0,1]\to[0,1],
$$

它在 $[0,1]$ 的任何子区间上都不具有单调性。

### 解

定义

$$
f(x)=
\begin{cases}
x,&x\in[0,1]\cap\mathbb Q,\\
1-x,&x\in[0,1]\setminus\mathbb Q.
\end{cases}
$$

**先证 $f$ 是双射。** 有理点被映到有理点，无理点被映到无理点：若 $x$ 是无理数，则 $1-x$ 也是无理数。并且

$$
f(f(x))=x
$$

对一切 $x\in[0,1]$ 成立：有理点上有 $f(f(x))=f(x)=x$，无理点上有

$$
f(f(x))=f(1-x)=1-(1-x)=x.
$$

所以 $f$ 是自己的逆映射，从而是双射。

**再证它在任何非退化子区间上都不单调。** 设 $I\subseteq[0,1]$ 是任意一个长度大于零的区间。由有理数和无理数的稠密性，$I$ 中既有有理数，也有无理数；并且可以取到

$$
q_1<q_2,\qquad q_1,q_2\in I\cap\mathbb Q,
$$

以及

$$
r_1<r_2,\qquad r_1,r_2\in I\setminus\mathbb Q.
$$

于是

$$
f(q_1)=q_1<q_2=f(q_2),
$$

这说明 $f$ 在 $I$ 上不是单调递减的；同时

$$
f(r_1)=1-r_1>1-r_2=f(r_2),
$$

这说明 $f$ 在 $I$ 上不是单调递增的。因此 $f$ 在 $I$ 上既不是单调递增，也不是单调递减，即不具有单调性。

**两点说明。** 第一，若把无理点上的取值写成 $-x$，函数值会落到 $[-1,0]$，不再是 $[0,1]\to[0,1]$ 的映射；正确的构造是 $1-x$。第二，若“子区间”允许退化为一个点，单调性在该点上没有实质意义；题目通常指长度大于零的子区间。

> **补充说明**：这里的关键是让 $f$ 成为对合，即 $f(f(x))=x$。对合自动是双射（它的逆映射就是自己），所以不必分别验证单射与满射。有理点用 $x$、无理点用 $1-x$，是为了把两类点各自留在 $[0,1]$ 内，同时让两类点的走向相反；而两类点在任何长度大于零的区间内都稠密，才能在同一个区间里同时找到“上升”和“下降”的证据。

## 小结

本次作业的关键在于“先看条件，再动笔”。确界问题要同时验证“是界”和“是最小（大）界”；复合函数与反函数问题要先确定定义域和值域；双射构造要分别说明单射与满射；奇偶性判断要先检查定义域是否对称。第 10 题还提醒我们：构造反例时，函数的陪域不能被破坏，否则看似巧妙的式子可能根本不是所要的映射。
