---
slug: 08-tail-bounds
title: "尾界、大数定律与概率方法"
summary: "从 Markov 不等式出发，用平方技巧证明 Chebyshev 不等式，再由它推出弱大数定律；随后把尾界用于随机算法的错误率与赌博破产，并用「期望小于 1 就有正概率成功」证明 van der Waerden 数的下界。"
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [probability, tail-bounds, concentration, probabilistic-method]
sources:
  - kind: video
    title: "Lecture 8: Tail Bounds"
    url: https://www.youtube.com/watch?v=HC54KcgvReg
    author: "Ankur Moitra, MIT OpenCourseWare"
    publishedAt: 2025-12-18
---

## 本讲要解决的问题

期望告诉你随机变量「平均」是多少，却不告诉你它有多容易偏离平均值。一个随机变量可以以极小概率取一个极大的值，把期望抬得很高，而绝大多数时候都贴近 $0$。

尾界要回答的是：**随机变量离期望很远，概率有多大？** 本讲按「用到的信息越来越多」这条线索推进：

| 用到的信息 | 工具 | 尾部衰减 |
| --- | --- | --- |
| 非负 + 期望 | Markov | $1/C$ |
| 期望 + 方差 | Chebyshev | $1/C^2$ |
| 独立同分布 | 弱大数定律 | 概率 $\to0$ |
| 相互独立 + 全部矩 | Chernoff（下一讲） | 指数衰减 |

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 0:00 | 回顾概率基础；尾界的动机 |
| 2:55 | Markov 不等式与证明 |
| 7:45 | 非负性用在哪；反例 |
| 8:51 | Markov 的推论形式 |
| 10:36 | 身高例子 |
| 15:40 | Chebyshev 不等式与证明 |
| 22:41 | 身高的第二个例子 |
| 24:47 | 弱大数定律的陈述 |
| 30:29 | 证明：期望、方差与 Chebyshev |
| 36:41 | 赌博与破产 |
| 42:24 | 随机算法的重复与错误率 |
| 50:42 | 成对独立已经足够 |
| 51:55 | Chernoff 预告 |
| 56:48 | 概率方法与 Ramsey 理论 |
| 1:08:20 | van der Waerden 定理与下界 |

## Markov 不等式

**定理。** 设 $X\ge0$，则对任意 $C>0$，

$$
\mathbb P(X\ge C)\le\frac{\mathbb E[X]}{C}.
$$

**证明。** 用全期望公式，按事件 $\{X\ge C\}$ 及其补集拆开：

$$
\mathbb E[X]
=\mathbb E\big[X\mid X\ge C\big]\mathbb P(X\ge C)
+\mathbb E\big[X\mid X<C\big]\mathbb P(X<C).
$$

第一项中，给定 $X\ge C$ 时 $X$ 至少是 $C$，故条件期望至少为 $C$；第二项中 $X\ge0$，故条件期望非负。于是

$$
\mathbb E[X]\ge C\cdot\mathbb P(X\ge C),
$$

两边除以 $C$ 即得。$\square$

### 非负性用在哪里

**只用在了「丢掉第二项」这一步**。若 $X$ 可以取负值，$\mathbb E[X\mid X<C]$ 可能为负，丢掉它就不再是下界，不等式不成立。

反例：$X=1$ 与 $X=-1$ 各以 $1/2$ 的概率取值，则 $\mathbb E[X]=0$。取 $C=1$，则

$$
\mathbb P(X\ge1)=\tfrac12>0=\frac{\mathbb E[X]}{C}.
$$

界彻底失效。期望为 $0$ 时右边没有任何约束力。

### 推论形式

令 $C'=C/\mathbb E[X]$，即取 $C=C'\mathbb E[X]$：

$$
\mathbb P\big(X\ge C'\,\mathbb E[X]\big)\le\frac{1}{C'}.
$$

最常用的是 $C'=2$：非负随机变量超过其期望两倍的概率不超过 $1/2$。

### 身高例子

美国成年男性平均身高约 $69$ 英寸。于是

$$
\mathbb P(X\ge2\times69=138\text{ 英寸})\le\frac12 .
$$

$138$ 英寸约合 $11$ 英尺 $6$ 英寸。这个界在数学上正确，却没有实际意义——Markov 只用了期望，信息太少。身高例子贯穿全讲，用来衡量每个新工具进步了多少。

## Chebyshev 不等式

**定理。** 对任意随机变量 $X$（**不要求非负**），

$$
\mathbb P\big(|X-\mathbb E[X]|\ge C\big)\le\frac{\operatorname{Var}(X)}{C^2}.
$$

**证明。** 两个技巧。

第一步：两个事件相同，因此概率相等。

$$
|X-\mathbb E[X]|\ge C
\iff
\big(X-\mathbb E[X]\big)^2\ge C^2 .
$$

第二步：制造一个非负随机变量，好使用 Markov。令

$$
Y=\big(X-\mathbb E[X]\big)^2\ge0 .
$$

对 $Y$ 用 Markov，阈值取 $C^2$：

$$
\mathbb P(Y\ge C^2)\le\frac{\mathbb E[Y]}{C^2}
=\frac{\operatorname{Var}(X)}{C^2}.
$$

左边正是第一步的事件，证毕。$\square$

### 推论形式

设 $\sigma(X)=\sqrt{\operatorname{Var}(X)}$ 为标准差。取 $C=c\sigma(X)$：

$$
\mathbb P\big(|X-\mathbb E[X]|\ge c\sigma(X)\big)\le\frac{1}{c^2}.
$$

$c=2$ 时：偏离两个标准差的概率不超过 $1/4$。

### 身高的第二个例子

已知男性身高标准差约 $2.7$ 英寸，则 $69+2\times2.7=74.4$ 英寸（约 $6$ 英尺 $2.4$ 英寸）以上（或对称地，以下）的概率不超过 $1/4$。

这个界仍然不紧，但至少不是「$11$ 英尺 $6$ 英寸」这种荒谬结论。信息越多，界越紧——这是全讲的主题。

## 弱大数定律

### 陈述

固定 $\varepsilon>0$。设 $X_1,\dots,X_n$ 是某随机变量 $X$ 的独立同分布副本，$\mathbb E[X]=C$，方差有限。令

$$
S_n=\frac{1}{n}\sum_{i=1}^{n}X_i .
$$

则

$$
\lim_{n\to\infty}\mathbb P\big(|S_n-C|\ge\varepsilon\big)=0 .
$$

**量词顺序很重要**：先固定精度 $\varepsilon$（例如民调误差 $0.01$），再找足够大的 $n$。结论说「存在足够大的 $n$ 使概率任意小」，而不是「对所有 $n$ 都小」。

### 证明

第一步，估计均值。由线性期望，

$$
\mathbb E[S_n]=\frac1n\sum_{i=1}^{n}\mathbb E[X_i]=C .
$$

$S_n$ 是 $C$ 的无偏估计。

第二步，估计方差——这是全证的关键。缩放一个随机变量时，方差乘以缩放的平方：

$$
\operatorname{Var}(S_n)=\frac{1}{n^2}\operatorname{Var}\Big(\sum_{i=1}^{n}X_i\Big).
$$

**这里必须用独立性**：独立随机变量之和的方差等于方差之和。于是

$$
\operatorname{Var}\Big(\sum_{i=1}^{n}X_i\Big)=\sum_{i=1}^{n}\operatorname{Var}(X_i)=n\,\sigma^2,
$$

$$
\operatorname{Var}(S_n)=\frac{n\sigma^2}{n^2}=\frac{\sigma^2}{n}.
$$

第三步，用 Chebyshev：

$$
\mathbb P\big(|S_n-C|\ge\varepsilon\big)
\le\frac{\operatorname{Var}(S_n)}{\varepsilon^2}
=\frac{\sigma^2}{n\varepsilon^2}\xrightarrow[n\to\infty]{}0 .
$$

### 定量版本

证明顺带给出了具体的 $n$：要让失败概率不超过 $\delta$，只需

$$
n\ge\frac{\sigma^2}{\delta\,\varepsilon^2}.
$$

精度要求缩小 $k$ 倍，样本量要增加 $k^2$ 倍。例如误差从 $0.05$ 降到 $0.01$（缩小 $5$ 倍），样本量要增加到 $25$ 倍。

### 赌博与破产

以掷骰子的 craps 为例，押注接近五五开，庄家优势（house edge）约 $0.0141$。设每局赢 $\$1$ 的概率为 $p$，输 $\$1$ 的概率为 $1-p$，则

$$
(1-p)-p=0.0141
\Longrightarrow
p=0.4929 .
$$

每局的期望收益是

$$
1\cdot p+(-1)\cdot(1-p)=2p-1=-0.0142<0 .
$$

由弱大数定律，局数 $n$ 很大时，平均每局收益以概率 $1$ 逼近 $-0.0142$。累计收益约为 $-0.0142n$，随 $n$ 线性下降。

**赌徒破产（gambler's ruin）的通俗表述**：任何负期望的游戏，长期玩下去一定破产。直觉上你也许担心「万一运气特别好，一直赢呢」——大数定律说的正是：这种情形发生的概率趋于 $0$。

## 随机算法的失败概率

设随机算法 $\mathcal A$ 每次运行有 $2/3$ 的概率给出正确答案，$1/3$ 的概率出错。想知道「重复多少次，错误率才能降到可接受的水平」。

把第 $i$ 次运行的结果记为 $X_i\in\{0,1\}$，$X_i=1$ 表示正确，$\mathbb E[X_i]=2/3$。取多数票，即看平均值 $S_n$ 是否低于 $1/2$。失败意味着

$$
\Big|S_n-\tfrac23\Big|\ge\tfrac16 .
$$

取 $\varepsilon=1/9<\tfrac16$，则失败事件包含在事件 $\{|S_n-\tfrac23|\ge\varepsilon\}$ 之中，所以对这个更大事件的上界也是失败概率的上界。

方差：

$$
\operatorname{Var}(X_i)=\tfrac23\cdot\tfrac13=\tfrac29 .
$$

Chebyshev 给出

$$
\mathbb P(\text{出错})\le\frac{2/9}{n\cdot(1/9)^2}=\frac{2/9}{n/81}=\frac{18}{n}.
$$

要让失败概率低于 $10^{-10}$，需要 $n\approx1.8\times10^{11}$ 次。这个数字在实际中不可接受——一台机器每秒跑十亿次也要跑几分钟到几小时。正是这个瓶颈促成了下一讲的 Chernoff 界：同样的目标只需 $n=O(\log(1/\delta))$ 次。

### 具体场景：素性测试

密码学中要判断一个大整数 $q$ 是否为素数。最好的算法是随机的，每次以 $2/3$ 的概率给出正确答案。若把合数误判为素数，加密方案可能被攻破，代价是敏感信息泄露；因此需要失败概率低到 $10^{-10}$ 甚至 $10^{-30}$。

用 Chebyshev 需要 $10^{10}$ 到 $10^{30}$ 次重复，不现实；Chernoff 把次数降到对数级，这才让随机素性测试成为工程上可用的方案。

## 成对独立已经够用

回看弱大数定律的证明，独立性只在**方差相加**这一步用到：

$$
\operatorname{Var}\Big(\sum_i X_i\Big)=\sum_i\operatorname{Var}(X_i)+2\sum_{i<j}\operatorname{Cov}(X_i,X_j).
$$

只要每一对 $X_i,X_j$ 独立，协方差全为 $0$，方差照样相加。**成对独立就足够**，不需要三元组、四元组的独立性。

这既是好消息（条件更弱），也是坏消息：Chebyshev 只用到二阶信息，因此给出的界偏松。下一讲的 Chernoff 界会用上「相互独立」这一更强条件，换取指数级的衰减。

## Chernoff 界预告

设 $X_1,\dots,X_n$ 相互独立，$X_i\in\{0,1\}$ 且 $\mathbb P(X_i=1)=p_i$，令

$$
X=\sum_{i=1}^{n}X_i,\qquad \mu=\mathbb E[X]=\sum_{i=1}^{n}p_i .
$$

则对 $0<\delta<1$，

$$
\mathbb P\big(|X-\mu|\ge\delta\mu\big)\le2e^{-\mu\delta^2/3}.
$$

右边随 $\mu$（也就是随 $n$）指数衰减，而不是 $1/n$ 这种多项式衰减。证明在下一讲。

## 概率方法

### 核心思想

要证明某类组合对象存在，**不直接构造它**，而是证明「随机选一个，以正概率满足要求」。

**引理。** 设 $X$ 是非负整数值随机变量，且 $\mathbb E[X]<1$。则 $\mathbb P(X=0)>0$。

**证明。** 由期望的定义并按 $i$ 拆项：

$$
\mathbb E[X]=\sum_{i\ge0}i\,\mathbb P(X=i)
\ge\sum_{i\ge1}i\,\mathbb P(X=i)
\ge\sum_{i\ge1}\mathbb P(X=i)
=1-\mathbb P(X=0).
$$

于是 $\mathbb P(X=0)\ge1-\mathbb E[X]>0$。$\square$

用法：让 $X$ 数「坏事件」的个数。只要坏事件的期望个数小于 $1$，就存在一个对象，一个坏事件都没有。

### Ramsey：六人聚会

任意六个人中，必有三个人两两相识，或者三个人两两陌生。用图论说：对 $K_6$ 的边任意染两色，必存在单色三角形。这就是 Ramsey 数 $R(3,3)=6$。

Ramsey 理论的一般形态是：**足够大的对象中，某些有序子结构无法避免**。课上还提到「圣经密码」——在《托拉》中按等距取字母能「找到」名人名字与日期；这其实是 Ramsey 现象的伪装，同样的「发现」在《战争与和平》的希伯来文译本里也能找到，并不具有统计显著性。

### van der Waerden 定理

$k$ 项等差数列是形如

$$
a,\ a+b,\ a+2b,\ \dots,\ a+(k-1)b
$$

的整数集合。

**定理（van der Waerden）。** 对任意 $k$，存在 $n$，使得把 $1,2,\dots,n$ 任意染成红蓝两色，都必然出现一个**单色**的 $k$ 项等差数列。

把最小的这样的 $n$ 记为 $W(k)$。已知 $W(3)=9$：$1$ 到 $8$ 可以染色避开三项等差，$1$ 到 $9$ 不行。

下面的染色（R 红、B 蓝）在 $1$ 到 $8$ 上避开了所有三项等差数列：

$$
1,2,3,4,5,6,7,8 \;\longmapsto\; R,R,B,B,R,R,B,B .
$$

逐一检查公差 $b=1,2,3$ 的所有三项等差即可验证。而要证明 $1$ 到 $9$ 无法避免，需要穷举所有染色——这正是计算机暴力搜索的用武之地。

### 下界：随机染色

**定理。** 对任意 $k\ge2$，

$$
W(k)\ge\sqrt{k-1}\cdot2^{(k-1)/2}.
$$

**证明。** 取 $n<\sqrt{k-1}\cdot2^{(k-1)/2}$，对 $[n]$ 做独立均匀的随机红蓝染色。设 $X$ 为单色 $k$ 项等差数列的个数。

对每一个具体的等差数列 $Q_{a,b}$，令 $I_{a,b}$ 为其单色指示变量。第一个元素颜色任意，其余 $k-1$ 个必须与它相同：

$$
\mathbb E[I_{a,b}]=\mathbb P(Q_{a,b}\text{ 单色})=\frac{2}{2^k}=\frac{1}{2^{k-1}}.
$$

落在 $[n]$ 内的等差数列个数：起点 $a\le n$，公差 $b\le\dfrac{n}{k-1}$（否则末项超过 $n$），故至多

$$
n\cdot\frac{n}{k-1}=\frac{n^2}{k-1}.
$$

由期望的线性性（不需要独立性）：

$$
\mathbb E[X]\le\frac{n^2}{k-1}\cdot\frac{1}{2^{k-1}}.
$$

当 $n<\sqrt{k-1}\cdot2^{(k-1)/2}$ 时，

$$
\mathbb E[X]<\frac{(k-1)2^{k-1}}{k-1}\cdot\frac{1}{2^{k-1}}=1 .
$$

由概率方法引理，$\mathbb P(X=0)>0$：存在一种染色，没有任何单色 $k$ 项等差数列。因此 $W(k)>n$，取下确界即得所述下界。$\square$

这个证明的妙处在于：**我们不知道那种染色长什么样，却知道它一定存在**。概率方法把「构造」问题转化成了「算期望」问题。

## 本节结论

- Markov：$X\ge0$ 时 $\mathbb P(X\ge C)\le\mathbb E[X]/C$；非负性用在丢掉第二项。
- Chebyshev：$\mathbb P(|X-\mathbb E X|\ge C)\le\operatorname{Var}(X)/C^2$；平方造出非负变量。
- 弱大数定律：独立同分布、方差有限时，样本均值依概率收敛到期望；独立性用于方差相加。
- 定量地，$n\ge\sigma^2/(\delta\varepsilon^2)$；精度提高 $k$ 倍需要样本量提高 $k^2$ 倍。
- 负期望游戏长期必输（赌徒破产）。
- 随机算法重复 $n$ 次，Chebyshev 给出 $O(1/n)$ 的失败率，实际不够用。
- 概率方法：$\mathbb E[X]<1$ 且 $X$ 非负整数值 $\Rightarrow$ 存在 $X=0$ 的对象。
- van der Waerden：$W(k)\ge\sqrt{k-1}\,2^{(k-1)/2}$，随机染色证明。

## 理解检验

**1. Markov 不等式的证明中，非负性用在哪一步？构造一个去掉非负性后不等式失效的例子。**

参考答案：全期望分解 $\mathbb E[X]=\mathbb E[X\mid X\ge C]\mathbb P(X\ge C)+\mathbb E[X\mid X<C]\mathbb P(X<C)$ 之后，第一项至少是 $C\mathbb P(X\ge C)$，第二项被直接丢掉——只有在 $X\ge0$ 时第二项才非负，丢掉它才是「减小」。若 $X$ 可取负值，第二项可能为负，$\mathbb E[X]\ge C\mathbb P(X\ge C)$ 不成立。反例：$\mathbb P(X=1)=\mathbb P(X=-1)=1/2$，$\mathbb E[X]=0$；取 $C=1$，则 $\mathbb P(X\ge1)=1/2$，而 $\mathbb E[X]/C=0$，不等式失效。

**2. 完整写出 Chebyshev 的证明：事件等价是什么？新随机变量怎么定义？为什么可以用 Markov？**

参考答案：事件 $\{|X-\mathbb E X|\ge C\}$ 与事件 $\{(X-\mathbb E X)^2\ge C^2\}$ 完全相同，因此概率相等。令 $Y=(X-\mathbb E X)^2$，它是平方，故 $Y\ge0$，满足 Markov 的非负性要求。对 $Y$ 在阈值 $C^2$ 处用 Markov：
$\mathbb P(Y\ge C^2)\le\mathbb E[Y]/C^2=\operatorname{Var}(X)/C^2$。
而左边就是原事件的概率，证毕。

**3. 弱大数定律的证明中，独立性用在哪一步？为什么成对独立就够？**

参考答案：独立性只用在 $\operatorname{Var}(\sum_i X_i)=\sum_i\operatorname{Var}(X_i)$ 这一步。一般地，
$\operatorname{Var}(\sum_iX_i)=\sum_i\operatorname{Var}(X_i)+2\sum_{i<j}\operatorname{Cov}(X_i,X_j)$，
而成对独立保证每个 $\operatorname{Cov}(X_i,X_j)=0$，于是方差仍然相加。因此只需要成对独立，不需要所有子集的相互独立。

**4. 用 Chebyshev 估计「重复运行 2/3 正确率的算法 n 次、多数投票」的失败率，并算出达到 $10^{-10}$ 所需的 $n$。**

参考答案：$X_i$ 为第 $i$ 次是否正确，$\operatorname{Var}(X_i)=\frac23\cdot\frac13=\frac29$。多数投票失败意味着 $S_n<1/2$，即 $|S_n-\frac23|>1/6$。取 $\varepsilon=\frac19$，失败事件包含于 $\{|S_n-\frac23|\ge\frac19\}$，Chebyshev 给出
$\mathbb P(\text{失败})\le\frac{2/9}{n\cdot(1/81)}=\frac{18}{n}$。
令 $18/n\le10^{-10}$，得 $n\ge1.8\times10^{11}$，约 $10^{11}$ 量级，实践上不可行。

**5. 证明概率方法引理：$X$ 非负整数值且 $\mathbb E[X]<1$，则 $\mathbb P(X=0)>0$。**

参考答案：
$\mathbb E[X]=\sum_{i\ge0}i\mathbb P(X=i)\ge\sum_{i\ge1}i\mathbb P(X=i)\ge\sum_{i\ge1}\mathbb P(X=i)=1-\mathbb P(X=0)$。
因此 $\mathbb P(X=0)\ge1-\mathbb E[X]>0$。直观上，若 $X=0$ 几乎不可能，$X$ 就几乎总是至少 $1$，期望不可能小于 $1$。

**6. 用随机染色证明 van der Waerden 的下界，写出期望计算的每一步。**

参考答案：取 $n<\sqrt{k-1}\,2^{(k-1)/2}$，每个整数独立均匀染红或蓝。设 $X$ 为单色 $k$ 项等差数列的个数。对固定等差列，首项颜色有 $2$ 种选择，其余 $k-1$ 项必须同色，故单色概率为 $2/2^k=2^{-(k-1)}$。落在 $[n]$ 内的等差列个数至多 $n\cdot\frac{n}{k-1}$（起点至多 $n$ 种，公差至多 $n/(k-1)$ 种）。由线性期望，
$\mathbb E[X]\le\frac{n^2}{k-1}2^{-(k-1)}<\frac{(k-1)2^{k-1}}{k-1}2^{-(k-1)}=1$。
由引理，存在一种染色使 $X=0$，即无单色 $k$ 项等差列，故 $W(k)>n$。

**7. 为什么 $1$ 到 $8$ 上的染色 $RRBBRRBB$ 只证明了 $W(3)\ge9$，而不是 $W(3)=9$？**

参考答案：给出一个染色避开三项等差，只说明「$n=8$ 时存在坏染色」，即 $W(3)>8$，也就是 $W(3)\ge9$。要证明 $W(3)\le9$，必须证明 $1$ 到 $9$ 的**每一种**红蓝染色都含有单色三项等差——这是对 $2^9=512$ 种染色的穷举检验，无法用单个例子代替。

## 与前后课的关系

上一讲是生成函数；本讲回到概率，建立尾界的工具箱。下一讲证明 Chernoff 界，把尾部衰减从多项式提升到指数级，并说明为什么「相互独立」这个更强条件换来如此大的收益。

再往后依次进入模运算、群论与编码理论。概率方法本身会在后续单元反复出现——它是离散数学里证明「存在性」的标准武器。
