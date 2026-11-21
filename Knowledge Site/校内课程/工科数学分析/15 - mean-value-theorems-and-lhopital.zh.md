---
slug: "15-mean-value-theorems-and-lhopital"
title: "微分中值定理与洛必达法则"
summary: "第 15 讲：微分中值定理与洛必达法则。"
updatedAt: "2026-11-17"
content_type: "reference"
group: "course"
displayNumber: "15"
tags:
  - "数学分析"
sources:
  - kind: article
    title: "15微分中值定理.pdf"
    url: "https://drive.google.com/file/d/1dXV9c4dyPsljgpFj7dk1WWlVjN9jUPev/view?usp=drivesdk"
---

本讲讨论极值、中值定理与洛必达法则，重点理解定理的条件、辅助函数的构造和极限的计算方法。

## 1. 极值点和极值

### 定义 1

> 定义 1 设 $f:(a,b)\to\mathbb{R}$，$x_0\in(a,b)$。

(1) 如果存在点 $x_0$ 的某个邻域 $O(x_0,\delta)\subset(a,b)$，使得

$$
f(x)\le f(x_0),\qquad \forall x\in O(x_0,\delta),
$$

则称 $x_0$ 是 $f(x)$ 的一个**极大值点**，$f(x_0)$ 称为相应的**极大值**。

(2) 如果存在点 $x_0$ 的某个邻域 $O(x_0,\delta)\subset(a,b)$，使得

$$
f(x)\ge f(x_0),\qquad \forall x\in O(x_0,\delta),
$$

则称 $x_0$ 是 $f(x)$ 的一个**极小值点**，$f(x_0)$ 称为相应的**极小值**。

> 在不需要区分极大和极小的时候，将其统称为**极值点和极值**。

> 极值点在区间内；区间端点情况总是单独讨论（连续，可导，大小）。

![局部极值示意图：x1 为极小值点，x2 为极大值点，端点 a、b 不在极值点定义内](/images/campus-mathematical-analysis/lecture15-p02-local-extrema.png)

*图 1：极大值点与极小值点的局部性；虚线标出 $x_1,x_2$ 的位置，端点 $a,b$ 不参与极值点定义。*

### 极值概念的三条注记

1. “极大”和“极小”是一个**局部性质**。
2. **极小值可能大于某些极大值**（图中的 $x_1$ 是极小值点，$x_2$ 是极大值点）。$x_1,x_2$ 的位置见图 1。
3. 在一个区间中极值点可以有**无数个**。例如：

函数

$$
f(x)=\sin\frac{1}{x},\qquad x\in(0,1),
$$

有

$$
x=\frac{2}{(2n+1)\pi}\qquad(n=0,1,2,\cdots)
$$

都是 $f(x)$ 的极值点，当 $n$ 为偶数时为极大值点，而当 $n$ 为奇数时为极小值点。

---

## 2. Fermat 定理

### 定理 1（Fermat 定理）

> 定理 1（Fermat 定理）设 $x_0$ 是 $f(x)$ 的一个**极值点**，且 $f(x)$ 在 $x_0$ 处**导数存在**，则
>
> $$
> f'(x_0)=0.
> $$

> **注意**：定理要求 $f$ 在极值点可导。

### 证明

不妨设 $x_0$ 是 $f(x)$ 的极大值点。则存在 $\delta>0$，满足

$$
f(x)\le f(x_0),\qquad \forall x\in O(x_0,\delta).
$$

因为 $f(x)$ 在 $x_0$ 可导，所以

$$
f'(x_0)=f'_+(x_0)=f'_-(x_0).
$$

由于

$$
f'_-(x_0)=\lim_{x\to x_0^-}\frac{f(x)-f(x_0)}{x-x_0}\ge0,
\qquad
f'_+(x_0)=\lim_{x\to x_0^+}\frac{f(x)-f(x_0)}{x-x_0}\le0,
$$

因此

$$
f'(x_0)=0.
$$

### 三条说明

1. 若曲线 $y=f(x)$ 在其极值点处存在切线，那么这条切线必平行于 $x$ 轴。
2. 条件“$f'(x_0)=0$”是 $x_0$ 为极值点的**必要但非充分条件**，例如：$x^3$ 在 $x_0=0$ 处。
3. 若 $f'(x_0)=0$，则称 $x_0$ 为**驻点**。驻点不一定是极值点，**极值点也不一定是驻点**。

---

## 3. Rolle 定理

### 定理 2（Rolle 定理）

> 定理 2（Rolle 定理）设函数 $f(x)$ 在闭区间 $[a,b]$ 上连续，在开区间 $(a,b)$ 上可导，且 $f(a)=f(b)$，
>
> 则至少存在一点 $\xi\in(a,b)$，使得
>
> $$
> f'(\xi)=0.
> $$

### 证明

由闭区间上连续函数的性质，存在 $\xi,\eta\in[a,b]$，满足

$$
f(\xi)=M,\qquad f(\eta)=m,
$$

其中 $M$ 和 $m$ 分别是 $f(x)$ 在 $[a,b]$ 上的最大值和最小值。现分两种情况：

**(1) $M=m$。** 此时 $f(x)$ 在 $[a,b]$ 上恒为常数，结论显然成立。

**(2) $M>m$。** 这时 $M$ 和 $m$ 中至少有一个与 $f(a)$（亦即 $f(b)$）不相同，不妨设

$$
M=f(\xi)>f(a)=f(b).
$$

因此显然有 $\xi\in(a,b)$，且为极大值点，由 Fermat 定理得

$$
f'(\xi)=0.
$$

![Rolle 定理示意图：曲线两端等高，在 ξ 处切线与 x 轴平行](/images/campus-mathematical-analysis/lecture15-p05-rolle.png)

*图 2：Rolle 定理的几何意义：$f(a)=f(b)$，在内部某点 $\xi$ 处切线水平。*

> 该类函数一定在某点切线与 $x$ 轴平行。

---

## 4. Lagrange 中值定理

### 从 Rolle 到 Lagrange：旋转坐标系的直观

先回顾 Rolle 定理的三个条件：

1. 在 $[a,b]$ 上 $f(x)$ 连续；
2. 在 $(a,b)$ 上 $f(x)$ 可导；
3. $f(a)=f(b)$。

> 若允许第三个条件不成立，将会得出什么样的结果？

可以从几何上理解：

> 如图，在新的坐标系 $x'Oy'$ 中，曲线可视作满足 Rolle 定理的三个条件，因此仍有切线平行于坐标轴 $Ox'$。这就是 Lagrange 中值定理。

### 定理 3（Lagrange 中值定理）

> 定理 3（Lagrange 中值定理）设 $f(x)$ 在闭区间 $[a,b]$ 上连续，在开区间 $(a,b)$ 上可导，
>
> 则至少存在一点 $\xi\in(a,b)$，使得
>
> $$
> f'(\xi)=\frac{f(b)-f(a)}{b-a}.
> $$

> **注意**与 Rolle 定理的差别：这里不要求 $f(a)=f(b)$，所以结论是“切线斜率等于弦斜率”，而不是“切线水平”。

### 证明：作辅助函数

作辅助函数

$$
\varphi(x)=f(x)-f(a)-\frac{f(b)-f(a)}{b-a}(x-a),\qquad x\in[a,b].
$$

验证：函数 $\varphi(x)$ 也在 $[a,b]$ 上连续，在 $(a,b)$ 上可导，并且有

$$
\varphi(a)=\varphi(b)=0,
$$

于是由 Rolle 定理，至少存在一点 $\xi\in(a,b)$，使得 $\varphi'(\xi)=0$。此即

$$
f'(\xi)=\frac{f(b)-f(a)}{b-a}.
$$

### 辅助函数的两种构造与几何意义

> 该定理的证明技巧在于构造辅助函数，构造方法不是唯一的：
>
> (1) 通过旋转建立新坐标系，不过表达比较复杂；
>
> (2) 证明所给构造方法：连接 $(a,f(a))$ 和 $(b,f(b))$ 的直线方程为
>
> $$
> g(x)=f(a)+\frac{f(b)-f(a)}{b-a}(x-a).
> $$
>
> 辅助函数 $\varphi(x)$ 的几何意义：曲线 $f(x)$ 减去线性函数 $g(x)$。不是等量下移，而是每一点的平移量与自变量成线性关系。
>
> $$
> \varphi(x)=f(x)-g(x)=f(x)-f(a)-\frac{f(b)-f(a)}{b-a}(x-a),\qquad x\in[a,b].
> $$

![曲线减去弦的几何意义：φ(x) 是曲线与弦的竖直间隙](/images/campus-mathematical-analysis/lecture15-p08-secant-minus-curve.png)

*图 3：$\varphi(x)$ 是曲线 $y=f(x)$ 与弦 $y=g(x)$ 在同一个 $x$ 处的竖直间隙；两端间隙为 0，间隙的极值点处切线平行于弦。*

> **理解关键**：这里减去的是弦函数，不是一个常数。两端的差为零，因而可以应用 Rolle 定理。

### Lagrange 中值定理的几个表达形式

Lagrange 中值定理可以写成以下形式：

$$
f'(\xi)=\frac{f(b)-f(a)}{b-a},\qquad \xi\in(a,b).
$$

并给出三种等价写法：

**(1) 乘积形式**

$$
f(b)-f(a)=f'(\xi)(b-a),\qquad \xi\in(a,b).
$$

**(2) 参数 $\theta$ 形式**：由 $\xi\in(a,b)$，存在 $\theta\in(0,1)$，使 $\xi=a+\theta(b-a)$，所以

$$
f(b)-f(a)=f'(a+\theta(b-a))(b-a),\qquad \theta\in(0,1).
$$

**(3) 增量形式**：若记 $a$ 为 $x$，$b-a$ 为 $\Delta x$，则

$$
f(x+\Delta x)-f(x)=f'(x+\theta\Delta x)\Delta x,\qquad \theta\in(0,1),
$$

即

$$
\Delta y=f'(x+\theta\Delta x)\Delta x,\qquad \theta\in(0,1).
$$

> **注意**它与微分近似公式的区别：
>
> $$
> \Delta y=f'(x)\Delta x+o(\Delta x).
> $$

---

## 5. Lagrange 中值定理的应用

### 定理 4：导数为零则函数为常数

> 定理 4 若 $f(x)$ 在 $(a,b)$ 上可导且有 $f'(x)\equiv0$，则 $f(x)$ 在 $(a,b)$ 上恒为常数。

**证明**：

$\forall x_1,x_2\in(a,b)$，$x_1<x_2$，在 $[x_1,x_2]$ 上应用 Lagrange 中值定理，存在 $\xi\in(x_1,x_2)$，使得

$$
f(x_2)-f(x_1)=f'(\xi)(x_2-x_1).
$$

由条件 $f'(x)\equiv0$ 可得 $f'(\xi)=0$，进而有 $f(x_1)=f(x_2)$。由 $x_1$ 和 $x_2$ 的任意性，就得到

$$
f(x)=C,\qquad x\in(a,b).
$$

### 推论 4.1

> 推论 4.1 若 $f(x)$ 和 $g(x)$ 均在 $(a,b)$ 可导，且 $f'(x)=g'(x)$，则 $f(x)$ 和 $g(x)$ 在 $(a,b)$ 中至多相差一个常数，即
>
> $$
> f(x)=g(x)+C.
> $$

### 例 2：$\arctan x$ 的一致连续性

> 例 2 证明：$\arctan x$ 在 $(-\infty,+\infty)$ 上一致连续。

**证明**：

利用 Lagrange 中值定理，以及

$$
(\arctan x)'=\frac{1}{1+x^2}\in(0,1]
$$

可证得结论。

> **说明**：要证明一致连续，需要给出不依赖于具体位置的 $\delta$。对任意 $x_1,x_2\in\mathbb{R}$，不妨设 $x_1<x_2$。在 $[x_1,x_2]$ 上用 Lagrange 中值定理，存在 $\xi\in(x_1,x_2)$，使
>
> $$
> \arctan x_2-\arctan x_1=\frac{1}{1+\xi^2}(x_2-x_1).
> $$
>
> 因此
>
> $$
> |\arctan x_2-\arctan x_1|\le |x_2-x_1|.
> $$
>
> 给定 $\varepsilon>0$，取 $\delta=\varepsilon$。只要 $|x_2-x_1|<\delta$，就有 $|\arctan x_2-\arctan x_1|<\varepsilon$。这里的 $\delta$ 不依赖于 $x_1,x_2$ 的位置，所以是一致连续。核心是导数有**与地点无关的上界** $1$；普通的连续性只要求每个点附近有各自的 $\delta$，不足以推出这一点。

### 例 3：$\arctan\frac{1+x}{1-x}$ 的恒等式

> 例 3 证明：$\arctan\dfrac{1+x}{1-x}=\arctan x+\dfrac{\pi}{4}$，$x\in(-\infty,1)$。

**证明**：

利用推论 4.1，以及

$$
\left(\arctan\frac{1+x}{1-x}\right)'=(\arctan x)'=\frac{1}{1+x^2},\qquad x\in(-\infty,1),
$$

即得结论。

> 由于 $\arctan\dfrac{1+x}{1-x}$ 不在整个实数集上连续，所以需要分段考虑：
>
> $$
> \arctan\frac{1+x}{1-x}=
> \begin{cases}
> \arctan x+\dfrac{\pi}{4}, & x\in(-\infty,1),\\[4pt]
> \arctan x-\dfrac{3\pi}{4}, & x\in(1,+\infty).
> \end{cases}
> $$

> **易错点**：导数为零只能说明函数在每个区间上分别为常数。这里要在 $x<1$ 与 $x>1$ 两段分别确定常数，不能跨过无定义点 $x=1$。

### 定理 5：一阶导数与单调性

> 定理 5（一阶导数与单调性的关系）设函数 $f(x)$ 在区间 $I$ 上可导，则
>
> 函数 $f(x)$ 在 $I$ 上单调增加的**充分必要条件**是：$\forall x\in I$ 有 $f'(x)\ge0$。
>
> 特别地，若对于任意 $x\in I$ 有 $f'(x)>0$，则 $f(x)$ 在 $I$ 上**严格单调增加**。

这里的“单调增加”按教材惯例指**不减**（允许相邻两点函数值相等）；“严格单调增加”才要求 $x_1<x_2\Rightarrow f(x_1)<f(x_2)$。

#### 充分性

设 $x_1$ 和 $x_2$（$x_1<x_2$）是区间 $I$ 中任意两点。在 $[x_1,x_2]$ 上应用 Lagrange 中值定理，即知存在 $\xi\in(x_1,x_2)$，使得

$$
f(x_2)-f(x_1)=f'(\xi)(x_2-x_1).
$$

由于 $x_2-x_1>0$，因此 $f(x_2)-f(x_1)$ 与 $f'(\xi)$ 同号。所以，当 $f'(\xi)\ge0$ 或 $f'(\xi)>0$ 时，相应地分别有

$$
f(x_2)-f(x_1)\ge0
$$

或

$$
f(x_2)-f(x_1)>0.
$$

由 $x_1$ 和 $x_2$ 的任意性，即知 $f(x)$ 在 $I$ 单调增加或严格单调增加。

#### 必要性

$\forall x\in I$，由于 $f(x)$ 在 $I$ 单调增加，所以对于任意 $x'\in I$（$x'\ne x$）成立

$$
\frac{f(x')-f(x)}{x'-x}\ge0.
$$

令 $x'\to x$，即得到

$$
f'(x)\ge0\qquad(x\in I).
$$

#### 三条注记

1. 类似可得：在 $I$ 上 $f'(x)\le0$（或 $f'(x)<0$）与 $f(x)$ 在 $I$ 上↘（或严格↘）的关系；
2. 函数 $f(x)$ **严格单调增加不能推出**“$f'(x)>0$”，例如 $f(x)=x^3$，$f'(0)=0$；
3. 若将定理 5 后半部分的条件减弱为“在 $I$ 中**除有限个点外**，都有 $f'(x)>0$”，则结论“$f(x)$ 在 $I$ 严格单调增加”依然成立。

---

## 6. Cauchy 中值定理

### 定理 6（Cauchy 中值定理）

> 定理 6（Cauchy 中值定理）设 $f(t)$ 和 $g(t)$ 都在闭区间 $[a,b]$ 上连续，在开区间 $(a,b)$ 上可导，且对于任意 $t\in(a,b)$，$g'(t)\ne0$。则至少存在一点 $\xi\in(a,b)$，使得
>
> $$
> \frac{f'(\xi)}{g'(\xi)}=\frac{f(b)-f(a)}{g(b)-g(a)}.
> $$

> 取 $g(t)=t$ 即可看出，Lagrange 中值定理是 Cauchy 中值定理的特殊情况。

### 错误证明与“错在何处”

下面这个看似自然的证明是错误的：

> **错误证明** 作由 Lagrange 中值定理，存在一点 $\xi\in(a,b)$，使得
>
> $$
> f(b)-f(a)=f'(\xi)(b-a),\qquad g(b)-g(a)=g'(\xi)(b-a).
> $$
>
> 两式相除即得结论。
>
> **错在何处？**

> **易错点**：分别应用 Lagrange 定理只能得到各自的中间点，不能当作同一个点再相除。应构造一个辅助函数，同时处理两个函数。

### 证明：作辅助函数

作辅助函数

$$
\varphi(t)=f(t)-f(a)-\frac{f(b)-f(a)}{g(b)-g(a)}\bigl(g(t)-g(a)\bigr),\qquad t\in[a,b].
$$

验证：函数 $\varphi(t)$ 也在闭区间 $[a,b]$ 上连续，在开区间 $(a,b)$ 上可导，并且有

$$
\varphi(a)=\varphi(b)=0,
$$

于是由 Rolle 定理，至少存在一点 $\xi\in(a,b)$，使得 $\varphi'(\xi)=0$。此即

$$
f'(\xi)-\frac{f(b)-f(a)}{g(b)-g(a)}\,g'(\xi)=0,
$$

即

$$
\frac{f'(\xi)}{g'(\xi)}=\frac{f(b)-f(a)}{g(b)-g(a)}.
$$

### $g'(t)\ne0$ 的条件用在哪里

> 证明中 $g'(t)\ne0$ 的条件用在何处？能否去掉这个条件？考察：$f(x)=x^2$，$g(x)=x^3$，$x\in[-1,1]$。

> **理解关键**：$g'\ne0$ 保证 $g(b)-g(a)\ne0$，也保证导数比有意义。对上述反例，$\xi\ne0$ 时导数比为 $2/(3\xi)$，不可能等于端点函数值比 0；$\xi=0$ 时比值无定义，因此该条件不能省略。

### 例 4：Cauchy 中值定理的应用

> 例 4 设函数 $f$ 在区间 $[a,b]$ 上可导，且 $ab>0$。求证：存在 $\xi\in(a,b)$，使得
>
> $$
> \frac{af(b)-bf(a)}{a-b}=f(\xi)-\xi f'(\xi).
> $$

**证明**：

考察函数

$$
F(x)=\frac{f(x)}{x},\qquad G(x)=\frac1x.
$$

由于区间 $[a,b]$ 不含点 0，所以这两个函数在 $[a,b]$ 上连续、可导，且 $G'(x)<0$。利用 Cauchy 中值定理：存在 $\xi\in(a,b)$，使得

$$
\frac{F(b)-F(a)}{G(b)-G(a)}=\frac{F'(\xi)}{G'(\xi)}.
$$

计算得

$$
\frac{\dfrac{f(b)}{b}-\dfrac{f(a)}{a}}{\dfrac1b-\dfrac1a}
=
\frac{\dfrac{f'(\xi)\cdot\xi-f(\xi)}{\xi^2}}{-\dfrac{1}{\xi^2}},
$$

整理即得

$$
\frac{af(b)-bf(a)}{a-b}=f(\xi)-\xi f'(\xi).
$$

> **注意**：分子、分母必须采用同一端点顺序：分子是 $F(b)-F(a)$，分母就应是 $G(b)-G(a)$。
>

---

## 7. 微分中值定理的关系图

![微分中值定理关系图：Fermat → Rolle → Lagrange ↔ Cauchy](/images/campus-mathematical-analysis/lecture15-p17-theorem-map.png)

*图 4：微分中值定理之间的联系。通常所说的“微分中值定理”指 Lagrange 中值定理。*

几个定理的联系：

- 费马定理（Fermat）$\longrightarrow$ 罗尔定理（Rolle）
- 罗尔定理（Rolle）$\longrightarrow$ 拉格朗日中值定理（Lagrange）
- 罗尔定理（Rolle）$\longrightarrow$ 柯西中值定理（Cauchy）
- 拉格朗日中值定理（Lagrange）$\longleftrightarrow$ 柯西中值定理（Cauchy）
- 拉格朗日中值定理（Lagrange）下方标注：“通常说的微分中值定理”

> **理解关键**：取 $g(x)=x$，Cauchy 定理就给出 Lagrange 定理。图中的双向箭头表示联系，不应理解为可以把两次 Lagrange 定理的结论直接相除。

---

## 8. 洛必达法则

### 8.1 从 Cauchy 定理到洛必达法则

> 柯西中值定理的应用——
>
> 洛必达（L'Hospital）法则

### 8.2 待定型与一个重要结论

先看有理函数在无穷远处的极限：

$$
\lim_{x\to\infty}\frac{a_nx^n+a_{n-1}x^{n-1}+\cdots+a_1x+a_0}
{b_mx^m+b_{m-1}x^{m-1}+\cdots+b_1x+b_0}
=
\begin{cases}
\dfrac{a_n}{b_m}, & n=m,\\[6pt]
0, & n<m,\\[4pt]
\infty, & n>m.
\end{cases}
$$

待定型包括：

- $\dfrac00$ 型：$\displaystyle\lim_{x\to0}\frac{\sin x}{x}$；
- $\dfrac{\infty}{\infty}$ 型：$\displaystyle\lim_{x\to\infty}\frac{x^2}{x^2+x+1}$；
- $0\cdot\infty$ 型：$\displaystyle\lim_{x\to\pi/2}\left(x-\frac{\pi}{2}\right)\tan x$；
- $\infty\pm\infty$ 型：$\displaystyle\lim_{x\to\infty}\left(\sqrt[3]{x^3-x^2-x+1}-x\right)$；
- $1^\infty$ 型：$\displaystyle\lim_{x\to0}(1+x)^{\frac1x}$；
- $\infty^0$ 型：$\displaystyle\lim_{n\to\infty}\sqrt[n]{n}$；
- $0^0$ 型：$\displaystyle\lim_{x\to0^+}x^x$。

> 所有待定型都可转化成 $\dfrac00$ 型。

### 8.3 洛必达法则，$\dfrac00$ 型

#### 定理 1（L'Hospital 法则，$\dfrac00$ 型）

> 定理 1（L'Hospital 法则，$\dfrac00$ 型）
>
> 设函数 $f(x)$ 和 $g(x)$ 在 $(a,a+\delta]$ 上可导（$\delta>0$），且 $g'(x)\ne0$。若
>
> $$
> \lim_{x\to a+}f(x)=\lim_{x\to a+}g(x)=0,
> $$
>
> 且 $\displaystyle\lim_{x\to a+}\frac{f'(x)}{g'(x)}$ 存在（有限或 $+\infty$ 或 $-\infty$），则成立
>
> $$
> \lim_{x\to a+}\frac{f(x)}{g(x)}=\lim_{x\to a+}\frac{f'(x)}{g'(x)}.
> $$

#### 证明

设 $\displaystyle\lim_{x\to a+}\frac{f'(x)}{g'(x)}=A$ 为有限数或 $+\infty$ 或 $-\infty$。补充定义

$$
f(a)=g(a)=0,
$$

则 $f(x)$ 和 $g(x)$ 为 $[a,a+\delta]$ 上的连续函数。根据 Cauchy 中值定理：

$$
\lim_{x\to a+}\frac{f(x)}{g(x)}
=
\lim_{x\to a+}\frac{f(x)-f(a)}{g(x)-g(a)}
=
\lim_{x\to a+}\frac{f'(\xi)}{g'(\xi)}
=
\lim_{\xi\to a+}\frac{f'(\xi)}{g'(\xi)}
=A.
$$

#### 使用说明

> 该定理在 $x\to a-$，$x\to a$ 时也是成立的。
>
> 运用洛必达法则时，要结合等价无穷小替换、极限四则运算法则等提高计算效率。
>
> 洛必达法则可反复使用，但要注意检验适用条件是否成立：
>
> $$
> \lim_{x\to a+}\frac{f(x)}{g(x)}
> =
> \lim_{x\to a+}\frac{f'(x)}{g'(x)}
> =
> \lim_{x\to a+}\frac{f''(x)}{g''(x)}.
> $$

### 8.4 $x\to+\infty$ 的 $\dfrac00$ 型

#### 定理 2

> 定理 2 设函数 $f,g$ 在区间 $(a,+\infty)$ 内可导，且 $g'(x)\ne0$，并且
>
> $$
> \lim_{x\to+\infty}f(x)=\lim_{x\to+\infty}g(x)=0,
> $$
>
> 那么当 $\displaystyle\lim_{x\to+\infty}\frac{f'(x)}{g'(x)}$ 存在（有限或 $\pm\infty$）时，便有
>
> $$
> \lim_{x\to+\infty}\frac{f(x)}{g(x)}=\lim_{x\to+\infty}\frac{f'(x)}{g'(x)}.
> $$

#### 证明

作变换 $x=\dfrac1t$，则 $x\to+\infty$ 相当于 $t\to0+$，从而有

$$
\lim_{t\to0+}f\left(\frac1t\right)=\lim_{t\to0+}g\left(\frac1t\right)=0.
$$

由定理 1 可知

$$
\lim_{x\to+\infty}\frac{f(x)}{g(x)}
=
\lim_{t\to0+}\frac{f\left(\frac1t\right)}{g\left(\frac1t\right)}
=
\lim_{t\to0+}\frac{f'\left(\frac1t\right)\left(-\frac{1}{t^2}\right)}
{g'\left(\frac1t\right)\left(-\frac{1}{t^2}\right)}
=
\lim_{t\to0+}\frac{f'\left(\frac1t\right)}{g'\left(\frac1t\right)}
=
\lim_{x\to+\infty}\frac{f'(x)}{g'(x)}.
$$

> 该定理在 $x\to\infty$ 和 $x\to-\infty$ 时也是成立的。

>

### 8.5 例题：$\dfrac00$ 型

#### 例 1

求极限

$$
\lim_{x\to0}\frac{\ln\cos x}{x(x+2)}.
$$

**解**：

由 L'Hospital 法则得

$$
\lim_{x\to0}\frac{\ln\cos x}{x(x+2)}
=
\frac12\lim_{x\to0}\frac{\ln\cos x}{x}
=
\frac12\lim_{x\to0}\frac{-\sin x}{\cos x}
=
\frac12\cdot0
=0.
$$

#### 例 2

求极限

$$
\lim_{x\to0}\frac{x-\sin x}{\sin^3x}.
$$

**解**：

由 L'Hospital 法则得

$$
\lim_{x\to0}\frac{x-\sin x}{\sin^3x}
=
\lim_{x\to0}\frac{x-\sin x}{x^3}
=
\lim_{x\to0}\frac{1-\cos x}{3x^2}
=
\frac16\lim_{x\to0}\frac{\sin x}{x}
=
\frac16.
$$

#### 例 3

求极限

$$
\lim_{x\to+\infty}\frac{\frac{\pi}{2}-\arctan x}{\sin\frac1x}.
$$

**解**：

由 L'Hospital 法则得

$$
\lim_{x\to+\infty}\frac{\frac{\pi}{2}-\arctan x}{\sin\frac1x}
=
\lim_{x\to+\infty}
\frac{-\dfrac{1}{1+x^2}}
{\cos\dfrac1x\left(-\dfrac{1}{x^2}\right)}
=
\frac{1}{\displaystyle\lim_{x\to+\infty}\cos\frac1x}
\cdot
\lim_{x\to+\infty}\frac{x^2}{1+x^2}
=
1.
$$

### 8.6 洛必达法则，$\dfrac{\infty}{\infty}$ 型

#### 定理 3

> 定理 3 设函数 $f$ 与 $g$ 在 $(a,b)$ 内可导，在这区间内 $g'(x)\ne0$，且
>
> $$
> \lim_{x\to a+}g(x)=\infty,
> $$
>
> 其中**不要求** $\lim_{x\to a+}f(x)=\infty$。
>
> 如果极限 $\displaystyle\lim_{x\to a+}\frac{f'(x)}{g'(x)}$ 存在（有限或 $\pm\infty$），那么
>
> $$
> \lim_{x\to a+}\frac{f(x)}{g(x)}=\lim_{x\to a+}\frac{f'(x)}{g'(x)}.
> $$

> 该定理对 $x\to a-$，$x\to a$，$x\to\infty$，$+\infty$ 和 $-\infty$ 也成立。
>
> Stolz 定理可看作是这个定理的离散形式：
>
> $$
> \lim_{n\to\infty}\frac{a_n}{b_n}
> =
> \lim_{n\to\infty}\frac{a_n-a_{n-1}}{b_n-b_{n-1}}.
> $$

#### 例 5：无穷大量的增长阶

> 例 5 已知当 $x\to+\infty$ 时，下列函数 $\ln x$，$x^\mu$（$\mu>0$），$e^x$ 都是无穷大量。证明：在上述的顺序中，后一个是比前一个更高级的无穷大。

**证明**：

由 L'Hospital 法则得

$$
\lim_{x\to+\infty}\frac{\ln x}{x^\mu}
=
\lim_{x\to+\infty}\frac{\frac1x}{\mu x^{\mu-1}}
=
\frac1\mu\lim_{x\to+\infty}\frac{1}{x^\mu}
=0.
$$

设正整数 $n$ 满足 $n-1<\mu\le n$，于是连续 $n$ 次使用 L'Hospital 法则之后，可得

$$
\lim_{x\to+\infty}\frac{x^\mu}{e^x}
=
\mu\lim_{x\to+\infty}\frac{x^{\mu-1}}{e^x}
=
\mu(\mu-1)\lim_{x\to+\infty}\frac{x^{\mu-2}}{e^x}
=
\cdots
=
\mu(\mu-1)\cdots(\mu-n+1)\lim_{x\to+\infty}\frac{x^{\mu-n}}{e^x}
=0.
$$

>

### 8.7 关于洛必达法则的说明

> **关键结论**：$\displaystyle\lim_{x\to a+}\frac{f'(x)}{g'(x)}$ 存在只是 $\displaystyle\lim_{x\to a+}\frac{f(x)}{g(x)}$ 存在的**充分条件**，而非必要条件。

例如：

$$
\lim_{x\to\infty}\frac{x+\sin x}{x}
=
\lim_{x\to\infty}\left(1+\frac{\sin x}{x}\right)
=
1+0
=
1,
$$

但是

$$
\lim_{x\to\infty}\frac{(x+\sin x)'}{x'}
=
\lim_{x\to\infty}(1+\cos x)
$$

不存在。

因此，即使 $\displaystyle\lim_{x\to a+}\frac{f'(x)}{g'(x)}$ 不存在，$\displaystyle\lim_{x\to a+}\frac{f(x)}{g(x)}$ 仍可能存在。

> “$0\cdot\infty$ 型”、“$\infty-\infty$ 型”、“$0^0$”型、“$\infty^0$ 型”等情况只要经过适当的变换，最终都可以化为“$\dfrac00$”型或“$\dfrac{\infty}{\infty}$”型的情况，使用 L'Hospital 法则去解决。

---

## 9. 其他待定型

### 9.1 待定型，$0\cdot\infty$ 型

> $0\cdot\infty$ 型可化成 $\dfrac{1}{\infty}\cdot\infty$ 型或 $0\cdot\dfrac{1}{0}$ 型，即 $\dfrac{\infty}{\infty}$ 型或 $\dfrac00$ 型。

#### 例 6

求极限

$$
\lim_{x\to0^+}x\ln x.
$$

**解**：

这是 $0\cdot\infty$ 型，将其转化为 $\dfrac{\infty}{\infty}$ 型：

$$
\lim_{x\to0^+}x\ln x
=
\lim_{x\to0^+}\frac{\ln x}{\frac1x}.
$$

再由 L'Hospital 法则得

$$
\lim_{x\to0^+}x\ln x
=
\lim_{x\to0^+}\frac{\frac1x}{-\frac{1}{x^2}}
=
\lim_{x\to0^+}(-x)
=0.
$$

### 9.2 待定型，$\infty-\infty$ 型

> $\infty-\infty$ 型可化成 $\dfrac10-\dfrac10$ 型，再通分变成 $\dfrac{0-0}{0}$ 型，即 $\dfrac00$ 型。

#### 例 7

求极限

$$
\lim_{x\to0^+}\left(\cot x-\frac1x\right).
$$

**解**：

这是 $\infty-\infty$ 型，先对它通分：

$$
\lim_{x\to0^+}\left(\cot x-\frac1x\right)
=
\lim_{x\to0^+}\left(\frac{\cos x}{\sin x}-\frac1x\right)
=
\lim_{x\to0^+}\frac{x\cos x-\sin x}{x\sin x}.
$$

由 L'Hospital 法则得

$$
\lim_{x\to0^+}\left(\cot x-\frac1x\right)
=
\lim_{x\to0^+}\frac{(x\cos x-\sin x)'}{(x\sin x)'}
=
\lim_{x\to0^+}\frac{\cos x-x\sin x-\cos x}{\sin x+x\cos x}
=
\lim_{x\to0^+}\frac{-x}{1+\frac{x}{\sin x}\cos x}
=0.
$$

### 9.3 待定型，$0^0$、$1^\infty$、$\infty^0$ 型

#### 统一处理

> $0^0$ 型、$1^\infty$ 型、$\infty^0$ 型极限 $\lim f(x)^{g(x)}$ 可以通过对数恒等式统一化成
>
> $$
> \lim f(x)^{g(x)}
> =
> \lim e^{g(x)\ln f(x)}
> =
> e^{\lim g(x)\ln f(x)},
> $$
>
> 这里的 $\lim g(x)\ln f(x)$ 已成为 $0\cdot\infty$ 型。

#### 例 8

求极限

$$
\lim_{x\to0^+}x^x.
$$

**解**：

这是 $0^0$ 型，将其改写为

$$
\lim_{x\to0^+}x^x
=
\lim_{x\to0^+}e^{x\ln x}
=
e^{\lim_{x\to0^+}x\ln x}.
$$

由例 6 知 $\displaystyle\lim_{x\to0^+}x\ln x=0$，于是

$$
\lim_{x\to0^+}x^x=e^0=1.
$$

#### 例 9

求极限

$$
\lim_{x\to\pi/4}(\tan x)^{\tan 2x}.
$$

**解**：

这是 $1^\infty$ 型，将其改写为

$$
\lim_{x\to\pi/4}(\tan x)^{\tan 2x}
=
\lim_{x\to\pi/4}e^{\tan 2x\ln(\tan x)}
=
e^{\lim_{x\to\pi/4}\tan 2x\ln(\tan x)}.
$$

而

$$
\begin{aligned}
\lim_{x\to\pi/4}\tan 2x\ln(\tan x)
&=
\lim_{x\to\pi/4}\tan 2x\cdot(\tan x-1)\\
&=
\lim_{x\to\pi/4}\frac{\sin 2x\,(\tan x-1)}{\cos 2x}\\
&=
\lim_{x\to\pi/4}\frac{\tan x-1}{\cos 2x}\\
&=
\lim_{x\to\pi/4}\frac{1+\tan^2x}{-2\sin 2x}
=-1.
\end{aligned}
$$

所以

$$
\lim_{x\to\pi/4}(\tan x)^{\tan 2x}=\frac1e.
$$

#### 例 10

求极限

$$
\lim_{x\to0^+}\left(\ln\frac1x\right)^x.
$$

**解**：

这是 $\infty^0$ 型，将其改写为

$$
\lim_{x\to0^+}\left(\ln\frac1x\right)^x
=
\lim_{x\to0^+}e^{x\ln\ln\frac1x}
=
e^{\lim_{x\to0^+}x\ln\ln\frac1x}.
$$

由 L'Hospital 法则得

$$
\lim_{x\to0^+}x\ln\ln\frac1x
=
\lim_{t\to+\infty}\frac{\ln\ln t}{t}
=
\lim_{t\to+\infty}\frac{\frac{1}{\ln t}\cdot\frac1t}{1}
=0,
$$

于是

$$
\lim_{x\to0^+}\left(\ln\frac1x\right)^x=e^0=1.
$$

---

## 10. 洛必达法则的其他应用

### 例 11

> 例 11 设 $f$ 在 $(a,+\infty)$ 上有二阶导数，如果
>
> $$
> \lim_{x\to+\infty}\bigl(f(x)+2f'(x)+f''(x)\bigr)=A\in\mathbb{R}.
> $$
>
> 证明：
>
> $$
> \lim_{x\to+\infty}f(x)=A,\qquad
> \lim_{x\to+\infty}f'(x)=\lim_{x\to+\infty}f''(x)=0.
> $$

关键是利用乘积求导构造辅助函数：

> 利用：$\bigl[e^{ax}f(x)\bigr]'=e^{ax}\bigl[af(x)+f'(x)\bigr]$ 构造性证明。

> **说明**：先用一个结论：若 $y+y'\to A$，由洛必达法则（分母趋于无穷的情形），
>
> $$
> y(x)=\frac{e^xy(x)}{e^x}\longrightarrow
> \lim_{x\to+\infty}\frac{e^x(y+y')}{e^x}=A.
> $$
>
> 令 $h=f+f'$。题设给出 $h+h'=f+2f'+f''\to A$，所以先得 $h\to A$，再由 $f+f'=h\to A$ 得 $f\to A$。于是
>
> $$
> f'=h-f\to0,\qquad
> f''=(f+2f'+f'')-f-2f'\to0.
> $$

## 课堂小结

- **定理主线**：Fermat 给出内部可导极值点的必要条件；Rolle、Lagrange、Cauchy 依次处理水平切线、弦斜率和两个函数的比值关系。
- **证明方法**：看到“存在某点使导数满足等式”，优先考虑构造辅助函数，再应用中值定理。
- **洛必达法则**：先检查待定型和定理条件，再求导；其他待定型先通分、换元或取对数，转成可用的分式形式。
- **易错点**：驻点不一定是极值点；严格递增不代表处处导数大于零；不能把两次中值定理得到的点当作同一个点。
- **极限计算**：导数比极限不存在时，不能据此断定原极限不存在；等价无穷小通常用于乘除，不能随意替换差中的某一项。

- [第6次作业解析](/books/campus-mathematical-analysis/30-homework-06/)
- [返回课程目录](/books/campus-mathematical-analysis/)
