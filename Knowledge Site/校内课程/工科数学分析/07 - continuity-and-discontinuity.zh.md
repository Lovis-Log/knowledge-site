---
slug: "07-continuity-and-discontinuity"
title: "连续与间断"
summary: "第 7 讲：连续与间断。"
updatedAt: "2026-11-15"
content_type: "reference"
group: "course"
displayNumber: "07"
tags:
  - "数学分析"
sources:
  - kind: article
    title: "7连续与间断.pdf"
    url: "https://drive.google.com/file/d/1ubT0Yuxkz2RePTbDVZCOQ7peoOtNO99T/view?usp=drivesdk"
---

连续性是把“极限存在”进一步升级为“极限值恰好等于函数值”。这一讲先给出点连续与区间连续的精确定义，再讨论连续函数的运算、间断点的分类，以及反函数、复合函数和初等函数的连续性，最后用连续性处理 $1^\infty$ 型极限。

## 1. 连续函数的定义

实数系是“连续”的：直线上没有空隙。反映到函数图像上，就是曲线不断开。把“$x$ 充分接近 $x_0$ 时，$f(x)$ 充分接近 $f(x_0)$”写成精确的 $\varepsilon-\delta$ 语言，就得到：

### 定义 1（点连续）

> 设函数 $f(x)$ 在点 $x_0$ 的某个邻域内有定义，并且
>
> $$
> \lim_{x\to x_0}f(x)=f(x_0),
> $$
>
> 即
>
> $$
> \forall \varepsilon>0,\ \exists \delta>0,\ \forall x\ (|x-x_0|<\delta):\ |f(x)-f(x_0)|<\varepsilon,
> $$
>
> 则称函数 $f(x)$ 在点 $x_0$ **连续**，而称 $x_0$ 是函数 $f(x)$ 的**连续点**。

这个定义和函数极限的定义只差两处：

1. 极限定义中的 $A$ 换成了函数值 $f(x_0)$。也就是说，连续是“极限值等于函数值”这一特殊情况。
2. 去掉了 $0<|x-x_0|$ 的要求。因为 $x=x_0$ 时，$|f(x_0)-f(x_0)|=0<\varepsilon$ 自然成立。

> **理解关键**：“连续”反映的是函数在一点附近的变化，本质上仍是局部概念。逐点考察，就能得到区间上的连续性。

### 定义 2（开区间上连续）

> 若函数 $f(x)$ 在区间 $(a,b)$ 的每一点都连续，则称 $f(x)$ 在开区间 $(a,b)$ 上连续，或称 $f(x)$ 是开区间 $(a,b)$ 上的连续函数。

需要注意：$f$ 在 $(a,b)$ 上连续，只保证每一点都有上述性质；即使 $\varepsilon$ 相同，不同的点对应的 $\delta$ 也可以不同。也就是说，$\delta$ 既和 $\varepsilon$ 有关，又和点 $x_0$ 在 $(a,b)$ 中的位置有关。这一点在后面“一致连续”里会成为关键。

### 例 1

证明 $f(x)=\dfrac1x$ 在区间 $(0,1)$ 上连续。

**思路**：要证

$$
\left|\frac1x-\frac1{x_0}\right|=\frac{|x-x_0|}{|xx_0|}<\varepsilon,
$$

分子已经有 $|x-x_0|$，问题在于分母 $|xx_0|$ 可能很小。只要限制 $x$ 不离开 $x_0$ 太远，把 $|xx_0|$ 用一个只与 $x_0$ 有关的正数从下方顶住即可。

**证明**：设 $x_0$ 是 $(0,1)$ 中任意一点，则 $x_0>0$。对任意 $\varepsilon>0$，先加条件

$$
|x-x_0|<\frac{x_0}{2}.
$$

于是 $x>\dfrac{x_0}{2}$，从而

$$
xx_0>\frac{x_0^2}{2}.
$$

取

$$
\delta=\min\left\{\frac{x_0}{2},\ \frac{x_0^2}{2}\varepsilon\right\}.
$$

当 $|x-x_0|<\delta$ 时，

$$
\left|\frac1x-\frac1{x_0}\right|
=\frac{|x-x_0|}{|xx_0|}
<\frac{|x-x_0|}{x_0^2/2}
=\frac{2|x-x_0|}{x_0^2}<\varepsilon.
$$

所以 $f(x)=\dfrac1x$ 在 $(0,1)$ 上连续。

证明中的 $\delta$ 依赖于 $x_0$：当 $x_0$ 靠近 $0$ 时，同样的 $\varepsilon$ 需要更小的 $\delta$。这正是“逐点连续”的含义。

为了讨论闭区间上的连续性，还需要单侧连续。

### 定义 3（单侧连续）

> 若
>
> $$
> \lim_{x\to x_0^-}f(x)=f(x_0),
> $$
>
> 则称 $f(x)$ 在 $x_0$ **左连续**，即
>
> $$
> \forall \varepsilon>0,\ \exists \delta>0,\ \forall x\ (-\delta<x-x_0\le 0):\ |f(x)-f(x_0)|<\varepsilon.
> $$
>
> 若
>
> $$
> \lim_{x\to x_0^+}f(x)=f(x_0),
> $$
>
> 则称 $f(x)$ 在 $x_0$ **右连续**，即
>
> $$
> \forall \varepsilon>0,\ \exists \delta>0,\ \forall x\ (0\le x-x_0<\delta):\ |f(x)-f(x_0)|<\varepsilon.
> $$

### 定义 4（闭区间上连续）

> 若 $f(x)$ 在 $(a,b)$ 连续，且在左端点 $a$ 右连续，在右端点 $b$ 左连续，则称函数 $f(x)$ 在闭区间 $[a,b]$ 上连续，或称 $f(x)$ 是闭区间 $[a,b]$ 上的连续函数。

开区间、闭区间、半开半闭区间可以统一写成：设 $f$ 定义在区间 $X$ 上，如果

$$
\forall x_0\in X,\ \forall \varepsilon>0,\ \exists \delta>0,\ \forall x\in X\ (|x-x_0|<\delta):\ |f(x)-f(x_0)|<\varepsilon,
$$

则称 $f$ 在区间 $X$ 上连续。端点处只考虑区间内的一侧，所以这个统一定义自动把单侧连续包含了进去。

### 例 2

证明 $f(x)=\sqrt{x(1-x)}$ 在闭区间 $[0,1]$ 上连续。

**证明**：先看内点。设 $x_0\in(0,1)$，令

$$
\eta=\min\{x_0,1-x_0\}>0.
$$

当 $|x-x_0|<\eta$ 时，$x\in(0,1)$，从而根号内的量都为正。于是

$$
\begin{aligned}
\left|\sqrt{x(1-x)}-\sqrt{x_0(1-x_0)}\right|
&=\frac{|x(1-x)-x_0(1-x_0)|}{\sqrt{x(1-x)}+\sqrt{x_0(1-x_0)}}\\
&=\frac{|x-x_0|\,|1-x-x_0|}{\sqrt{x(1-x)}+\sqrt{x_0(1-x_0)}}\\
&<\frac{1}{\sqrt{x_0(1-x_0)}}|x-x_0|.
\end{aligned}
$$

这里用了 $x,x_0\in(0,1)$，所以 $|1-x-x_0|<1$；分母中第一项非负，故分母不小于 $\sqrt{x_0(1-x_0)}$。

对任意 $\varepsilon>0$，取

$$
\delta=\min\left\{\eta,\ \sqrt{x_0(1-x_0)}\,\varepsilon\right\}.
$$

当 $|x-x_0|<\delta$ 时，

$$
\left|\sqrt{x(1-x)}-\sqrt{x_0(1-x_0)}\right|
<\frac{1}{\sqrt{x_0(1-x_0)}}|x-x_0|<\varepsilon.
$$

所以 $f$ 在 $(0,1)$ 上连续。

再考虑端点。注意 $f(0)=f(1)=0$。对任意 $\varepsilon>0$，取 $\delta=\varepsilon^2$。当 $0\le x<\delta$ 时，

$$
|f(x)-f(0)|\le \sqrt{x}<\varepsilon,
$$

这说明 $f$ 在 $x=0$ 右连续。当 $-\delta<x-1\le 0$ 时，同理

$$
|f(x)-f(1)|\le \sqrt{1-x}<\varepsilon,
$$

这说明 $f$ 在 $x=1$ 左连续。结合内点的连续性，$f(x)=\sqrt{x(1-x)}$ 在 $[0,1]$ 上连续。

### 例 3

证明 $f(x)=\sin x$ 在 $(-\infty,+\infty)$ 上连续。

**证明**：设 $x_0\in(-\infty,+\infty)$ 是任意一点。利用和差化积，

$$
|\sin x-\sin x_0|
=\left|2\cos\frac{x+x_0}{2}\sin\frac{x-x_0}{2}\right|
\le 2\left|\sin\frac{x-x_0}{2}\right|
\le |x-x_0|.
$$

最后一步用了 $|\sin t|\le |t|$。于是对任意 $\varepsilon>0$，取 $\delta=\varepsilon$，当 $|x-x_0|<\delta$ 时，

$$
|\sin x-\sin x_0|\le |x-x_0|<\varepsilon.
$$

所以 $\sin x$ 在 $(-\infty,+\infty)$ 上连续。类似可证 $\cos x$ 在 $(-\infty,+\infty)$ 上连续。

### 例 4

证明指数函数 $f(x)=a^x$（$a>0$，$a\ne1$）在 $(-\infty,+\infty)$ 上连续。

**证明**：对任意一点 $x_0\in(-\infty,+\infty)$，有

$$
a^x-a^{x_0}=a^{x_0}\left(a^{x-x_0}-1\right).
$$

因此，证明 $\lim_{x\to x_0}a^x=a^{x_0}$ 就归结为证明

$$
\lim_{t\to0}a^t=1.
$$

利用如下事实：当 $|t|<\dfrac1n$ 时，

$$
a^{-\frac1n}<a^t<a^{\frac1n}\quad(a>1),
$$

而当 $0<a<1$ 时不等号反向：

$$
a^{\frac1n}<a^t<a^{-\frac1n}.
$$

若 $t\to0$，则可取 $n\to\infty$。因为

$$
\lim_{n\to\infty}a^{\frac1n}=\lim_{n\to\infty}a^{-\frac1n}=1,
$$

由极限的夹逼性得到

$$
\lim_{t\to0}a^t=1.
$$

从而

$$
\lim_{x\to x_0}a^x=a^{x_0},
$$

即 $a^x$ 在点 $x_0$ 处连续。由于 $x_0$ 是任取的，$f(x)=a^x$ 在 $(-\infty,+\infty)$ 上连续。

这里的关键是把 $a^{x_0}$ 这个与增量无关的因子提出来，把一般的点 $x_0$ 转化为 $t=x-x_0\to0$ 的情形。后面对数函数、幂函数的连续性都建立在指数函数上。

---

## 2. 连续函数的四则运算

由函数极限的四则运算法则，立刻得到连续函数的四则运算法则。

> 设 $\lim\limits_{x\to x_0}f(x)=f(x_0)$，$\lim\limits_{x\to x_0}g(x)=g(x_0)$，则
>
> (1) $\lim\limits_{x\to x_0}\bigl(\alpha f(x)+\beta g(x)\bigr)=\alpha f(x_0)+\beta g(x_0)$（$\alpha,\beta$ 是常数）；
>
> (2) $\lim\limits_{x\to x_0}\bigl(f(x)g(x)\bigr)=f(x_0)g(x_0)$；
>
> (3) $\lim\limits_{x\to x_0}\dfrac{f(x)}{g(x)}=\dfrac{f(x_0)}{g(x_0)}$（$g(x_0)\ne0$）。

由此，有限个在某区间连续的函数，经过有限次加、减、乘、除，所得函数在该区间除去使分母为零的点后仍连续。

### 例 5

常数函数 $f(x)=c$ 与恒等函数 $g(x)=x$ 显然连续。利用四则运算规则可得：

1. 任意多项式
   $$
   p_n(x)=a_nx^n+a_{n-1}x^{n-1}+\cdots+a_1x+a_0
   $$
   在 $(-\infty,+\infty)$ 上连续；
2. 任意有理函数
   $$
   Q(x)=\frac{a_nx^n+a_{n-1}x^{n-1}+\cdots+a_1x+a_0}{b_mx^m+b_{m-1}x^{m-1}+\cdots+b_1x+b_0}
   $$
   在其定义域上连续。也就是说，$Q(x)$ 在 $(-\infty,+\infty)$ 去掉分母
   $$
   b_mx^m+b_{m-1}x^{m-1}+\cdots+b_1x+b_0
   $$
   的零点（至多 $m$ 个）后的范围连续。

“至多 $m$ 个”来自代数基本定理：$m$ 次多项式在复数范围内有 $m$ 个根，实根自然不超过 $m$ 个。

### 例 6

前面已证 $\sin x$ 与 $\cos x$ 连续，由四则运算规则可得：

- 正切函数 $\tan x=\dfrac{\sin x}{\cos x}$、正割函数 $\sec x=\dfrac1{\cos x}$ 在其定义域
  $$
  \left\{x\mid x\in\mathbb R,\ x\ne k\pi+\frac{\pi}{2},\ k\in\mathbb Z\right\}
  $$
  上连续；
- 余切函数 $\cot x=\dfrac{\cos x}{\sin x}$、余割函数 $\csc x=\dfrac1{\sin x}$ 在其定义域
  $$
  \left\{x\mid x\in\mathbb R,\ x\ne k\pi,\ k\in\mathbb Z\right\}
  $$
  上连续。

注意：$\tan x$ 在 $\dfrac{\pi}{2}+k\pi$ 处没有定义，所以那里不是“不连续点”，而是定义域的边界；在每一个连续的区间内部，它是连续的。

---

## 3. 函数的间断点

按照连续性的定义，$f$ 在 $x_0$ 连续必须满足

$$
f(x_0-)=f(x_0)=f(x_0+).
$$

三者中只要有一个不成立，$x_0$ 就是间断点。

### 定义（间断点）

> 如果函数 $f(x)$ 在点 $x_0$ 不连续，则称点 $x_0$ 是函数 $f(x)$ 的**间断点**，也称**不连续点**。

通常按左右极限的情况把间断点分成两类：

- **第一类间断点**：左、右极限都存在（且有限），又分为可去间断点和跳跃间断点；
- **第二类间断点**：左、右极限中至少有一个不存在（在严格意义下，即不是有限极限）。

### 3.1 可去间断点

> 函数 $f(x)$ 在点 $x_0$ 的左、右极限都存在而且相等，但不等于 $f(x_0)$，或者 $f(x)$ 在点 $x_0$ 没有定义。

例如

$$
f(x)=x\sin\frac1x
$$

在 $x=0$ 没有定义。但当 $x\to0$ 时，

$$
\left|x\sin\frac1x\right|\le |x|\to0,
$$

所以左、右极限都等于 $0$。因此 $x=0$ 是它的可去间断点。补充定义

$$
f(x)=
\begin{cases}
x\sin\dfrac1x, & x\ne0,\\[4pt]
0, & x=0,
\end{cases}
$$

则 $f(x)$ 就是 $(-\infty,+\infty)$ 上的连续函数。

“可去”的意思就是：间断只是这一个点的取值没有接上，补上或重新定义这一点的函数值，就能把曲线接成连续曲线。

### 3.2 跳跃间断点

> 函数 $f(x)$ 在点 $x_0$ 的左、右极限都存在（且有限）但不相等，即
>
> $$
> f(x_0+)\ne f(x_0-).
> $$

例如符号函数 $f(x)=\operatorname{sgn}x$，$x=0$ 是它的跳跃间断点：

$$
f(0-)=\lim_{x\to0^-}\operatorname{sgn}x=-1,\qquad
f(0+)=\lim_{x\to0^+}\operatorname{sgn}x=1.
$$

函数图像在跳跃间断点处会出现一个跳跃。右极限与左极限之差

$$
f(x_0+)-f(x_0-)
$$

称为函数 $f(x)$ 在点 $x_0$ 的**跃度**。符号函数在 $x=0$ 的跃度为 $2$。

![符号函数在 x=0 处跳跃，左右极限分别为 -1 和 1](/images/campus-mathematical-analysis/lecture07-p15-sgn.png)

*图 1：符号函数的跳跃间断点，跃度为 $1-(-1)=2$。*

### 3.3 第二类间断点

> 函数 $f(x)$ 在点 $x_0$ 的左、右极限中至少有一个不存在（严格极限意义下）。

例如

$$
f(x)=e^{\frac1x},\qquad x=0
$$

是它的第二类间断点。因为

$$
f(0-)=\lim_{x\to0^-}e^{\frac1x}=0,\qquad
f(0+)=\lim_{x\to0^+}e^{\frac1x}=+\infty.
$$

右极限是无穷大，按“极限存在”的严格定义，它不算存在，所以属于第二类。

又如

$$
f(x)=\sin\frac1x,\qquad x=0
$$

也是第二类间断点。因为 $\sin\dfrac1x$ 在 $x=0$ 的左、右极限都不存在：当 $x\to0$ 时，$\dfrac1x$ 在正负无穷之间来回振荡，函数值在 $-1$ 与 $1$ 之间无限次摆动，不趋于任何确定的数。

![e^{1/x} 与 sin(1/x) 在 x=0 附近的图像](/images/campus-mathematical-analysis/lecture07-p16-second-kind.png)

*图 2：上图为 $y=e^{1/x}$，左极限为 $0$、右极限为 $+\infty$；下图为 $y=\sin(1/x)$，在 $0$ 附近无限振荡，左右极限都不存在。*

> **易错点**：判断间断点类型时，只看左右极限，不看 $f(x_0)$ 本身。$f(x_0)$ 是否定义、取值多少，只影响“可去”这一种情形；跳跃与第二类完全由左右极限决定。

### 例 8

区间 $(a,b)$ 上的单调函数，其不连续点必为跳跃间断点。

**证明思路**：不妨设 $f(x)$ 在 $(a,b)$ 上单调增加。设 $x_0\in(a,b)$。

先看左极限。集合

$$
\{f(x)\mid a<x<x_0\}
$$

有上界 $f(x_0)$，由确界原理，存在上确界

$$
\alpha=\sup\{f(x)\mid a<x<x_0\}.
$$

对任意 $\varepsilon>0$，$\alpha-\varepsilon$ 不是上界，所以存在 $x_1<x_0$，使 $f(x_1)>\alpha-\varepsilon$。当 $x_1<x<x_0$ 时，由单调性

$$
\alpha-\varepsilon<f(x_1)\le f(x)\le\alpha,
$$

故 $|f(x)-\alpha|<\varepsilon$。这说明

$$
f(x_0-)=\alpha.
$$

同理，集合 $\{f(x)\mid x_0<x<b\}$ 有下界 $f(x_0)$，其下确界记为 $\beta$，则

$$
f(x_0+)=\beta.
$$

现在若 $f$ 在 $x_0$ 不连续，会怎样？如果 $\alpha=\beta$，则由单调性，

- 当 $x<x_0$ 时，$f(x)\le f(x_0)$，所以 $\alpha\le f(x_0)$；
- 当 $x>x_0$ 时，$f(x_0)\le f(x)$，所以 $f(x_0)\le\beta$。

于是

$$
\alpha\le f(x_0)\le\beta.
$$

当 $\alpha=\beta$ 时，必有 $f(x_0)=\alpha=\beta$，从而

$$
f(x_0-)=f(x_0)=f(x_0+),
$$

$f$ 在 $x_0$ 连续，矛盾。因此，若单调函数在某点不连续，只能是该点处左、右极限不相等，即该点必为跳跃间断点。

这个结论的直观含义是：单调函数的图像只能“向上跨一步”或“向下跨一步”，不能像 $\sin\dfrac1x$ 那样来回振荡，也不能出现左右极限相等但函数值单独跳开的可去间断。

---

## 4. 反函数的连续性

回顾：当 $f:X\to Y$ 是双射时，存在逆映射

$$
f^{-1}:Y\to X,\qquad y\mapsto x\quad(f(x)=y).
$$

对函数而言，结合单调性，有：

### 定理 1（反函数存在性定理）

> 若函数 $y=f(x)$，$x\in D_f$ 是严格单调增加（减少）的，则存在它的反函数
>
> $$
> x=f^{-1}(y),\qquad y\in R_f,
> $$
>
> 并且 $f^{-1}(y)$ 也是严格单调增加（减少）的。

严格单调保证“不同的 $x$ 对应不同的 $y$”，因此映射是一一对应的；把值域作为新的定义域，反函数就存在。

### 定理 2（反函数连续性定理）

> 设函数 $y=f(x)$ 在闭区间 $[a,b]$ 上连续且严格单调增加，$f(a)=\alpha$，$f(b)=\beta$，则
>
> 1. 函数 $y=f(x)$ 的值域 $R_f=[\alpha,\beta]$；
> 2. 它的反函数 $x=f^{-1}(y)$ 在 $[\alpha,\beta]$ 上连续且严格单调增加。

**证明要点**：先证内点。设 $y_0\in(\alpha,\beta)$，$x_0=f^{-1}(y_0)$。对任意 $\varepsilon>0$，取 $x_1,x_2\in[a,b]$，使
$$
x_0-\varepsilon<x_1<x_0<x_2<x_0+\varepsilon,
$$
并令
$$
\delta=\min\{f(x_0)-f(x_1),\ f(x_2)-f(x_0)\}.
$$
当 $|y-y_0|<\delta$ 时，由严格单调性，$f(x_1)<y<f(x_2)$，于是
$$
x_1<f^{-1}(y)<x_2,
$$
从而 $|f^{-1}(y)-x_0|<\varepsilon$。端点处只需取单侧邻域，论证相同。因此反函数连续。

从图像上理解：连续严格单调函数的图像与任意水平线 $y=c$（$\alpha\le c\le\beta$）恰好交于一点；把图像关于直线 $y=x$ 翻折，得到的反函数图像同样没有空隙，端点也对得上。

### 例 9

由前面的结论与定理 2，可知下列反三角函数在它们的定义域上连续：

$$
\begin{aligned}
y&=\arcsin x, && x\in[-1,1], && y\in\left[-\frac{\pi}{2},\frac{\pi}{2}\right];\\
y&=\arccos x, && x\in[-1,1], && y\in[0,\pi];\\
y&=\arctan x, && x\in(-\infty,+\infty), && y\in\left(-\frac{\pi}{2},\frac{\pi}{2}\right);\\
y&=\operatorname{arccot} x, && x\in(-\infty,+\infty), && y\in(0,\pi).
\end{aligned}
$$

例如 $\arcsin x$ 是 $\sin x$ 在 $\left[-\dfrac{\pi}{2},\dfrac{\pi}{2}\right]$ 上的反函数。在那里 $\sin x$ 连续且严格单调增加，值域为 $[-1,1]$，所以反函数在 $[-1,1]$ 上连续且严格单调增加。

### 指数函数与对数函数

指数函数

$$
f(x)=e^x,\qquad x\in\mathbb R
$$

具有性质：

1. $e^{x+y}=e^x\cdot e^y$，$\forall x,y\in\mathbb R$；
2. $e^x$ 在 $\mathbb R$ 上严格单调增加；
3. $e^x$ 在 $\mathbb R$ 上连续。

由反函数连续性定理，$f(x)=e^x$ 的值域为 $(0,+\infty)$，并得到反函数

$$
f^{-1}(y)=x=\ln y,\qquad y\in(0,+\infty).
$$

### 定义（对数函数）

> 称函数 $g(x)=\ln x$，$x\in(0,+\infty)$ 为**对数函数**。它在定义域上严格单调增加、连续，其值域为 $(-\infty,+\infty)$，并且
>
> $$
> \ln x+\ln y=\ln(xy).
> $$

对数的加法性质来自指数的乘法性质：设 $x=e^u$，$y=e^v$，则 $xy=e^{u+v}$，取对数得 $\ln(xy)=u+v=\ln x+\ln y$。

---

## 5. 复合函数的连续性

### 定理 3

> 若 $u=g(x)$ 在点 $x_0$ 连续，$g(x_0)=u_0$，又 $y=f(u)$ 在点 $u_0$ 连续，则复合函数
>
> $$
> y=f\circ g(x)
> $$
>
> 在点 $x_0$ 连续。

**证明**：对任意 $\varepsilon>0$。由于 $\lim\limits_{u\to u_0}f(u)=f(u_0)$，存在 $\eta>0$，当 $|u-u_0|<\eta$ 时，

$$
|f(u)-f(u_0)|<\varepsilon.
$$

对这个 $\eta>0$，由于 $\lim\limits_{x\to x_0}g(x)=g(x_0)=u_0$，存在 $\delta>0$，当 $|x-x_0|<\delta$ 时，

$$
|g(x)-u_0|<\eta.
$$

于是，当 $|x-x_0|<\delta$ 时，

$$
|f\circ g(x)-f\circ g(x_0)|
=|f(g(x))-f(u_0)|<\varepsilon,
$$

即

$$
\lim_{x\to x_0}f\circ g(x)=f\circ g(x_0).
$$

> **理解关键**：证明的顺序很重要：先由外层的 $f$ 在 $u_0$ 连续，对给定的 $\varepsilon$ 找到 $\eta$；再由内层的 $g$ 在 $x_0$ 连续，对这个 $\eta$ 找到 $\delta$。这样，$g(x)$ 落进 $u_0$ 的 $\eta$ 邻域，外层的连续性才能接管。

---

## 6. 初等函数的连续性

下面六类函数称为**基本初等函数**：

1. 常数函数：$y=c$；
2. 幂函数：$y=x^\alpha$（$\alpha\in\mathbb R$，$\alpha\ne0$）；
3. 指数函数：$y=a^x$（$a>0$ 且 $a\ne1$）；
4. 对数函数：$y=\log_a x$（$a>0$ 且 $a\ne1$）；
5. 三角函数：如 $y=\sin x$，$y=\cos x$，$y=\tan x$，$y=\cot x$ 等；
6. 反三角函数：如 $y=\arcsin x$，$y=\arccos x$，$y=\arctan x$ 等。

其中几类可以互相转化：

$$
y=x^\alpha=e^{\alpha\ln x}\ (x>0),\qquad
y=a^x=e^{x\ln a}\ (x\in\mathbb R),\qquad
y=\log_a x=\frac{\ln x}{\ln a}\ (x>0).
$$

因此，幂函数、一般指数函数、一般对数函数的连续性都可以由 $e^x$、$\ln x$ 及复合函数的连续性得到。

由基本初等函数经过有限次四则运算与复合运算所产生的函数，称为**初等函数**。例如双曲正弦、余弦函数

$$
\operatorname{sh}x=\frac{e^x-e^{-x}}2,\qquad
\operatorname{ch}x=\frac{e^x+e^{-x}}2,
$$

以及

$$
y=ax^2+bx+c,\qquad
y=\frac{\log_a(1+x)}{\sqrt{x^2+1}},\qquad
y=\sin\frac1x+\cos^2x,\qquad
y=e^{-x^2}+\arctan\frac1x
$$

都是初等函数。

### 定理

> 初等函数在其定义域内都是连续的。

利用连续函数的四则运算法则及复合函数的连续性，就能从基本初等函数的连续性推出这个结论。

> **易错点**：“在其定义域内连续”要按定义域的实际形状理解。例如 $\tan x$ 的定义域是去掉 $\dfrac{\pi}{2}+k\pi$ 的一列区间，它在每个区间内部连续；但不能说它在整个 $\mathbb R$ 上连续，因为那些点根本没有定义。

---

## 7. 利用函数连续性求极限

连续函数的一个直接用处是：如果 $x_0$ 在定义域内，那么

$$
\lim_{x\to x_0}f(x)=f(x_0),
$$

求极限可以直接代入。对于幂指函数，则常先取对数，把 $1^\infty$ 型化成 $0\cdot\infty$ 型，再用等价量或连续函数的性质。

### 例 10

计算

$$
\lim_{x\to0}(\cos x)^{x^{-2}}.
$$

这是 $1^\infty$ 型待定式。

**解**：这类幂指函数通常先取对数，再利用函数连续性求极限。令

$$
u=g(x)=\frac{\ln(\cos x)}{x^2}.
$$

利用 $1-\cos x=2\sin^2\dfrac x2$，有

$$
\cos x=1-2\sin^2\frac x2.
$$

于是

$$
\begin{aligned}
u&=\frac1{x^2}\ln\left(1-2\sin^2\frac x2\right)\\
&=\frac{2\sin^2\frac x2}{x^2}\cdot
\ln\left(1-2\sin^2\frac x2\right)^{\frac1{2\sin^2\frac x2}}.
\end{aligned}
$$

由

$$
\lim_{t\to\infty}\left(1-\frac1t\right)^t=\frac1e
$$

和对数函数的连续性，得到

$$
\lim_{x\to0}u
=\frac12\ln\frac1e
=-\frac12.
$$

其中用了

$$
\lim_{x\to0}\frac{2\sin^2\frac x2}{x^2}=\frac12.
$$

再由指数函数 $e^u$ 的连续性，

$$
\lim_{x\to0}(\cos x)^{x^{-2}}
=\lim_{u\to-\frac12}e^u
=e^{-\frac12}
=\frac1{\sqrt e}.
$$

这里做了两次“凑形”：先把 $\ln(\cos x)$ 写成 $\ln\left(1-2\sin^2\dfrac x2\right)$，暴露出“$1$ 加一个无穷小”的结构；再把指数上的 $\dfrac1{2\sin^2(x/2)}$ 乘进去，凑成 $\left(1-\dfrac1t\right)^t$ 的标准形式。最后利用 $e^u$ 的连续性把极限移到指数上。

---

## 课堂小结

- 连续的定义是 $\lim\limits_{x\to x_0}f(x)=f(x_0)$。它比极限定义多了“极限值等于函数值”，少了“去心”的限制。
- $\varepsilon-\delta$ 定义中，$\delta$ 一般既依赖 $\varepsilon$，也依赖点 $x_0$；这是后面一致连续的出发点。
- 闭区间上的连续要管端点：左端点右连续，右端点左连续。
- 连续函数的四则运算、反函数、复合函数都保持连续性；基本初等函数在其定义域内连续，因此初等函数在其定义域内连续。
- 间断点分类只看左右极限：左右极限都存在且相等但函数值不接上，是可去；都存在但不等，是跳跃；至少一个不存在，是第二类。无穷极限属于“不存在”。
- 单调函数的不连续点只能是跳跃间断点。
- 幂指函数的 $1^\infty$ 型极限，先取对数，再利用 $\left(1-\dfrac1t\right)^t\to\dfrac1e$ 与连续性。

## 相关资料

- [7连续与间断.pdf](https://drive.google.com/file/d/1ubT0Yuxkz2RePTbDVZCOQ7peoOtNO99T/view?usp=drivesdk)
