---
slug: "26-homework-03"
title: "第 3 次作业与解析"
summary: "第 3 次作业的原题与解析。"
updatedAt: "2026-11-15"
content_type: "reference"
group: "homework"
displayNumber: "03"
tags:
  - "数学分析"
sources:
  - kind: article
    title: "3.png"
    url: "https://drive.google.com/file/d/1KU3O5IUpxQVlDA9O9FpA6TUHMrLzt0JV/view?usp=drivesdk"
---

本份作业没有配套的教师解答，以下每题都是补充解答。九道题分别落在四块内容上：单调有界定理（第 1 题）、子列与收敛的关系（第 2、4 题）、柯西收敛原理（第 3 题）、函数极限的定义与计算（第 5 至 8 题），最后用确界原理证明单调函数的单侧极限存在（第 9 题）。

---

## 第 1 题

设 $x_1=10$，$x_{n+1}=\sqrt{6+x_n}\ (n=1,2,\cdots)$，证明 $\{x_n\}$ 极限存在，并求此极限。

**补充解答** 递推式右边是平方根，只要 $6+x_n\ge0$ 就有定义；又 $x_1=10>0$，故各项都为正。

**第一步：证明 $x_n>3$ 对一切 $n$ 成立。** $x_1=10>3$。若 $x_n>3$，则 $x_{n+1}=\sqrt{6+x_n}>\sqrt9=3$。由归纳法，$x_n>3$ 恒成立。

**第二步：证明单调减少。** 对 $x_n>3$，

$$x_{n+1}<x_n\iff 6+x_n<x_n^2\iff x_n^2-x_n-6>0\iff (x_n-3)(x_n+2)>0,$$

而 $x_n>3$ 时右端确实为正。故 $x_n>x_{n+1}$。

**第三步：取极限。** $\{x_n\}$ 单调减少有下界 $3$，由单调有界定理收敛，设 $x_n\to L$，则 $L\ge3$。在 $x_{n+1}=\sqrt{6+x_n}$ 两边取极限，得

$$L=\sqrt{6+L}\iff L^2-L-6=0\iff L=3\ \text{或}\ L=-2 .$$

由 $L\ge3$ 舍去 $-2$，故 $\lim\limits_{n\to\infty}x_n=3$。

先证 $x_n>3$ 再证单调，顺序不能颠倒：$x_{n+1}<x_n$ 的等价条件 $(x_n-3)(x_n+2)>0$ 正好需要 $x_n>3$ 才成立。这类"先猜下界（或上界）、再用它证单调"的做法，是处理由递推式给出的数列的标准路线。极限值也可以直接从方程看出：$-2$ 与 $3$ 是 $L=\sqrt{6+L}$ 的两个根，其中只有 $3$ 在各项所在的范围 $[3,10]$ 内。

---

## 第 2 题

数列 $\{x_n\}$ 的子列 $\{x_{2k}\}$ 与 $\{x_{2k+1}\}$ 都收敛于 $a$，用"$\varepsilon$-$N$"语言证明 $\{x_n\}$ 也收敛于 $a$。

**补充解答** 任给 $\varepsilon>0$。由 $x_{2k}\to a$，存在 $K_1$，当 $k>K_1$ 时

$$|x_{2k}-a|<\varepsilon ;$$

由 $x_{2k+1}\to a$，存在 $K_2$，当 $k>K_2$ 时

$$|x_{2k+1}-a|<\varepsilon .$$

取

$$N=\max\{2K_1,\ 2K_2+1\}.$$

当 $n>N$ 时，若 $n$ 为偶数，写 $n=2k$，由 $2k=n>2K_1$ 得 $k>K_1$，故 $|x_n-a|<\varepsilon$；若 $n$ 为奇数，写 $n=2k+1$，由 $2k+1=n>2K_2+1$ 得 $k>K_2$，故 $|x_n-a|<\varepsilon$。两种情形都成立，故 $x_n\to a$。

要点是 $N$ 必须同时管住两类下标：偶数项要求 $k>K_1$，而 $k=n/2$，所以 $n>2K_1$；奇数项写 $n=2k+1$ 时 $k=(n-1)/2$，条件 $k>K_2$ 对应 $n>2K_2+1$。取 $\max$ 后两类都满足。

---

## 第 3 题

证明数列 $x_n=\dfrac{\sin1}{2}+\dfrac{\sin2}{2^2}+\cdots+\dfrac{\sin n}{2^n}$，$n\ge1$ 收敛。

**补充解答** 通项里含 $\sin k$，没有简单的求和公式，但每项都被几何级数控制，用柯西收敛原理最直接。

对任意正整数 $m>n$，

$$|x_m-x_n|=\left|\frac{\sin(n+1)}{2^{n+1}}+\cdots+\frac{\sin m}{2^m}\right|\le\frac{1}{2^{n+1}}+\frac{1}{2^{n+2}}+\cdots+\frac{1}{2^{m}}<\frac{1}{2^{n+1}}\cdot\frac{1}{1-\frac12}=\frac{1}{2^n}.$$

任给 $\varepsilon>0$，取 $N=\left[\log_2\dfrac1\varepsilon\right]+1$，当 $m>n>N$ 时

$$|x_m-x_n|<\frac{1}{2^n}<\varepsilon .$$

故 $\{x_n\}$ 是基本数列，由柯西收敛原理收敛。

这类题的判断依据是"后段尾部能被一个收敛的等比级数压住"。$\sin$ 的具体取值无关紧要，只要有界（$|\sin k|\le1$）就够；把 $|\sin k|$ 换成任何有界因子，结论不变。

---

## 第 4 题

证明数列 $\{x_n=\sin n,\ n\ge1\}$ 中有无穷多项大于 $\dfrac{\sqrt2}{2}$，也有无穷多项小于 $-\dfrac{\sqrt2}{2}$，并进一步证明数列 $\{x_n\}$ 发散。

**补充解答** 关键是一个关于"长度大于 $1$ 的开区间必含整数"的事实：

> 若开区间 $(c,d)$ 满足 $d-c>1$，则其中必有整数。取 $m=[c]+1$，则 $m>c$ 且 $m\le c+1<d$。

**第一步：无穷多项大于 $\frac{\sqrt2}{2}$。** 对每个整数 $k$，考虑开区间

$$I_k=\left(2k\pi+\frac\pi4,\ 2k\pi+\frac{3\pi}{4}\right),$$

其长度为 $\frac\pi2>1$，故 $I_k$ 中含有整数，记作 $n_k$。当 $n_k\in I_k$ 时，$n_k$ 的终边落在第一、二象限之间使正弦取值较大的那一段，具体地 $n_k=2k\pi+t$，$t\in\left(\frac\pi4,\frac{3\pi}{4}\right)$，于是

$$\sin n_k=\sin t>\sin\frac\pi4=\frac{\sqrt2}{2}.$$

不同的 $k$ 对应的区间 $I_k$ 互不相交，所以挑出的 $n_k$ 互不相同，个数无穷。

**第二步：无穷多项小于 $-\frac{\sqrt2}{2}$。** 同理，对每个 $k$ 取

$$J_k=\left(2k\pi-\frac{3\pi}{4},\ 2k\pi-\frac{\pi}{4}\right),$$

长度仍为 $\frac\pi2>1$，其中含整数 $m_k=2k\pi-t$，$t\in\left(\frac\pi4,\frac{3\pi}{4}\right)$，故

$$\sin m_k=-\sin t<-\frac{\sqrt2}{2}.$$

这样的 $m_k$ 也有无穷多个。

**第三步：证明发散。** 用柯西收敛原理。任给 $N$，由前两步，可取 $n>N$ 使 $\sin n>\frac{\sqrt2}{2}$，取 $m>N$ 使 $\sin m<-\frac{\sqrt2}{2}$，则

$$|x_n-x_m|=\sin n-\sin m>\frac{\sqrt2}{2}+\frac{\sqrt2}{2}=\sqrt2 .$$

取 $\varepsilon_0=\frac12$（或任何小于 $\sqrt2$ 的正数），无论 $N$ 多大，总能找到 $n,m>N$ 使 $|x_n-x_m|>\varepsilon_0$，故 $\{x_n\}$ 不是基本列，由柯西收敛原理，$\{x_n\}$ 发散。

也可以走子列的路：从 $\{x_{n_k}\}$ 中由致密性定理取出收敛子列，其极限 $\ge\frac{\sqrt2}{2}$；从 $\{x_{m_k}\}$ 中取出收敛子列，其极限 $\le-\frac{\sqrt2}{2}$。两个子列极限不同，故原数列发散。两条路本质相同，用柯西收敛原理少一次"再取子列"的操作。

这道题最容易卡在"怎么保证有整数落进去"。$n$ 取整数值，而 $\sin n$ 的取值由 $n\bmod 2\pi$ 决定，$n$ 的间距是 $1$，所以只要角度区间长度大于 $1$，就一定有整数落入——这正是条件 $\frac\pi2>1$ 的作用。

若把 $\frac{\sqrt2}{2}$ 换成 $\sin 1.6\approx0.9996$ 这类更靠近 $1$ 的值，区间长度会小于 $1$，这个论证就失效了，需要更精细的数论工具。

---

## 第 5 题

证明：若 $0<\delta<1$，且 $|x-4|<\delta$，则 $|\sqrt x-2|<\dfrac\delta2$，并进一步证明 $\lim\limits_{x\to4}\sqrt x=2$。

**补充解答** 有理化：

$$|\sqrt x-2|=\frac{|x-4|}{\sqrt x+2}<\frac{\delta}{\sqrt x+2}.$$

由 $|x-4|<\delta<1$ 得 $x>3$，故 $\sqrt x>\sqrt3>1$，从而 $\sqrt x+2>2$，于是

$$|\sqrt x-2|<\frac{\delta}{2}.$$

下面按定义证明极限。任给 $\varepsilon>0$，取

$$\delta=\min\{1,\ 2\varepsilon\},$$

当 $0<|x-4|<\delta$ 时，由上面的结论 $|\sqrt x-2|<\dfrac\delta2\le\varepsilon$，故 $\lim\limits_{x\to4}\sqrt x=2$。

前半段的作用正是给后半段提供 $\delta$ 的可用形式：一般情形下 $\delta$ 要同时满足"足够小以保证 $\sqrt x+2$ 有正下界"和"足够小以保证误差不超过 $\varepsilon$"，这里把两件事分别交给 $1$ 与 $2\varepsilon$，取 $\min$ 即可。

---

## 第 6 题

用极限的精确定义证明：

(1) $\lim\limits_{x\to a}\sin x=\sin a$；

(2) $\lim\limits_{x\to\infty}\dfrac{x^2+2}{3x^2}=\dfrac13$；

(3) $\lim\limits_{x\to2^+}\dfrac{2x}{x^2-4}=+\infty$。

### (1)

**补充解答** 用和差化积：

$$|\sin x-\sin a|=2\left|\cos\frac{x+a}{2}\right|\left|\sin\frac{x-a}{2}\right|\le2\cdot1\cdot\left|\frac{x-a}{2}\right|=|x-a|,$$

这里用了 $|\sin t|\le|t|$ 与 $|\cos t|\le1$。

任给 $\varepsilon>0$，取 $\delta=\varepsilon$，当 $0<|x-a|<\delta$ 时 $|\sin x-\sin a|\le|x-a|<\varepsilon$，故极限成立。

这个估计对一切实数 $a$ 一致有效，不依赖 $a$ 的大小，这也说明 $\sin x$ 在整条实轴上连续。

### (2)

**补充解答** 通分：

$$\left|\frac{x^2+2}{3x^2}-\frac13\right|=\left|\frac{3(x^2+2)-3x^2}{9x^2}\right|=\frac{6}{9x^2}=\frac{2}{3x^2}.$$

任给 $\varepsilon>0$，要使 $\dfrac{2}{3x^2}<\varepsilon$，只需 $x^2>\dfrac{2}{3\varepsilon}$。取

$$X=\sqrt{\frac{2}{3\varepsilon}}>0,$$

当 $|x|>X$ 时上式成立，故极限为 $\dfrac13$。

这里的 $\delta$ 换成了 $X$，因为过程是 $x\to\infty$；除此之外结构与 $\varepsilon$-$\delta$ 完全一样：解出 $|x|$ 的范围，把它作为门限。

### (3)

**补充解答** 任给 $G>0$，要找 $\delta>0$，使 $0<x-2<\delta$ 时 $\dfrac{2x}{x^2-4}>G$。

先加上条件 $\delta\le1$，此时 $2<x<3$，故 $x+2<5$，且 $2x>4$。于是

$$\frac{2x}{x^2-4}=\frac{2x}{(x-2)(x+2)}>\frac{4}{5(x-2)} .$$

取

$$\delta=\min\left\{1,\ \frac{4}{5G}\right\},$$

当 $0<x-2<\delta$ 时

$$\frac{2x}{x^2-4}>\frac{4}{5(x-2)}>\frac{4}{5\delta}\ge G .$$

故 $\lim\limits_{x\to2^+}\dfrac{2x}{x^2-4}=+\infty$。

放缩的方向要逐项检查：分子 $2x>4$ 使分式变大，分母 $(x-2)(x+2)<5(x-2)$ 也使分式变大，两边同时朝有利方向放大，才能得到只依赖 $x-2$ 的下界。若把 $x+2$ 估成大于某个数，方向就反了。

---

## 第 7 题

计算下列极限

(1) $\lim\limits_{x\to0}\dfrac{\sin3x}{5x}$；(2) $\lim\limits_{\theta\to0}\dfrac{1-\cos\theta}{\theta^2}$；(3) $\lim\limits_{x\to0}\dfrac{\sin^2x}{x^2}$；

(4) $\lim\limits_{x\to0}\dfrac{\tan x-\sin x}{\sin^3x}$；(5) $\lim\limits_{x\to0}\dfrac{\sin5x-\sin3x}{\sin x}$；(6) $\lim\limits_{x\to a}\dfrac{\sin x-\sin a}{x-a}$。

**补充解答**

**(1)** 凑成 $\dfrac{\sin\square}{\square}$ 的形状：

$$\lim_{x\to0}\frac{\sin3x}{5x}=\lim_{x\to0}\frac35\cdot\frac{\sin3x}{3x}=\frac35\cdot1=\frac35 .$$

**(2)** 用半角公式 $1-\cos\theta=2\sin^2\dfrac\theta2$：

$$\lim_{\theta\to0}\frac{1-\cos\theta}{\theta^2}=\lim_{\theta\to0}\frac{2\sin^2\frac\theta2}{\theta^2}=\frac12\lim_{\theta\to0}\left(\frac{\sin\frac\theta2}{\frac\theta2}\right)^2=\frac12 .$$

**(3)** 直接是平方：

$$\lim_{x\to0}\frac{\sin^2x}{x^2}=\left(\lim_{x\to0}\frac{\sin x}{x}\right)^2=1 .$$

**(4)** 提出 $\sin x$，把 $\tan x$ 拆成 $\dfrac{\sin x}{\cos x}$：

$$\frac{\tan x-\sin x}{\sin^3x}=\frac{\sin x\left(\frac{1}{\cos x}-1\right)}{\sin^3x}=\frac{1-\cos x}{\cos x\sin^2x}=\frac{1}{\cos x}\cdot\frac{1-\cos x}{\sin^2x}.$$

而

$$\frac{1-\cos x}{\sin^2x}=\frac{1-\cos x}{1-\cos^2x}=\frac{1}{1+\cos x}\longrightarrow\frac12 .$$

故原极限 $=1\cdot\dfrac12=\dfrac12$。

第 (4) 题的关键是把分子化成"$\sin x$ 乘一个因子"，这样约掉一个 $\sin x$ 之后，剩下的分式只含 $1-\cos x$ 与 $\sin^2 x$，再约一次就得到 $\dfrac{1}{1+\cos x}$。若直接用 $\tan x-\sin x\sim\frac{x^3}{2}$ 之类的等价无穷小，也可以，但那是后面才建立的工具，现在用三角恒等式最稳妥。

**(5)** 和差化积：

$$\sin5x-\sin3x=2\cos4x\sin x,$$

故

$$\lim_{x\to0}\frac{\sin5x-\sin3x}{\sin x}=\lim_{x\to0}2\cos4x=2 .$$

**(6)** 和差化积：

$$\sin x-\sin a=2\cos\frac{x+a}{2}\sin\frac{x-a}{2},$$

于是

$$\frac{\sin x-\sin a}{x-a}=\cos\frac{x+a}{2}\cdot\frac{\sin\frac{x-a}{2}}{\frac{x-a}{2}}\longrightarrow \cos a\cdot1=\cos a .$$

这里 $x\to a$ 时 $\dfrac{x-a}{2}\to0$，故第二个因子趋于 $1$；第一个因子由 $\cos$ 的连续性趋于 $\cos a$。第 (6) 题的结论就是 $(\sin x)'\big|_{x=a}=\cos a$，等到讲导数时会再遇到它。

---

## 第 8 题

(1) 自学课本 2.3.2 渐近线部分（课本 P45-47）。

(2) 设 $\lim\limits_{x\to\infty}\left(\dfrac{x^2+1}{x+1}-ax-b\right)=0$，试确定常数 $a$ 和 $b$。

注：直线 $y=ax+b$ 称为曲线 $y=\dfrac{x^2+1}{x+1}$ 的斜渐近线。

**补充解答** 先做多项式除法：

$$\frac{x^2+1}{x+1}=\frac{(x+1)(x-1)+2}{x+1}=x-1+\frac{2}{x+1}.$$

代回原式：

$$\frac{x^2+1}{x+1}-ax-b=(1-a)x-(1+b)+\frac{2}{x+1}.$$

当 $x\to\infty$ 时 $\dfrac{2}{x+1}\to0$。若 $1-a\ne0$，则 $(1-a)x$ 使整个式子趋于无穷，不可能趋于 $0$，故必须 $a=1$。此时只剩

$$-(1+b)\to0\ \Longrightarrow\ b=-1 .$$

于是 $a=1$，$b=-1$，斜渐近线为 $y=x-1$。

这类题的结构是"先除、再比系数"：把函数拆成"一次式 + 余项"，余项趋于零，则一次式必须与 $ax+b$ 完全一致，否则差会跑到无穷。若直接通分再令分子次数不足，也能得到同样的方程，但拆开写更清楚各个系数各自负责什么。

---

## 第 9 题

设 $f(x):[a,b]\to\mathbb{R}$ 为单调增函数，$x_0\in(a,b)$。证明：左右极限 $f(x_0^-)$，$f(x_0^+)$ 都存在。

**补充解答** 用确界原理。先处理左极限。

令

$$A=\{f(x)\mid a\le x<x_0\}.$$

**$A$ 非空：** $a<x_0$，故 $f(a)\in A$。

**$A$ 有上界：** 对任意 $x<x_0$，由 $f$ 单调增加得 $f(x)\le f(x_0)$，故 $f(x_0)$ 是 $A$ 的上界。

由确界原理，$A$ 有上确界，记 $L=\sup A$。下面证明 $\lim\limits_{x\to x_0^-}f(x)=L$。

任给 $\varepsilon>0$。由于 $L-\varepsilon$ 不是 $A$ 的上界，存在 $x_1\in[a,x_0)$ 使

$$f(x_1)>L-\varepsilon .$$

取 $\delta=x_0-x_1>0$。当 $-\delta<x-x_0<0$，即 $x_1<x<x_0$ 时，由单调性

$$L-\varepsilon<f(x_1)\le f(x)\le L,$$

故 $|f(x)-L|<\varepsilon$。这说明左极限存在，且 $f(x_0^-)=\sup\{f(x)\mid a\le x<x_0\}$。

再处理右极限。令

$$B=\{f(x)\mid x_0<x\le b\},$$

则 $B$ 非空（$f(b)\in B$）且有下界 $f(x_0)$，故有下确界，记 $M=\inf B$。任给 $\varepsilon>0$，$M+\varepsilon$ 不是 $B$ 的下界，存在 $x_2\in(x_0,b]$ 使 $f(x_2)<M+\varepsilon$。取 $\delta=x_2-x_0>0$，当 $0<x-x_0<\delta$ 即 $x_0<x<x_2$ 时，

$$M\le f(x)\le f(x_2)<M+\varepsilon,$$

故 $|f(x)-M|<\varepsilon$，即 $f(x_0^+)=\inf\{f(x)\mid x_0<x\le b\}$。

证明里没有用到 $f$ 连续，单调性已经足够，这是本题的要点：单调函数的单侧极限总是存在，只是可能不等于函数值。两个极限的大小关系也顺带得到

$$f(x_0^-)\le f(x_0)\le f(x_0^+),$$

中间的等号是否成立，正是判断 $x_0$ 处是否连续的依据，这一点下一讲会用到。

---

## 资料

- 原题：[3.png](https://drive.google.com/file/d/1KU3O5IUpxQVlDA9O9FpA6TUHMrLzt0JV/view?usp=drivesdk)
