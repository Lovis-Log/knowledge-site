---
slug: 19-integrable-functions
title: "哪些函数可积：判据、一致连续与连续函数"
summary: "先证明下积分永远不超过上积分，再用 Dirichlet 函数说明有界远不足以保证可积；接着给出上下和之差小于 ε 的充要判据，用一致连续与 Bolzano–Weierstrass 定理证明闭区间上的连续函数一致连续，从而可积。"
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [real-analysis, riemann-integral, uniform-continuity, compactness]
sources:
  - kind: video
    title: "Lecture 18: Integrable Functions"
    url: https://www.youtube.com/watch?v=9rG-bs0TFQ8
    author: Tobias Holck Colding, MIT OpenCourseWare
    publishedAt: 2025-09-02
---

## 从定义到判别

上一讲把 Riemann 积分定义成「下积分与上积分相等时的公共值」，但没有回答什么时候相等。这一讲补上三件事：

1. 对**任何**有界函数，下积分都不超过上积分——所以可积性的定义不会自相矛盾。
2. 给出一个不可积的例子（Dirichlet 函数），说明有界性远远不够。
3. 给出可积的**充要判据**：对每个 $\varepsilon>0$，能找到分割使上下和之差小于 $\varepsilon$。

判据本身只涉及有限个矩形，但要把它用在连续函数上，还需要一个新工具：**一致连续**。整讲的逻辑是

$$
\text{连续} \xrightarrow{\text{紧性}} \text{一致连续} \xrightarrow{\text{上下和}} \text{可积}.
$$

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 0:00 | 回顾分割、上和、下和与加细引理 |
| 13:32 | 上积分与下积分的定义 |
| 16:59 | 证明：下积分 $\le$ 上积分 |
| 24:44 | 关于 Riemann 的插叙 |
| 27:52 | Dirichlet 函数：有界但不可积 |
| 31:45 | 可积的充要判据（上下和之差） |
| 41:47 | 定理：闭区间上连续函数可积；引入一致连续 |
| 45:38 | 两个反例：$x^2$ 在 $\mathbb R$ 上、$1/x$ 在 $(0,1]$ 上 |
| 55:28 | 证明：紧区间上连续 $\Rightarrow$ 一致连续 |
| 1:04:39 | 用判据证明连续函数可积 |
| 1:14:25 | 积分的四条基本性质（只陈述） |

## 回顾：分割、上下和、加细

设 $f$ 在 $[a,b]$ 上有界，$P=\{a=x_0<x_1<\cdots<x_n=b\}$ 是分割，记 $\Delta x_i=x_i-x_{i-1}$，并令

$$
M_i=\sup_{[x_{i-1},x_i]}f,
\qquad
m_i=\inf_{[x_{i-1},x_i]}f .
$$

则

$$
U(f,P)=\sum_{i=1}^{n}M_i\Delta x_i,
\qquad
L(f,P)=\sum_{i=1}^{n}m_i\Delta x_i,
\qquad
L(f,P)\le U(f,P).
$$

加细引理：若 $P_2$ 是 $P_1$ 的加细，则

$$
L(f,P_1)\le L(f,P_2)\le U(f,P_2)\le U(f,P_1).
$$

上积分是所有上和的下确界，下积分是所有下和的上确界：

$$
\overline{\int_a^b f}=\inf_P U(f,P),
\qquad
\underline{\int_a^b f}=\sup_P L(f,P).
$$

## 下积分永远不超过上积分

**命题。** 对任意有界函数 $f$，

$$
\underline{\int_a^b f}\le \overline{\int_a^b f}.
$$

**证明。** 先证一个更强的结论：**任意两个分割**的下和不超过上和的任意组合，即对任意分割 $P,P^*$，

$$
L(f,P)\le U(f,P^*).
$$

取 $P$ 与 $P^*$ 分点的并集，得到公共加细 $\bar P$。它同时是两者的加细，所以由加细引理

$$
L(f,P)\le L(f,\bar P)\le U(f,\bar P)\le U(f,P^*).
$$

于是 $L(f,P)\le U(f,P^*)$ 对一切 $P,P^*$ 成立。

现在固定 $P$。上式说明 $L(f,P)$ 是集合 $\{U(f,P^*):P^*\}$ 的一个下界，因此不超过它的下确界：

$$
L(f,P)\le\inf_{P^*}U(f,P^*)=\overline{\int_a^b f}.
$$

这说明 $\overline{\int_a^b f}$ 是集合 $\{L(f,P):P\}$ 的一个上界，因此不小于其上确界：

$$
\sup_P L(f,P)=\underline{\int_a^b f}\le \overline{\int_a^b f}.
$$

$\square$

这个证明的技巧值得记住：**先证「任意下和 ≤ 任意上和」，再用上下确界的定义各取一次**。加细引理在这里承担了全部工作。

## 一个不可积的函数：Dirichlet 函数

定义在 $[0,1]$ 上：

$$
f(x)=
\begin{cases}
1, & x\in\mathbb Q,\\
0, & x\notin\mathbb Q .
\end{cases}
$$

它显然有界（$0\le f\le1$），但**不可积**。

**理由。** 取任意分割 $P$。任何一个非退化的子区间 $[x_{i-1},x_i]$ 中，既有有理数（稠密性），又有无理数（稠密性），所以

$$
M_i=1,
\qquad
m_i=0 .
$$

于是

$$
U(f,P)=\sum_{i=1}^{n}1\cdot\Delta x_i=1,
\qquad
L(f,P)=\sum_{i=1}^{n}0\cdot\Delta x_i=0 .
$$

这对**所有**分割都成立。因此

$$
\overline{\int_0^1 f}=1,
\qquad
\underline{\int_0^1 f}=0,
$$

两者不相等，函数不可积。

这个例子说明：有界、甚至处处有定义，都不够。可积性要求函数在小区间上的「起伏」能整体压小，而 Dirichlet 函数在每个区间上的起伏都是 $1$。

## 可积的充要判据

**定理。** 设 $f$ 在 $[a,b]$ 上有界。则 $f$ Riemann 可积，当且仅当对每个 $\varepsilon>0$，存在分割 $P$，使

$$
U(f,P)-L(f,P)<\varepsilon .
$$

**证明（必要性）。** 设 $f$ 可积，公共值为 $I$。由

$$
I=\underline{\int_a^b f}=\sup_P L(f,P),
$$

给定 $\varepsilon>0$，存在分割 $P_1$，使

$$
L(f,P_1)>I-\frac{\varepsilon}{2}.
$$

（否则所有下和都 $\le I-\varepsilon/2$，上确界就小于 $I$。）同理，由 $I=\inf_P U(f,P)$，存在分割 $P_2$，使

$$
U(f,P_2)<I+\frac{\varepsilon}{2}.
$$

取公共加细 $P$，它同时加细 $P_1,P_2$。于是

$$
L(f,P)\ge L(f,P_1)>I-\frac{\varepsilon}{2},
\qquad
U(f,P)\le U(f,P_2)<I+\frac{\varepsilon}{2}.
$$

两式相减：

$$
U(f,P)-L(f,P)<\left(I+\frac{\varepsilon}{2}\right)-\left(I-\frac{\varepsilon}{2}\right)=\varepsilon .
$$

**证明（充分性）。** 设对每个 $\varepsilon>0$ 都有分割 $P$ 使 $U(f,P)-L(f,P)<\varepsilon$。对任意分割恒有

$$
L(f,P)\le\underline{\int_a^b f}\le\overline{\int_a^b f}\le U(f,P),
$$

所以

$$
0\le\overline{\int_a^b f}-\underline{\int_a^b f}\le U(f,P)-L(f,P)<\varepsilon .
$$

$\varepsilon$ 任意，故两个积分相等，$f$ 可积。$\square$

判据的意义在于：**可积性只需要一列分割，不需要对所有分割验证**。只要上下和能任意接近，上下确界就被夹住。

## 一致连续

**定义。** 设 $f$ 定义在集合 $E$ 上。称 $f$ 在 $E$ 上**一致连续**，若对每个 $\varepsilon>0$，存在 $\delta>0$，使得对**所有** $x,y\in E$，只要 $|x-y|<\delta$，就有

$$
|f(x)-f(y)|<\varepsilon .
$$

与普通连续的区别只在一个词：$\delta$ 不能依赖 $x$。普通连续是「对每个 $x_0$，给定 $\varepsilon$，存在 $\delta(\varepsilon,x_0)$」；一致连续要求**同一个 $\delta$ 对所有点都管用**。

几何上：给定 $y$ 轴上的误差带 $(-\varepsilon,\varepsilon)$，一致连续保证存在一个统一的水平宽度 $\delta$，使得宽度小于 $\delta$ 的任何一段图像都落在高度小于 $2\varepsilon$ 的带子里。

### 反例一：$x^2$ 在 $\mathbb R$ 上

设 $f(x)=x^2$。若一致连续，则存在 $\delta>0$，使 $|x-y|<\delta$ 时 $|x^2-y^2|<\varepsilon$。取 $y=x+\delta/2$，则

$$
|f(x)-f(y)|=\left|x^2-\left(x+\frac{\delta}{2}\right)^2\right|
=\delta x+\frac{\delta^2}{4}.
$$

当 $x\to+\infty$ 时这个量无界，不可能对所有 $x$ 都小于固定的 $\varepsilon$。所以 $x^2$ 在 $\mathbb R$ 上连续但不一致连续。

原因不在函数本身，而在**定义域无界**：图像越往右越陡，同样的水平宽度对应越来越大的竖直变化。

### 反例二：$1/x$ 在 $(0,1]$ 上

设 $f(x)=1/x$，定义域 $(0,1]$。取

$$
x_n=\frac1n,
\qquad
y_n=\frac1{2n}.
$$

则

$$
|x_n-y_n|=\frac1{2n}\to0,
\qquad
|f(x_n)-f(y_n)|=|n-2n|=n\to\infty .
$$

所以无论 $\delta$ 多小，总有一对距离小于 $\delta$ 的点，函数值相差超过给定 $\varepsilon$。$1/x$ 在 $(0,1]$ 上不一致连续。

原因不在无界，而在**定义域不闭**：越靠近 $0$，函数越陡，且没有定义在 $0$ 处。

两个反例都指向同一件事：一致连续性依赖于定义域的**紧性**。

## 紧区间上连续蕴含一致连续

**定理。** 设 $f$ 在闭区间 $[a,b]$ 上连续，则 $f$ 在 $[a,b]$ 上一致连续。

**证明（反证 + 序列紧性）。** 假设不一致连续。否定定义：存在 $\varepsilon>0$，使得对**每个** $\delta>0$，都能找到 $x,y\in[a,b]$ 满足

$$
|x-y|<\delta
\quad\text{但}\quad
|f(x)-f(y)|\ge\varepsilon .
$$

取 $\delta=1/n$（$n=1,2,3,\dots$），得到两列点 $x_n,y_n\in[a,b]$，满足

$$
|x_n-y_n|<\frac1n,
\qquad
|f(x_n)-f(y_n)|\ge\varepsilon .
$$

由 Bolzano–Weierstrass 定理（有界闭区间上的有界数列有收敛子列），存在子列 $x_{n_k}\to x$，且 $x\in[a,b]$（闭区间包含极限点）。

再看对应的 $y_{n_k}$。由三角不等式

$$
|y_{n_k}-x|\le|y_{n_k}-x_{n_k}|+|x_{n_k}-x|
<\frac{1}{n_k}+|x_{n_k}-x| .
$$

右边两项都趋于 $0$，故 $y_{n_k}\to x$。

由于 $f$ 在 $x$ 处连续，

$$
f(x_{n_k})\to f(x),
\qquad
f(y_{n_k})\to f(x).
$$

于是

$$
|f(x_{n_k})-f(y_{n_k})|\to0,
$$

这与它对每个 $k$ 都 $\ge\varepsilon>0$ 矛盾。所以假设不成立，$f$ 一致连续。$\square$

这个证明是紧性论证的典型样本：**否定一致性，得到两条距离趋于零但函数值距离不趋于零的点列；用 B–W 抽出收敛子列；两条子列收敛到同一点；连续性迫使函数值也靠拢，矛盾。**

## 连续函数可积

**定理。** 设 $f$ 在 $[a,b]$ 上连续，则 $f$ Riemann 可积。

**证明。** 由判据，只需对每个 $\varepsilon>0$ 构造一个上下和之差小于 $\varepsilon$ 的分割。

设 $a<b$（$a=b$ 时积分显然为零）。由一致连续性，取 $\delta>0$，使 $|x-y|<\delta$ 时

$$
|f(x)-f(y)|<\frac{\varepsilon}{b-a}.
$$

取分割 $P$，使每段长度 $\Delta x_i<\delta$。

在每段 $[x_{i-1},x_i]$ 上，$f$ 连续，由极值定理，$M_i$ 与 $m_i$ 分别在两个点 $y_i,y_i^*$ 取到。这两点的距离不超过该段长度，小于 $\delta$，所以

$$
M_i-m_i=f(y_i)-f(y_i^*)<\frac{\varepsilon}{b-a}.
$$

于是

$$
U(f,P)-L(f,P)
=\sum_{i=1}^{n}(M_i-m_i)\Delta x_i
<\sum_{i=1}^{n}\frac{\varepsilon}{b-a}\Delta x_i
=\frac{\varepsilon}{b-a}\sum_{i=1}^{n}\Delta x_i
=\varepsilon .
$$

最后一步用了 $\sum\Delta x_i=b-a$。由判据，$f$ 可积。$\square$

注意证明中**三件事各有其位**：一致连续提供统一的 $\delta$；极值定理保证 sup 与 inf 被取到（否则只能取近似点，得不到严格不等式）；分割把这些局部估计加起来，$\sum\Delta x_i=b-a$ 把常数消掉。

## 积分的基本性质

课程最后只陈述了四条，证明留到后面：

1. **数乘**：$f$ 可积，$c\in\mathbb R$，则 $cf$ 可积，且 $\int_a^b cf=c\int_a^b f$。
2. **加法**：$f,g$ 可积，则 $f+g$ 可积，且 $\int_a^b(f+g)=\int_a^b f+\int_a^b g$。
3. **单调性**：$f,g$ 可积且 $f\le g$，则 $\int_a^b f\le\int_a^b g$。
4. **区间可加**：$f$ 在 $[a,b]$ 上可积，$c\in[a,b]$，则 $f$ 在 $[a,c]$ 与 $[c,b]$ 上都可积，且
$$
\int_a^b f=\int_a^c f+\int_c^b f .
$$

第四条用面积理解最直接：以 $c$ 为界把图像切成两段，两块有向面积相加等于整块。

## 本节结论

- 对任意有界函数，$\underline{\int}\le\overline{\int}$；证明靠公共加细与确界定义。
- Dirichlet 函数在每个区间上 sup 为 $1$、inf 为 $0$，故 $U\equiv1$、$L\equiv0$，不可积。
- $f$ 可积 $\iff$ 对每个 $\varepsilon>0$ 存在分割使 $U-L<\varepsilon$。
- 一致连续 = 同一个 $\delta$ 对所有点有效；$x^2$ 在 $\mathbb R$、$1/x$ 在 $(0,1]$ 都是连续但非一致连续。
- 紧区间上连续 $\Rightarrow$ 一致连续（B–W + 反证）。
- 紧区间上连续 $\Rightarrow$ 可积（一致连续 + 极值定理 + 上下和估计）。
- 积分满足线性、单调与区间可加（暂未证明）。

## 理解检验

**1. 证明：对任意两个分割 $P,P^*$，有 $L(f,P)\le U(f,P^*)$，并由此推出下积分不超过上积分。**

参考答案：取 $P$ 与 $P^*$ 分点的并集得到公共加细 $\bar P$。由加细引理，$L(f,P)\le L(f,\bar P)$ 且 $U(f,\bar P)\le U(f,P^*)$；又对同一分割总有 $L(f,\bar P)\le U(f,\bar P)$。三者串起来得 $L(f,P)\le U(f,P^*)$。固定 $P$，右端对一切 $P^*$ 成立，故 $L(f,P)\le\inf_{P^*}U(f,P^*)=\overline{\int}f$。再对一切 $P$ 取上确界：$\underline{\int}f=\sup_P L(f,P)\le\overline{\int}f$。

**2. 证明 Dirichlet 函数在 $[0,1]$ 上不可积。**

参考答案：任取分割 $P$。每个非退化子区间既含有理数又含无理数（两种数都稠密），所以 $M_i=1$、$m_i=0$。于是 $U(f,P)=\sum1\cdot\Delta x_i=1$，$L(f,P)=\sum0\cdot\Delta x_i=0$，对所有分割都成立。因此上积分是常值 $1$ 的下确界，等于 $1$；下积分是常值 $0$ 的上确界，等于 $0$。上下积分不相等，故不可积。

**3. 陈述并证明可积判据（$U-L<\varepsilon$ 的充要条件）的充分性部分。**

参考答案：设对每个 $\varepsilon>0$ 存在分割 $P$ 使 $U(f,P)-L(f,P)<\varepsilon$。对任意分割恒有 $L(f,P)\le\underline{\int}f\le\overline{\int}f\le U(f,P)$，因此 $0\le\overline{\int}f-\underline{\int}f\le U(f,P)-L(f,P)<\varepsilon$。由于这对任意 $\varepsilon>0$ 成立，两个积分必须相等，故 $f$ 可积。

**4. 说明 $1/x$ 在 $(0,1]$ 上连续但不一致连续，并指出定义域缺少哪条性质。**

参考答案：取 $x_n=1/n$、$y_n=1/(2n)$，都在 $(0,1]$ 内。则 $|x_n-y_n|=1/(2n)\to0$，而 $|f(x_n)-f(y_n)|=|n-2n|=n\to\infty$。所以不存在统一的 $\delta$：任意小的水平距离都可能对应巨大的竖直差。定义域 $(0,1]$ 有界但不闭（缺端点 $0$），因此不紧致；紧性是连续升级为一致连续的关键条件。

**5. 用 Bolzano–Weierstrass 定理证明：$[a,b]$ 上的连续函数一致连续。**

参考答案：反设不一致连续，则存在 $\varepsilon>0$，使对每个 $n$ 都有 $x_n,y_n\in[a,b]$ 满足 $|x_n-y_n|<1/n$ 且 $|f(x_n)-f(y_n)|\ge\varepsilon$。由 B–W，存在子列 $x_{n_k}\to x\in[a,b]$。由三角不等式 $|y_{n_k}-x|\le|y_{n_k}-x_{n_k}|+|x_{n_k}-x|<1/n_k+|x_{n_k}-x|\to0$，故 $y_{n_k}\to x$。连续性给出 $f(x_{n_k})\to f(x)$ 与 $f(y_{n_k})\to f(x)$，于是 $|f(x_{n_k})-f(y_{n_k})|\to0$，与它始终 $\ge\varepsilon$ 矛盾。

**6. 设 $f$ 在 $[a,b]$ 上连续。用一致连续与判据证明 $f$ 可积，并指出证明中极值定理用在哪里。**

参考答案：给定 $\varepsilon>0$，由一致连续取 $\delta>0$ 使 $|x-y|<\delta\Rightarrow|f(x)-f(y)|<\varepsilon/(b-a)$。取分割使每段 $\Delta x_i<\delta$。在每个子区间上，极值定理保证 $M_i,m_i$ 被某两点取到，而这两点距离小于 $\delta$，所以 $M_i-m_i<\varepsilon/(b-a)$。于是 $U-L=\sum(M_i-m_i)\Delta x_i<\frac{\varepsilon}{b-a}\sum\Delta x_i=\varepsilon$。由判据 $f$ 可积。极值定理用在「sup 与 inf 确实被取到」，否则只能取到近似点，只能得到 $\le$ 而非严格不等式；改用 $\varepsilon/(2(b-a))$ 也可以绕开，但极值定理让论证更直接。

## 与前后课的关系

这一讲把可积性从定义变成了可用的工具：判据把无穷多个分割压缩成一个 $\varepsilon$ 论证，而紧性把「逐点连续」升级成「一致连续」。两条线索在后文反复出现。

下一讲进入微积分基本定理：定义变上限积分 $F(x)=\int_a^x f$，证明 $F$ 可导且 $F'=f$（当 $f$ 连续），再用它计算具体积分，并讨论反常积分。再往后，积分与导数的交换、函数项级数的逐项积分，都要回到本讲的一致连续与一致收敛思想。
