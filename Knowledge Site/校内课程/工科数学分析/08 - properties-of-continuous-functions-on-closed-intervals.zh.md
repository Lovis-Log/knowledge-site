---
slug: "08-properties-of-continuous-functions-on-closed-intervals"
title: "闭区间上连续函数的性质"
summary: "第 8 讲：闭区间上连续函数的性质。"
updatedAt: "2026-11-15"
content_type: "video-course"
group: "course"
displayNumber: "08"
tags:
  - "数学分析"
sources:
  - kind: article
    title: "8闭区间上连续函数的性质.pdf"
    url: "https://drive.google.com/file/d/1b83Gqfuhz_qyAxPZ2RzZi6q1IPw3_NnZ/view?usp=drivesdk"
---

闭区间上的连续函数具有一组很强的整体性质：有界、能取到最大值和最小值、能取到最大值与最小值之间的任何值，并且在闭区间上一定一致连续。这一讲的核心，是理解这些性质为什么必须依赖“闭区间”和“连续”这两个条件，以及怎样用它们证明方程有解、函数有不动点。

先约定：以下定理中的 $f(x)$ 都在闭区间 $[a,b]$ 上连续。

## 1. 有界性定理

### 定理 1（有界性定理）

> 若函数 $f(x)$ 在闭区间 $[a,b]$ 上连续，则它在 $[a,b]$ 上有界。

也就是说，存在常数 $M>0$，使得

$$
|f(x)|\le M,\qquad \forall x\in[a,b].
$$

开区间上的连续函数不一定有界。例如

$$
f(x)=\frac1x,\qquad x\in(0,1)
$$

在 $(0,1)$ 上连续，但显然无界：当 $x\to0^+$ 时，$f(x)\to+\infty$。问题出在区间不闭，函数在端点 $0$ 附近“逃出去”了。

### 证明

用反证法。假设 $f(x)$ 在 $[a,b]$ 上无界。

1. 将 $[a,b]$ 二等分，则 $f(x)$ 至少在其中一个小区间上无界，记为 $[a_1,b_1]$；
2. 再将 $[a_1,b_1]$ 二等分，同样 $f(x)$ 至少在其中一个上无界，记为 $[a_2,b_2]$；
3. 如此继续，得到一个闭区间套

$$
\{[a_n,b_n]\},
$$

并且 $f(x)$ 在任何一个 $[a_n,b_n]$ 上都无界。

根据闭区间套定理，存在唯一的 $\xi\in\mathbb R$，使得

$$
\xi\in[a_n,b_n],\qquad \forall n\ge1,
$$

并且

$$
\xi=\lim_{n\to\infty}a_n=\lim_{n\to\infty}b_n.
$$

因为 $\xi\in[a,b]$，且 $f(x)$ 在点 $\xi$ 连续，所以存在 $\delta>0$，当 $x\in O(\xi,\delta)$ 时，

$$
|f(x)|<|f(\xi)|+1.
$$

这就在 $\xi$ 的一个局部邻域内把 $f$ 控制住了。由于

$$
\lim_{n\to\infty}a_n=\lim_{n\to\infty}b_n=\xi,
$$

对充分大的 $n$，有

$$
[a_n,b_n]\subset O(\xi,\delta).
$$

于是 $f$ 在 $[a_n,b_n]$ 上有界。这与 $f$ 在每个 $[a_n,b_n]$ 上都无界矛盾。所以 $f(x)$ 在 $[a,b]$ 上有界。

证明的直观思路是：如果函数在闭区间上无界，就不断二分，把“无界”这个坏性质挤到一个点 $\xi$ 上；但函数在 $\xi$ 连续，必然在 $\xi$ 附近有界，矛盾。这里闭区间套定理保证了 $\xi$ 确实存在，连续性则在 $\xi$ 处提供局部有界性。

---

## 2. 最值定理

### 定理 2（最值定理）

> 若函数 $f(x)$ 在闭区间 $[a,b]$ 上连续，则它在 $[a,b]$ 上必能取到最大值与最小值。即存在 $\xi,\eta\in[a,b]$，对于一切 $x\in[a,b]$ 成立
>
> $$
> f(\xi)\le f(x)\le f(\eta).
> $$

也就是说，值域 $R_f=\{f(x)\mid x\in[a,b]\}$ 中既有最小值，也有最大值。

### 证明

由有界性定理，$R_f$ 是一个有界数集，所以必有上确界与下确界，记

$$
\alpha=\inf R_f,\qquad \beta=\sup R_f.
$$

先证存在 $\xi\in[a,b]$，使得 $f(\xi)=\alpha$。按照下确界的定义：

1. $\forall x\in[a,b]$，$f(x)\ge\alpha$；
2. $\forall \varepsilon>0$，$\exists x\in[a,b]$，使得 $f(x)<\alpha+\varepsilon$。

于是取 $\varepsilon_n=\dfrac1n$（$n=1,2,3,\cdots$），相应地得到数列 $\{x_n\}$，$x_n\in[a,b]$，并且满足

$$
\alpha\le f(x_n)<\alpha+\frac1n.
$$

因为 $\{x_n\}$ 是有界数列，应用 Bolzano-Weierstrass 定理，存在收敛子列 $\{x_{n_k}\}$：

$$
\lim_{k\to\infty}x_{n_k}=\xi,\qquad \text{且 }\xi\in[a,b].
$$

考虑不等式

$$
\alpha\le f(x_{n_k})<\alpha+\frac1{n_k},\qquad k=1,2,3,\cdots
$$

令 $k\to\infty$，由极限的夹逼性与 $f(x)$ 在点 $\xi$ 的连续性，得到

$$
f(\xi)=\alpha.
$$

这说明 $f(x)$ 在 $[a,b]$ 上取到最小值 $\alpha$，即

$$
\alpha=\min R_f.
$$

同样可以证明：存在 $\eta\in[a,b]$，使得

$$
f(\eta)=\beta=\max R_f.
$$

证明的关键是“用数列逼近确界”。下确界 $\alpha$ 可能取不到，但可以找一列函数值 $f(x_n)$ 从上方无限接近它；有界数列又能抽出收敛子列，子列的极限点 $\xi$ 处的函数值就被夹逼到 $\alpha$。

开区间上的连续函数即使有界，也不一定能取到最大值和最小值。例如

$$
f(x)=x,\qquad x\in(0,1)
$$

在 $(0,1)$ 上连续且有界，但取不到 $\alpha=0$ 与 $\beta=1$。所以“闭区间”这个条件不能丢。

---

## 3. 零点存在定理

### 定理 3（零点存在定理）

> 若 $f(x)$ 在闭区间 $[a,b]$ 上连续，且
>
> $$
> f(a)\cdot f(b)<0,
> $$
>
> 则存在 $\xi\in(a,b)$，使得
>
> $$
> f(\xi)=0.
> $$

条件 $f(a)f(b)<0$ 表示两端函数值异号。若 $f(a)f(b)=0$，端点本身就是零点，结论更直接；定理要求严格异号，是为了保证零点在开区间内部。

### 证明

不失一般性，设

$$
f(a)<0,\qquad f(b)>0.
$$

构造闭区间套：

1. 将 $[a,b]$ 二等分。若 $f\left(\dfrac{a+b}{2}\right)=0$，则结论得证。否则，必有一个小区间 $[a_1,b_1]$ 满足
   $$
   f(a_1)<0<f(b_1).
   $$
2. 将 $[a_1,b_1]$ 二等分。若 $f\left(\dfrac{a_1+b_1}{2}\right)=0$，则结论得证。否则，存在小区间 $[a_2,b_2]$ 满足
   $$
   f(a_2)<0<f(b_2).
   $$
3. 继续下去。若存在某一步二分点的函数值为零，则结论得证。

否则，就得到闭区间套 $\{[a_n,b_n]\}$，满足

$$
f(a_n)<0,\qquad f(b_n)>0,\qquad \forall n\ge1.
$$

根据闭区间套定理，存在唯一的 $\xi\in\mathbb R$，使得

$$
\xi\in[a_n,b_n],\qquad \forall n\ge1,
$$

并且

$$
\xi=\lim_{n\to\infty}a_n=\lim_{n\to\infty}b_n.
$$

于是，由 $f$ 在 $\xi$ 连续，

$$
f(\xi)=\lim_{n\to\infty}f(a_n)\le0,
$$

同时

$$
f(\xi)=\lim_{n\to\infty}f(b_n)\ge0.
$$

从而必有

$$
f(\xi)=0.
$$

证明的直观图景是：每次二分，都保留“左端为负、右端为正”的那一半；区间长度趋于零，两个端点挤向同一点 $\xi$。由连续性，$\xi$ 处的函数值既要 $\le0$ 又要 $\ge0$，只能是 $0$。

零点存在定理只保证“有零点”，不保证“只有一个”。要证明唯一，通常还要加上严格单调性。

### 例 1

最高次为奇数的多项式

$$
f(x)=a_nx^n+a_{n-1}x^{n-1}+\cdots+a_1x+a_0
$$

必有零点。

**证明**：不妨设 $a_n>0$。由

$$
f(x)=x^n\left(a_n+\frac{a_{n-1}}x+\cdots+\frac{a_1}{x^{n-1}}+\frac{a_0}{x^n}\right)
$$

知

$$
\lim_{x\to-\infty}f(x)=-\infty,\qquad
\lim_{x\to+\infty}f(x)=+\infty.
$$

这里用了 $n$ 为奇数：$x^n$ 在负无穷处为负、在正无穷处为正，而括号内趋于 $a_n>0$。

从而存在 $\xi,\eta\in\mathbb R$，$\xi<\eta$，使得

$$
f(\xi)\le-1,\qquad f(\eta)\ge1.
$$

在闭区间 $[\xi,\eta]$ 上，$f$ 连续且两端异号，由零点存在定理，存在 $\gamma\in(\xi,\eta)$，使得

$$
f(\gamma)=0.
$$

如果 $a_n<0$，可考虑 $-f(x)$，或者直接把上面的符号反过来。奇次多项式在两端走向相反，这是它必有实零点的根本原因；偶次多项式则可能没有实零点，例如 $x^2+1$。

### 例 2

设函数 $f(x):[a,b]\to[a,b]$ 连续。证明：存在 $\xi\in[a,b]$，使

$$
f(\xi)=\xi.
$$

这样的 $\xi$ 称为 $f(x)$ 的一个**不动点**。

**证明**：设

$$
g(x)=f(x)-x.
$$

则 $g(x)$ 在 $[a,b]$ 上连续。由 $f([a,b])\subset[a,b]$，可知

$$
g(a)=f(a)-a\ge0,\qquad
g(b)=f(b)-b\le0.
$$

若 $g(a)=0$，则有 $\xi=a$；若 $g(b)=0$，则有 $\xi=b$；

若 $g(a)>0$，$g(b)<0$，则必存在 $\xi\in(a,b)$，使得 $g(\xi)=0$，即

$$
f(\xi)=\xi.
$$

这里构造辅助函数的动机很直接：把“$f(x)=x$”移项，变成“$g(x)=f(x)-x=0$”。而 $f$ 把区间 $[a,b]$ 映回自身，正好给出 $g(a)\ge0$、$g(b)\le0$，于是零点定理可用。

---

## 4. 介值定理

### 定理 4（介值定理）

> 若 $f(x)$ 在 $[a,b]$ 上连续，则它一定能取到最大值
>
> $$
> M=\max\{f(x)\mid x\in[a,b]\}
> $$
>
> 和最小值
>
> $$
> m=\min\{f(x)\mid x\in[a,b]\}
> $$
>
> 之间的任何一个值。

### 证明

由最值定理，存在 $\xi,\eta\in[a,b]$，使得

$$
f(\xi)=m,\qquad f(\eta)=M.
$$

不妨设 $\xi<\eta$。对任何一个中间值 $C$，$m<C<M$，考察辅助函数

$$
\varphi(x)=f(x)-C.
$$

因 $\varphi(x)$ 在 $[\xi,\eta]$ 上连续，且

$$
\varphi(\xi)=f(\xi)-C<0,\qquad
\varphi(\eta)=f(\eta)-C>0,
$$

由零点存在定理，必有 $\zeta\in(\xi,\eta)$，使得

$$
\varphi(\zeta)=0,
$$

即

$$
f(\zeta)=C.
$$

### 推论

> 设函数 $f(x)$ 在闭区间 $[a,b]$ 连续，则
>
> $$
> R_f=[m,M],
> $$
>
> 其中 $m$ 是最小值，$M$ 是最大值。

证明分两步：最值定理给出 $R_f\subset[m,M]$；介值定理给出 $[m,M]\subset R_f$。两者合起来就是 $R_f=[m,M]$。

这说明闭区间上连续函数的图像，在最小值与最大值之间没有“断层”：它把 $[m,M]$ 整个填满。开区间上的连续函数，其值域也是一个区间，但不一定包含端点，例如 $y=x$ 在 $(0,1)$ 上的值域是 $(0,1)$。

---

## 5. 一致连续

### 5.1 从逐点连续到一致连续

回顾连续的定义：$f$ 在区间 $X$ 上连续，是指对每一点 $x_0\in X$，

$$
\forall \varepsilon>0,\ \exists \delta>0,\ \forall x\in X\ (|x-x_0|<\delta):\ |f(x)-f(x_0)|<\varepsilon.
$$

这里 $\delta$ 既和 $\varepsilon$ 有关，也和点 $x_0$ 的位置有关。即使 $\varepsilon$ 相同，不同点对应的 $\delta$ 也可能不同。

如果存在一个“通吃”的 $\delta$，只依赖 $\varepsilon$，对区间内所有点都管用，就得到更强的一致性。

### 定义 1（一致连续）

> 设函数 $f(x)$ 在区间 $X$ 上有定义。若
>
> $$
> \forall \varepsilon>0,\ \exists \delta>0,
> $$
>
> 只要 $x',x''\in X$ 满足 $|x'-x''|<\delta$，就成立
>
> $$
> |f(x')-f(x'')|<\varepsilon,
> $$
>
> 则称函数 $f(x)$ 在区间 $X$ 上**一致连续**。

所谓“一致”，是指 $\delta$ 仅与 $\varepsilon$ 有关，对 $X$ 中的所有点具有一致性。定义中的 $x',x''$ 是任意两点，不再固定其中一点为 $x_0$。

显然，

$$
f\text{ 在 }X\text{ 上一致连续}\ \Longrightarrow\ f\text{ 在 }X\text{ 上连续}.
$$

反过来不成立。为了说明一个函数不一致连续，需要给出否定形式的精确描述：

$$
f\text{ 在 }X\text{ 上一致连续：}\quad
\forall \varepsilon>0,\ \exists \delta>0,\ \forall x',x''\in X,\ |x'-x''|<\delta:\ |f(x')-f(x'')|<\varepsilon.
$$

$$
f\text{ 在 }X\text{ 上不一致连续：}\quad
\exists \varepsilon_0>0,\ \forall \delta>0,\ \exists x',x''\in X,\ |x'-x''|<\delta\ \text{且}\ |f(x')-f(x'')|\ge\varepsilon_0.
$$

注意量词的顺序：先固定一个“坏”的 $\varepsilon_0$，然后无论你把 $\delta$ 取得多小，都能找到一对距离小于 $\delta$ 的点，它们的函数值却相差至少 $\varepsilon_0$。这通常通过构造两个数列来实现。

### 5.2 Cantor 定理

### 定理 5（Cantor 定理）

> 若函数 $f(x)$ 在闭区间 $[a,b]$ 上连续，则它在 $[a,b]$ 上一致连续。

### 证明（反证法）

假设 $f(x)$ 在 $[a,b]$ 上非一致连续。则存在 $\varepsilon_0>0$ 及两列点列 $\{x_n'\}$ 和 $\{x_n''\}$，$x_n',x_n''\in[a,b]$，满足

$$
|x_n'-x_n''|<\frac1n,
$$

且

$$
|f(x_n')-f(x_n'')|\ge\varepsilon_0\qquad(n=1,2,3,\cdots).
$$

因为 $\{x_n'\}$ 有界，由 Bolzano-Weierstrass 定理，存在收敛子列 $\{x_{n_k}'\}$：

$$
\lim_{k\to\infty}x_{n_k}'=\xi,\qquad \xi\in[a,b].
$$

在 $\{x_n''\}$ 中取子列 $\{x_{n_k}''\}$，其下标与 $\{x_{n_k}'\}$ 的下标相同。则

$$
|x_{n_k}'-x_{n_k}''|<\frac1{n_k},\qquad \forall k\ge1,
$$

从而

$$
\lim_{k\to\infty}x_{n_k}''
=\lim_{k\to\infty}\left[x_{n_k}'+\left(x_{n_k}''-x_{n_k}'\right)\right]
=\lim_{k\to\infty}x_{n_k}'
=\xi.
$$

由于函数 $f(x)$ 在点 $\xi$ 连续，因而

$$
\lim_{k\to\infty}f(x_{n_k}')=\lim_{k\to\infty}f(x_{n_k}'')=f(\xi).
$$

于是得到

$$
\lim_{k\to\infty}\left(f(x_{n_k}')-f(x_{n_k}'')\right)=0,
$$

这与

$$
\left|f(x_{n_k}')-f(x_{n_k}'')\right|\ge\varepsilon_0,\qquad \forall k\ge1
$$

矛盾。所以 $f(x)$ 在 $[a,b]$ 上一致连续。

Cantor 定理的证明是 Bolzano-Weierstrass 定理的典型用法：非一致连续给出一对对距离趋于零、函数值差却不趋于零的点；有界性抽出一个收敛子列，另一个点列因为与它“贴在一起”也收敛到同一点；连续性又迫使两边的函数值趋于同一个值，矛盾。

### 5.3 一致连续性的判定举例

### 例 3

讨论函数在给定区间上的一致连续性。

**(1) $f(x)=\dfrac1x$，$x\in(0,1]$：不一致连续。**

取

$$
x_n=\frac1n,\qquad y_n=\frac1{2n}.
$$

则

$$
|x_n-y_n|=\frac1{2n}\to0,
$$

但

$$
|f(x_n)-f(y_n)|=|n-2n|=n\ge1.
$$

取 $\varepsilon_0=1$，无论 $\delta$ 多小，只要 $n$ 足够大，就有 $|x_n-y_n|<\delta$，而函数值差至少为 $1$。所以不一致连续。

**(2) $f(x)=\dfrac1x$，$x\in[c,1]$，$c>0$ 为常数：一致连续。**

对任意 $x,y\in[c,1]$，

$$
\left|\frac1x-\frac1y\right|
=\frac{|x-y|}{xy}
\le\frac{|x-y|}{c^2}.
$$

对任意 $\varepsilon>0$，取 $\eta=c^2\varepsilon$，当 $|x-y|<\eta$ 时，

$$
\left|\frac1x-\frac1y\right|<\varepsilon.
$$

所以一致连续。

关键区别在于：在 $[c,1]$ 上，分母 $xy$ 有一个正的下界 $c^2$；在 $(0,1]$ 上，这个下界不存在，靠近 $0$ 时函数变化可以任意剧烈。

**(3) $f(x)=x^2$，$x\in[0,+\infty)$：不一致连续。**

取

$$
x_n=n,\qquad y_n=n+\frac1n.
$$

则

$$
|x_n-y_n|=\frac1n\to0,
$$

但

$$
|x_n^2-y_n^2|
=\left|n^2-\left(n+\frac1n\right)^2\right|
=2+\frac1{n^2}\ge2.
$$

所以不一致连续。

**(4) $f(x)=x^2$，$x\in[0,B]$，$B>0$ 为常数：一致连续。**

对任意 $x,y\in[0,B]$，

$$
|x^2-y^2|=|x+y|\,|x-y|\le2B|x-y|.
$$

对任意 $\varepsilon>0$，取 $\eta=\dfrac{\varepsilon}{2B}$，当 $|x-y|<\eta$ 时，

$$
|x^2-y^2|<2B\cdot\frac{\varepsilon}{2B}=\varepsilon.
$$

所以一致连续。

**(5) $f(x)=\sin x$，$x\in(-\infty,+\infty)$：一致连续。**

对任意 $x,y\in\mathbb R$，

$$
|\sin x-\sin y|
=2\left|\cos\frac{x+y}{2}\sin\frac{x-y}{2}\right|
\le2\left|\sin\frac{x-y}{2}\right|
\le|x-y|.
$$

取 $\eta=\varepsilon$，当 $|x-y|<\eta$ 时，

$$
|\sin x-\sin y|<\varepsilon.
$$

所以 $\sin x$ 在 $(-\infty,+\infty)$ 上一致连续。

这个例子说明：区间无界并不一定导致不一致连续。$\sin x$ 的导数虽然处处存在，但整体变化速度被 $1$ 控制住了；而 $x^2$ 在无穷远处越来越“陡”，才导致不一致连续。

### 5.4 有限开区间上一致连续的判定

### 定理 7（有限开区间上一致连续的判定）

> 函数 $f(x)$ 在有限开区间 $(a,b)$ 连续，则
>
> $$
> f(x)\text{ 在 }(a,b)\text{ 上一致连续}
> $$
>
> 的充分必要条件是：$f(a+)$ 与 $f(b-)$ 都存在（且为有限数）。

**注意**：这里“有限”两个字不能丢。该定理不适用于无限开区间。例如 $f(x)=\sin x$ 在 $(-\infty,+\infty)$ 上是一致连续的，但 $f(-\infty)$ 与 $f(+\infty)$ 都不存在。

### 证明（充分性）

设

$$
f(a+)=A,\qquad f(b-)=B,
$$

定义函数

$$
\tilde f(x)=
\begin{cases}
A, & x=a,\\
f(x), & a<x<b,\\
B, & x=b.
\end{cases}
$$

由 $f(a+)=A$、$f(b-)=B$，$\tilde f(x)$ 是闭区间 $[a,b]$ 上的连续函数。由 Cantor 定理，$\tilde f(x)$ 在 $[a,b]$ 上一致连续。于是函数 $f(x)$ 在开区间 $(a,b)$ 上也是一致连续的。

**证明（必要性）**

设函数 $f(x)$ 在开区间 $(a,b)$ 上一致连续，则

$$
\forall \varepsilon>0,\ \exists \delta>0,\ \forall x',x''\in(a,b),\ |x'-x''|<\delta:\ |f(x')-f(x'')|<\varepsilon.
$$

用海涅定理，在区间 $(a,b)$ 上任意选取数列 $\{x_n\}$，$x_n\in(a,b)$，且

$$
\lim_{n\to\infty}x_n=a.
$$

因数列 $\{x_n\}$ 是基本数列，对于上述 $\delta>0$，存在 $N$，当 $n,m>N$ 时，

$$
|x_n-x_m|<\delta,
$$

从而

$$
|f(x_n)-f(x_m)|<\varepsilon.
$$

这说明函数值数列 $\{f(x_n)\}$ 也是基本数列，因而必定收敛。

由海涅定理（加强版本），可知

$$
f(a+)=\lim_{x\to a+}f(x)
$$

存在。同理可证

$$
f(b-)=\lim_{x\to b-}f(x)
$$

存在。

必要性的思路是：一致连续性把“$x$ 靠得近”转化为“函数值靠得近”，于是任何趋近于端点的基本数列，其函数值数列也是基本数列，必定收敛；再由海涅定理，这个共同的极限就是端点处的单侧极限。

---

## 课堂小结

- 闭区间上连续函数有五条整体性质：有界性、最值存在、零点存在、介值、一致连续。
- 有界性与最值定理的证明都依赖“把区间不断二分，再抽收敛子列/闭区间套”的紧性思想；开区间可能因为端点处“逃出去”而失效。
- 零点存在定理解决“有没有解”；要说明“只有一个解”，通常再加严格单调性。
- 介值定理说明连续函数把最大值与最小值之间的值全部取到，因此闭区间上连续函数的值域是 $[m,M]$。
- 一致连续要求 $\delta$ 只依赖 $\varepsilon$，不依赖具体点；连续不一定一致连续。
- Cantor 定理：闭区间上连续 $\Rightarrow$ 一致连续。有限开区间上，一致连续等价于两个端点单侧极限都存在。
- 判断不一致连续，常用“两个距离趋于零、函数值差却不趋于零”的点列；判断一致连续，常用放缩把 $|f(x)-f(y)|$ 控制成常数乘 $|x-y|$。

## 相关资料

- [8闭区间上连续函数的性质.pdf](https://drive.google.com/file/d/1b83Gqfuhz_qyAxPZ2RzZi6q1IPw3_NnZ/view?usp=drivesdk)
