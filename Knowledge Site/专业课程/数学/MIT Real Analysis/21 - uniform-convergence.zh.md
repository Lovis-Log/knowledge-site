---
slug: 21-uniform-convergence
title: "弧长、逐点收敛与一致收敛"
summary: "先用分割与中值定理说明弧长公式的来源，并从单位圆推出 arccos 的积分表示；再区分函数列的逐点收敛与一致收敛，用 x^n 说明两者不同，最后给出 Weierstrass M 判别法及幂级数在内闭区间上的一致收敛。"
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [real-analysis, uniform-convergence, arc-length, power-series]
sources:
  - kind: video
    title: "Lecture 20: Pointwise Convergence; Uniform Convergence"
    url: https://www.youtube.com/watch?v=ISVOH18BIHM
    author: Tobias Holck Colding, MIT OpenCourseWare
    publishedAt: 2025-09-02
---

## 这一讲的两条线

上一讲末尾给了弧长公式，但只是一个定义。这一讲先把它讲清楚：为什么弧长等于 $\int\sqrt{f'^2+g'^2}\,ds$，并用单位圆算出一个经典结论——$\arccos$ 的积分表示。

随后换到另一个话题：**函数列的收敛**。数列收敛只有一个概念，函数列却有两个：

- **逐点收敛**：每个固定的 $x$，数列 $f_n(x)$ 收敛。
- **一致收敛**：同一个 $N$ 对所有 $x$ 都管用。

两者差别看似技术性，实则决定了能否交换极限与积分、求导。这一讲给出判别一致收敛的主要工具：Weierstrass M 判别法。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 0:00 | 弧长的定义与理由（分割、中值定理、Riemann 和） |
| 10:29 | 例：$\gamma(s)=(s,s^2)$ 在 $[0,1]$ 上的弧长 |
| 11:44 | 例：单位圆，导出 $\arccos x=\int_x^1\frac{ds}{\sqrt{1-s^2}}$ |
| 21:09 | 用基本定理对变下限积分求导，得到 $\arccos'(x)$ |
| 27:26 | 逐点收敛的定义与例子 |
| 37:21 | 一致收敛的定义；一致 $\Rightarrow$ 逐点 |
| 41:22 | 反例：$x^n$ 在 $[0,1]$ 上不一致收敛 |
| 49:48 | Weierstrass M 判别法及证明 |
| 1:05:44 | 应用：$\sum x^n/n!$ 在 $[-L,L]$ 上一致收敛 |
| 1:11:17 | 幂级数、收敛半径与内闭一致收敛 |

## 弧长：定义与理由

设平面曲线

$$
\gamma(s)=\big(f(s),g(s)\big),
\qquad s\in[a,b],
$$

其中 $f,g$ 可导且导数连续。弧长定义为

$$
L=\int_a^b\sqrt{f'(s)^2+g'(s)^2}\;ds .
$$

**为什么合理。** 取 $[a,b]$ 的分割 $a=s_0<s_1<\cdots<s_n=b$。曲线被分成若干小段，第 $i$ 段从 $\gamma(s_{i-1})$ 到 $\gamma(s_i)$。用弦长近似这段弧长：

$$
\big|\gamma(s_i)-\gamma(s_{i-1})\big|
=\sqrt{\big(f(s_i)-f(s_{i-1})\big)^2+\big(g(s_i)-g(s_{i-1})\big)^2}.
$$

对 $f$ 与 $g$ 分别用中值定理：存在 $\xi_i,\eta_i\in(s_{i-1},s_i)$，使

$$
f(s_i)-f(s_{i-1})=f'(\xi_i)\Delta s_i,
\qquad
g(s_i)-g(s_{i-1})=g'(\eta_i)\Delta s_i,
$$

其中 $\Delta s_i=s_i-s_{i-1}$。代入：

$$
\big|\gamma(s_i)-\gamma(s_{i-1})\big|
=\sqrt{f'(\xi_i)^2+g'(\eta_i)^2}\;\Delta s_i .
$$

把各段相加，得到一个 Riemann 和。由于 $f',g'$ 在紧区间上连续，因而一致连续，当分割足够细时，$\xi_i,\eta_i$ 都落在同一小段内，$\sqrt{f'(\xi_i)^2+g'(\eta_i)^2}$ 与 $\sqrt{f'(s)^2+g'(s)^2}$ 在小段上的差别可以一致地压小。于是 Riemann 和收敛到积分

$$
\int_a^b\sqrt{f'(s)^2+g'(s)^2}\;ds .
$$

这就是弧长公式的来源：**把曲线切成小段，用弦代替弧，再取极限**。严格论证要用的正是一致连续性——这与上一讲证明连续函数可积是同一套思路。

## 例子一：抛物线弧

取

$$
\gamma(s)=(s,s^2),
\qquad s\in[0,1].
$$

则 $f'=1$、$g'=2s$，所以

$$
L=\int_0^1\sqrt{1+4s^2}\;ds .
$$

这个积分可以用换元 $2s=\sinh t$ 或 $2s=\tan\theta$ 算出，课程只要求写出积分式。要点是：**弧长公式把几何问题变成了一个确定的定积分**。

## 例子二：单位圆与 arccos

单位圆 $x^2+y^2=1$ 的上半部分可以参数化为

$$
\gamma(s)=\big(s,\sqrt{1-s^2}\big),
\qquad s\in[-1,1].
$$

这里 $f(s)=s$，$g(s)=\sqrt{1-s^2}$。求导：

$$
f'(s)=1,
\qquad
g'(s)=\frac{1}{2\sqrt{1-s^2}}\cdot(-2s)=-\frac{s}{\sqrt{1-s^2}} .
$$

于是

$$
f'(s)^2+g'(s)^2
=1+\frac{s^2}{1-s^2}
=\frac{1-s^2+s^2}{1-s^2}
=\frac{1}{1-s^2} .
$$

因此这段圆的弧长微元是 $\dfrac{ds}{\sqrt{1-s^2}}$。

现在取圆上横坐标为 $x$ 的点，沿圆走到 $(1,0)$，这段弧长记为 $\theta$。因为 $s$ 是横坐标，从 $s=x$ 到 $s=1$：

$$
\theta=\int_x^1\frac{ds}{\sqrt{1-s^2}} .
$$

几何上，$\theta$ 正是这段弧对应的圆心角，而横坐标 $x=\cos\theta$。所以 $\theta=\arccos x$，得到

$$
\boxed{\ \arccos x=\int_x^1\frac{ds}{\sqrt{1-s^2}}\ }
$$

这个公式不是背出来的，而是「角度 = 弧长」这一定义加上弧长公式的结果。

### 顺带求出 arccos 的导数

上式右边的积分下限是 $x$，不是上限。用区间可加改写：

$$
\int_x^1\frac{ds}{\sqrt{1-s^2}}
=
\int_0^1\frac{ds}{\sqrt{1-s^2}}
-
\int_0^x\frac{ds}{\sqrt{1-s^2}} .
$$

第一项是常数，求导为零；第二项由基本定理（第一版）求导得被积函数在 $x$ 处的值。所以

$$
\frac{d}{dx}\arccos x
=0-\frac{1}{\sqrt{1-x^2}}
=-\frac{1}{\sqrt{1-x^2}} .
$$

课程特意强调符号：**变量在下限时要多一个负号**。这来自 $\int_x^1=-\int_1^x$。

## 逐点收敛

设 $I$ 是一个区间，$(f_n)$ 是 $I$ 上的函数列，$f$ 也是 $I$ 上的函数。称 $f_n\to f$ **逐点收敛**，若对每个固定的 $x\in I$，

$$
\lim_{n\to\infty}f_n(x)=f(x).
$$

展开成 $\varepsilon$ 语言：对每个 $x\in I$ 和每个 $\varepsilon>0$，存在 $N$，使得 $n>N$ 时 $|f_n(x)-f(x)|<\varepsilon$。注意 $N$ 可以依赖 $x$。

**例子一。** 在 $[0,1]$ 上取 $f_n(x)=x^n$，并令

$$
f(x)=
\begin{cases}
0, & 0\le x<1,\\
1, & x=1 .
\end{cases}
$$

固定 $x<1$，则 $x^n\to0$；固定 $x=1$，则 $1^n=1$。所以 $f_n\to f$ 逐点收敛。每个 $f_n$ 都连续，极限 $f$ 却不连续——**逐点收敛不保持连续性**。

**例子二。** 在 $\mathbb R$ 上取

$$
f_n(x)=\sum_{k=0}^{n}\frac{x^k}{k!} .
$$

对每个固定的 $x$，这是指数级数的部分和，收敛到 $e^x$。所以 $f_n\to e^x$ 逐点收敛。

## 一致收敛

称 $f_n\to f$ **一致收敛**，若对每个 $\varepsilon>0$，存在 $N$，使得

$$
n>N
\implies
|f_n(x)-f(x)|<\varepsilon
\quad\text{对一切 }x\in I .
$$

区别只有一个：**同一个 $N$ 必须对所有 $x$ 有效**。

**引理。** 一致收敛蕴含逐点收敛。

**证明。** 若一致收敛，给定 $x$ 与 $\varepsilon$，取一致收敛定义中的 $N$；它对所有 $x$ 都有效，当然对这个 $x$ 有效，于是 $n>N$ 时 $|f_n(x)-f(x)|<\varepsilon$。这正是逐点收敛的定义（只是这里的 $N$ 恰好不依赖 $x$）。$\square$

反过来不成立，下面的反例就是证据。

## 反例：$x^n$ 在 $[0,1]$ 上不一致收敛

![图示](/images/uniform-convergence-rich-zh.svg)

*图：逐点与一致的量词差异，以及 xⁿ 为什么进不了 ε 带。*

已经知道 $f_n(x)=x^n$ 逐点收敛到上面的 $f$（在 $x=1$ 处为 $1$，其余为 $0$）。但**不一致收敛**。

**证明。** 每个 $f_n$ 连续，且 $f_n(0)=0$、$f_n(1)=1$。由介值定理，存在 $x_n\in(0,1)$，使

$$
f_n(x_n)=x_n^n=\frac12 .
$$

（具体地 $x_n=(1/2)^{1/n}$，当 $n\to\infty$ 时 $x_n\to1$。）

而 $f(x_n)=0$，因为 $x_n<1$。于是

$$
|f_n(x_n)-f(x_n)|=\frac12 .
$$

取 $\varepsilon=\frac14$。若一致收敛，则存在 $N$，使 $n>N$ 时对**所有** $x$ 都有 $|f_n(x)-f(x)|<\frac14$。但在 $x=x_n$ 处差值是 $\frac12>\frac14$，矛盾。所以不一致收敛。$\square$

几何上：每个 $f_n$ 都从 $0$ 爬到 $1$，中间必经过 $\frac12$；这个「半高点」随 $n$ 增大不断向右移动到 $1$。极限函数在这些点取 $0$，所以误差始终是 $\frac12$，无论 $n$ 多大。**逐点收敛只保证每个固定点的误差最终变小，不保证误差在整段区间上同时变小。**

这也解释了为什么 $x^n$ 的极限不连续：一致性正是连续性得以继承的条件。

## Weierstrass M 判别法

**定理。** 设 $(f_n)$ 是区间 $I$ 上的函数列，且存在非负实数 $M_n$，使

$$
|f_n(x)|\le M_n
\quad\text{对一切 }x\in I,
$$

并设级数 $\sum_{n=0}^\infty M_n$ 收敛。则函数项级数 $\sum_{n=0}^\infty f_n(x)$ 在 $I$ 上一致收敛。

**证明。** 记部分和

$$
S_n(x)=\sum_{k=0}^{n}f_k(x).
$$

对 $n>m$，

$$
S_n(x)-S_m(x)=\sum_{k=m+1}^{n}f_k(x),
$$

取绝对值并用三角不等式与假设：

$$
|S_n(x)-S_m(x)|
\le\sum_{k=m+1}^{n}|f_k(x)|
\le\sum_{k=m+1}^{n}M_k
\le\sum_{k=m+1}^{\infty}M_k .
$$

因为 $\sum M_k$ 收敛，给定 $\varepsilon>0$，存在 $N$，使 $m\ge N$ 时尾部

$$
\sum_{k=m+1}^{\infty}M_k<\varepsilon .
$$

**第一步：逐点收敛。** 对每个固定的 $x$，上式说明 $(S_n(x))$ 是 Cauchy 数列，因此收敛；把极限记为 $S(x)$，得到函数 $S$。

**第二步：升级为一致收敛。** 在不等式

$$
|S_n(x)-S_m(x)|\le\sum_{k=m+1}^{\infty}M_k
$$

中令 $n\to\infty$（左边趋于 $|S(x)-S_m(x)|$），得

$$
|S(x)-S_m(x)|\le\sum_{k=m+1}^{\infty}M_k<\varepsilon
\qquad(m\ge N).
$$

右边与 $x$ 无关，且对**所有** $x$ 成立。这正是 $S_m\to S$ 一致收敛。$\square$

关键是最后一步：**尾部的界不含 $x$**。这就是「M」的用途——用一列与 $x$ 无关的数的尾部，控制一整族函数的尾部。

### 应用：指数级数

在 $[-L,L]$ 上考察

$$
f_n(x)=\frac{x^n}{n!} .
$$

取

$$
M_n=\frac{L^n}{n!} .
$$

则对 $|x|\le L$，

$$
|f_n(x)|=\frac{|x|^n}{n!}\le\frac{L^n}{n!}=M_n .
$$

而 $\sum L^n/n!$ 收敛（比值判别法：相邻项之比为 $L/(n+1)\to0$）。由 M 判别法，

$$
\sum_{n=0}^{\infty}\frac{x^n}{n!}
$$

在 $[-L,L]$ 上一致收敛到 $e^x$。因为 $L$ 任意，它在**每个有界区间**上一致收敛——但不是在整个 $\mathbb R$ 上一致收敛，原因稍后说明。

## 幂级数与内闭一致收敛

设

$$
\sum_{n=0}^{\infty}a_nx^n
$$

是幂级数。定义

$$
M=\limsup_{n\to\infty}|a_n|^{1/n},
\qquad
R=\frac1M,
$$

并约定 $M=0$ 时 $R=\infty$、$M=\infty$ 时 $R=0$。$R$ 称为**收敛半径**。

已知的事实：

- $|x|<R$ 时级数绝对收敛；
- $|x|>R$ 时级数发散；
- $|x|=R$ 的边界点要单独判断，没有统一结论。

**定理。** 若 $0<L<R$，则 $\sum a_nx^n$ 在 $[-L,L]$ 上一致收敛。

**证明。** 对 $|x|\le L$，

$$
|a_nx^n|\le|a_n|L^n .
$$

需要说明 $\sum|a_n|L^n$ 收敛。由 $M=\limsup|a_n|^{1/n}=1/R$，

$$
\limsup_{n\to\infty}\big(|a_n|L^n\big)^{1/n}
=ML=\frac{L}{R}<1 .
$$

由根值判别法，$\sum|a_n|L^n$ 收敛。取 $M_n=|a_n|L^n$，M 判别法给出在 $[-L,L]$ 上一致收敛。$\square$

注意定理要求 $L$ **严格小于** $R$。在端点 $\pm R$ 处，收敛可能发生也可能不发生，一致性也会失效——例如 $\sum x^n$ 的收敛半径是 $1$，在 $[-L,L]$（$L<1$）上一致收敛，但在 $[0,1)$ 上不一致收敛（与 $x^n$ 的反例同源）。

课程提到，一致收敛之所以重要，是因为它允许**逐项积分与逐项求导**：若 $f_n\to f$ 一致收敛，则

$$
\lim_{n\to\infty}\int_a^b f_n=\int_a^b f,
$$

在适当条件下还有 $\lim f_n'=f'$。这是下一讲的主题。

## 本节结论

- 弧长 $=\int_a^b\sqrt{f'^2+g'^2}\,ds$，理由是把曲线切成小段、用弦代替弧、再取极限；严格化需要导数的一致连续性。
- 单位圆给出 $\arccos x=\int_x^1\frac{ds}{\sqrt{1-s^2}}$，并由基本定理得到 $\arccos'(x)=-\frac{1}{\sqrt{1-x^2}}$。
- 逐点收敛：每个固定的 $x$ 收敛，$N$ 可以依赖 $x$。
- 一致收敛：同一个 $N$ 对所有 $x$ 有效；一致收敛蕴含逐点收敛。
- $x^n$ 在 $[0,1]$ 上逐点收敛到不连续函数，但不一致收敛；半高点 $x_n=(1/2)^{1/n}$ 暴露了误差始终为 $1/2$。
- Weierstrass M 判别法：若 $|f_n|\le M_n$ 且 $\sum M_n<\infty$，则 $\sum f_n$ 一致收敛。
- $\sum x^n/n!$ 在每个 $[-L,L]$ 上一致收敛；幂级数在 $[-L,L]$（$L<R$）上一致收敛，端点需单独讨论。

## 理解检验

**1. 说明弧长公式为什么合理，并指出把「弦长之和」变成积分需要什么条件。**

参考答案：对分割 $a=s_0<\cdots<s_n=b$，第 $i$ 段用弦长近似：

$$
|\gamma(s_i)-\gamma(s_{i-1})|=\sqrt{f'(\xi_i)^2+g'(\eta_i)^2}\,\Delta s_i,
$$

其中 $\xi_i,\eta_i$ 由中值定理给出，落在同一小段内。求和得到 Riemann 和。要让它收敛到 $\int\sqrt{f'^2+g'^2}\,ds$，需要 $\xi_i,\eta_i$ 与段内任意点的函数值差可以一致地变小，即 $\sqrt{f'^2+g'^2}$ 在 $[a,b]$ 上一致连续；由于 $f',g'$ 在紧区间上连续，这一条成立。若只有逐点连续性而没有紧性，弦长和的收敛就没有保证。

**2. 计算单位圆上半部分 $\gamma(s)=(s,\sqrt{1-s^2})$ 的弧长微元，并推出 $\arccos$ 的积分表示与导数。**

参考答案：$f'=1$，$g'=-s/\sqrt{1-s^2}$，故

$$
f'^2+g'^2=1+\frac{s^2}{1-s^2}=\frac{1}{1-s^2},
$$

弧长微元为 $ds/\sqrt{1-s^2}$。从横坐标 $x$ 到 $1$ 的弧长是 $\theta=\int_x^1 ds/\sqrt{1-s^2}$；几何上 $x=\cos\theta$，所以 $\theta=\arccos x$。求导时把积分改写为 $\int_0^1-\int_0^x$：第一项为常数，第二项由基本定理求导得 $1/\sqrt{1-x^2}$，故 $\arccos'(x)=-1/\sqrt{1-x^2}$。负号来自变量在积分下限。

**3. 证明 $f_n(x)=x^n$ 在 $[0,1]$ 上逐点收敛但不一致收敛。**

参考答案：逐点收敛：固定 $x<1$，$x^n\to0$；固定 $x=1$，$x^n=1$。所以极限是 $f(x)=0$（$x<1$）与 $f(1)=1$。不一致：每个 $f_n$ 连续，$f_n(0)=0<1/2<1=f_n(1)$，由介值定理存在 $x_n\in(0,1)$ 使 $x_n^n=1/2$。此时 $f(x_n)=0$，故 $|f_n(x_n)-f(x_n)|=1/2$。取 $\varepsilon=1/4$，任何 $N$ 之后都存在这样的 $x_n$，所以不存在对所有 $x$ 一致的 $N$。直观上，半高点 $x_n=(1/2)^{1/n}\to1$，误差始终是 $1/2$。

**4. 证明一致收敛蕴含逐点收敛，并说明两个定义中 $N$ 的差别。**

参考答案：设 $f_n\to f$ 一致收敛，给定 $x\in I$ 与 $\varepsilon>0$，取一致收敛定义中的 $N$；它只依赖 $\varepsilon$，对所有 $x$ 有效，因此对这个 $x$ 也有效，于是 $n>N$ 时 $|f_n(x)-f(x)|<\varepsilon$，即逐点收敛。差别在于：一致收敛的 $N=N(\varepsilon)$；逐点收敛的 $N=N(\varepsilon,x)$，允许随 $x$ 增大而增大。$x^n$ 的例子中，要让 $x^n<\varepsilon$ 需要 $n>\log\varepsilon/\log x$，当 $x\to1$ 时分母趋于 $0$，所需 $n$ 无界，所以找不到统一的 $N$。

**5. 陈述并证明 Weierstrass M 判别法。**

参考答案：设 $|f_n(x)|\le M_n$ 对一切 $x\in I$ 成立，且 $\sum M_n<\infty$。令 $S_n=\sum_{k=0}^n f_k$。对 $n>m$，

$$
|S_n(x)-S_m(x)|\le\sum_{k=m+1}^{n}|f_k(x)|\le\sum_{k=m+1}^{n}M_k\le\sum_{k=m+1}^{\infty}M_k .
$$

由于 $\sum M_k$ 收敛，给定 $\varepsilon$ 存在 $N$，使 $m\ge N$ 时尾部 $<\varepsilon$。对每个固定的 $x$，$(S_n(x))$ 是 Cauchy 数列，故收敛，极限记为 $S(x)$。在上式中令 $n\to\infty$ 得 $|S(x)-S_m(x)|\le\sum_{k=m+1}^\infty M_k<\varepsilon$，对一切 $x$ 成立且右端与 $x$ 无关，故 $S_m\to S$ 一致收敛。

**6. 用 M 判别法证明 $\sum x^n/n!$ 在 $[-L,L]$ 上一致收敛；并说明幂级数在 $[-L,L]$（$L<R$）上为何一致收敛。**

参考答案：在 $[-L,L]$ 上 $|x^n/n!|\le L^n/n!$，而 $\sum L^n/n!$ 收敛（比值判别法：$L/(n+1)\to0$），故 M 判别法给出一致收敛。对幂级数 $\sum a_nx^n$，若 $L<R=1/M$（$M=\limsup|a_n|^{1/n}$），则 $|a_nx^n|\le|a_n|L^n$，且

$$
\limsup(|a_n|L^n)^{1/n}=ML=L/R<1,
$$

由根值判别法 $\sum|a_n|L^n$ 收敛，再用 M 判别法。注意必须 $L<R$ 严格成立：端点处级数可能收敛，但一致性一般不成立，例如 $\sum x^n$ 在 $[0,1)$ 上不一致收敛。

## 与前后课的关系

弧长把积分用在几何上，而 $\arccos$ 的积分表示展示了基本定理的另一种用法：先由几何定义函数，再用求导得到它的导数。这与「先给公式再验证」的顺序相反，是分析里更常见的构造方式。

后半讲为下一讲做好了准备。有了 Weierstrass M 判别法，就可以证明幂级数在收敛区间内闭一致收敛；而一致收敛正是**逐项积分与逐项求导**的前提。下一讲会证明：一致收敛的函数列，其积分收敛到极限函数的积分；在导数也一致收敛的额外条件下，导数同样可以交换次序。这两条结论把本节的技术条件变成了真正的运算规则。
