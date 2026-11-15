---
slug: "10-chapter-2-review"
title: "第二章 极限与连续复习"
summary: "第 10 讲：第二章 极限与连续复习。"
updatedAt: "2026-11-15"
content_type: "video-course"
group: "course"
displayNumber: "10"
tags:
  - "数学分析"
sources:
  - kind: article
    title: "10第二章极限与连续复习.pdf"
    url: "https://drive.google.com/file/d/17uD_js6hMCXKvqsYgWSIBtGi7tWzfEpZ/view?usp=drivesdk"
---

这一章的内容可以串成一条线：先用 $\varepsilon-N$、$\varepsilon-\delta$ 语言把“趋于”说清楚，再讨论极限的性质与存在性，接着把极限值等于函数值的情形单独拿出来，得到连续函数；最后用无穷小量与无穷大量的阶，把极限计算变成可操作的比较与替换。

复习时不必把每个证明重新背一遍，但要能准确说出定义、定理的条件，以及遇到具体问题时该选哪一种工具。

## 1. 数列极限

### 1.1 定义：$\varepsilon-N$ 语言

数列 $\{a_n\}$ 收敛于 $A$，是指

$$
\forall \varepsilon>0,\ \exists N\in\mathbb N,\ \forall n>N:\ |a_n-A|<\varepsilon.
$$

记作

$$
\lim_{n\to\infty}a_n=A.
$$

这里的 $N$ 依赖 $\varepsilon$；$\varepsilon$ 越小，$N$ 一般越大。证明数列极限，核心就是“给定 $\varepsilon$，找出 $N$”，通常要先把 $|a_n-A|$ 放大成一个容易解出 $n$ 的表达式。

### 1.2 性质

- **唯一性**：收敛数列的极限唯一。
- **有界性**：收敛数列必有界。
- **保序性**：若 $a_n\ge b_n$（从某一项起），且 $a_n\to A$、$b_n\to B$，则 $A\ge B$。注意即使 $a_n>b_n$ 恒成立，极限也可能相等。
- **两边夹（夹逼性）**：若 $b_n\le a_n\le c_n$（从某一项起），且 $b_n\to A$、$c_n\to A$，则 $a_n\to A$。
- **四则运算法则**：若 $a_n\to A$、$b_n\to B$，则 $a_n\pm b_n\to A\pm B$，$a_nb_n\to AB$，且当 $B\ne0$ 时 $\dfrac{a_n}{b_n}\to\dfrac AB$。

### 1.3 几个基本定理

- **确界原理**：非空有上界的实数集必有上确界；非空有下界的实数集必有下确界。
- **单调有界定理**：单调增加且有上界的数列收敛，极限为上确界；单调减少且有下界的数列收敛，极限为下确界。
- **柯西收敛原理**：数列 $\{a_n\}$ 收敛的充分必要条件是
  $$
  \forall \varepsilon>0,\ \exists N,\ \forall n,m>N:\ |a_n-a_m|<\varepsilon.
  $$
  也就是说，收敛等价于“数列是基本数列”。
- **闭区间套定理**：若 $\{[a_n,b_n]\}$ 是闭区间套，且 $b_n-a_n\to0$，则存在唯一的 $\xi$ 属于所有区间。
- **致密性定理（Bolzano-Weierstrass 定理）**：有界数列必有收敛子列。

这些定理不是孤立的。确界原理是实数连续性的基本形式；单调有界定理、闭区间套定理、致密性定理都可以由它推出，它们分别对应“用确界”“用二分”“用抽子列”三种不同的证明思路。

### 1.4 极限的存在性证明与计算

常用方法有：

1. **用定义**：先猜出极限，再放大 $|a_n-A|$，解出 $N$。
2. **两边夹**：把 $a_n$ 夹在两个趋于同一极限的数列之间。
3. **四则运算**：把表达式拆成已知极限的组成部分。
4. **Stolz 定理**：处理 $\dfrac{\infty}{\infty}$ 型数列极限。
5. **单调有界**：先证单调、再证有界，最后对递推关系取极限。
6. **柯西收敛原理**：不需要先知道极限值，直接证明数列是基本数列。

**Stolz 定理**可以这样记：设 $b_n$ 严格单调增加且 $b_n\to+\infty$，若

$$
\lim_{n\to\infty}\frac{a_{n+1}-a_n}{b_{n+1}-b_n}=L
$$

（$L$ 可以是有限数或 $\pm\infty$），则

$$
\lim_{n\to\infty}\frac{a_n}{b_n}=L.
$$

它相当于数列版本的“洛必达法则”：分母趋于无穷时，用相邻两项的差之比代替原比值。

### 1.5 重要技巧：不等式放缩

数列极限的证明几乎都离不开放缩。常见手法：

- 把分母放大或分子缩小，使分式变大；
- 用 $|\sin x|\le1$、$|\sin x|\le|x|$、$|x+y|\le|x|+|y|$ 等基本不等式；
- 对乘积型数列，取对数或配对；
- 对递推数列，先证明有界性，再证明单调性。

放缩的目标不是“放得越松越好”，而是放缩后仍然能推出 $<\varepsilon$，并且解出的 $N$ 只依赖 $\varepsilon$。

## 2. 函数极限

### 2.1 定义

函数极限有几种不同的“趋近方式”，精确语言也略有不同。

**$x\to x_0$ 型**：

$$
\lim_{x\to x_0}f(x)=A
$$

是指

$$
\forall \varepsilon>0,\ \exists \delta>0,\ \forall x\ (0<|x-x_0|<\delta):\ |f(x)-A|<\varepsilon.
$$

**$x\to\infty$ 型**：

$$
\forall \varepsilon>0,\ \exists X>0,\ \forall x\ (|x|>X):\ |f(x)-A|<\varepsilon.
$$

**$x\to+\infty$ 型**：把 $|x|>X$ 换成 $x>X$；$x\to-\infty$ 换成 $x<-X$。

**单侧极限 $x\to x_0+$**：把 $0<|x-x_0|<\delta$ 换成 $0<x-x_0<\delta$；$x\to x_0-$ 换成 $-\delta<x-x_0<0$。

**无穷极限 $G-X$ 型**：$\lim\limits_{x\to x_0}f(x)=+\infty$ 是指

$$
\forall G>0,\ \exists \delta>0,\ \forall x\ (0<|x-x_0|<\delta):\ f(x)>G.
$$

其余情形（$-\infty$、$x\to\infty$ 等）类似，只改不等号方向或邻域形状。

### 2.2 性质

- **唯一性**：若极限存在，则唯一。
- **局部有界性**：若 $\lim\limits_{x\to x_0}f(x)=A$，则 $f$ 在 $x_0$ 的某去心邻域内有界。
- **保序性**：若在 $x_0$ 的某去心邻域内 $f(x)\ge g(x)$，且两者极限存在，则极限值也满足同样的大小关系。
- **两边夹**：若 $g(x)\le f(x)\le h(x)$，且 $g,h$ 的极限都为 $A$，则 $f$ 的极限也为 $A$。
- **四则运算**：与数列情形完全平行，但要求参与运算的极限都存在，且分母极限不为零。

### 2.3 海涅定理（归结原则）

> $\lim\limits_{x\to x_0}f(x)=A$ 的充分必要条件是：对任意满足 $x_n\to x_0$、$x_n\ne x_0$ 的数列 $\{x_n\}$，都有
>
> $$
> \lim_{n\to\infty}f(x_n)=A.
> $$

海涅定理把函数极限问题转化成数列极限问题。它有两个典型用法：

1. **证明极限不存在**：找两个都趋于 $x_0$ 的数列，但函数值数列的极限不同。
2. **证明极限存在**：证明所有这样的数列对应的函数值都趋于同一个 $A$。

例如证明 $\lim\limits_{x\to+\infty}\cos x$ 不存在，取

$$
x_k=2k\pi,\qquad z_k=2k\pi+\frac{\pi}{2},
$$

则 $x_k\to+\infty$、$z_k\to+\infty$，但

$$
\cos x_k\equiv1,\qquad \cos z_k\equiv0.
$$

两个函数值数列的极限不同，由海涅定理，原极限不存在。

### 2.4 极限的存在性证明与计算

常用方法：

1. **用定义**：给定 $\varepsilon$，构造 $\delta$ 或 $X$。
2. **两边夹**：用不等式把函数夹住。
3. **四则运算**：拆成已知极限。
4. **海涅定理**：把函数极限转化为数列极限，或用来证明不存在。
5. **函数连续性**：若 $x_0$ 在定义域内，直接代入 $f(x_0)$。
6. **等价替换**：把乘除中的因子换成等价量。

### 2.5 重要技巧：不等式放缩

函数极限的 $\varepsilon-\delta$ 证明，难点通常在“找 $\delta$”。常用做法是先限制 $|x-x_0|<\delta_0$，把 $|f(x)-A|$ 放大成 $C|x-x_0|$ 的形式，再取

$$
\delta=\min\left\{\delta_0,\ \frac{\varepsilon}{C}\right\}.
$$

例如证明 $\lim\limits_{x\to a}\sin x=\sin a$，直接用

$$
|\sin x-\sin a|\le|x-a|
$$

即可取 $\delta=\varepsilon$。证明 $\lim\limits_{x\to4}\sqrt x=2$，则用

$$
|\sqrt x-2|=\frac{|x-4|}{\sqrt x+2}<\frac{|x-4|}{2},
$$

取 $\delta=2\varepsilon$（再配合 $x$ 靠近 $4$ 的限制）。

## 3. 连续函数

### 3.1 定义

$f$ 在 $x_0$ 连续，是指

$$
\lim_{x\to x_0}f(x)=f(x_0)=f\left(\lim_{x\to x_0}x\right).
$$

最后一个等式的意思是：极限符号和函数符号可以交换。这是连续函数最本质的特征，也是“直接代入求极限”的依据。

### 3.2 性质

- **四则运算**：连续函数的和、差、积、商（分母不为零）仍连续。
- **反函数连续性**：闭区间上连续且严格单调的函数，其反函数在相应的值域区间上连续且保持单调性。
- **复合函数连续性**：内层连续、外层连续，则复合函数连续。

### 3.3 初等函数连续性定理

> 初等函数在其定义域内都是连续的。

因此，若 $x_0$ 是初等函数 $f$ 定义域内的一点，则

$$
\lim_{x\to x_0}f(x)=f(x_0),
$$

可以直接代入。这条定理是计算大量极限的“默认工具”，但要注意：代入的前提是 $x_0$ 真的在定义域内，且函数在 $x_0$ 的某个邻域内有定义。

### 3.4 闭区间上连续函数的性质

设 $f$ 在 $[a,b]$ 上连续，则：

1. **有界性**：$f$ 在 $[a,b]$ 上有界。
2. **最值定理**：$f$ 在 $[a,b]$ 上取到最大值 $M$ 与最小值 $m$。
3. **零点存在定理**：若 $f(a)f(b)<0$，则存在 $\xi\in(a,b)$，使 $f(\xi)=0$。
4. **介值定理**：$f$ 取到 $m$ 与 $M$ 之间的任何一个值。
5. **值域**：$R_f=[m,M]$。

这五条性质是一个整体：有界性是最值存在的前提，最值定理给出 $m,M$，介值定理再把中间的值得出，零点定理则是介值定理的特殊情形（取 $C=0$）。

### 3.5 一致连续

**定义**：$f$ 在区间 $X$ 上一致连续，是指

$$
\forall \varepsilon>0,\ \exists \delta>0,\ \forall x',x''\in X,\ |x'-x''|<\delta:\ |f(x')-f(x'')|<\varepsilon.
$$

与普通连续的区别：普通连续的 $\delta$ 依赖点 $x_0$；一致连续的 $\delta$ 只依赖 $\varepsilon$，对全区间通用。

**判定**：

- 闭区间上连续 $\Rightarrow$ 一致连续（Cantor 定理）。
- 有限开区间 $(a,b)$ 上连续，则一致连续 $\iff$ $f(a+)$ 与 $f(b-)$ 都存在。
- 无限区间上，定理不成立；例如 $\sin x$ 在 $\mathbb R$ 上一致连续，但 $\sin(+\infty)$ 不存在。

**证明不一致连续的常用手法**：找两列 $x_n',x_n''$，使

$$
|x_n'-x_n''|\to0,\qquad |f(x_n')-f(x_n'')|\ge\varepsilon_0>0.
$$

例如 $\dfrac1x$ 在 $(0,1]$ 上取 $x_n=\dfrac1n$、$y_n=\dfrac1{2n}$，距离趋于零，函数值差恒为 $n$。

## 4. 无穷小与无穷大

### 4.1 无穷小量

若 $\lim\limits_{x\to x_0}f(x)=0$，则称 $f$ 为无穷小量，记作

$$
f(x)=o(1)\qquad(x\to x_0).
$$

若 $f$ 在 $x_0$ 的某去心邻域内有界，记作

$$
f(x)=O(1)\qquad(x\to x_0).
$$

### 4.2 阶的比较

设 $u,v$ 都是 $x\to x_0$ 时的无穷小量：

- **高阶**：$\lim\dfrac uv=0$，记 $u=o(v)$；
- **有界**：$\left|\dfrac uv\right|\le B$，记 $u=O(v)$；
- **同阶**：$A\le\left|\dfrac uv\right|\le B$（$A,B>0$）；
- **等价**：$\lim\dfrac uv=1$，记 $u\sim v$。

若 $u$ 与 $(x-x_0)^k$ 同阶，则称 $u$ 为 $k$ 阶无穷小量。

无穷大量的阶完全类似，只把“趋于 $0$”换成“趋于 $\infty$”。当 $x\to+\infty$ 时，增长速度从高到低为

$$
e^x\gg x^\beta\gg x^\alpha\gg\ln x,\qquad \beta>\alpha>0.
$$

### 4.3 等价替换定理

若 $v\sim w$（$x\to x_0$），则

$$
\lim u w=A\ \Longrightarrow\ \lim u v=A,
$$

$$
\lim\frac u w=B\ \Longrightarrow\ \lim\frac u v=B.
$$

也就是说，**乘除中的因子**可以用等价量替换。加减中的项不能直接替换，必须先因式分解，或展开到足够高的阶。

### 4.4 常用等价无穷小（$x\to0$）

$$
x\sim\sin x\sim\arcsin x\sim\tan x\sim\arctan x\sim\ln(1+x)\sim e^x-1,
$$

$$
1-\cos x\sim\frac{x^2}{2},
$$

$$
(1+x)^\alpha-1\sim\alpha x.
$$

### 4.5 注意事项

1. 等价替换只对因子有效。加减法中直接替换，可能把主导项抵消掉，得到错误的 $0$。
2. 幂指函数的极限，通常先取对数，再算指数上的极限，最后取指数。
3. 无穷大量的比较中，习惯上不用 $o$，但仍用 $O$ 和 $\sim$。

## 5. 作业评讲中的题目

以下解答为补充解答，按题目顺序整理。

### 5.1 第二次作业

#### 1. 用极限定义（$\varepsilon-N$ 语言）证明

**(1)** 证明

$$
\lim_{n\to\infty}\frac{2n^2+6n+1}{n^2+2n+4}=2.
$$

**证明**：

$$
\left|\frac{2n^2+6n+1}{n^2+2n+4}-2\right|
=\frac{|2n-7|}{n^2+2n+4}.
$$

当 $n\ge4$ 时，$|2n-7|=2n-7<2n$，且分母 $n^2+2n+4>n^2$，所以

$$
\left|\frac{2n^2+6n+1}{n^2+2n+4}-2\right|<\frac{2n}{n^2}=\frac2n.
$$

对任意 $\varepsilon>0$，取

$$
N=\max\left\{4,\left\lceil\frac2\varepsilon\right\rceil\right\}.
$$

当 $n>N$ 时，$\dfrac2n<\varepsilon$，故原极限为 $2$。

**(2)** 已知 $\lim\limits_{n\to\infty}x_n=a$，证明

$$
\lim_{n\to\infty}|x_n|=|a|.
$$

**证明**：利用反向三角不等式

$$
||x_n|-|a||\le|x_n-a|.
$$

对任意 $\varepsilon>0$，由 $x_n\to a$，存在 $N$，当 $n>N$ 时 $|x_n-a|<\varepsilon$，从而 $||x_n|-|a||<\varepsilon$。所以 $|x_n|\to|a|$。

**(3)** 已知非负数列 $\{x_n\}$ 收敛于实数 $a$，证明

$$
\lim_{n\to\infty}\sqrt{x_n}=\sqrt a.
$$

**证明**：分两种情形。

若 $a=0$，对任意 $\varepsilon>0$，由 $x_n\to0$，存在 $N$，当 $n>N$ 时 $0\le x_n<\varepsilon^2$，于是

$$
0\le\sqrt{x_n}<\varepsilon.
$$

若 $a>0$，则

$$
|\sqrt{x_n}-\sqrt a|
=\frac{|x_n-a|}{\sqrt{x_n}+\sqrt a}
\le\frac{|x_n-a|}{\sqrt a}.
$$

对任意 $\varepsilon>0$，取 $N$ 使 $n>N$ 时 $|x_n-a|<\sqrt a\,\varepsilon$，则 $|\sqrt{x_n}-\sqrt a|<\varepsilon$。所以 $\sqrt{x_n}\to\sqrt a$。

#### 2. 用两边夹方法证明

**(1)** 证明

$$
\lim_{n\to\infty}\sqrt[n]{n}=1.
$$

**证明**：令 $h_n=\sqrt[n]{n}-1\ge0$，则 $n=(1+h_n)^n$。由二项式展开，

$$
n\ge\frac{n(n-1)}2h_n^2\qquad(n\ge2),
$$

所以

$$
0\le h_n\le\sqrt{\frac2{n-1}}.
$$

两边令 $n\to\infty$，由夹逼性得 $h_n\to0$，即 $\sqrt[n]{n}\to1$。

**(2)** 证明

$$
\lim_{n\to\infty}\frac{3^n}{n!}=0.
$$

**证明**：当 $n\ge3$ 时，

$$
0<\frac{3^n}{n!}
=\frac{3^3}{3!}\cdot\frac3{4}\cdot\frac3{5}\cdots\frac3n
\le\frac{27}{6}\left(\frac34\right)^{n-3}.
$$

右边是几何数列，趋于 $0$，由夹逼性得原极限为 $0$。

**(3)** 证明

$$
\lim_{n\to\infty}\frac12\cdot\frac34\cdot\frac56\cdots\frac{2n-1}{2n}=0.
$$

**证明**：记

$$
P_n=\prod_{k=1}^n\frac{2k-1}{2k}.
$$

因为

$$
\frac{2k-1}{2k}<\frac{2k}{2k+1},
$$

所以

$$
P_n^2<\prod_{k=1}^n\frac{2k-1}{2k}\cdot\frac{2k}{2k+1}
=\prod_{k=1}^n\frac{2k-1}{2k+1}
=\frac1{2n+1}.
$$

于是

$$
0<P_n<\frac1{\sqrt{2n+1}}\to0.
$$

由夹逼性，$P_n\to0$。

#### 3. 证明

**(1)** 数列

$$
a_n=\left(1+\frac1n\right)^n
$$

严格单调增加收敛到 $e$。

**证明要点**：由二项式展开，

$$
a_n=1+\sum_{k=1}^n\frac1{k!}\prod_{j=0}^{k-1}\left(1-\frac jn\right).
$$

对固定的 $k$，因子 $\left(1-\dfrac jn\right)$ 随 $n$ 增大而增大；同时 $n$ 增大时还多出新的正项。所以 $a_n$ 严格单调增加。又每项不超过 $\dfrac1{k!}$，故

$$
a_n<1+1+\frac1{2}+\frac1{2^2}+\cdots+\frac1{2^{n-1}}<3,
$$

有上界。由单调有界定理，$a_n$ 收敛；把这个极限定义为 $e$。

**(2)** 数列

$$
b_n=\left(1+\frac1n\right)^{n+1}
$$

严格单调减少收敛到 $e$。

**证明要点**：考虑比值

$$
\frac{b_{n-1}}{b_n}
=\left(1+\frac1{n^2-1}\right)^n\cdot\frac n{n+1}.
$$

由 Bernoulli 不等式，

$$
\left(1+\frac1{n^2-1}\right)^n
\ge1+\frac n{n^2-1}
=\frac{n^2+n-1}{n^2-1}.
$$

于是

$$
\frac{b_{n-1}}{b_n}
\ge\frac{n(n^2+n-1)}{(n+1)(n^2-1)}
=\frac{n^3+n^2-n}{n^3+n^2-n-1}>1.
$$

所以 $b_{n-1}>b_n$，即 $b_n$ 严格单调减少。又

$$
b_n=\left(1+\frac1n\right)a_n\to e,
$$

故 $b_n$ 收敛到 $e$。

**(3)** 证明

$$
\frac1{n+1}<\ln\left(1+\frac1n\right)<\frac1n,\qquad\forall n\ge1.
$$

**证明**：对 $x>0$，有

$$
\frac x{1+x}<\ln(1+x)<x.
$$

取 $x=\dfrac1n$，即得

$$
\frac1{n+1}<\ln\left(1+\frac1n\right)<\frac1n.
$$

**(4)** 数列

$$
x_n=1+\frac12+\frac13+\cdots+\frac1n-\ln n
$$

收敛。

**证明**：由 (3)，

$$
x_n-x_{n+1}
=\frac1{n+1}-\ln\left(1+\frac1n\right)<0,
$$

所以 $\{x_n\}$ 单调减少。另一方面，由 $\ln\left(1+\dfrac1k\right)<\dfrac1k$ 对 $k=1,\cdots,n$ 求和，得

$$
\ln(n+1)<1+\frac12+\cdots+\frac1n,
$$

所以

$$
x_n>\ln(n+1)-\ln n=\ln\left(1+\frac1n\right)>0.
$$

$\{x_n\}$ 单调减少且有下界 $0$，由单调有界定理收敛。其极限就是 Euler 常数 $\gamma$。

#### 4. 设 $x_1=2$，$x_n=\sin x_{n-1}$（$n\ge2$），证明 $\{x_n\}$ 为无穷小量

**证明**：首先 $x_2=\sin2\in(0,1)$。若 $0<x<1$，则 $0<\sin x<1$，所以从第二项起，

$$
0<x_n<1.
$$

又当 $x>0$ 时 $\sin x<x$，所以

$$
x_{n+1}=\sin x_n<x_n.
$$

因此 $\{x_n\}$ 单调减少且有下界 $0$，收敛。设极限为 $L$，则 $L\in[0,1]$，且由连续性，

$$
L=\sin L.
$$

在 $[0,1]$ 上，$\sin L=L$ 只有解 $L=0$，所以 $x_n\to0$。

#### 5. 计算

$$
\lim_{n\to\infty}\frac{1+\frac1{\sqrt2}+\cdots+\frac1{\sqrt n}}{\sqrt n}.
$$

**解**：令

$$
a_n=1+\frac1{\sqrt2}+\cdots+\frac1{\sqrt n},\qquad b_n=\sqrt n.
$$

$b_n$ 严格单调增加且趋于 $+\infty$。由 Stolz 定理，

$$
\frac{a_{n+1}-a_n}{b_{n+1}-b_n}
=\frac{\frac1{\sqrt{n+1}}}{\sqrt{n+1}-\sqrt n}
=\frac{\sqrt{n+1}+\sqrt n}{\sqrt{n+1}}
=1+\sqrt{\frac n{n+1}}\to2.
$$

所以原极限为 $2$。

### 5.2 第三次作业

#### 1. 设 $x_1=10$，$x_{n+1}=\sqrt{6+x_n}$，证明 $\{x_n\}$ 极限存在，并求此极限

**证明**：先证 $x_n>3$。$x_1=10>3$；若 $x_n>3$，则

$$
x_{n+1}=\sqrt{6+x_n}>\sqrt9=3.
$$

所以对所有 $n$，$x_n>3$。

再证单调减少：

$$
x_{n+1}<x_n
\iff \sqrt{6+x_n}<x_n
\iff 6+x_n<x_n^2
\iff x_n^2-x_n-6>0
\iff x_n>3.
$$

最后一式成立，故 $x_{n+1}<x_n$。数列单调减少且有下界 $3$，所以收敛。设极限为 $L$，对递推式取极限得

$$
L=\sqrt{6+L},
$$

即

$$
L^2-L-6=0,
$$

解得 $L=3$ 或 $L=-2$。由于 $x_n>3$，只能有 $L=3$。

#### 2. 数列 $\{x_n\}$ 的子列 $\{x_{2k}\}$ 与 $\{x_{2k+1}\}$ 都收敛于 $a$，用 $\varepsilon-N$ 语言证明 $\{x_n\}$ 也收敛于 $a$

**证明**：对任意 $\varepsilon>0$。由 $x_{2k}\to a$，存在 $K_1$，当 $k>K_1$ 时

$$
|x_{2k}-a|<\varepsilon.
$$

由 $x_{2k+1}\to a$，存在 $K_2$，当 $k>K_2$ 时

$$
|x_{2k+1}-a|<\varepsilon.
$$

取

$$
N=\max\{2K_1,\ 2K_2+1\}.
$$

当 $n>N$ 时：

- 若 $n=2k$ 为偶数，则 $k>K_1$，故 $|x_n-a|<\varepsilon$；
- 若 $n=2k+1$ 为奇数，则 $k>K_2$，故 $|x_n-a|<\varepsilon$。

所以 $x_n\to a$。

#### 3. 证明数列

$$
x_n=\frac{\sin1}{2}+\frac{\sin2}{2^2}+\cdots+\frac{\sin n}{2^n},\qquad n\ge1
$$

收敛。

**证明**：对任意 $n>m$，

$$
|x_n-x_m|
\le\sum_{k=m+1}^n\frac{|\sin k|}{2^k}
\le\sum_{k=m+1}^n\frac1{2^k}
<\frac1{2^m}.
$$

对任意 $\varepsilon>0$，取 $N$ 使 $\dfrac1{2^N}<\varepsilon$，则当 $n>m>N$ 时 $|x_n-x_m|<\varepsilon$。由柯西收敛原理，$\{x_n\}$ 收敛。

#### 4. 证明数列 $\{x_n=\sin n,\ n\ge1\}$ 中有无穷多项大于 $\dfrac{\sqrt2}{2}$，也有无穷多项小于 $-\dfrac{\sqrt2}{2}$，并进一步证明数列发散

**证明**：对每个整数 $k\ge1$，区间

$$
\left(\frac{\pi}{4}+2k\pi,\ \frac{3\pi}{4}+2k\pi\right)
$$

的长度为 $\dfrac{\pi}{2}>1$，所以其中至少含有一个整数，记为 $n_k$。在这个区间内，$\sin x>\dfrac{\sqrt2}{2}$，故

$$
\sin n_k>\frac{\sqrt2}{2}.
$$

同样，区间

$$
\left(\frac{5\pi}{4}+2k\pi,\ \frac{7\pi}{4}+2k\pi\right)
$$

长度也为 $\dfrac{\pi}{2}>1$，其中至少含有一个整数 $m_k$，且

$$
\sin m_k<-\frac{\sqrt2}{2}.
$$

因此有无穷多项大于 $\dfrac{\sqrt2}{2}$，也有无穷多项小于 $-\dfrac{\sqrt2}{2}$。

若 $\{\sin n\}$ 收敛于 $L$，则它的任意子列也收敛于 $L$。由第一种子列，

$$
L\ge\frac{\sqrt2}{2};
$$

由第二种子列，

$$
L\le-\frac{\sqrt2}{2}.
$$

矛盾。所以 $\{\sin n\}$ 发散。

#### 5. 证明：若 $0<\delta<1$，且 $|x-4|<\delta$，则

$$
|\sqrt x-2|<\frac{\delta}{2},
$$

并进一步证明

$$
\lim_{x\to4}\sqrt x=2.
$$

**证明**：因为 $|x-4|<\delta<1$，所以 $x>3>0$，且

$$
|\sqrt x-2|
=\frac{|x-4|}{\sqrt x+2}
<\frac{\delta}{2}.
$$

对任意 $\varepsilon>0$，取

$$
\delta=\min\{1,\ 2\varepsilon\}.
$$

当 $0<|x-4|<\delta$ 时，

$$
|\sqrt x-2|<\frac{\delta}{2}\le\varepsilon.
$$

所以 $\lim\limits_{x\to4}\sqrt x=2$。

#### 6. 用极限的精确定义证明

**(1)** $\lim\limits_{x\to a}\sin x=\sin a$。

**证明**：由

$$
|\sin x-\sin a|\le|x-a|,
$$

对任意 $\varepsilon>0$，取 $\delta=\varepsilon$，当 $0<|x-a|<\delta$ 时，

$$
|\sin x-\sin a|<\varepsilon.
$$

**(2)** $\lim\limits_{x\to\infty}\dfrac{x^2+2}{3x^2}=\dfrac13$。

**证明**：

$$
\left|\frac{x^2+2}{3x^2}-\frac13\right|
=\left|\frac{2}{3x^2}\right|
=\frac2{3x^2}.
$$

对任意 $\varepsilon>0$，取

$$
X=\sqrt{\frac2{3\varepsilon}}.
$$

当 $|x|>X$ 时，

$$
\left|\frac{x^2+2}{3x^2}-\frac13\right|<\varepsilon.
$$

**(3)** $\lim\limits_{x\to2+}\dfrac{2x}{x^2-4}=+\infty$。

**证明**：对任意 $G>0$，取

$$
\delta=\min\left\{1,\ \frac4{5G}\right\}.
$$

当 $2<x<2+\delta$ 时，$x+2<5$，$x-2<\delta$，且 $2x>4$。于是

$$
\frac{2x}{x^2-4}
=\frac{2x}{(x-2)(x+2)}
>\frac4{5\delta}\ge G.
$$

所以极限为 $+\infty$。

#### 7. 计算下列极限

**(1)**

$$
\lim_{x\to0}\frac{\sin3x}{5x}
=\frac35\lim_{x\to0}\frac{\sin3x}{3x}
=\frac35.
$$

**(2)**

$$
\lim_{\theta\to0}\frac{1-\cos\theta}{\theta^2}
=\lim_{\theta\to0}\frac{2\sin^2\frac\theta2}{\theta^2}
=\frac12.
$$

**(3)**

$$
\lim_{x\to0}\frac{\sin^2x}{x^2}
=\left(\lim_{x\to0}\frac{\sin x}{x}\right)^2
=1.
$$

**(4)**

$$
\lim_{x\to0}\frac{\tan x-\sin x}{\sin^3x}
=\lim_{x\to0}\left(\frac{\sin x}{\sin^3x}\cdot\frac{1-\cos x}{\cos x}\right)
=\lim_{x\to0}\frac{1-\cos x}{\sin^2x\cos x}
=\frac12.
$$

**(5)**

$$
\lim_{x\to0}\frac{\sin5x-\sin3x}{\sin x}
=\lim_{x\to0}\frac{2\cos4x\sin x}{\sin x}
=2.
$$

**(6)**

$$
\lim_{x\to a}\frac{\sin x-\sin a}{x-a}
=\lim_{x\to a}\frac{2\cos\frac{x+a}{2}\sin\frac{x-a}{2}}{x-a}
=\cos a.
$$

#### 8. 渐近线

**(1) 渐近线的定义与求法。**

若 $x\to a$（或 $x\to a^+$、$x\to a^-$）时 $f(x)\to\infty$，则直线 $x=a$ 是竖直渐近线。若 $x\to+\infty$ 或 $x\to-\infty$ 时 $f(x)\to b$，则 $y=b$ 是水平渐近线。若
$$
k=\lim_{x\to\infty}\frac{f(x)}x,\qquad b=\lim_{x\to\infty}\bigl(f(x)-kx\bigr)
$$
都存在且 $k\ne0$，则 $y=kx+b$ 是斜渐近线。求渐近线时，先找分母零点处可能出现的竖直渐近线，再算 $k,b$ 判断水平或斜渐近线。

**(2)** 设

$$
\lim_{x\to\infty}\left(\frac{x^2+1}{x+1}-ax-b\right)=0,
$$

试确定常数 $a$ 和 $b$。

**解**：先做多项式除法：

$$
\frac{x^2+1}{x+1}=x-1+\frac2{x+1}.
$$

于是

$$
\frac{x^2+1}{x+1}-ax-b
=(1-a)x+(-1-b)+\frac2{x+1}.
$$

要使 $x\to\infty$ 时极限为 $0$，必须一次项与常数项都为零，即

$$
a=1,\qquad b=-1.
$$

此时差为 $\dfrac2{x+1}\to0$。直线 $y=x-1$ 就是曲线 $y=\dfrac{x^2+1}{x+1}$ 的斜渐近线。

一般地，若

$$
k=\lim_{x\to\infty}\frac{f(x)}x,\qquad
b=\lim_{x\to\infty}\bigl(f(x)-kx\bigr)
$$

都存在，则 $y=kx+b$ 是斜渐近线；$k=0$ 时就是水平渐近线。

#### 9. 设 $f(x):[a,b]\to\mathbb R$ 为单调增函数，$x_0\in(a,b)$，证明左右极限 $f(x_0^-)$、$f(x_0^+)$ 都存在

**证明**：考虑集合

$$
S^-=\{f(x)\mid a\le x<x_0\}.
$$

由 $f$ 单调增加，$S^-$ 有上界 $f(x_0)$，由确界原理，存在

$$
A=\sup S^-.
$$

对任意 $\varepsilon>0$，$A-\varepsilon$ 不是 $S^-$ 的上界，所以存在 $x_1<x_0$，使

$$
f(x_1)>A-\varepsilon.
$$

当 $x_1<x<x_0$ 时，由单调性，

$$
A-\varepsilon<f(x_1)\le f(x)\le A,
$$

所以 $|f(x)-A|<\varepsilon$。因此

$$
f(x_0^-)=\lim_{x\to x_0^-}f(x)=A
$$

存在。

同理，集合

$$
S^+=\{f(x)\mid x_0<x\le b\}
$$

有下界 $f(x_0)$，其下确界记为 $B$，同样可证

$$
f(x_0^+)=B
$$

存在。

## 课堂小结

- 数列极限与函数极限的定义，是整章的语言基础；性质与四则运算几乎完全平行。
- 存在性证明的三大工具：单调有界、夹逼、柯西收敛；闭区间套与致密性定理则是实数连续性的“几何版本”。
- 连续的本质是“极限符号与函数符号可交换”；初等函数在定义域内连续，所以可以直接代入。
- 闭区间上连续函数的五条性质要成套记忆：有界、最值、零点、介值、一致连续。
- 无穷小与无穷大的阶，是把“趋于零/无穷的快慢”量化；等价替换只对乘除中的因子有效。
- 作业中的常见失分点：$\varepsilon-N$ 证明没有先放大再解 $N$；单调有界证明漏掉“有界”；用等价量替换时在加减法中直接替换；一致连续与普通连续混淆。

## 相关资料

- [10第二章极限与连续复习.pdf](https://drive.google.com/file/d/17uD_js6hMCXKvqsYgWSIBtGi7tWzfEpZ/view?usp=drivesdk)
