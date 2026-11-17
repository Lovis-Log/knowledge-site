---
slug: "09-orders-of-infinitesimals"
title: "无穷小量与无穷大量的阶"
summary: "第 9 讲：无穷小量与无穷大量的阶。"
updatedAt: "2026-11-15"
content_type: "reference"
group: "course"
displayNumber: "09"
tags:
  - "数学分析"
sources:
  - kind: article
    title: "9无穷小量与无穷大量的阶.pdf"
    url: "https://drive.google.com/file/d/1apFmGpbniHvaz6L6i37-b6jF_fLIXFXJ/view?usp=drivesdk"
---

计算极限时，常常遇到

$$
0\cdot\infty,\quad \frac{\infty}{\infty},\quad \frac00,\quad 1^\infty,\quad \infty^0,\quad (+\infty)-(+\infty)
$$

这些待定型。它们的难点在于几个量同时趋于 $0$ 或同时趋于 $\infty$，谁快谁慢决定了极限的结果。把“趋于零或无穷的速度”量化，就是无穷小量与无穷大量的**阶**。掌握阶的概念和等价替换，可以大幅提高极限计算的效率，也能避免把加减法当成乘法随意替换的错误。

## 1. 待定型与几个基本极限

常见的待定型有

$$
0\cdot\infty,\qquad \frac{\infty}{\infty},\qquad \frac00,\qquad 1^\infty,\qquad \infty^0,\qquad (+\infty)-(+\infty).
$$

计算它们时，经常要把表达式变形，化成可以用基本极限或等价量处理的形式。几个必须记住的基本极限是：

$$
\lim_{n\to\infty}\sqrt[n]{n}=1,
$$

$$
\lim_{n\to\infty}\left(1+\frac1n\right)^n=e,\qquad
\lim_{x\to\infty}\left(1+\frac1x\right)^x=e,
$$

$$
\lim_{x\to0}\frac{\sin x}{x}=1,
$$

$$
\lim_{n\to\infty}\left(1+\frac12+\frac13+\cdots+\frac1n-\ln n\right)=\gamma.
$$

最后一个极限中的 $\gamma$ 称为 Euler 常数。它说明调和级数的部分和与 $\ln n$ 只差一个常数级别的量，这个差收敛。

## 2. 无穷小量

数列 $\{x_n\}$ 为无穷小量，是指

$$
\lim_{n\to\infty}x_n=0.
$$

例如

$$
\frac1n,\qquad \frac1{n^2},\qquad \frac1{\ln n},\qquad q^n\ (|q|<1)
$$

都是无穷小量。对函数而言，有：

### 定义 1（无穷小量）

> 若 $\lim\limits_{x\to x_0}f(x)=0$，则称 $f(x)$ 为**无穷小量**（当 $x\to x_0$ 时），记作
>
> $$
> f(x)=o(1)\qquad(x\to x_0).
> $$
>
> 若 $f(x)$ 在 $x_0$ 的某个邻域内**有界**，记作
>
> $$
> f(x)=O(1)\qquad(x\to x_0).
> $$

这里的极限过程 $x\to x_0$ 可以扩充到

$$
x\to x_0+,\quad x\to x_0-,\quad x\to\infty,\quad x\to+\infty,\quad x\to-\infty
$$

等六种情况。记号中的 $x\to x_0$ 通常不能省略，除非上下文已经明确了极限过程。

> **易混点**：$o(1)$ 只说明“趋于零”，不说明“多快”；$O(1)$ 只说明“有界”，连是否趋于零都不要求。例如 $\sin\dfrac1x$ 在 $x\to0$ 时是 $O(1)$，但不是无穷小量。

## 3. 无穷小量的阶

设 $u(x),v(x)$ 是两个变量，当 $x\to x_0$ 时，它们都是无穷小量。为了比较两者趋于零的速度快慢，考察比值 $\dfrac{u(x)}{v(x)}$ 的极限情况。以下比较均默认 $v(x)$ 在 $x_0$ 的某去心邻域内不为零，否则比值没有意义。

### 3.1 四种基本关系

**(1) 高阶无穷小量**

若

$$
\lim_{x\to x_0}\frac{u(x)}{v(x)}=0,
$$

则称 $u(x)$ 是 $v(x)$ 的**高阶无穷小量**，记作

$$
u(x)=o(v(x))\qquad(x\to x_0).
$$

直观上，$u$ 比 $v$ 趋于零更快。

**(2) 有界比值**

若存在 $B>0$，在 $x_0$ 的某去心邻域内

$$
\left|\frac{u(x)}{v(x)}\right|\le B,
$$

则记

$$
u(x)=O(v(x))\qquad(x\to x_0).
$$

这表示 $u$ 至多和 $v$ 同速趋于零，不会比 $v$ 慢一个量级。

**(3) 同阶无穷小量**

若存在 $A,B>0$，在 $x_0$ 的某去心邻域内

$$
A\le\left|\frac{u(x)}{v(x)}\right|\le B,
$$

则称 $u(x)$ 与 $v(x)$ 是**同阶无穷小量**。同阶没有专门的记号。

**(4) 等价无穷小量**

若

$$
\lim_{x\to x_0}\frac{u(x)}{v(x)}=1,
$$

则称 $u(x)$ 是 $v(x)$ 的**等价无穷小量**，记作

$$
u(x)\sim v(x)\qquad(x\to x_0).
$$

### 3.2 $k$ 阶无穷小量

若 $u(x)$ 与 $(x-x_0)^k$ 同阶，则称 $u(x)$ 为当 $x\to x_0$ 时的 **$k$ 阶无穷小量**。

例如 $1-\cos x$ 与 $x^2$ 同阶，所以 $1-\cos x$ 是二阶无穷小量；$\tan x-\sin x$ 与 $x^3$ 同阶，所以它是三阶无穷小量。这里的“阶数”不是唯一的，同一个量可以在不同精度下与不同幂次比较：$\tan x-\sin x$ 是 $o(x^2)$，同时又是与 $x^3$ 同阶。阶数取得越细，信息越多。

### 3.3 几个容易混淆的注记

1. 若 $\lim\limits_{x\to x_0}\dfrac{u(x)}{v(x)}=c\ne0$，则 $u(x)$ 与 $v(x)$ 必是同阶无穷小量。因为极限存在且非零，比值最终会被 $|c|/2$ 与 $3|c|/2$ 夹住。

2. $u(x)\sim v(x)$ 不能理解为 $u(x)=v(x)$。等价只说明“相对误差趋于零”，即
   $$
   u(x)=v(x)+o(v(x))\qquad(x\to x_0).
   $$
   推导是
   $$
   \lim_{x\to x_0}\frac{u(x)}{v(x)}=1
   \Longrightarrow
   \lim_{x\to x_0}\frac{u(x)-v(x)}{v(x)}=0
   \Longrightarrow
   u(x)-v(x)=o(v(x)).
   $$

3. 设 $\alpha\ne0$ 为常数，则
   $$
   u(x)=o(\alpha v(x))\ \Longleftrightarrow\ u(x)=o(v(x)),
   $$
   $$
   u(x)=O(\alpha v(x))\ \Longleftrightarrow\ u(x)=O(v(x)).
   $$
   因此，在 $o$、$O$ 以及同阶的表达式里，常数系数可以自然省略。

4. 但**等价无穷小量里不能省略这个系数**。例如 $2x\sim 2x$，$2x\sim x$ 不成立；$u\sim\alpha v$ 时，$\alpha$ 是等价关系的一部分，不能随手丢掉。

### 例 1

以下极限过程均取 $x\to0$。

**(i)** $\sin\dfrac1x=O(1)$，$x\sin\dfrac1x=o(1)$，$x\sin\dfrac1x=O(x)$，但不能说 $x\sin\dfrac1x$ 与 $x$ 是同阶无穷小量。

前两个结论来自 $|\sin(1/x)|\le1$ 与 $|x\sin(1/x)|\le|x|$。第三个结论是因为
$$
\left|\frac{x\sin(1/x)}{x}\right|=|\sin(1/x)|\le1.
$$
但同阶要求比值有正的下界，而 $\sin\dfrac1x$ 在 $0$ 附近可以取到任意接近 $0$ 的值，不存在 $A>0$ 使 $|\sin(1/x)|\ge A$ 恒成立。所以它只是 $O(x)$，不是与 $x$ 同阶。

**(ii)** $x\left(2+\sin\dfrac1x\right)$ 与 $x$ 是同阶无穷小量。

因为
$$
\frac{x(2+\sin(1/x))}{x}=2+\sin\frac1x,
$$
而 $2+\sin\dfrac1x\in[1,3]$，比值被 $1$ 和 $3$ 从上下夹住，所以同阶。

**(iii)**
$$
\lim_{x\to0}\frac{1-\cos x}{x}
=\lim_{x\to0}\frac{2\sin^2\frac x2}{x}
=0,
$$
所以
$$
1-\cos x=o(x).
$$
又
$$
\lim_{x\to0}\frac{1-\cos x}{x^2}
=\lim_{x\to0}\frac{2\sin^2\frac x2}{x^2}
=\frac12,
$$
所以
$$
1-\cos x\sim\frac{x^2}{2}.
$$

> **理解关键**：同一个 $1-\cos x$，相对于 $x$ 是高阶无穷小，相对于 $x^2$ 是等价无穷小。比较的对象不同，结论就不同。

**(iv)**
$$
\lim_{x\to0}\frac{\tan x-\sin x}{x^2}
=\lim_{x\to0}\left(\frac{\sin x}{x\cos x}\cdot\frac{1-\cos x}{x}\right)
=0,
$$
所以
$$
\tan x-\sin x=o(x^2).
$$

**(v)**
$$
\lim_{x\to0}\frac{\tan x-\sin x}{x^3}
=\lim_{x\to0}\left(\frac{\sin x}{x\cos x}\cdot\frac{1-\cos x}{x^2}\right)
=\frac12,
$$
所以
$$
\tan x-\sin x\sim\frac{x^3}{2}.
$$

由此可以写出带高阶无穷小的展开式：

$$
1-\cos x=\frac{x^2}{2}+o(x^2),
$$

$$
\cos x=1-\frac{x^2}{2}+o(x^2),
$$

$$
\tan x-\sin x=\frac{x^3}{2}+o(x^3).
$$

这些式子在后面的极限计算中会反复用到。

## 4. 无穷大量

### 定义 2（无穷大量）

> 若
>
> $$
> \lim_{x\to x_0}f(x)=\infty\quad(\text{或}\ \pm\infty),
> $$
>
> 则称当 $x\to x_0$ 时，$f(x)$ 是**无穷大量**（或正、负无穷大量）。

定义中的极限过程同样可以扩充到 $x\to x_0+$、$x\to x_0-$、$x\to\infty$、$x\to+\infty$、$x\to-\infty$ 等情况。

### 4.1 无穷大量的阶

设 $u(x),v(x)$ 当 $x\to x_0$ 时都是无穷大量。

**(1)** 若

$$
\lim_{x\to x_0}\frac{u(x)}{v(x)}=\infty,
$$

则表示当 $x\to x_0$ 时，$u(x)$ 趋于无穷大的速度比 $v(x)$ 快。称 $u(x)$ 关于 $v(x)$ 是**高阶无穷大量**，或称 $v(x)$ 关于 $u(x)$ 是**低阶无穷大量**。

**(2)** 若存在 $A>0$，当 $x$ 在 $x_0$ 的某个去心邻域内，

$$
\left|\frac{u(x)}{v(x)}\right|\le A,
$$

则称 $\dfrac{u(x)}{v(x)}$ 有界，记为

$$
u(x)=O(v(x))\qquad(x\to x_0).
$$

若又存在 $a>0$，在同一去心邻域内

$$
a\le\left|\frac{u(x)}{v(x)}\right|\le A,
$$

则称 $u(x)$ 与 $v(x)$ 是**同阶无穷大量**。

**(3)** 若

$$
\lim_{x\to x_0}\frac{u(x)}{v(x)}=1,
$$

则称 $u(x)$ 与 $v(x)$ 是**等价无穷大量**，记为

$$
u(x)\sim v(x)\qquad(x\to x_0).
$$

常用结论可以概括为：

- 若 $\lim\dfrac{u}{v}=c\in\mathbb R\setminus\{0\}$，则 $u$ 与 $v$ 同阶；
- 若 $\lim\dfrac{u}{v}=\infty$，则 $u$ 是 $v$ 的高阶无穷大量；
- 若 $\lim\dfrac{u}{v}=0$，则 $u$ 是 $v$ 的低阶无穷大量。

### 例 2

以下函数在 $x\to+\infty$ 时均为无穷大量，且无穷大量的阶从高到低排列为

$$
e^x\gg x^\beta\gg x^\alpha\gg\ln x,\qquad \beta>\alpha>0.
$$

这里的“$\gg$”表示前者是后者的高阶无穷大量。也就是说，指数函数增长最快，幂函数次之，对数函数最慢；幂函数之间，幂次越高增长越快。

这个排序是非常有用的“量级直觉”。例如判断 $\dfrac{x^{100}}{e^x}$ 的极限时，不必做一百次洛必达，直接知道分母是分子的高阶无穷大，极限为 $0$。

### 4.2 一个记号习惯

在进行无穷大量阶的比较时，习惯上不使用记号“$o$”，但仍使用记号“$O$”和“$\sim$”。因为 $o$ 本来是为“趋于零”的相对误差设计的，用在无穷大上容易和“低阶”混淆。

### 例 A

$$
\lim_{x\to\infty}\frac{x^3\sin\frac1x}{x^2}
=\lim_{x\to\infty}\frac{\sin\frac1x}{\frac1x}
=1
$$

可表示为

$$
x^3\sin\frac1x\sim x^2\qquad(x\to\infty).
$$

这里 $\sin\dfrac1x\sim\dfrac1x$，所以分子等价于 $x^2$。

### 例 B

$$
\lim_{x\to\frac{\pi}{2}}\left(\frac{\pi}{2}-x\right)\tan x.
$$

令 $y=\dfrac{\pi}{2}-x$，则 $x=\dfrac{\pi}{2}-y$，$\tan x=\cot y=\dfrac{\cos y}{\sin y}$。于是

$$
\lim_{x\to\frac{\pi}{2}}\left(\frac{\pi}{2}-x\right)\tan x
=\lim_{y\to0^+}\frac{y\cos y}{\sin y}
=1.
$$

即

$$
\tan x\sim\frac1{\frac{\pi}{2}-x}\qquad\left(x\to\frac{\pi}{2}-\right).
$$

这里通过换元把“$x$ 趋于 $\dfrac{\pi}{2}$”转化成“$y$ 趋于 $0$”，再用 $\sin y\sim y$。

## 5. 等价量

等价无穷小或等价无穷大，统称为**等价量**。等价量具有对称性和传递性：

$$
u(x)\sim v(x)\ \Longrightarrow\ v(x)\sim u(x),
$$

$$
u(x)\sim v(x),\ v(x)\sim w(x)\ \Longrightarrow\ u(x)\sim w(x).
$$

给出极限过程后，“等价量”是指等价无穷小还是等价无穷大是明确的，不需要再额外说明。

### 例 3

以下函数在 $x\to0$ 时为等价无穷小：

$$
x\sim\sin x\sim\arcsin x\sim\tan x\sim\arctan x\sim\ln(1+x)\sim e^x-1.
$$

这一串必须熟记。它们的几何来源是：在 $0$ 附近，这些曲线都与直线 $y=x$ 相切，所以一阶近似完全相同。

### 例 4

设 $\alpha\in\mathbb R$，则有以下等价无穷小：

$$
(1+t)^\alpha-1\sim\alpha t\qquad(t\to0),
$$

$$
x^\alpha-1\sim\alpha(x-1)\qquad(x\to1).
$$

第二式是第一式令 $t=x-1$ 得到的。

### 例 5

设

$$
u(x)=\sqrt{x+\sqrt x}.
$$

当 $x\to+\infty$ 时，

$$
\lim_{x\to+\infty}\frac{\sqrt{x+\sqrt x}}{\sqrt x}
=\lim_{x\to+\infty}\sqrt{1+\frac1{\sqrt x}}
=1,
$$

所以

$$
u(x)\sim x^{\frac12}\qquad(x\to+\infty).
$$

当 $x\to0^+$ 时，

$$
\lim_{x\to0^+}\frac{\sqrt{x+\sqrt x}}{\sqrt[4]{x}}
=\lim_{x\to0^+}\sqrt{\sqrt x+1}
=1,
$$

所以

$$
u(x)\sim x^{\frac14}\qquad(x\to0^+).
$$

同一个函数，在不同的极限过程中等价于不同的幂函数。$x\to+\infty$ 时，$x$ 是主导项；$x\to0^+$ 时，$\sqrt x$ 反而比 $x$ 大，成为主导项。

### 例 6

设

$$
v(x)=2x^3+3x^5.
$$

当 $x\to\infty$ 时，

$$
\lim_{x\to\infty}\frac{2x^3+3x^5}{3x^5}=1,
$$

所以

$$
v(x)\sim3x^5\qquad(x\to\infty).
$$

当 $x\to0$ 时，

$$
\lim_{x\to0}\frac{2x^3+3x^5}{2x^3}=1,
$$

所以

$$
v(x)\sim2x^3\qquad(x\to0).
$$

> **易错点**：多项式在无穷远处由最高次项主导，在 $0$ 附近由最低次项主导。找“主导项”时，必须先看清 $x$ 往哪里走。

### 5.1 主要部分

若 $u(x)\sim v(x)$（$x\to x_0$），则

$$
u(x)=v(x)+o(v(x))\qquad(x\to x_0).
$$

这里把 $v(x)$ 称作 $u(x)$ 的**主要部分**。

- 若 $u,v$ 为无穷小，则 $u-v=o(v)$ 是比 $v$ 高阶的无穷小，因此 $v$ 是 $u$ 的**主要部分**（起主导作用的部分）。
- 若 $u,v,u-v$ 为无穷大，则 $u-v=o(v)$ 是比 $v$ 低阶的无穷大量，因此 $v$ 仍是 $u$ 的**主要部分**（高阶部分，起主导作用的部分）。

这里的“高阶/低阶”是相对残差 $u-v$ 说的：主要部分 $v$ 在数量级上压过残差，所以可以用 $v$ 代替 $u$ 做近似。

## 6. 等价替换在极限运算中的应用

### 定理（等价替换定理）

> 设 $u(x),v(x),w(x)$ 在 $x_0$ 的某去心邻域内有定义，且
>
> $$
> v(x)\sim w(x)\qquad(x\to x_0),
> $$
>
> 即
>
> $$
> \lim_{x\to x_0}\frac{v(x)}{w(x)}=1.
> $$
>
> 则：
>
> (1) 当 $\lim\limits_{x\to x_0}u(x)w(x)=A$ 时，$\lim\limits_{x\to x_0}u(x)v(x)=A$；
>
> (2) 当 $\lim\limits_{x\to x_0}\dfrac{u(x)}{w(x)}=B$ 时，$\lim\limits_{x\to x_0}\dfrac{u(x)}{v(x)}=B$。

**证明**：

$$
\lim_{x\to x_0}u(x)v(x)
=\lim_{x\to x_0}u(x)w(x)\cdot\frac{v(x)}{w(x)}
=A\cdot1=A;
$$

$$
\lim_{x\to x_0}\frac{u(x)}{v(x)}
=\lim_{x\to x_0}\frac{u(x)}{w(x)}\cdot\frac{w(x)}{v(x)}
=B\cdot1=B.
$$

> **关键结论**：定理的用法可以概括为：**函数表达式最外层的因子，可以用与它等价的无穷小量（或无穷大量）替换**。注意“因子”两个字：乘法、除法中的整体因子可以换，加减法中的某一项不能随便换。

### 例 7

计算

$$
\lim_{x\to0}\frac{\ln(1+x^2)}{(e^{2x}-1)\tan x}.
$$

**解**：由于

$$
\tan x\sim x,\qquad e^{2x}-1\sim2x,\qquad \ln(1+x^2)\sim x^2\qquad(x\to0),
$$

由等价替换定理得

$$
\lim_{x\to0}\frac{\ln(1+x^2)}{(e^{2x}-1)\tan x}
=\lim_{x\to0}\frac{x^2}{2x\cdot x}
=\frac12.
$$

这里分子、分母都是乘积形式，三个因子分别替换，没有任何加减法的干扰。

### 例 8

计算

$$
\lim_{x\to0}\frac{\sqrt{1+x}-e^{\frac x3}}{\ln(1+2x)}.
$$

**解**：先把两个函数在 $0$ 处展开到一阶：

$$
\sqrt{1+x}=1+\frac x2+o(x),
$$

$$
e^{\frac x3}=1+\frac x3+o(x).
$$

于是

$$
\begin{aligned}
\lim_{x\to0}\frac{\sqrt{1+x}-e^{\frac x3}}{\ln(1+2x)}
&=\lim_{x\to0}\frac{\left(\frac x2+o(x)\right)-\left(\frac x3+o(x)\right)}{2x}\\
&=\lim_{x\to0}\frac{\frac x6+o(x)}{2x}\\
&=\frac1{12}.
\end{aligned}
$$

> **易错点**：这里分子是减法，不能直接把 $\sqrt{1+x}-1$ 换成 $\dfrac x2$、把 $e^{x/3}-1$ 换成 $\dfrac x3$ 就完事；必须把两个一阶项都写出来，让它们相减。相减后剩下 $\dfrac x6$，再与分母 $2x$ 比较。余项 $o(x)$ 除以 $x$ 趋于 $0$，所以不影响结果。

### 例 9

计算

$$
\lim_{x\to\infty}x\left(\sqrt[3]{x^3+x}-\sqrt[3]{x^3-x}\right).
$$

**解**：提出 $x$：

$$
\sqrt[3]{x^3+x}=x\sqrt[3]{1+\frac1{x^2}},\qquad
\sqrt[3]{x^3-x}=x\sqrt[3]{1-\frac1{x^2}}.
$$

于是原式

$$
\begin{aligned}
&=\lim_{x\to\infty}x^2\left(\sqrt[3]{1+\frac1{x^2}}-\sqrt[3]{1-\frac1{x^2}}\right)\\
&=\lim_{x\to\infty}x^2\left[\left(1+\frac1{3x^2}+o\left(\frac1{x^2}\right)\right)
-\left(1-\frac1{3x^2}+o\left(\frac1{x^2}\right)\right)\right]\\
&=\lim_{x\to\infty}x^2\left[\frac2{3x^2}+o\left(\frac1{x^2}\right)\right]\\
&=\frac23.
\end{aligned}
$$

这里用了

$$
(1+t)^{\frac13}-1\sim\frac t3\qquad(t\to0).
$$

两个立方根各自的一阶项相减后，常数项 $1$ 抵消，剩下 $\dfrac{2}{3x^2}$；再乘 $x^2$，极限为 $\dfrac23$。如果一开始就把两个根号都近似成 $x$，会得到 $x(x-x)=0$，这是典型的“减法抵消主导项”错误。

### 例 10

计算

$$
\lim_{x\to0}(\cos x)^{\frac1{x^2}}.
$$

**解**：首先

$$
(\cos x)^{\frac1{x^2}}
=e^{\frac1{x^2}\ln(\cos x)}.
$$

再计算指数上的极限：

$$
\begin{aligned}
\lim_{x\to0}\frac1{x^2}\ln(\cos x)
&=\lim_{x\to0}\frac{\ln\left[1+(\cos x-1)\right]}{x^2}\\
&=\lim_{x\to0}\frac{\cos x-1}{x^2}\\
&=\lim_{x\to0}\frac{-x^2/2}{x^2}\\
&=-\frac12.
\end{aligned}
$$

这里用了 $\ln(1+t)\sim t$（$t\to0$）与 $1-\cos x\sim\dfrac{x^2}{2}$。所以

$$
\lim_{x\to0}(\cos x)^{\frac1{x^2}}
=\lim_{x\to0}e^{\frac1{x^2}\ln(\cos x)}
=e^{-\frac12}
=\frac1{\sqrt e}.
$$

### 6.1 加减法中为什么不能随意替换

考虑

$$
\lim_{x\to0}\frac{\tan x-\sin x}{x^3}.
$$

**错误解答**：因为 $\tan x\sim x$，$\sin x\sim x$，所以

$$
\lim_{x\to0}\frac{\tan x-\sin x}{x^3}
=\lim_{x\to0}\frac{x-x}{x^3}=0.
$$

这是错的。问题在于：$\tan x$ 与 $x$ 的差不是 $0$，而是 $o(x)$；$\sin x$ 与 $x$ 的差也是 $o(x)$。把两个 $o(x)$ 相减，仍然是 $o(x)$，而

$$
\frac{o(x)}{x^3}
$$

的极限无法确定：它可能是 $0$，可能是常数，也可能发散。要得到结果，必须知道 $o(x)$ 里面更细的项。

**正确解答**：

$$
\begin{aligned}
\lim_{x\to0}\frac{\tan x-\sin x}{x^3}
&=\lim_{x\to0}\frac{\sin x\left(\frac1{\cos x}-1\right)}{x^3}\\
&=\lim_{x\to0}\left(\frac{\sin x}{x}\cdot\frac1{\cos x}\cdot\frac{1-\cos x}{x^2}\right)\\
&=\frac12.
\end{aligned}
$$

把差值因式分解成“$\sin x$ 乘以 $1-\cos x$”，就把减法转化成了乘法，每个因子都可以用等价量替换。

用更高阶的展开看，会更清楚：

$$
\tan x=x+\frac{x^3}{3}+o(x^3),\qquad
\sin x=x-\frac{x^3}{6}+o(x^3),
$$

相减得

$$
\tan x-\sin x=\frac{x^3}{2}+o(x^3),
$$

除以 $x^3$ 后极限为 $\dfrac12$。这也说明：在加减法中，展开的阶数必须高于分母的阶数，余项才能被分母“压住”。

一般规则是：

1. **乘除中的因子**可以直接用等价量替换；
2. **加减中的项**不能直接替换，应先提取公因子、因式分解，或者把每一项展开到足够高的阶；
3. 判断“足够高”的标准是：余项除以分母后必须趋于 $0$。

例 8 之所以可以那样做，是因为展开到了 $o(x)$，而分母是 $2x$，余项 $\dfrac{o(x)}{2x}\to0$。而 $\tan x-\sin x$ 的分母是 $x^3$，只展开到 $o(x)$ 就不够，必须展开到 $x^3$。

## 课堂小结

- 无穷小量的阶通过比值 $\dfrac{u}{v}$ 的极限来比较：比值为 $0$ 是高阶，为 $1$ 是等价，被正数上下夹住是同阶，有界是 $O$。
- 无穷大量的阶完全类似：比值趋于 $\infty$ 是高阶，趋于 $1$ 是等价，被正数上下夹住是同阶。
- 常用增长速度：$e^x\gg x^\beta\gg x^\alpha\gg\ln x$（$x\to+\infty$，$\beta>\alpha>0$）。
- 必须熟记 $x\to0$ 时的等价无穷小：
  $$
  x\sim\sin x\sim\arcsin x\sim\tan x\sim\arctan x\sim\ln(1+x)\sim e^x-1,
  $$
  $$
  1-\cos x\sim\frac{x^2}{2},\qquad (1+x)^\alpha-1\sim\alpha x.
  $$
- 等价替换只适用于乘除中的因子；加减中要先因式分解或展开到足够高阶，否则会把主导项抵消掉，得到错误的 $0$。
- 幂指函数的极限，先取对数，再用等价量或连续函数的性质；$1^\infty$ 型常化成 $\ln(1+t)\sim t$ 与 $1-\cos x\sim\dfrac{x^2}{2}$ 的组合。

## 相关资料

- [9无穷小量与无穷大量的阶.pdf](https://drive.google.com/file/d/1apFmGpbniHvaz6L6i37-b6jF_fLIXFXJ/view?usp=drivesdk)
