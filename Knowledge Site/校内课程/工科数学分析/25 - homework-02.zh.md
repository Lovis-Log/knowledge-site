---
slug: "25-homework-02"
title: "第 2 次作业与解析"
summary: "第 2 次作业的原题与解析。"
updatedAt: "2026-11-15"
content_type: "video-course"
group: "homework"
displayNumber: "02"
tags:
  - "数学分析"
sources:
  - kind: article
    title: "第二次.png"
    url: "https://drive.google.com/file/d/14wzyBN9PoJj37a-ULmQGu2r2x0OBZODP/view?usp=drivesdk"
  - kind: article
    title: "第二次（改前）.png"
    url: "https://drive.google.com/file/d/1bBzC38lrJIKXH2fJXyIBPEB8KfxzpUt4/view?usp=drivesdk"
---

本份作业没有配套的教师解答，以下每题都是补充解答，思路按"为什么这样做"给出，计算过程不省略关键步骤。

题目覆盖三件事：用 $\varepsilon$-$N$ 语言证明收敛、用两边夹定理估计数列、以及围绕 $e$ 的单调性论证。第四、五题把单调有界与 Stolz 定理各用了一次。

---

## 第 1 题

用极限定义，即 $\varepsilon$-$N$ 语言证明：

(1) $\lim\limits_{n\to\infty}\dfrac{2n^2+6n+1}{n^2+2n+4}=2$；

(2) 已知 $\lim\limits_{n\to\infty}x_n=a$，证明 $\lim\limits_{n\to\infty}|x_n|=|a|$；

(3) 已知非负数列 $\{x_n\}$ 收敛于实数 $a$，证明 $\lim\limits_{n\to\infty}\sqrt{x_n}=\sqrt a$。

### (1)

**补充解答** 先算差并通分：

$$\left|\frac{2n^2+6n+1}{n^2+2n+4}-2\right|=\frac{|2n^2+6n+1-2n^2-4n-8|}{n^2+2n+4}=\frac{|2n-7|}{n^2+2n+4}.$$

分子用三角不等式放大：$|2n-7|\le2n+7\le9n$（$n\ge1$ 时 $7\le7n$）；分母去掉正项使它变小：$n^2+2n+4>n^2$。于是

$$\left|\frac{2n^2+6n+1}{n^2+2n+4}-2\right|<\frac{9n}{n^2}=\frac9n .$$

对任意 $\varepsilon>0$，取 $N=\left[\dfrac9\varepsilon\right]+1$，当 $n>N$ 时 $\dfrac9n<\varepsilon$，故原式与 $2$ 的差小于 $\varepsilon$，极限为 $2$。

分母只留 $n^2$ 是有意为之：把分母改小，整个分式变大，放大后的式子仍然趋于 $0$，证明就成立。分子里常数项直接并进 $2n$ 的系数，是为了避免讨论 $n\ge4$ 时 $2n-7$ 的符号。

### (2)

**补充解答** 用反向三角不等式：

$$\big||x_n|-|a|\big|\le|x_n-a| .$$

任给 $\varepsilon>0$，由 $x_n\to a$ 存在 $N$，当 $n>N$ 时 $|x_n-a|<\varepsilon$，于是 $\big||x_n|-|a|\big|<\varepsilon$，即 $|x_n|\to|a|$。

这条不等式的几何含义是"两点到原点的距离之差不超过两点之间的距离"，凡是估计绝对值之差都先想到它。

### (3)

**补充解答** 先确定 $a\ge0$。由 $x_n\ge0$ 及保序性（$x_n\ge0$ 与常数列 $0$ 比较）得 $a\ge0$。

**情形一：$a=0$。** 任给 $\varepsilon>0$，由 $x_n\to0$ 存在 $N$，当 $n>N$ 时 $0\le x_n<\varepsilon^2$，于是

$$0\le\sqrt{x_n}<\varepsilon,$$

即 $\sqrt{x_n}\to0=\sqrt a$。

**情形二：$a>0$。** 由局部保序性，存在 $N_1$，当 $n>N_1$ 时 $x_n>\dfrac a2$，从而 $\sqrt{x_n}>\sqrt{\dfrac a2}$，分母有正下界。对 $n>N_1$ 有理化：

$$\left|\sqrt{x_n}-\sqrt a\right|=\frac{|x_n-a|}{\sqrt{x_n}+\sqrt a}<\frac{|x_n-a|}{\sqrt a}.$$

任给 $\varepsilon>0$，取 $N\ge N_1$ 使 $n>N$ 时 $|x_n-a|<\varepsilon\sqrt a$，则 $|\sqrt{x_n}-\sqrt a|<\varepsilon$。

必须分情形，是因为 $a=0$ 时分子分母同乘 $\sqrt{x_n}+\sqrt a$ 得到的分母没有正下界，有理化失效。$a>0$ 时先证 $x_n$ 与 $0$ 保持距离，正是为了给分母一个正下界。

---

## 第 2 题

用两边夹方法证明：

(1) $\lim\limits_{n\to\infty}\sqrt[n]{n}=1$；

(2) $\lim\limits_{n\to\infty}\dfrac{3^n}{n!}=0$；

(3) $\lim\limits_{n\to\infty}\dfrac12\cdot\dfrac34\cdot\dfrac56\cdots\dfrac{2n-1}{2n}=0$。

### (1)

**补充解答** 令 $\sqrt[n]{n}=1+h_n$，则 $h_n\ge0$（因为 $n\ge1$）。对 $n\ge2$ 用二项式展开，只保留含 $h_n^2$ 的项：

$$n=(1+h_n)^n=1+nh_n+\frac{n(n-1)}{2}h_n^2+\cdots\ge\frac{n(n-1)}{2}h_n^2 .$$

于是

$$0\le h_n\le\sqrt{\frac{2}{n-1}},$$

右端趋于 $0$，故 $h_n\to0$，即 $1\le\sqrt[n]{n}\le1+\sqrt{\dfrac{2}{n-1}}\to1$，由两边夹得 $\sqrt[n]{n}\to1$。

关键是要展开到二阶。只留一阶项 $n\ge1+nh_n$ 只能得到 $h_n\le\frac{n-1}{n}$，压不到 $0$；二阶项带来分母 $n(n-1)$，才真正随 $n$ 增大而变小。

### (2)

**补充解答** 把乘积按 $k\le6$ 与 $k\ge7$ 拆开：

$$\frac{3^n}{n!}=\frac{3^6}{6!}\cdot\frac{3}{7}\cdot\frac{3}{8}\cdots\frac{3}{n}\qquad(n\ge7).$$

当 $k\ge7$ 时 $\dfrac3k\le\dfrac37<\dfrac12$，故

$$0<\frac{3^n}{n!}\le\frac{3^6}{6!}\left(\frac12\right)^{n-6}.$$

右端是常数乘等比数列，由 $0<\frac12<1$ 得 $\left(\frac12\right)^{n-6}\to0$，故 $\dfrac{3^n}{n!}\to0$。

拆点是这类"阶乘分之一乘指数"题目的固定套路：前面有限项合成一个常数，后面的每一项都小于一个小于 $1$ 的固定数，于是整体被等比数列压住。$3^6/6!=729/720$ 恰好略大于 $1$，不影响结论。

### (3)

**补充解答** 记 $p_n=\prod\limits_{k=1}^{n}\dfrac{2k-1}{2k}$。直接放大不好做，因为每项都小于 $1$ 却都不趋于 $0$。造一个"配对"的数列：

$$q_n=\prod_{k=1}^{n}\frac{2k}{2k+1}.$$

因为 $(2k-1)(2k+1)=4k^2-1<4k^2$，所以 $\dfrac{2k-1}{2k}<\dfrac{2k}{2k+1}$，逐项相乘得 $p_n<q_n$。于是

$$0<p_n^2<p_nq_n=\prod_{k=1}^{n}\frac{2k-1}{2k+1}=\frac{1}{3}\cdot\frac{3}{5}\cdot\frac{5}{7}\cdots\frac{2n-1}{2n+1}=\frac{1}{2n+1},$$

中间的分子分母全部相消，只剩首尾。故

$$0<p_n<\frac{1}{\sqrt{2n+1}}\to0,$$

由两边夹得 $p_n\to0$。

这个技巧值得记住：当每项都略小于 $1$、直接估计只能得到 $p_n<1$ 时，就找它的"镜像" $q_n$（把 $\frac{2k-1}{2k}$ 换成 $\frac{2k}{2k+1}$），两式相乘会大面积相消。$p_n<q_n$ 保证 $p_n^2<p_nq_n$，从而把 $p_n$ 夹住。

---

## 第 3 题

证明：

(1) 数列 $a_n=\left(1+\dfrac1n\right)^n$ 严格单调增加收敛到 $e$；

(2) 数列 $b_n=\left(1+\dfrac1n\right)^{n+1}$ 严格单调减少收敛到 $e$；

(3) $\dfrac{1}{n+1}<\ln\left(1+\dfrac1n\right)<\dfrac1n$，$\forall n\ge1$；

(4) 数列 $x_n=1+\dfrac12+\dfrac13+\cdots+\dfrac1n-\ln n$ 收敛。

### (1)

**补充解答** 用"几何平均小于算术平均"。取 $n+1$ 个正数：$1$ 与 $n$ 个 $1+\dfrac1n$。它们的几何平均为

$$\sqrt[n+1]{1\cdot\left(1+\frac1n\right)^n}=a_n^{\frac{1}{n+1}},$$

算术平均为

$$\frac{1+n\left(1+\frac1n\right)}{n+1}=\frac{n+2}{n+1}=1+\frac{1}{n+1}.$$

由几何平均小于算术平均（各数不全相等，故严格），

$$a_n^{\frac{1}{n+1}}<1+\frac{1}{n+1}\ \Longrightarrow\ a_n<\left(1+\frac1{n+1}\right)^{n+1}=a_{n+1},$$

故 $\{a_n\}$ 严格单调增加。

再证有上界。由二项式展开，

$$a_n=\sum_{k=0}^{n}\frac{n(n-1)\cdots(n-k+1)}{k!\,n^k}\le\sum_{k=0}^{n}\frac{1}{k!}\le1+1+\frac12+\frac1{2^2}+\cdots+\frac1{2^{n-1}}<3,$$

因为 $k!\ge2^{k-1}$。由单调有界定理 $\{a_n\}$ 收敛，把这个极限记作 $e$。

构造那几个数的原则是：算术平均要等于 $1+\frac{1}{n+1}$，而 $n+1$ 个数的和应为 $n+2$，取"$1$ 加 $n$ 个 $1+\frac1n$"正好凑成 $n+2$。

### (2)

**补充解答** 直接对 $b_n$ 用均值不等式不便，改成证它的倒数单调增加。记

$$c_n=\frac{1}{b_n}=\left(1-\frac{1}{n+1}\right)^{n+1}.$$

取 $n+2$ 个正数：$1$ 与 $n+1$ 个 $1-\dfrac{1}{n+1}$。几何平均为 $c_n^{\frac{1}{n+2}}$，算术平均为

$$\frac{1+(n+1)\left(1-\frac{1}{n+1}\right)}{n+2}=\frac{1+n}{n+2}=1-\frac{1}{n+2}.$$

由几何平均小于算术平均，

$$c_n<\left(1-\frac{1}{n+2}\right)^{n+2}=c_{n+1},$$

故 $\{c_n\}$ 严格单调增加，且 $c_n<1$，有上界，收敛。于是 $\{b_n\}$ 严格单调减少，有下界 $1$，也收敛。

再定极限值：$\dfrac{b_n}{a_n}=1+\dfrac1n\to1$，而已知 $a_n\to e$，故 $b_n\to e$。

### (3)

**补充解答** 由 (1)(2)，$a_n$ 严格增加趋于 $e$，$b_n$ 严格减少趋于 $e$，故对一切 $n\ge1$

$$a_n<e<b_n,\qquad\text{即}\qquad\left(1+\frac1n\right)^n<e<\left(1+\frac1n\right)^{n+1}.$$

两边取自然对数（$\ln$ 单调增加）：

$$n\ln\left(1+\frac1n\right)<1<(n+1)\ln\left(1+\frac1n\right).$$

由左边得 $\ln\left(1+\frac1n\right)<\dfrac1n$；由右边得 $\ln\left(1+\frac1n\right)>\dfrac{1}{n+1}$。合起来即所要证的不等式。

注意左边严格成立的理由：$a_n<e$ 是严格的，因为 $a_n$ 严格增加且极限为 $e$，任何一项都小于极限。

### (4)

**补充解答** 先看单调性。由 (3) 的右半，$\ln\left(1+\frac1n\right)<\dfrac1n$，而 $1+\frac1n=\dfrac{n+1}{n}$，故

$$x_{n+1}-x_n=\frac{1}{n+1}-\ln\left(1+\frac1n\right)<0,$$

即 $\{x_n\}$ 单调减少。

再找下界。由 (3) 的左半，$\dfrac1k>\ln\left(1+\dfrac1k\right)=\ln(k+1)-\ln k$，对 $k=1,2,\cdots,n$ 求和：

$$x_n=\sum_{k=1}^{n}\frac1k-\ln n>\sum_{k=1}^{n}\big[\ln(k+1)-\ln k\big]-\ln n=\ln(n+1)-\ln n>0 .$$

故 $\{x_n\}$ 单调减少有下界 $0$，由单调有界定理收敛。

这个极限就是欧拉常数 $\gamma\approx0.5772$。它的存在性完全依赖 (3) 给出的双侧估计：右侧不等式给单调性，左侧不等式给下界，两条缺一不可。

---

## 第 4 题

设 $x_1=2$，$x_n=\sin x_{n-1}$，$\forall n\ge2$。证明：数列 $\{x_n\}$ 为无穷小量。

**补充解答** 先看前几项定位：$x_1=2$，$x_2=\sin2\approx0.909$。$2$ 落在 $(\frac\pi2,\pi)$ 内，但它的正弦落在 $(0,1)$ 内。所以从第二项起，各项都跑进了 $(0,1)$，而 $(0,1)\subset(0,\frac\pi2)$。

**第一步：$n\ge2$ 时 $0<x_n<1$。** 由 $\sin2\in(0,1)$ 得 $x_2\in(0,1)$；若 $x_{n-1}\in(0,1)\subset(0,\frac\pi2)$，则 $x_n=\sin x_{n-1}\in(0,1)$（因为 $0<\sin t<1$ 对 $0<t<\frac\pi2$ 成立）。归纳即得。

**第二步：$\{x_n\}$ 从第二项起单调减少。** 对 $t>0$ 有 $\sin t<t$，故 $n\ge3$ 时

$$x_n=\sin x_{n-1}<x_{n-1}.$$

**第三步：求极限。** $\{x_n\}$ 单调减少有下界 $0$，收敛，设 $x_n\to L$，则 $L\in[0,1]$。在 $x_n=\sin x_{n-1}$ 两边令 $n\to\infty$，由 $\sin$ 的连续性得

$$L=\sin L .$$

方程 $t=\sin t$ 只有 $t=0$ 一个解：$t>0$ 时 $\sin t<t$，$t<0$ 时 $\sin t>t$。故 $L=0$，即 $\{x_n\}$ 是无穷小量。

这里容易出的错是直接对 $x_n=\sin x_{n-1}$ 取极限就断言"$L=\sin L$ 所以 $L=0$"，却忘了先证收敛。取极限这一步只在极限存在时才有意义，而存在性是靠单调有界定理提供的。另外要注意 $x_1=2$ 并不在 $(0,\frac\pi2)$ 内，单调性只能从第二、三项开始说，这不影响结论。

---

## 第 5 题

计算极限

$$\lim_{n\to\infty}\frac{1+\dfrac{1}{\sqrt2}+\cdots+\dfrac{1}{\sqrt n}}{\sqrt n}.$$

**补充解答** 分子是求和、分母是 $\sqrt n$，属于 $\frac{\infty}{\infty}$ 型，且分子没有简单的求和公式，这类结构直接用 Stolz 定理。

取 $x_n=\sum\limits_{k=1}^{n}\dfrac{1}{\sqrt k}$，$y_n=\sqrt n$。$\{y_n\}$ 严格单调增加且趋于 $+\infty$，满足 Stolz 定理的条件。差分之比为

$$\frac{x_n-x_{n-1}}{y_n-y_{n-1}}=\frac{\dfrac{1}{\sqrt n}}{\sqrt n-\sqrt{n-1}} .$$

把分母有理化：$\sqrt n-\sqrt{n-1}=\dfrac{1}{\sqrt n+\sqrt{n-1}}$，于是

$$\frac{x_n-x_{n-1}}{y_n-y_{n-1}}=\frac{1}{\sqrt n}\left(\sqrt n+\sqrt{n-1}\right)=1+\sqrt{1-\frac1n}\longrightarrow2 .$$

由 Stolz 定理，原极限为 $2$。

分母有理化是关键一步：$\sqrt n-\sqrt{n-1}$ 单独看趋于 $0$，比值像是 $\frac{0}{0}$，但有理化之后 $1/\sqrt n$ 与 $\sqrt n+\sqrt{n-1}$ 相乘，$n$ 的幂次正好抵消，剩下的 $1+\sqrt{1-1/n}$ 有确定的极限。

---

## 说明

本次作业的题目在流传过程中有过一次调整：较早的版本在第 4 题下设两问，第 (2) 问要求探索无穷小量的阶（求 $\alpha$ 使 $\lim n^\alpha x_n$ 为正实数，提示用 Stolz 定理），且没有第 5 题；当前版本删去了第 4 题第 (2) 问，并把"计算极限"作为新的第 5 题。上面按当前版本作答，不重复收录已删去的小问。

## 资料

- 原题（当前版）：[第二次.png](https://drive.google.com/file/d/14wzyBN9PoJj37a-ULmQGu2r2x0OBZODP/view?usp=drivesdk)

- [第二次（改前）.png](https://drive.google.com/file/d/1bBzC38lrJIKXH2fJXyIBPEB8KfxzpUt4/view?usp=drivesdk)
