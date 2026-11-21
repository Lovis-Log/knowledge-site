---
slug: "04-sequences-and-limits"
title: "数列与数列极限"
summary: "第 4 讲：数列与数列极限。"
updatedAt: "2026-11-15"
content_type: "reference"
group: "course"
displayNumber: "04"
tags:
  - "数学分析"
sources:
  - kind: article
    title: "4数列与数列极限.pdf"
    url: "https://drive.google.com/file/d/1hKb_9kvTo66taRZDSRlFHwi9SLYL7ayD/view?usp=drivesdk"
---

数列极限是整门课的第一块基石。后面所有的极限（函数极限、连续、导数、积分）都在重复同一套语言：先固定一个精度，再找一个门限，越过门限之后误差就一直小于这个精度。把这一讲的 $\varepsilon$-$N$ 说透，后面只是把"门限"换成 $\delta$、$X$ 而已。

## 数列

按正整数编了号的一串数

$$x_1,\ x_2,\ \cdots,\ x_n,\ \cdots$$

叫做数列，记作 $\{x_n\}$，其中 $x_n$ 称为通项。第一项是 $x_1$，第 $n$ 项是 $x_n$。例如

$$\frac1n:\ 1,\ \frac12,\ \frac13,\ \cdots,\ \frac1n,\ \cdots;\qquad \frac{n}{n+3}:\ \frac14,\ \frac25,\ \frac36,\ \cdots,\ \frac{n}{n+3},\ \cdots$$

$$n^2:\ 1,\ 4,\ 9,\ \cdots,\ n^2,\ \cdots;\qquad (-1)^n:\ -1,\ 1,\ -1,\ 1,\ \cdots,\ (-1)^n,\ \cdots$$

数列与数集的记号很像，但概念差别很大：

- 数集里元素之间没有次序，重复出现的数算同一个元素；
- 数列里每个数都有确定编号，前后次序不能颠倒，重复出现的数不能随便舍去。

所以 $(-1)^n$ 不能看成由 $1$ 与 $-1$ 两个数构成的集合，它是一串有无穷多项、且不断在 $-1$ 与 $1$ 之间跳动的数。

各项都等于同一个常数 $C$ 的数列称为常数列：$C,C,C,\cdots$。

## 极限的定义

先从直观入手。取

$$x_n = 0.\underbrace{33\cdots 3}_{n\ \text{个}3},$$

随着 $n$ 增大，$x_n$ 越来越接近 $1/3$。刘徽注《九章算术》说"割之弥细，所失弥少；割之又割，以至于不可割"，讲的正是这种"越往后误差越小、且可以小到任意程度"的现象。把这句话翻译成可以验证的语言，就是极限的定义。

**定义** 设 $\{x_n\}$ 是给定数列，$a$ 是实常数。如果对任意给定的 $\varepsilon>0$，都存在正整数 $N$，使得当 $n>N$ 时成立

$$|x_n-a|<\varepsilon,$$

则称数列 $\{x_n\}$ 收敛于 $a$（$a$ 称为它的极限），记作

$$\lim_{n\to\infty}x_n=a,\qquad \text{或}\quad x_n\to a\ (n\to\infty).$$

如果不存在这样的实数 $a$，就称 $\{x_n\}$ 发散。

回到上面的例子，用定义验证 $x_n=0.\underbrace{33\cdots3}_{n}\to \frac13$：注意

$$\left|x_n-\frac13\right| = \frac13\cdot \frac{1}{10^n} = \frac{1}{3\cdot 10^n}.$$

对任意 $\varepsilon>0$，要 $\frac{1}{3\cdot10^n}<\varepsilon$，只需 $10^n>\frac{1}{3\varepsilon}$，即 $n>\lg\frac{1}{3\varepsilon}$。于是取 $N=\left[\lg\frac{1}{3\varepsilon}\right]+1$，当 $n>N$ 时就有 $|x_n-\frac13|<\varepsilon$。

写全就是：$\lim\limits_{n\to\infty}x_n=a$ 指的是

$$\forall \varepsilon>0,\ \exists N\ge 1,\ \text{s.t.}\ n>N\ \text{时}\ |x_n-a|<\varepsilon .$$

## 定义的四层含义

定义只有一句话，用起来却有很多细节，这些细节决定了后面证明的写法。

**一、有限项无关紧要。** 改变、增加或删除数列中的有限项，不影响它的敛散性，收敛时极限值也不变。原因是定义只要求"从某一项之后"成立，前面的有限项落在哪里都无所谓。

**二、$\varepsilon$ 必须任意给定，不能用一个很小的正数代替。** "任意"强调的是可以任意小，而不是任意大。也正因为只需要它小，定义里的 $\forall\varepsilon>0$ 可以换成 $\forall\varepsilon\in(0,\frac12)$ 或 $\forall\varepsilon\in(0,\delta)$ 这类说法：只要 $\varepsilon$ 能跑遍任意接近 $0$ 的正数，效果相同。

**三、先有 $\varepsilon$，后有 $N$。** 只有 $\varepsilon$ 定了，才谈得上找相应的 $N$，而且一般 $\varepsilon$ 越小，$N$ 越大。若 $N_0$ 已经满足 $|x_n-a|<\varepsilon\ (n>N_0)$，那么 $N_0+1,N_0+2,\cdots$ 也都满足。所以不必去找满足条件的最小 $N$，只要 $N$ 存在。

证明中真正要照顾的是**可解性和式子的简洁**：为了解出 $n$ 的范围，把 $|x_n-a|$ 逐步放大是常规手段，只要放大后的式子仍能任意小，证明就成立。

**四、右端可以换成 $2\varepsilon$、$M\varepsilon$。** 因为"$\varepsilon$ 取遍所有正数"与"$M\varepsilon$ 取遍所有正数"（$M>0$ 固定）是同一件事，所以

$$|x_n-a|<2\varepsilon,\qquad |x_n-a|<M\varepsilon$$

都可以作为收敛的等价说法。这一点在放缩后出现常数因子时特别省事。

**邻域的说法。** 记点 $a$ 的 $\varepsilon$ 邻域为

$$O(a,\varepsilon)=\{x\mid a-\varepsilon<x<a+\varepsilon\},$$

则 $|x_n-a|<\varepsilon\iff x_n\in O(a,\varepsilon)$。于是"当 $n>N$ 时 $|x_n-a|<\varepsilon$"的几何意思是：数列从第 $N+1$ 项起，所有项都落进了 $a$ 的 $\varepsilon$ 邻域。

## 用定义证明收敛

> **关键结论**：定义证明的套路固定：写出 $|x_n-a|$，通分或有理化，放大成一个只依赖 $n$ 的简单式子，再令它小于 $\varepsilon$ 解出 $n>N$，最后把 $N$ 取成整数。

下面几个例子覆盖了最常见的几种放大方式。

**例 1** 设 $x_n=\dfrac{n^2-n+2}{3n^2+2n-4}$，证明 $\lim\limits_{n\to\infty}x_n=\dfrac13$。

**证明** 先算差：

$$\left|x_n-\frac13\right|=\frac{|3(n^2-n+2)-(3n^2+2n-4)|}{3(3n^2+2n-4)}=\frac{|10-5n|}{3(3n^2+2n-4)} .$$

分子里 $5n-10<5n$；分母当 $n\ge 3$ 时 $3n^2+2n-4>3n^2$，故分母 $>9n^2$。于是当 $n\ge3$ 时

$$\left|x_n-\frac13\right|<\frac{5n}{9n^2}=\frac{5}{9n}.$$

对任意 $\varepsilon>0$，取 $N=\max\left\{2,\left[\frac{5}{9\varepsilon}\right]+1\right\}$，则 $n>N$ 时 $\frac{5}{9n}<\varepsilon$，从而 $|x_n-\frac13|<\varepsilon$。证毕。

这里放大的思路值得记住：分子用 $|10-5n|<5n$ 把常数项扔掉，分母只留最高次项并夸大（去掉正项使分母变小、整个分式变大），剩下 $\frac{5}{9n}$ 就能解出 $n$。

**例 2** 设 $0<|q|<1$，证明 $\lim\limits_{n\to\infty}q^n=0$。

**证明** 令 $\frac{1}{|q|}=1+h$，则 $h>0$。由伯努利不等式 $(1+h)^n\ge 1+nh$，

$$0<|q|^n=\frac{1}{(1+h)^n}\le \frac{1}{1+nh}<\frac{1}{nh}.$$

对任意 $\varepsilon>0$，取 $N=\left[\frac{1}{h\varepsilon}\right]+1$，当 $n>N$ 时 $|q|^n<\varepsilon$，即 $q^n\to0$。证毕。

**例 3** 设 $a>1$，证明 $\lim\limits_{n\to\infty}\sqrt[n]{a}=1$。

**证明** 令 $\sqrt[n]{a}=1+h_n$，则 $h_n>0$，且

$$a=(1+h_n)^n\ge 1+nh_n\ \Longrightarrow\ 0<h_n\le\frac{a-1}{n}.$$

于是 $1\le \sqrt[n]{a}\le 1+\frac{a-1}{n}$，两边夹得 $\sqrt[n]{a}\to1$。证毕。

**例 4** 证明 $\lim\limits_{n\to\infty}\sqrt[n]{n}=1$。

**证明** 令 $\sqrt[n]{n}=1+h_n$，则 $h_n>0$。对 $n\ge2$ 用二项式展开，只取含 $h_n^2$ 的那一项：

$$n=(1+h_n)^n\ge \frac{n(n-1)}{2}h_n^2\ \Longrightarrow\ 0\le h_n\le\sqrt{\frac{2}{n-1}}.$$

右边趋于 $0$，故 $h_n\to0$，即 $\sqrt[n]{n}\to1$。证毕。

例 3、例 4 的手法一样：把待求极限的 $n$ 次根写成 $1+h_n$，再从 $a=(1+h_n)^n$（或 $n=(1+h_n)^n$）里把 $h_n$ 挤到 $0$。区别只在例 4 必须展开到二阶，因为一阶项 $\ge 1+nh_n$ 只能给出 $h_n\le\frac{n-1}{n}$，压不到 $0$。

若数列 $\{x_n\}$ 以 $0$ 为极限，就称它是**无穷小量**。由定义立即可见

$$x_n\to a\iff x_n-a\ \text{是无穷小量},$$

这条等价关系把"收敛到 $a$"统一成了"与 $a$ 的偏差是无穷小"，后面做四则运算时常用。

**例 5** 设 $\lim\limits_{n\to\infty}a_n=a$，证明 $\lim\limits_{n\to\infty}\dfrac{a_1+a_2+\cdots+a_n}{n}=a$。

**证明** 记 $S_n=\frac{a_1+\cdots+a_n}{n}$。任给 $\varepsilon>0$，由 $a_n\to a$，存在 $N_1$，使 $n>N_1$ 时 $|a_n-a|<\frac{\varepsilon}{2}$。又收敛数列有界，存在 $M>0$ 使 $|a_n-a|\le M$ 对一切 $n$ 成立。于是当 $n>N_1$ 时

$$|S_n-a|\le\frac{1}{n}\sum_{k=1}^{n}|a_k-a|=\frac{1}{n}\sum_{k=1}^{N_1}|a_k-a|+\frac{1}{n}\sum_{k=N_1+1}^{n}|a_k-a|\le \frac{N_1M}{n}+\frac{\varepsilon}{2}.$$

再取 $N=\max\left\{N_1,\left[\frac{2N_1M}{\varepsilon}\right]+1\right\}$，当 $n>N$ 时第一项也小于 $\frac{\varepsilon}{2}$，故 $|S_n-a|<\varepsilon$。

这个结论的意思是"收敛数列的算术平均也收敛到同一极限"。它值得单独记住：

> **理解关键**：证明里把和拆成"前 $N_1$ 项"与"后面各项"两段，前面那段用有界性控制个数、让 $n$ 把它压小，后面那段用收敛性直接控制每项——这个"分两段"的技巧在后面判断数列收敛时反复出现。

## 极限的性质

**性质 1（唯一性）** 若 $\{x_n\}$ 收敛，且 $\lim x_n=a$，$\lim x_n=b$，则 $a=b$。

**证明** 反设 $a\ne b$，不妨 $a<b$，取 $\varepsilon_0=\frac{b-a}{2}>0$。由定义，存在 $N$，当 $n>N$ 时同时有 $|x_n-a|<\varepsilon_0$ 与 $|x_n-b|<\varepsilon_0$，于是

$$b-a\le|b-x_n|+|x_n-a|<2\varepsilon_0=b-a,$$

矛盾。故 $a=b$。

**性质 2（有界性）** 若 $\{x_n\}$ 收敛，则存在 $M>0$，使 $|x_n|\le M$ 对一切 $n\ge1$ 成立。

**证明** 设 $x_n\to a$，取 $\varepsilon=1$，存在 $N$，当 $n>N$ 时 $|x_n|<|a|+1$。令

$$M=\max\{|x_1|,|x_2|,\cdots,|x_N|,|a|+1\},$$

则 $|x_n|\le M$ 对一切 $n$ 成立。

注意反过来不成立：有界数列未必收敛，$(-1)^n$ 就是反例。所以有界性只是必要条件。

**性质 3（保序性）** 设 $\lim\limits_{n\to\infty}x_n=a$，$\lim\limits_{n\to\infty}y_n=b$。

1. 若 $a<b$，则存在 $N\ge1$，使 $n\ge N$ 时 $x_n<y_n$；
2. 若存在 $N$，使 $n>N$ 时 $x_n<y_n$，则 $a\le b$（注意得不出 $a<b$）；
3. 若存在 $N$，使 $n>N$ 时 $x_n\le y_n$，则 $a\le b$。

> **易错点**：第 2 条为什么只能得到 $\le$？取 $x_n=0$，$y_n=\frac1n$，处处有 $x_n<y_n$，但两个极限都等于 $0$。严格不等式在取极限后会"退化"成非严格不等式，这是最容易出错的地方。

**性质 4（两边夹定理）** 设 $\lim\limits_{n\to\infty}x_n=\lim\limits_{n\to\infty}z_n=a$，且存在 $N_0$，使 $n>N_0$ 时 $x_n\le y_n\le z_n$，则 $\lim\limits_{n\to\infty}y_n=a$。

**证明** 任给 $\varepsilon>0$，存在 $N_1,N_2$，使 $n>N_1$ 时 $x_n>a-\varepsilon$，$n>N_2$ 时 $z_n<a+\varepsilon$。取 $N=\max\{N_0,N_1,N_2\}$，当 $n>N$ 时

$$a-\varepsilon<x_n\le y_n\le z_n<a+\varepsilon,$$

即 $|y_n-a|<\varepsilon$。

**例 6** 设 $a_1,a_2,\cdots,a_k$ 为 $k$ 个正数，证明

$$\lim_{n\to\infty}\sqrt[n]{a_1^n+a_2^n+\cdots+a_k^n}=\max\{a_1,a_2,\cdots,a_k\}.$$

**证明** 设 $M=\max\{a_1,\cdots,a_k\}$，则 $a_i\le M$ 且至少有一个等于 $M$，故

$$M=\sqrt[n]{M^n}\le\sqrt[n]{a_1^n+\cdots+a_k^n}\le\sqrt[n]{kM^n}=M\sqrt[n]{k}.$$

由例 3 的结论（$k\ge1$ 时 $\sqrt[n]{k}\to1$），右端趋于 $M$，两边夹即得结论。

**例 7** 设 $0<\alpha<1$，证明 $\lim\limits_{n\to\infty}\left[(n+1)^\alpha-n^\alpha\right]=0$。

**证明** 提出 $n^\alpha$：

$$0<(n+1)^\alpha-n^\alpha=n^\alpha\left[\left(1+\frac1n\right)^\alpha-1\right].$$

使用幂函数的 Bernoulli 不等式：$0<\alpha<1$ 时， $(1+t)^\alpha\le1+\alpha t\ (t\ge0)$，于是

$$0<(n+1)^\alpha-n^\alpha\le n^\alpha\cdot\frac{\alpha}{n}=\alpha n^{\alpha-1}=\frac{\alpha}{n^{1-\alpha}}\to0 .$$

关键是先提出 $n^\alpha$，把幂之差转成 $(1+1/n)^\alpha-1$，再用上述不等式给出 $\alpha/n$ 的上界。由 $1-\alpha>0$，最终得到的上界趋于零。

## 四则运算

**定理** 设 $\lim\limits_{n\to\infty}x_n=a$，$\lim\limits_{n\to\infty}y_n=b$，则

1. $\lim\limits_{n\to\infty}(\alpha x_n+\beta y_n)=\alpha a+\beta b$（$\alpha,\beta$ 为常数）；
2. $\lim\limits_{n\to\infty}(x_ny_n)=ab$；
3. $\lim\limits_{n\to\infty}\dfrac{x_n}{y_n}=\dfrac{a}{b}$（$b\ne0$）。

用一句话概括：极限运算与 $+,-,\times,\div$ 可以交换顺序——和的极限等于极限的和，积的极限等于极限的积，商的极限等于极限的商（分母极限不为零）。

证明 $x_ny_n\to ab$ 时用"加一项减一项"：

$$|x_ny_n-ab|\le|x_n||y_n-b|+|b||x_n-a|,$$

第一项里 $|x_n|$ 有界、$|y_n-b|\to0$，第二项里 $|b|$ 是常数、$|x_n-a|\to0$，两项都趋于 $0$。商的结论则由 $\frac{x_n}{y_n}=x_n\cdot\frac{1}{y_n}$ 与"$y_n\to b\ne0$ 时 $\frac{1}{y_n}\to\frac1b$"得到，后者要用局部保序性说明 $|y_n|$ 从某项起有正下界。

对第 2 条还有一个常用的放宽：**若 $x_n\to0$，而 $\{y_n\}$ 只是有界，仍有 $x_ny_n\to0$。** 因为 $|x_ny_n|\le M|x_n|\to0$。这条结论允许我们在一边的极限不存在时仍然处理乘积，非常实用。

**例 9** 设 $a>0$，证明 $\lim\limits_{n\to\infty}\sqrt[n]{a}=1$。

**证明** $a=1$ 时显然。$a>1$ 时即例 3。$0<a<1$ 时 $\frac1a>1$，由例 3 得 $\sqrt[n]{\frac1a}\to1$，而 $\sqrt[n]{a}=\dfrac{1}{\sqrt[n]{1/a}}$，由商的法则得 $\sqrt[n]{a}\to1$。

**例 10** 设 $x_n>0\ (n\ge1)$，$\lim\limits_{n\to\infty}x_n=a$，证明 $\lim\limits_{n\to\infty}\sqrt[n]{x_1x_2\cdots x_n}=a$。

这是例 5 的"几何平均版本"。分两种情形。

**$a=0$ 的情形。** 由算术—几何平均不等式

$$0<\sqrt[n]{x_1x_2\cdots x_n}\le\frac{x_1+x_2+\cdots+x_n}{n},$$

右端由例 5 趋于 $0$，故几何平均也趋于 $0$。

**$a>0$ 的情形。** 令 $y_n=\frac{x_n}{a}$，则 $y_n\to1$，且

$$\sqrt[n]{x_1\cdots x_n}=a\sqrt[n]{y_1\cdots y_n},$$

问题化为证 $\sqrt[n]{y_1\cdots y_n}\to1$。任给 $\varepsilon\in(0,\frac12)$，存在 $N$，当 $n>N$ 时 $1-\varepsilon<y_n<1+\varepsilon$。记 $P=y_1y_2\cdots y_N>0$，则当 $n>N$ 时

$$(1-\varepsilon)^{n-N}P\le y_1y_2\cdots y_n\le(1+\varepsilon)^{n-N}P .$$

开 $n$ 次方：

$$(1-\varepsilon)^{1-\frac Nn}P^{1/n}\le\sqrt[n]{y_1\cdots y_n}\le(1+\varepsilon)^{1-\frac Nn}P^{1/n}.$$

$N$ 固定，$P^{1/n}\to1$，故两端分别趋于 $1-\varepsilon$ 与 $1+\varepsilon$。于是存在 $N'$，当 $n>N'$ 时

$$1-2\varepsilon<\sqrt[n]{y_1\cdots y_n}<1+2\varepsilon.$$

由 $\varepsilon$ 的任意性得极限为 $1$，从而 $\sqrt[n]{x_1\cdots x_n}\to a$。

**例 11** 求极限 $\lim\limits_{n\to\infty}\left(\dfrac{1}{n^2+1}+\dfrac{1}{n^2+2}+\cdots+\dfrac{1}{n^2+n}\right)$。

**解** 和式共有 $n$ 项，每项分母都介于 $n^2+1$ 与 $n^2+n$ 之间，故

$$\frac{n}{n^2+n}\le\sum_{k=1}^{n}\frac{1}{n^2+k}\le\frac{n}{n^2+1}.$$

两端都趋于 $0$，由两边夹定理，所求极限为 $0$。

项数固定为 $n$ 而分子是常数时，"每项都用最小（最大）分母去估"就能把和夹住，这一类题不必真去求和。

## 单调有界收敛定理

已知收敛必有界，但有界未必收敛。自然要问：有界数列再加什么条件就能收敛？答案是单调性。

**定理** 单调有界数列必收敛。

**证明** 以单调增加且有上界的 $\{x_n\}$ 为例。由确界原理，数集 $X=\{x_n\}$ 有上确界，记为 $a$。由上确界的定义，$x_n\le a$ 对一切 $n$ 成立；且对任意 $\varepsilon>0$，$a-\varepsilon$ 不是 $X$ 的上界，故存在 $x_N$ 使 $x_N>a-\varepsilon$。由单调增加，当 $n>N$ 时

$$a-\varepsilon<x_N\le x_n\le a,$$

即 $|x_n-a|<\varepsilon$，故 $x_n\to a$。单调减少有下界的情形同理，极限是下确界。

> **理解关键**：这个定理的分量在于：**它在极限值未知时就能断定极限存在**。用定义证明收敛必须事先知道极限是多少；用单调有界则先拿到"存在"，再用别的手段（往往是对递推式两边取极限）求值。后面定义 $e$ 和 $\pi$ 都靠这一点。

**例 12** 设 $a>0$，$y_1=a$，$y_2=\sqrt{a+a}$，$\cdots$，$y_n=\sqrt{a+y_{n-1}}$，证明 $\{y_n\}$ 收敛并求极限。

**解** 各项显然为正。先看单调性：

$$y_2\ge y_1\iff\sqrt{2a}\ge a\iff a\le 2 .$$

**若 $0<a\le2$：** 用归纳法证 $y_n\le2$ 且单调增加。$y_1=a\le2$；若 $y_n\le2$，则 $y_{n+1}=\sqrt{a+y_n}\le\sqrt{4}=2$。又若 $y_n\ge y_{n-1}$，则 $y_{n+1}=\sqrt{a+y_n}\ge\sqrt{a+y_{n-1}}=y_n$，故 $\{y_n\}$ 单调增加有上界 $2$，收敛。

**若 $a>2$：** 此时 $y_2=\sqrt{2a}<a=y_1$，首两项已经下降。又若 $y_n<y_{n-1}$，则 $y_{n+1}=\sqrt{a+y_n}<\sqrt{a+y_{n-1}}=y_n$，故 $\{y_n\}$ 单调减少。同前归纳可得 $y_n>2$（$y_1=a>2$；若 $y_n>2$，则 $y_{n+1}=\sqrt{a+y_n}>\sqrt4=2$），有下界，收敛。

总之 $\{y_n\}$ 单调有界，设 $y_n\to L$。在 $y_{n+1}=\sqrt{a+y_n}$ 两边取极限，由 $\sqrt{\ }$ 的连续性（或直接平方）得

$$L=\sqrt{a+L}\iff L^2-L-a=0\iff L=\frac{1+\sqrt{1+4a}}{2},$$

负根舍去（各项为正）。这也解释了上面为什么要分 $a\le2$ 与 $a>2$：单调方向由首两项决定，但两种情形都收敛到同一个值。

## 自然对数的底 $e$

**例 13** 设 $x_n=1+\dfrac{1}{1!}+\dfrac{1}{2!}+\cdots+\dfrac{1}{n!}$，证明 $\lim\limits_{n\to\infty}x_n$ 存在。

**证明** $\{x_n\}$ 显然单调增加。又有

$$x_n\le1+1+\frac12+\frac1{2^2}+\cdots+\frac1{2^{n-1}}<1+\frac{1}{1-\frac12}=3,$$

因为 $k!\ge2^{k-1}$。故 $\{x_n\}$ 单调增加有上界，收敛。

**例 14** 设 $y_n=\left(1+\dfrac1n\right)^n$，证明 $\lim\limits_{n\to\infty}y_n$ 存在。

**证明** 用二项式展开：

$$y_n=\sum_{k=0}^{n}\frac{n(n-1)\cdots(n-k+1)}{k!\,n^k}=\sum_{k=0}^{n}\frac{1}{k!}\left(1-\frac1n\right)\left(1-\frac2n\right)\cdots\left(1-\frac{k-1}{n}\right).$$

每一项都随 $n$ 增大而增大（括号里每个因子变大），且项数也随 $n$ 增加，故 $\{y_n\}$ 单调增加。又每项不超过 $\frac1{k!}$，故 $y_n\le x_n<3$，有上界。由单调有界定理，$\{y_n\}$ 收敛。

**例 15** 证明例 13 与例 14 中的两个极限相等。

**证明** 由上式，$y_n\le\sum_{k=0}^{n}\frac1{k!}=x_n$，故 $\varlimsup y_n\le\varlimsup x_n$。

另一方面，固定 $m$，当 $n\ge m$ 时

$$\sum_{k=0}^{m}\frac{1}{k!}\left(1-\frac1n\right)\cdots\left(1-\frac{k-1}{n}\right)\le y_n .$$

令 $n\to\infty$，左端趋于 $x_m$，故 $x_m\le\varliminf y_n$。再令 $m\to\infty$ 得 $\varlimsup x_n\le\varliminf y_n$。两个方向合起来，两个数列的极限相等。

这个公共极限记作 $e$，即

$$e=\lim_{n\to\infty}\left(1+\frac1n\right)^n=\sum_{k=0}^{\infty}\frac{1}{k!}\approx2.71828\cdots,$$

自然对数就是以 $e$ 为底的对数。

**例 16** 证明 $e$ 为无理数。

**证明** 反设 $e=\frac pq$（$p,q$ 为正整数）。由级数表示，

$$q!\,e=\sum_{k=0}^{q}\frac{q!}{k!}+\sum_{k=q+1}^{\infty}\frac{q!}{k!}.$$

第一个和是整数（$k\le q$ 时 $\frac{q!}{k!}$ 为整数）。记第二个和为 $R$，则 $R>0$，且

$$0<R=\frac{1}{q+1}+\frac{1}{(q+1)(q+2)}+\cdots<\frac{1}{q+1}\left(1+\frac1{q+1}+\frac{1}{(q+1)^2}+\cdots\right)=\frac1q\le1 .$$

于是 $q!e$ 是一个整数加上一个严格介于 $0$ 与 $1$ 之间的数，不可能是整数，与 $q!e=q!\,\frac pq=(q-1)!\,p$ 为整数矛盾。故 $e$ 无理。

**单调有界定理的进一步应用：** 下面四个结论把 $e$ 的两侧夹住了，后面求导、估计 $e$ 的误差都要用。

(1) $a_n=\left(1+\frac1n\right)^n$ 严格单调增加且收敛到 $e$；

(2) $b_n=\left(1+\frac1n\right)^{n+1}$ 严格单调减少且收敛到 $e$；

(3) $\dfrac{1}{n+1}<\ln\left(1+\dfrac1n\right)<\dfrac1n$，$\forall n\ge1$；

(4) $x_n=1+\dfrac12+\dfrac13+\cdots+\dfrac1n-\ln n$ 收敛。

**(1) 的另一个证法（几何平均小于算术平均）** 对 $n+1$ 个正数 $1,\left(1+\frac1n\right),\cdots,\left(1+\frac1n\right)$（其中 $1+\frac1n$ 取 $n$ 个）用均值不等式：

$$\left(1+\frac1n\right)^{\frac{n}{n+1}}=\sqrt[n+1]{1\cdot\left(1+\frac1n\right)^n}<\frac{1+n\left(1+\frac1n\right)}{n+1}=\frac{n+2}{n+1}=1+\frac{1}{n+1}.$$

两边取 $n+1$ 次方得 $a_n<a_{n+1}$。所有不等号都是严格的，因为等号成立要求所有数相等，而 $1\ne1+\frac1n$。

**(2)** 令 $c_n=\frac{1}{b_n}=\left(1-\frac{1}{n+1}\right)^{n+1}$，只需证 $c_n$ 严格单调增加。对 $n+2$ 个正数 $1$ 与（$n+1$ 个）$1-\frac{1}{n+1}$ 用均值不等式：

$$c_n^{\frac{1}{n+2}}=\sqrt[n+2]{1\cdot\left(1-\frac{1}{n+1}\right)^{n+1}}<\frac{1+(n+1)\left(1-\frac{1}{n+1}\right)}{n+2}=\frac{n+1}{n+2}=1-\frac{1}{n+2},$$

故 $c_n<\left(1-\frac{1}{n+2}\right)^{n+2}=c_{n+1}$。于是 $c_n$ 增加有上界 $1$，$b_n$ 减少有下界 $1$，因而收敛；又 $\frac{b_n}{a_n}=1+\frac1n\to1$，故 $b_n\to e$。

**(3)** 由 (1)(2)，$\left(1+\frac1n\right)^n<e<\left(1+\frac1n\right)^{n+1}$。取对数：

$$n\ln\left(1+\frac1n\right)<1<(n+1)\ln\left(1+\frac1n\right),$$

两边分别除以 $n$ 与 $n+1$ 即得 $\frac{1}{n+1}<\ln\left(1+\frac1n\right)<\frac1n$。

**(4)** 由 (3) 的右半，$\frac{1}{n+1}<\ln(n+1)-\ln n$，故

$$x_{n+1}-x_n=\frac{1}{n+1}-\ln\left(1+\frac1n\right)<0,$$

即 $\{x_n\}$ 单调减少。又由 (3) 的左半，$\frac1k>\ln\left(1+\frac1k\right)=\ln(k+1)-\ln k$，求和得

$$x_n=\sum_{k=1}^{n}\frac1k-\ln n>\ln(n+1)-\ln n>0,$$

有下界。由单调有界定理，$\{x_n\}$ 收敛。这个极限称为欧拉常数，记作 $\gamma\approx0.5772$。

## 圆周率 $\pi$

**例 17** 设计一个方案求圆的周长与半径之比。

**解** 取半径为 $r$ 的圆，作内接正 $n$ 边形。圆心角被分成 $n$ 个 $\frac{2\pi}{n}$，每条边长 $2r\sin\frac{\pi}{n}$，故内接正 $n$ 边形的周长为

$$L_n=2nr\sin\frac{\pi}{n},\qquad \frac{L_n}{2r}=n\sin\frac{\pi}{n}.$$

当 $n\to\infty$ 时，$n\sin\frac{\pi}{n}=\pi\cdot\frac{\sin(\pi/n)}{\pi/n}\to\pi$。这个极限就是圆周长与直径之比，记作 $\pi$，它是无量纲的，与半径大小无关。实际计算时用外切正 $n$ 边形的周长 $2nr\tan\frac{\pi}{n}$ 从另一侧夹住，误差可以估计，这正是刘徽割圆术的算法含义。

**例 18** 推导圆的面积公式。

**解** 把圆分成 $n$ 个全等的扇形，每个扇形用等腰三角形近似，面积 $\frac12r^2\sin\frac{2\pi}{n}$，于是内接正 $n$ 边形的面积

$$S_n=\frac n2 r^2\sin\frac{2\pi}{n}=\pi r^2\cdot\frac{\sin(2\pi/n)}{2\pi/n}\to\pi r^2 .$$

外切正 $n$ 边形的面积 $\frac n2r^2\tan\frac{2\pi}{n}$ 同样趋于 $\pi r^2$，两边夹得圆面积 $S=\pi r^2$。

**弧度。** 弧长与半径的比值称为该弧所对圆心角的弧度数。它与角度制一一对应：

$$2\pi\to360^\circ,\quad \pi\to180^\circ,\quad \frac\pi2\to90^\circ,\quad \frac\pi3\to60^\circ,\quad \frac\pi4\to45^\circ,\quad \frac\pi6\to30^\circ .$$

弧度制的价值在于：只有用弧度，才有 $\lim\limits_{x\to0}\frac{\sin x}{x}=1$ 以及后面的 $(\sin x)'=\cos x$。若用角度制，这些公式里会多出一个 $\frac{\pi}{180}$ 的因子，所有求导公式都要改写。至于周角为什么定为 $360^\circ$，那是巴比伦六十进制的历史遗留，没有任何数学上的必然性。

**一个重要不等式** 对 $0<\theta<\frac\pi2$，有

$$\sin\theta<\theta<\tan\theta .$$

几何证明：在单位圆上取圆心 $O$、圆上一点 $A$ 与另一点 $B$，使 $\angle AOB=\theta$；过 $B$ 作 $OA$ 的垂线，垂足为 $C$；过 $A$ 作圆的切线，与 $OB$ 的延长线交于 $D$。比较三块面积：

$$S_{\triangle OAB}=\frac12\sin\theta< S_{\text{扇形}OAB}=\frac12\theta< S_{\triangle OAD}=\frac12\tan\theta .$$

乘以 $2$ 即得。这个不等式是后面证明 $\frac{\sin x}{x}\to1$ 的唯一入口，务必记住它是"面积夹"出来的。

## 无穷大量

$n^2$、$(-2)^n$、$-10^n$ 这类数列与 $(-1)^n$ 一样都发散，但性质完全不同：前者各项绝对值无限制地增大，后者始终在有限范围内跳动。前者称为无穷大量。

**定义** 若对任意 $G>0$，存在 $N$，使 $n>N$ 时 $x_n>G$，则称 $\{x_n\}$ 为**正无穷大量**，记 $\lim\limits_{n\to\infty}x_n=+\infty$。若 $n>N$ 时 $x_n<-G$，称为**负无穷大量**，记 $\lim\limits_{n\to\infty}x_n=-\infty$。若 $n>N$ 时 $|x_n|>G$，称为**无穷大量**，记 $\lim\limits_{n\to\infty}x_n=\infty$。

必须强调：$\lim\limits_{n\to\infty}x_n=\infty$ 只是一个记号，并不意味着数列收敛，$\{x_n\}$ 仍然是发散的。若无穷大量从某项起各项都是正的（负的），它就是正（负）无穷大量。$n^2$ 是正无穷大量，$-10^n$ 是负无穷大量，$(-2)^n$ 是不定号的无穷大量。

**例 19** 设 $|q|>1$，证明 $q^n$ 是无穷大量。

**证明** 令 $|q|=1+h$，$h>0$。由伯努利不等式 $|q|^n\ge1+nh$，对任意 $G>0$，取 $N=\left[\frac{G}{h}\right]+1$，当 $n>N$ 时 $|q^n|>G$。

**例 20** 证明 $\dfrac{2n^3-5n+1}{5n^2-4n-4}$ 是正无穷大量。

**证明** 把分子分母同除以 $n^2$：

$$\frac{2n^3-5n+1}{5n^2-4n-4}=n\cdot\frac{2-\frac5{n^2}+\frac1{n^3}}{5-\frac4n-\frac4{n^2}} .$$

当 $n\ge4$ 时，分子中的因子 $>2-\frac{5}{16}>1$，分母中的因子 $<5$，故原式 $>\frac{n}{5}$。对任意 $G>0$，取 $N=\max\{4,[5G]+1\}$，当 $n>N$ 时原式 $>G$。

**无穷大量的运算性质。**

**定理** 设 $x_n\ne0$，则 $\{x_n\}$ 是无穷大量的充要条件是 $\left\{\dfrac{1}{x_n}\right\}$ 是无穷小量。

**定理** 设 $\{x_n\}$ 是无穷大量，且当 $n>N_0$ 时 $y_n\ge\delta>0$，则 $\{x_ny_n\}$ 是无穷大量。

> **易混点**：对比记忆：$x_n$ 是无穷小、$y_n$ 有界，则 $x_ny_n$ 是无穷小；$x_n$ 是无穷大、$y_n$ 有正下界，则 $x_ny_n$ 是无穷大。两边都要求"另一个因子不捣乱"。

**推论** 设 $\{x_n\}$ 是无穷大量，$\lim\limits_{n\to\infty}y_n=b\ne0$，则 $\{x_ny_n\}$ 与 $\left\{\dfrac{x_n}{y_n}\right\}$ 都是无穷大量。

由此可以判断两个常见数列：$\dfrac{n}{\sin n}$ 与 $n\arctan n$ 都是无穷大量。后者直接用推论——$\arctan n\to\frac\pi2>0$，分母不趋于零；前者不能直接用推论，因为 $\sin n$ 会取到任意接近 $0$ 的值，但用绝对值就够了：$|\sin n|\le1$ 给出

$$\left|\frac{n}{\sin n}\right|\ge n\ (n\ge1,\ \sin n\ne0),$$

故它仍是无穷大量。

**例 21** 讨论极限

$$\lim_{n\to\infty}\frac{a_0n^k+a_1n^{k-1}+\cdots+a_{k-1}n+a_k}{b_0n^l+b_1n^{l-1}+\cdots+b_{l-1}n+b_l},\qquad a_0\ne0,\ b_0\ne0 .$$

**解** 提出最高次幂：

$$\frac{a_0n^k+a_1n^{k-1}+\cdots+a_k}{b_0n^l+b_1n^{l-1}+\cdots+b_l}=n^{k-l}\cdot\frac{a_0+\frac{a_1}{n}+\cdots+\frac{a_k}{n^k}}{b_0+\frac{b_1}{n}+\cdots+\frac{b_l}{n^l}} .$$

后面的分式趋于 $\frac{a_0}{b_0}\ne0$，于是

$$\lim_{n\to\infty}\frac{a_0n^k+\cdots+a_k}{b_0n^l+\cdots+b_l}=\begin{cases}0, & k<l,\\[2pt] \dfrac{a_0}{b_0}, & k=l,\\[4pt] \infty, & k>l. \end{cases}$$

结论可以一句话记住：多项式之比看最高次项，次数相同取系数比，分子次数低则趋于 $0$，分子次数高则是无穷大量（此时要判断符号，看 $\frac{a_0}{b_0}$ 的正负与 $k-l$ 的奇偶）。

**无穷大量的四则运算。** 下面这些等式是成立的：

$$+\infty+(+\infty)=+\infty,\quad +\infty-(-\infty)=+\infty,\quad +\infty\pm\text{有界量}=+\infty,$$

$$(+\infty)\cdot(+\infty)=+\infty,\quad (-\infty)\cdot(-\infty)=+\infty,\quad (+\infty)\cdot(-\infty)=-\infty,\quad \infty\cdot\infty=\infty .$$

但下列运算没有意义，称为**待定型**（未定式）：

$$(+\infty)-(+\infty)=?,\quad (+\infty)+(-\infty)=?,\quad \infty+\infty=?,$$

$$0\cdot\infty=?,\quad \frac{\infty}{\infty}=?,\quad \frac00=? .$$

遇到待定型只能对具体问题具体分析，后面的洛必达法则、泰勒展开就是处理它们的系统办法。

## Stolz 定理

数列版的"洛必达法则"。

**定理** 设 $\{y_n\}$ 严格单调增加且 $\lim\limits_{n\to\infty}y_n=+\infty$，若

$$\lim_{n\to\infty}\frac{x_n-x_{n-1}}{y_n-y_{n-1}}=a\qquad(a\ \text{可为有限数},\ +\infty,\ -\infty),$$

则

$$\lim_{n\to\infty}\frac{x_n}{y_n}=a .$$

注意条件里 $\{y_n\}$ 必须是正无穷大量；只有"$y_n$ 单调增加"不够。

**证明** 分情形。

**情形 1：$a=0$。** 由 $\frac{x_n-x_{n-1}}{y_n-y_{n-1}}\to0$，任给 $\varepsilon>0$，存在 $N_1$，使 $n>N_1$ 时

$$|x_n-x_{n-1}|<\varepsilon(y_n-y_{n-1}).$$

把 $x_n-x_{N_1}$ 拆成相邻项之差的和，用三角不等式与上式：

$$|x_n-x_{N_1}|\le\sum_{k=N_1+1}^{n}|x_k-x_{k-1}|<\varepsilon\sum_{k=N_1+1}^{n}(y_k-y_{k-1})=\varepsilon(y_n-y_{N_1}).$$

两边除以 $y_n>0$：

$$\left|\frac{x_n}{y_n}-\frac{x_{N_1}}{y_n}\right|<\varepsilon\left(1-\frac{y_{N_1}}{y_n}\right)<\varepsilon .$$

$N_1$ 固定，$y_n\to+\infty$，故存在 $N>N_1$，使 $n>N$ 时 $\left|\frac{x_{N_1}}{y_n}\right|<\varepsilon$。于是 $n>N$ 时

$$\left|\frac{x_n}{y_n}\right|<\varepsilon+\varepsilon=2\varepsilon .$$

**情形 2：$a\in\mathbb{R}\setminus\{0\}$。** 令 $x_n'=x_n-ay_n$，则

$$\frac{x_n'-x_{n-1}'}{y_n-y_{n-1}}=\frac{x_n-x_{n-1}}{y_n-y_{n-1}}-a\to0,$$

由情形 1 得 $\frac{x_n'}{y_n}\to0$，于是

$$\frac{x_n}{y_n}=\frac{x_n'}{y_n}+a\to a .$$

**情形 3：$a=+\infty$。** 存在 $N$，使 $n>N$ 时 $x_n-x_{n-1}>y_n-y_{n-1}>0$，故 $\{x_n\}$ 也严格单调增加，且由 $x_n-x_N>y_n-y_N$ 知 $\{x_n\}$ 是正无穷大量。对 $\frac{y_n}{x_n}$ 用情形 1（此时 $\frac{y_n-y_{n-1}}{x_n-x_{n-1}}\to0$）：

$$\lim_{n\to\infty}\frac{y_n}{x_n}=0\ \Longrightarrow\ \lim_{n\to\infty}\frac{x_n}{y_n}=+\infty .$$

情形 4（$a=-\infty$）类似，把 $\frac{y_n}{x_n}\to0$ 换成相应的符号即可。

**应用一：重证例 5。** 取 $x_n=a_1+a_2+\cdots+a_n$，$y_n=n$，则 $x_n-x_{n-1}=a_n\to a$，$y_n-y_{n-1}=1$，由 Stolz 定理直接得 $\frac{x_n}{y_n}\to a$。这解释了例 5 的结论为什么成立：算术平均是"差分的平均"，而差分的极限就是原极限。

**例 22** 求 $\lim\limits_{n\to\infty}\dfrac{1^k+2^k+\cdots+n^k}{n^{k+1}}$（$k$ 为正整数）。

**解** 取 $x_n=1^k+\cdots+n^k$，$y_n=n^{k+1}$，则 $\{y_n\}$ 严格增加趋于 $+\infty$。差分之比为

$$\frac{x_n-x_{n-1}}{y_n-y_{n-1}}=\frac{n^k}{n^{k+1}-(n-1)^{k+1}} .$$

分母用二项式展开：$n^{k+1}-(n-1)^{k+1}=(k+1)n^k-C_{k+1}^{2}n^{k-1}+\cdots$，于是

$$\frac{n^k}{(k+1)n^k-C_{k+1}^2n^{k-1}+\cdots}=\frac{1}{(k+1)-C_{k+1}^2\frac1n+\cdots}\to\frac{1}{k+1} .$$

故原极限为 $\dfrac{1}{k+1}$。

这里不必去求和 $\sum_{j=1}^n j^k$ 的公式，Stolz 定理把"求和式的极限"转成了"差分比的极限"，而差分比的分母展开后只留下最高次项，一步就到位。$k=1$ 时得到 $\frac{n(n+1)/2}{n^2}\to\frac12$，$k=2$ 时得到 $\frac13$，与熟知的结果一致。

**例 23** 设 $0<x_1<1$，$x_{n+1}=x_n(1-x_n)$。(1) 证明 $\{x_n\}$ 收敛并求极限；(2) 求 $\lim\limits_{n\to\infty}nx_n$。

**解** (1) 由 $0<x_1<1$ 及 $x_{n+1}=x_n(1-x_n)$，归纳得 $0<x_n<1$ 且

$$x_{n+1}=x_n(1-x_n)<x_n,$$

故 $\{x_n\}$ 单调减少有下界 $0$，收敛。设 $x_n\to L$，在递推式两边取极限得 $L=L(1-L)$，即 $L^2=0$，故 $L=0$。

(2) 这是 $0\cdot\infty$ 型，把 $nx_n$ 写成商：

$$nx_n=\frac{n}{\frac{1}{x_n}} .$$

取 $x_n'=n$，$y_n'=\frac{1}{x_n}$，则 $\{y_n'\}$ 严格增加且趋于 $+\infty$（因为 $x_n\downarrow0$）。差分之比为

$$\frac{(n+1)-n}{\frac{1}{x_{n+1}}-\frac{1}{x_n}} .$$

由 $x_{n+1}=x_n(1-x_n)$，

$$\frac{1}{x_{n+1}}-\frac{1}{x_n}=\frac{1}{x_n(1-x_n)}-\frac{1}{x_n}=\frac{1-(1-x_n)}{x_n(1-x_n)}=\frac{1}{1-x_n}\to1 .$$

故差分之比趋于 $1$，由 Stolz 定理得 $\lim\limits_{n\to\infty}nx_n=1$。

这个例子把 Stolz 定理的两种典型用法都用上了：先证收敛求极限，再把 $0\cdot\infty$ 型改写成 $\frac{\infty}{\infty}$ 型。改写的方向很重要——把趋于 $0$ 的因子放到分母上取倒数，才能让分子分母都成为无穷大量。

## 课堂小结

这一讲的主线是：用 $\varepsilon$-$N$ 语言定义收敛，用定义和性质（唯一、有界、保序、夹逼、四则）计算极限，再用单调有界定理解决"极限未知时先证存在"的问题，由此得到 $e$ 与 $\pi$，最后把"发散"细分出无穷大量，并用 Stolz 定理处理 $\frac{\infty}{\infty}$ 型。

容易出错的地方集中在三处。

第一处是定义证明中的放缩：分母去掉正项是让它变小、整个分式变大，这一步不等号方向必须看清；$N$ 取 $\max$ 时要把"前提条件"（如 $n\ge2$、$n\ge4$）一起并进去。

第二处是保序性：由 $x_n<y_n$ 只能推出 $a\le b$，严格不等号在取极限后会退化。

第三处是无穷大量：$\lim x_n=\infty$ 不表示收敛；四则运算碰到 $(+\infty)-(+\infty)$、$0\cdot\infty$、$\frac{\infty}{\infty}$ 都是待定型，不能照搬法则；用 Stolz 定理前必须确认分母是严格单调增加的正无穷大量，且要处理的是"差分比"而不是原比。
