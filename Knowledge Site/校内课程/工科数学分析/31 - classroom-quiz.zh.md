---
slug: "31-classroom-quiz"
title: "课堂测验（极限、连续与微分） - 原题与解析"
summary: "2026 年 11 月课堂测验，共 9 题，附教师解答和关键推导。"
updatedAt: "2026-11-21"
content_type: "reference"
group: "homework"
displayNumber: "测验"
tags:
  - "数学分析"
sources:
  - kind: article
    title: "课堂测验 - ans.pdf"
    url: "https://drive.google.com/file/d/1MIGRaSfJc5Y2TRCQeSYF6UyR30k0Kphq/view?usp=drivesdk"
---

填空题共 5 题，每题 8 分。计算与证明共 4 题，每题 15 分。

## 一、填空题

### 第 1 题　极限的 ε–X 定义
<!-- homework-topic: 极限的 ε–X 定义 -->

**原题**：写出 $\lim_{x\to\infty}f(x)=A$ 的 $\varepsilon$ 语言表述。

**教师答案**

$$
\forall\varepsilon>0,\quad \exists X>0:\qquad |x|>X\ \Longrightarrow\ |f(x)-A|<\varepsilon .
$$

（原答案写作“$\forall\varepsilon>0,\exists X>0$，s.t. 只要 $|x|>X$，就有 $|f(x)-A|<\varepsilon$”。）

> 说明：此处 $x\to\infty$ 按 $|x|\to\infty$（双侧）理解；若题为 $x\to+\infty$，条件应改为 $x>X$。

### 第 2 题　取整函数的间断点
<!-- homework-topic: 取整函数的间断点 -->

**原题**：设 $[x]$ 表示不超过 $x$ 的最大整数，则函数 $f(x)=[\sin x]$ 在 $(0,2\pi)$ 内的全体间断点为 ______，它们分别是 ______ 间断点、______ 间断点。

**教师答案**

$$
x_1=\frac{\pi}{2},\qquad x_2=\pi,
$$

其中 $x_1$ 为可去间断点，$x_2$ 为跳跃间断点。

**补充解答**

在 $(0,\pi)$ 上 $0<\sin x\le 1$，故 $[\sin x]=0$，惟在 $x=\dfrac{\pi}{2}$ 处 $\sin x=1$、$[\sin x]=1$；在 $(\pi,2\pi)$ 上 $-1<\sin x<0$，故 $[\sin x]=-1$。于是

$$
\lim_{x\to\frac{\pi}{2}}f(x)=0\ne f\left(\frac{\pi}{2}\right)=1,
$$

故 $x=\dfrac{\pi}{2}$ 是可去间断点；

$$
\lim_{x\to\pi^-}f(x)=0,\qquad \lim_{x\to\pi^+}f(x)=-1,
$$

故 $x=\pi$ 是跳跃间断点。其余各点处 $f$ 在去心邻域内取常值，连续，所以间断点恰为这两点。

### 第 3 题　参数曲线的二阶导数
<!-- homework-topic: 参数曲线的二阶导数 -->

**原题**：设 $x=a\cos t$，$y=b\sin t$，则 $\dfrac{d^2y}{dx^2}=$ ______。

**教师答案**

$$
\frac{d^2y}{dx^2}=-\frac{b}{a^2\sin^3t}\qquad (a\ne0,\ \sin t\ne0).
$$

**补充解答**

$$
\frac{dy}{dx}=\frac{(b\sin t)'}{(a\cos t)'}=\frac{b\cos t}{-a\sin t}=-\frac{b}{a}\cot t,
$$

$$
\frac{d^2y}{dx^2}=\frac{1}{-a\sin t}\cdot\frac{d}{dt}\left(-\frac{b}{a}\cot t\right)
=\frac{1}{-a\sin t}\cdot\frac{b}{a\sin^2t}
=-\frac{b}{a^2\sin^3t}.
$$

### 第 4 题　平方根函数的三阶泰勒展开
<!-- homework-topic: 平方根函数的三阶泰勒展开 -->

**原题**：写出函数 $\sqrt{1+x}$ 在 $x=0$ 点的泰勒公式。

**教师答案**

$$
\sqrt{1+x}=1+\frac12x-\frac18x^2+\frac1{16}x^3+o(x^3),\qquad x\to0.
$$

**补充解答**

由 $(1+x)^\alpha=\sum\limits_{k=0}^{n}\frac{\alpha(\alpha-1)\cdots(\alpha-k+1)}{k!}x^k+o(x^n)$ 取 $\alpha=\dfrac12$，前三项系数为

$$
\frac12,\qquad \frac{\frac12\left(-\frac12\right)}{2!}=-\frac18,\qquad
\frac{\frac12\left(-\frac12\right)\left(-\frac32\right)}{3!}=\frac1{16}.
$$

### 第 5 题　三角和的 n 次方根极限
<!-- homework-topic: 三角和的 n 次方根极限 -->

**原题**：
$$
\lim_{n\to\infty}\sqrt[n]{\sin^21+\sin^22+\cdots+\sin^2n}=\ \underline{\qquad}.
$$

**教师答案**：$1$。

**补充解答**

记 $S_n=\sin^21+\sin^22+\cdots+\sin^2n$，则 $\sin^21\le S_n\le n$，于是

$$
1=\sqrt[n]{\sin^21}\ \le\ \sqrt[n]{S_n}\ \le\ \sqrt[n]{n}\ \longrightarrow\ 1\qquad(n\to\infty),
$$

由夹逼准则得极限为 $1$。

## 二、计算与证明

### 第 1 题　取对数求幂指型极限
<!-- homework-topic: 取对数求幂指型极限 -->

**原题**：
$$
\lim_{x\to0}\left[\frac{(1+x)^{\frac1x}}{e}\right]^{\frac1x}.
$$

**教师解答**

记 $f(x)=\left[\dfrac{(1+x)^{1/x}}{e}\right]^{\dfrac1x}$，则

$$
\ln f(x)=\frac1x\ln\frac{(1+x)^{1/x}}{e}=\frac{\ln(1+x)-x}{x^2}.
$$

用洛必达法则：

$$
\begin{aligned}
\lim_{x\to0}\ln f(x)
&=\lim_{x\to0}\frac{\ln(1+x)-x}{x^2}\\
&=\lim_{x\to0}\frac{\frac1{1+x}-1}{2x}
=\lim_{x\to0}\frac{-x}{2x(1+x)}
=-\frac12 .
\end{aligned}
$$

所以原极限为

$$
\lim_{x\to0}f(x)=\exp\left(\lim_{x\to0}\ln f(x)\right)=\exp\left(-\frac12\right)=e^{-\frac12}.
$$

### 第 2 题　用柯西准则证明数列收敛
<!-- homework-topic: 用柯西准则证明数列收敛 -->

**原题**：利用 Cauchy 收敛准则证明：数列

$$
x_n=\frac{\cos1}{1\cdot2}+\frac{\cos2}{2\cdot3}+\cdots+\frac{\cos n}{n\cdot(n+1)},\qquad n=1,2,3,\cdots
$$

收敛。

**教师解答（校正原答案中的求和下标）**

对 $n,p\ge1$，两项相减只留下从 $n+1$ 到 $n+p$ 的尾和。

$$
\begin{aligned}
|x_{n+p}-x_n|
&=\left|\sum_{k=n+1}^{n+p}\frac{\cos k}{k(k+1)}\right|\\
&\le\sum_{k=n+1}^{n+p}\left(\frac1k-\frac1{k+1}\right)\\
&=\frac1{n+1}-\frac1{n+p+1}
<\frac1n.
\end{aligned}
$$

给定 $\varepsilon>0$，取 $N=\lfloor1/\varepsilon\rfloor+1$。任意 $n>N$ 和 $p\ge1$ 都满足 $|x_{n+p}-x_n|<1/n<\varepsilon$，所以数列由 Cauchy 收敛准则收敛。

> **易错点**：尾和分子从 $\cos(n+1)$ 开始。原答案印成了 $\cos1,\cos2,\ldots,\cos n$，这里按题干通项校正。

### 第 3 题　平方根函数的一致连续性
<!-- homework-topic: 平方根函数的一致连续性 -->

**原题**：证明函数 $f(x)=\sqrt{x}$ 在区间 $[0,+\infty)$ 上一致连续。

**教师证明一（补齐拼接条件）**

$\sqrt{x}$ 在 $[0,2]$ 上连续，由 Cantor 定理在这个闭区间上一致连续。给定 $\varepsilon>0$，记这一步得到的距离阈值为 $\delta_0$。在 $[1,+\infty)$ 上，利用平方差可得

$$
|\sqrt{x_2}-\sqrt{x_1}|
=\frac{|x_2-x_1|}{\sqrt{x_2}+\sqrt{x_1}}
\le\frac12|x_2-x_1|.
$$

取 $\delta=\min\{1,2\varepsilon,\delta_0\}$。若 $x_1,x_2\ge0$ 且 $|x_2-x_1|<\delta$，则两点同落在 $[0,2]$ 或 $[1,+\infty)$ 中。对应的不等式都给出 $|\sqrt{x_2}-\sqrt{x_1}|<\varepsilon$。

**教师证明二（补齐端点）**

设 $x_2\ge x_1\ge0$。由 $(\sqrt{x_1}+\sqrt{x_2-x_1})^2\ge x_2$，得 $|\sqrt{x_2}-\sqrt{x_1}|\le\sqrt{|x_2-x_1|}$。取 $\delta=\varepsilon^2$ 即可在 $[0,+\infty)$ 上得到一致连续。

> **易错点**：当 $x_1=0$ 时上式可以取等号。原答案末句中的 $[1,+\infty)$ 应为 $[0,+\infty)$。

### 第 4 题　正弦迭代数列的极限
<!-- homework-topic: 正弦迭代数列的极限 -->

**原题**：设 $a_1=\sin1$，$a_{n+1}=\sin a_n$，$n=1,2,3,\cdots$。

(1) 证明：$\lim\limits_{n\to\infty}a_n=0$；(2) 求极限 $\lim\limits_{n\to\infty}\sqrt{n}\,a_n$。

**（1）证明数列收敛到零**

**教师证明**

易见数列 $\{a_n\}$ 单调递减，且有下界 $0$，所以 $\lim\limits_{n\to\infty}a_n$ 存在，记 $\lim\limits_{n\to\infty}a_n=a\in[0,1]$。

在 $a_{n+1}=\sin a_n$ 两边令 $n\to\infty$ 得 $a=\sin a$，所以 $a=0$，即 $\lim\limits_{n\to\infty}a_n=0$。

**补充解答（补出“易见”的依据）**

$a_1=\sin1\in(0,1]$，且 $a_{n+1}=\sin a_n\in(0,1]$，故 $0<a_n\le1$。又 $x>0$ 时 $\sin x<x$，所以 $a_{n+1}=\sin a_n<a_n$，即 $\{a_n\}$ 严格递减且有下界 $0$。极限 $a$ 满足 $a=\sin a$，在 $[0,1]$ 上该方程只有解 $a=0$。

**（2）求缩放后的极限**

**教师解答（用 Stolz 定理，过程也蕴含极限存在性）**

先求

$$
\begin{aligned}
\lim_{n\to\infty}n a_n^2
&=\lim_{n\to\infty}\frac{n}{1/a_n^2}\\
&
=\lim_{n\to\infty}\frac{(n+1)-n}{\frac1{a_{n+1}^2}-\frac1{a_n^2}}
\\
&=\lim_{n\to\infty}\frac{a_n^2a_{n+1}^2}{a_n^2-a_{n+1}^2}\\
&=\lim_{n\to\infty}\frac{a_n^2\sin^2a_n}{a_n^2-\sin^2a_n}
=\lim_{t\to0}\frac{t^2\sin^2t}{t^2-\sin^2t}
\\
&=\lim_{t\to0}\frac{t^4}{(t+\sin t)(t-\sin t)}\\
&=\frac12\lim_{t\to0}\frac{t^3}{t-\sin t}
=\frac12\lim_{t\to0}\frac{3t^2}{1-\cos t}=3 .
\end{aligned}
$$

所以原极限为

$$
\lim_{n\to\infty}\sqrt{n}\,a_n=\sqrt3 .
$$

**补充解答（补足被略去的条件与一步计算）**

- Stolz 定理的条件：分母 $\dfrac1{a_n^2}$ 严格单调递增且趋于 $+\infty$，这由 $a_n\downarrow0$、$a_n>0$ 保证。
- 第三步将 $t^2\sin^2t$ 换成 $t^4$、$t+\sin t$ 换成 $2t$，属乘除因子的等价无穷小替换；末步 $\lim\limits_{t\to0}\dfrac{3t^2}{1-\cos t}=6$（再用一次洛必达，或由 $1-\cos t\sim\dfrac{t^2}{2}$）。
- 由 $n a_n^2\to3$ 且 $a_n>0$，得 $\sqrt{n}\,a_n=\sqrt{n a_n^2}\to\sqrt3$。
