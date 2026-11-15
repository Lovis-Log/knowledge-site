---
slug: "16-taylor-theorem-with-peano-remainder"
title: "带佩亚诺余项的泰勒定理"
summary: "第 16 讲：带佩亚诺余项的泰勒定理。"
updatedAt: "2026-11-15"
content_type: "video-course"
group: "course"
displayNumber: "16"
tags:
  - "数学分析"
sources:
  - kind: article
    title: "16带佩亚诺余项的泰勒定理.pdf"
    url: "https://drive.google.com/file/d/1CWosQB7h1gJAvl15nAqAvQCi9wwT11lS/view?usp=drivesdk"
---

用多项式逼近函数，是微分学的一条主线。函数在一点连续，可以用常数逼近；在一点可微，可以用一次多项式逼近；如果函数在一点有更高阶的导数，自然希望用更高次的多项式逼近，并且让误差的阶数尽可能高。下面把这件事说清楚，得到的工具就是带 Peano 余项的 Taylor 定理。

## 1. 从线性逼近到二次逼近

先回顾两种最基本的逼近：

- 若 $f$ 在 $x_0$ 处连续，则
  $$
  f(x)=f(x_0)+o(1),\qquad x\to x_0.
  $$
- 若 $f$ 在 $x_0$ 处可微，则
  $$
  f(x)=f(x_0)+f'(x_0)(x-x_0)+o(x-x_0),\qquad x\to x_0.
  $$

后者是用一次多项式 $f(x_0)+f'(x_0)(x-x_0)$ 逼近 $f$，误差是比 $x-x_0$ 高阶的无穷小。函数越光滑，可用的多项式次数越高，逼近也越精细。

现在问一个自然的问题：

> 设 $f''(x_0)$ 存在，能不能用二次多项式逼近 $f$，使误差在 $x\to x_0$ 时是比 $(x-x_0)^2$ 高阶的无穷小？

也就是说，是否存在常数 $A,B,C$，使得

$$
f(x)=A+B(x-x_0)+C(x-x_0)^2+o\bigl((x-x_0)^2\bigr),\qquad x\to x_0.
$$

如果这样的表达式成立，$A,B,C$ 应当怎样确定？

### 1.1 先确定系数

假设上述表达式已经成立，令 $h=x-x_0$。先令 $x\to x_0$，也就是 $h\to 0$，得

$$
A=f(x_0).
$$

把 $A$ 代回，并在等式两边减去 $f(x_0)$，再除以 $h$：

$$
\frac{f(x_0+h)-f(x_0)}{h}
=
B+Ch+o(h)\longrightarrow B.
$$

左边是 $f$ 在 $x_0$ 处的导数，所以

$$
B=f'(x_0).
$$

再减去前两项，除以 $h^2$：

$$
C
=
\lim_{h\to0}
\frac{f(x_0+h)-f(x_0)-f'(x_0)h}{h^2}.
$$

这是一个 $0/0$ 型极限。用一次 L'Hospital 法则，

$$
C
=
\lim_{h\to0}
\frac{f'(x_0+h)-f'(x_0)}{2h}
=
\frac12 f''(x_0).
$$

最后一步不是再用 L'Hospital 法则，而是直接用了 $f''(x_0)$ 的导数定义：

$$
f''(x_0)=\lim_{h\to0}\frac{f'(x_0+h)-f'(x_0)}{h}.
$$

于是，如果二次逼近存在，系数只能是

$$
A=f(x_0),\qquad B=f'(x_0),\qquad C=\frac12 f''(x_0).
$$

也就是说，逼近多项式只能是

$$
f(x_0)+f'(x_0)(x-x_0)+\frac{f''(x_0)}{2}(x-x_0)^2.
$$

### 1.2 验证这个多项式确实可以逼近

反过来，要说明这个多项式确实满足要求，只需证明

$$
\lim_{h\to0}
\frac{
f(x_0+h)-f(x_0)-f'(x_0)h-\frac12 f''(x_0)h^2
}{h^2}=0.
$$

仍用一次 L'Hospital 法则，再把 $f''(x_0)$ 拆出来：

$$
\begin{aligned}
&\lim_{h\to0}
\frac{
f(x_0+h)-f(x_0)-f'(x_0)h-\frac12 f''(x_0)h^2
}{h^2}\\
&=
\lim_{h\to0}
\frac{
f'(x_0+h)-f'(x_0)-f''(x_0)h
}{2h}\\
&=
\frac12\lim_{h\to0}
\left(
\frac{f'(x_0+h)-f'(x_0)}{h}-f''(x_0)
\right)
=
\frac12\bigl(f''(x_0)-f''(x_0)\bigr)=0.
\end{aligned}
$$

所以二次逼近不仅系数唯一，而且确实成立。这个结论可以推广到 $n$ 次多项式，这就是下面的 Taylor 定理。

## 2. 带 Peano 余项的 Taylor 定理

### 2.1 定理

> **定理 1（带 Peano 余项的 Taylor 定理）** 设函数 $f$ 在点 $x_0$ 处有直到 $n$ 阶的导数，即 $f^{(n)}(x_0)$ 存在。则
>
> $$
> f(x)=f(x_0)+f'(x_0)(x-x_0)+\frac{f''(x_0)}{2!}(x-x_0)^2+\cdots+\frac{f^{(n)}(x_0)}{n!}(x-x_0)^n+o\bigl((x-x_0)^n\bigr),
> \qquad x\to x_0.
> $$

记

$$
T_n(x)=T_n(f,x_0;x)
=
\sum_{k=0}^{n}\frac{f^{(k)}(x_0)}{k!}(x-x_0)^k,
$$

称为 $f$ 在 $x_0$ 处的 $n$ 次 **Taylor 多项式**；记

$$
R_n(x)=f(x)-T_n(x),
$$

称为 **余项**。定理的结论就是

$$
R_n(x)=o\bigl((x-x_0)^n\bigr),\qquad x\to x_0.
$$

这种形式的余项称为 **Peano 余项**。

> 定理的结论在只假设 $f^{(n)}(x_0)$ 存在时也成立。不过，下面用 L'Hospital 法则的证明需要 $f$ 在 $x_0$ 的某邻域内有直到 $n$ 阶的导数；如果只假设点值条件，就不能直接连续使用 $n-1$ 次 L'Hospital，证明要改用归纳法。无论采用哪种条件，都不要求 $f^{(n)}$ 连续。Peano 余项是一个局部的、定性的结论：它说明误差趋于零的速度，但没有给出误差的具体大小。

### 2.2 证明（邻域内有 $n$ 阶导数的情形）

先按 $f$ 在 $x_0$ 的某邻域内有直到 $n$ 阶导数来证；这是使用 L'Hospital 法则所需要的条件。

记 $h=x-x_0$，

$$
Q(h)=f(x_0+h)-T_n(x_0+h).
$$

要证明 $Q(h)=o(h^n)$，即

$$
\lim_{h\to0}\frac{Q(h)}{h^n}=0.
$$

由 $T_n$ 的构造，$Q$ 在 $0$ 处的函数值以及前 $n$ 阶导数都等于零：

$$
Q(0)=Q'(0)=\cdots=Q^{(n)}(0)=0.
$$

对商 $Q(h)/h^n$ 连续使用 $n-1$ 次 L'Hospital 法则。每次都是 $0/0$ 型，且分母的导数在去心邻域内不为零。得到

$$
\lim_{h\to0}\frac{Q(h)}{h^n}
=
\lim_{h\to0}\frac{Q^{(n-1)}(h)}{n!\,h},
$$

只要右边极限存在。现在计算 $Q^{(n-1)}$。由于 $T_n$ 的 $n-1$ 阶导数是

$$
T_n^{(n-1)}(x_0+h)=f^{(n-1)}(x_0)+f^{(n)}(x_0)h,
$$

所以

$$
Q^{(n-1)}(h)
=
f^{(n-1)}(x_0+h)-f^{(n-1)}(x_0)-f^{(n)}(x_0)h.
$$

因为 $f^{(n)}(x_0)$ 存在，$f^{(n-1)}$ 在 $x_0$ 处可导，按导数定义，

$$
f^{(n-1)}(x_0+h)-f^{(n-1)}(x_0)-f^{(n)}(x_0)h=o(h).
$$

于是

$$
\lim_{h\to0}\frac{Q^{(n-1)}(h)}{n!\,h}=0.
$$

这就证明了定理。

> 证明的关键是：前 $n-1$ 步用 L'Hospital 法则把 $Q$ 降到 $Q^{(n-1)}$，最后一步用 $f^{(n-1)}$ 在 $x_0$ 处可导的定义。不能把最后一步也当作 L'Hospital 法则，因为那会要求 $f^{(n+1)}$ 存在，而定理只假设到 $n$ 阶。

若只假设 $f^{(n)}(x_0)$ 存在，可以改用对 $n$ 的归纳法。$n=1$ 时就是导数定义。假设 $n-1$ 时结论成立，令

$$
Q(h)=f(x_0+h)-T_n(x_0+h).
$$

则 $Q'$ 的前 $n-1$ 阶导数在 $0$ 处都为零，由归纳假设，

$$
Q'(h)=o(h^{n-1}).
$$

对 $Q$ 用 Lagrange 中值定理，存在 $\xi$ 介于 $0$ 与 $h$ 之间，使得

$$
Q(h)=Q'(\xi)h.
$$

于是

$$
\frac{Q(h)}{h^n}
=
\frac{Q'(\xi)}{h^{n-1}}
=
\frac{Q'(\xi)}{\xi^{n-1}}\cdot\left(\frac{\xi}{h}\right)^{n-1}.
$$

若 $\xi=0$，则 $Q'(0)=0$，从而 $Q(h)=0$，结论直接成立；下面设 $\xi\ne0$。因为 $|\xi|\le|h|$，第二个因子有界；而 $\xi\to0$，第一个因子趋于零。所以 $Q(h)=o(h^n)$。这就是点值条件下的证明。

### 2.3 几点说明

1. 展开式右边除去余项外，是一个次数不超过 $n$ 的多项式。
2. 第一项是常数；当 $x\to x_0$ 时，第 $2,3,\ldots,n+1$ 项依次是 $x-x_0$ 的 $1,2,\ldots,n$ 阶无穷小。
3. 在 $x_0$ 附近，函数可以用多项式逼近。虽然 Peano 余项没有给出误差的具体大小，但在很多问题上，知道误差的阶已经足够。
4. Peano 余项一般不能求导。$o(h^n)$ 只表示一个趋于零的速度，并不保证它有导数，更不保证求导之后仍是 $o(h^{n-1})$。涉及余项求导的问题，通常要改用带 Lagrange 余项的 Taylor 公式。

### 2.4 Maclaurin 展开式

在定理中取 $x_0=0$，得到

$$
f(x)=f(0)+f'(0)x+\frac{f''(0)}{2!}x^2+\cdots+\frac{f^{(n)}(0)}{n!}x^n+o(x^n),\qquad x\to0.
$$

右边的多项式

$$
T_n(f,0;x)=\sum_{k=0}^{n}\frac{f^{(k)}(0)}{k!}x^k
$$

称为 $f$ 的 $n$ 次 **Maclaurin 多项式**，相应的展开式称为 **Maclaurin 展开式**。带余项的展开式通常也叫做函数的 Taylor 展开式和 Maclaurin 展开式。

## 3. 常见 Maclaurin 展开式

下面几个展开式要熟记。它们都是由 $f^{(k)}(0)$ 直接算出来的。

### 例 1：$e^x$

因为

$$
(e^x)^{(k)}=e^x,\qquad k=0,1,2,\ldots,
$$

所以 $(e^x)^{(k)}\big|_{x=0}=1$。于是

$$
e^x=1+x+\frac{x^2}{2!}+\cdots+\frac{x^n}{n!}+o(x^n),\qquad x\to0.
$$

### 例 2：$\sin x$

$$
f^{(k)}(x)=\sin\left(x+\frac{k\pi}{2}\right),\qquad k=0,1,2,\ldots
$$

当 $k=2m$ 为偶数时，$f^{(2m)}(0)=\sin(m\pi)=0$；当 $k=2m+1$ 为奇数时，

$$
f^{(2m+1)}(0)=\sin\left(m\pi+\frac{\pi}{2}\right)=(-1)^m.
$$

因此

$$
\sin x
=
x-\frac{x^3}{3!}+\frac{x^5}{5!}-\cdots+(-1)^n\frac{x^{2n+1}}{(2n+1)!}+o(x^{2n+2}),\qquad x\to0.
$$

注意余项的阶是 $2n+2$，不是 $2n+1$。这是因为 $x^{2n+2}$ 的系数为零，展开式实际上已经“免费”多知道了一阶。

### 例 3：$\cos x$

同理，

$$
f^{(k)}(x)=\cos\left(x+\frac{k\pi}{2}\right),
$$

当 $k=2m$ 时 $f^{(2m)}(0)=(-1)^m$，当 $k=2m+1$ 时 $f^{(2m+1)}(0)=0$。所以

$$
\cos x
=
1-\frac{x^2}{2!}+\frac{x^4}{4!}-\cdots+(-1)^n\frac{x^{2n}}{(2n)!}+o(x^{2n+1}),\qquad x\to0.
$$

### 例 4：$\ln(1+x)$

求导：

$$
f'(x)=\frac1{1+x},\qquad
f''(x)=-\frac1{(1+x)^2},\qquad
f'''(x)=\frac{2!}{(1+x)^3},\qquad\ldots
$$

一般地，

$$
f^{(n)}(x)=\frac{(-1)^{n-1}(n-1)!}{(1+x)^n},\qquad n=1,2,\ldots
$$

在 $x=0$ 处，

$$
f(0)=0,\qquad f^{(n)}(0)=(-1)^{n-1}(n-1)!.
$$

于是

$$
\ln(1+x)
=
x-\frac{x^2}{2}+\frac{x^3}{3}-\cdots+(-1)^{n-1}\frac{x^n}{n}+o(x^n),\qquad x\to0.
$$

附带地，由几何级数或二项式展开可得

$$
\frac1{1+x}=1-x+x^2-x^3+\cdots+(-1)^n x^n+o(x^n),\qquad x\to0.
$$

这个式子在做极限时也很常用。

### 例 5：$(1+x)^\lambda$

设 $\lambda\in\mathbb R$。逐次求导：

$$
f^{(k)}(x)=\lambda(\lambda-1)\cdots(\lambda-k+1)(1+x)^{\lambda-k}.
$$

在 $x=0$ 处，

$$
f^{(k)}(0)=\lambda(\lambda-1)\cdots(\lambda-k+1),\qquad k=1,2,\ldots
$$

规定

$$
C_\lambda^k=\frac{\lambda(\lambda-1)\cdots(\lambda-k+1)}{k!},\qquad k=1,2,\ldots,
\qquad C_\lambda^0=1.
$$

这里的 $C_\lambda^k$ 是二项式系数的推广，$\lambda$ 不必是正整数。于是

$$
(1+x)^\lambda
=
\sum_{k=0}^{n}C_\lambda^k x^k+o(x^n),\qquad x\to0.
$$

特别地，取 $\lambda=-1$ 就得到例 4 后面那个 $\dfrac1{1+x}$ 的展开式；取 $\lambda=\dfrac12$ 可得 $\sqrt{1+x}$ 的展开式。

### 例 6：$\arctan x$

先算低阶导数：

$$
f(0)=0,\qquad f'(x)=\frac1{1+x^2},\qquad f'(0)=1.
$$

要求 $f^{(k)}(0)$，直接逐次求导会很繁。利用恒等式

$$
(1+x^2)f'(x)=1.
$$

两边对 $x$ 求 $n$ 阶导数，由 Leibniz 公式，

$$
(1+x^2)f^{(n+1)}(x)+2nx f^{(n)}(x)+n(n-1)f^{(n-1)}(x)=0.
$$

令 $x=0$，得递推式

$$
f^{(n+1)}(0)=-n(n-1)f^{(n-1)}(0),\qquad n=1,2,\ldots
$$

结合 $f(0)=0$、$f'(0)=1$，得到

$$
f^{(2k)}(0)=0,\qquad
f^{(2k+1)}(0)=(-1)^k(2k)!,\qquad k=0,1,2,\ldots
$$

因此

$$
\arctan x
=
x-\frac{x^3}{3}+\frac{x^5}{5}-\cdots+(-1)^n\frac{x^{2n+1}}{2n+1}+o(x^{2n+2}),\qquad x\to0.
$$

同样，余项的阶是 $2n+2$，因为 $x^{2n+2}$ 的系数为零。

## 4. 用 Taylor 展开求极限

用 Taylor 展开求极限的基本做法是：

1. 先判断分子、分母在 $x\to x_0$ 时的阶；
2. 把分子、分母分别展开到“刚好能看出第一个非零项”的阶；
3. 高于这个阶的项统一写成 $o(\cdot)$，不必具体计算；
4. 约去公因子，取极限。

### 例 7

求

$$
\lim_{x\to0}\frac{e^x\sin x-x(1+x)}{x^3}.
$$

**思路**：分母是 $x^3$，所以分子要展开到 $x^3$。$e^x\sin x$ 是乘积，先把两个因子都展开到 $x^3$，乘起来后只保留不超过 $x^3$ 的项。

解：当 $x\to0$ 时，

$$
e^x=1+x+\frac{x^2}{2}+\frac{x^3}{6}+o(x^3),
\qquad
\sin x=x-\frac{x^3}{6}+o(x^3).
$$

相乘，只保留到 $x^3$：

$$
\begin{aligned}
e^x\sin x
&=
\left(1+x+\frac{x^2}{2}+\frac{x^3}{6}+o(x^3)\right)
\left(x-\frac{x^3}{6}+o(x^3)\right)\\
&=
x+x^2+\left(\frac12-\frac16\right)x^3+o(x^3)\\
&=
x+x^2+\frac{x^3}{3}+o(x^3).
\end{aligned}
$$

于是

$$
e^x\sin x-x(1+x)
=
\frac{x^3}{3}+o(x^3),
$$

所以原极限为

$$
\frac13.
$$

> 这道题用 L'Hospital 法则也能做，但需要多次求导，而且乘积求导会越来越繁。Taylor 展开把“求导”换成了“多项式乘法”，通常更直接。

### 例 8

求

$$
\lim_{x\to\infty}\left(x-x^2\ln\left(1+\frac1x\right)\right).
$$

**思路**：$x\to\infty$ 时 $\dfrac1x\to0$，把 $\ln\left(1+\dfrac1x\right)$ 在 $0$ 处展开。分母不是分式，先把 $x^2\ln(1+1/x)$ 展开，再看它与 $x$ 的差。

解：令 $t=\dfrac1x$，则 $t\to0^+$，且

$$
\ln(1+t)=t-\frac{t^2}{2}+o(t^2).
$$

所以

$$
x^2\ln\left(1+\frac1x\right)
=
\frac1{t^2}\left(t-\frac{t^2}{2}+o(t^2)\right)
=
\frac1t-\frac12+o(1)
=
x-\frac12+o(1).
$$

因此

$$
x-x^2\ln\left(1+\frac1x\right)
=
\frac12+o(1),
$$

所求极限为

$$
\frac12.
$$

### 例 9

求

$$
\lim_{x\to0}\frac{\sin x-\arctan x}{\tan x-\sin x}.
$$

**思路**：分子、分母都是两个函数之差。先看分母的阶：$\tan x-\sin x=\tan x(1-\cos x)$，而 $1-\cos x\sim\dfrac{x^2}{2}$，所以分母是 $x^3$ 阶。分子也要展开到 $x^3$。

解：先分解分母：

$$
\tan x-\sin x
=
\tan x(1-\cos x)
\sim
x\cdot\frac{x^2}{2}
=
\frac{x^3}{2}.
$$

再展开分子。由

$$
\sin x=x-\frac{x^3}{6}+o(x^3),
\qquad
\arctan x=x-\frac{x^3}{3}+o(x^3),
$$

得

$$
\sin x-\arctan x
=
\left(-\frac16+\frac13\right)x^3+o(x^3)
=
\frac{x^3}{6}+o(x^3).
$$

于是原极限为

$$
\frac{\frac16}{\frac12}=\frac13.
$$

> 这里不能把 $\sin x$ 和 $\arctan x$ 都直接换成 $x$，否则分子变成 $0$，就把真正的最低阶项丢掉了。差式中的每一项要展开到足够高的阶，才能看出抵消之后剩下什么。

## 课堂小结

- **主线**：从“连续用常数逼近、可微用一次多项式逼近”出发，用 $x_0$ 处的各阶导数确定系数，得到 $n$ 次 Taylor 多项式；Peano 余项说明误差是 $o((x-x_0)^n)$。
- **条件**：Peano 定理的核心条件是 $f^{(n)}(x_0)$ 存在；用 L'Hospital 证明时通常还假定邻域内有直到 $n$ 阶的导数。它不要求 $f^{(n)}$ 连续。
- **余项**：Peano 余项是局部的、定性的，一般不能求导；需要误差的具体大小或需要余项求导时，应改用 Lagrange 余项。
- **常见展开**：$e^x$、$\sin x$、$\cos x$、$\ln(1+x)$、$(1+x)^\lambda$、$\arctan x$ 的展开式要连同余项的阶一起记住。
- **易错点**：分母是 $x^n$ 时，分子要展开到 $x^n$；差式不能随便用等价无穷小替换；$\sin x$、$\cos x$、$\arctan x$ 的余项阶数会比“最后一项的次数”多一阶，因为中间有一次项系数为零。

## 相关资料

- [原件](https://drive.google.com/file/d/1CWosQB7h1gJAvl15nAqAvQCi9wwT11lS/view?usp=drivesdk)
