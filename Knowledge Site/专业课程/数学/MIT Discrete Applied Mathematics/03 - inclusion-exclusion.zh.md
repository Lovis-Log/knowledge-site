---
slug: 03-inclusion-exclusion
title: "容斥原理：从错排到 1/e"
summary: "用随机发还作业的问题引出容斥原理，在 n=2、n=3 的韦恩图上逐步修正过计与欠计，得到一般公式并归纳证明；代回原问题后得到错排概率趋于 1/e，再用期望线性性一行算出「拿到自己作业的人数期望为 1」，最后用它解决优惠券收集问题并引入随机变量独立性、方差与方差可加性。"
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [probability, inclusion-exclusion, binomial-coefficient, expectation, variance]
sources:
  - kind: video
    title: "Lecture 3: Inclusion-Exclusion"
    url: https://www.youtube.com/watch?v=cqPcQ3QqYnE
    author: Ankur Moitra, MIT OpenCourseWare
    publishedAt: 2025-12-18
---

## 一个收发作业的问题

班上有 $n$ 名学生，每人交了一份作业。批改完之后，助教没有按名字发还，而是**随机地把作业发给学生**——等价于在所有排列中均匀随机地选一个。

问题：**没有人拿到自己作业的概率是多少？**

这正是经典的「错排」问题。直觉上，$n$ 很大时每个人都拿到别人作业的可能性不小，概率应该接近某个常数——最后算出来是 $1/e\approx0.368$。

引出这个答案的工具是**容斥原理**。它的思路极其朴素：先按最粗的方式数一遍，发现数多了就减掉，发现减多了就加回来，一直修正到正好。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 0:00 | 动机：随机发还作业，求无人拿对的概率 |
| 1:41 | 把问题拆成事件；容斥的直觉 |
| 3:40 | 韦恩图：$n=2$ 的修正 |
| 5:21 | $n=3$：为什么还要加回三重交 |
| 8:20 | 小情形的具体数值 |
| 12:34 | 一般容斥公式 |
| 15:49 | 代回原问题：$P(A_i)=1/n$，$P(A_i\cap A_j)=1/(n(n-1))$ |
| 18:27 | 二项式系数与项数 |
| 22:57 | 求和得到 $1-1/2!+1/3!-\cdots$ 与 $1/e$ |
| 26:26 | 容斥公式的归纳证明 |
| 38:31 | 期望线性性：拿到自己作业的人数的期望是 $1$ |
| 41:28 | 转入方差；生日问题 |
| 43:27 | 优惠券收集问题与 $nH_n$ |
| 52:13 | 随机变量的独立性 |
| 1:08:20 | 方差的定义、两种公式与独立性下的可加性 |

## 把问题写成事件

令 $A_i$ 表示「第 $i$ 名学生拿到了自己的作业」。我们要求的是

$$
P(\overline{A_1}\cap\overline{A_2}\cap\cdots\cap\overline{A_n}).
$$

直接算这个交很难，但它的补事件很好描述：**至少有一名学生拿到自己的作业**，即

$$
\overline{\overline{A_1}\cap\cdots\cap\overline{A_n}}=A_1\cup A_2\cup\cdots\cup A_n .
$$

于是

$$
P(\text{无人拿对})=1-P(A_1\cup\cdots\cup A_n).
$$

问题归结为计算 $n$ 个事件的并。

## 容斥：先过计，再修正

![图示](/images/inclusion-exclusion-rich-zh.svg)

*图：n=3 的错排例子：韦恩图计数、逐层加减与一般公式。*

### $n=2$ 的情形

画两个相交的圆 $A_1$、$A_2$。最粗的估计是

$$
P(A_1)+P(A_2).
$$

这样数，交集 $A_1\cap A_2$ 被数了两次，所以减去一次：

$$
P(A_1\cup A_2)=P(A_1)+P(A_2)-P(A_1\cap A_2).
$$

这就是容斥的雏形。

对本问题取 $n=2$：两名学生的排列只有两种——两人都对，或两人互换。所以

$$
P(A_1)=\frac12,\quad P(A_2)=\frac12,\quad P(A_1\cap A_2)=\frac12,
$$

（两人都对的情形只有「两人都对」这一种排列），于是

$$
P(A_1\cup A_2)=\frac12+\frac12-\frac12=\frac12,
\qquad
P(\text{无人拿对})=1-\frac12=\frac12 .
$$

注意 $P(A_1\cap A_2)=1/2\ne1/4$：两个事件**不独立**。一旦第一个人拿到了自己的作业，剩下的作业也就唯一确定，第二个人必然也拿对。这正是本问题不能简单地用乘法处理的原因。

### $n=3$ 的情形

先加三个单事件，交集被重复计算；再减去三个两两交。此时三个圆的**共同中心** $A_1\cap A_2\cap A_3$ 被加了三次、又减了三次，等于没算。所以要加回来一次：

$$
P(A_1\cup A_2\cup A_3)
=P(A_1)+P(A_2)+P(A_3)
-P(A_1\cap A_2)-P(A_1\cap A_3)-P(A_2\cap A_3)
+P(A_1\cap A_2\cap A_3).
$$

代入数值：$P(A_i)=1/3$；任意两事件同时发生意味着这两人的作业归位，第三人也只能归位，所以 $P(A_i\cap A_j)=1/6$；三事件同时发生也只有「完全正确」这一种排列，$P(A_1\cap A_2\cap A_3)=1/6$。于是

$$
P(\text{至少一人拿对})=3\cdot\frac13-3\cdot\frac16+\frac16
=1-\frac12+\frac16=\frac23,
$$

$$
P(\text{无人拿对})=1-\frac23=\frac13 .
$$

与错排数 $D_3=2$、总排列数 $3!=6$ 的比值 $2/6=1/3$ 一致。

### 一般公式

对任意事件 $A_1,\dots,A_n$，

$$
P\!\left(\bigcup_{i=1}^{n}A_i\right)
=\sum_{i}P(A_i)
-\sum_{i<j}P(A_i\cap A_j)
+\sum_{i<j<k}P(A_i\cap A_j\cap A_k)
-\cdots
+(-1)^{n+1}P(A_1\cap\cdots\cap A_n).
$$

也就是：**单事件加、两两交减、三重交加、四重交减……符号交替，直到 $n$ 重交**。

为什么符号必须交替？可以这样看：一个恰好属于 $r$ 个事件的结果，在公式里被计算了

$$
\binom{r}{1}-\binom{r}{2}+\binom{r}{3}-\cdots+(-1)^{r+1}\binom{r}{r}
=1-(1-1)^r=1
$$

次。二项式展开给出 $(1-1)^r=0$（$r\ge1$），所以这个和恰好等于 $1$：每个结果不多不少被计一次。

## 代回原问题

### 各项概率

发还作业相当于在 $n!$ 个排列中均匀随机取一个。对任意 $i$，

$$
P(A_i)=\frac{(n-1)!}{n!}=\frac1n .
$$

对 $r$ 个指定的学生同时拿到自己的作业，其余 $n-r$ 人可以任意排列，所以

$$
P(A_{i_1}\cap\cdots\cap A_{i_r})
=\frac{(n-r)!}{n!}
=\frac{1}{n(n-1)\cdots(n-r+1)} .
$$

这正是条件概率的写法：第一位归位的概率是 $1/n$，在此条件下第二位归位的概率是 $1/(n-1)$，依此类推。

### 需要数项数：二项式系数

容斥公式里，$r$ 重交的项有 $\binom{n}{r}$ 个。这个量定义为

$$
\binom{n}{r}=\frac{n(n-1)\cdots(n-r+1)}{r!}=\frac{n!}{r!\,(n-r)!}.
$$

它的含义是「从 $n$ 个对象中选 $r$ 个」的方法数。分子先按顺序选：第一个有 $n$ 种，第二个有 $n-1$ 种……但这样把同一组的 $r!$ 种排列都数了一遍，所以要除以 $r!$。例如

$$
\binom{n}{2}=\frac{n(n-1)}{2}.
$$

### 求和

把每项「项数 × 概率」写出来：

$$
P\!\left(\bigcup_i A_i\right)
=\binom{n}{1}\frac{1}{n}
-\binom{n}{2}\frac{1}{n(n-1)}
+\binom{n}{3}\frac{1}{n(n-1)(n-2)}
-\cdots
$$

每一项都发生大规模约分。以第二项为例：

$$
\binom{n}{2}\cdot\frac{1}{n(n-1)}
=\frac{n(n-1)}{2}\cdot\frac{1}{n(n-1)}
=\frac{1}{2!}.
$$

一般地，第 $r$ 项等于 $1/r!$。于是

$$
P(\text{至少一人拿对})
=1-\frac{1}{2!}+\frac{1}{3!}-\frac{1}{4!}+\cdots+(-1)^{n+1}\frac{1}{n!}.
$$

因此

$$
P(\text{无人拿对})
=1-P(\text{至少一人拿对})
=\frac{1}{2!}-\frac{1}{3!}+\cdots+(-1)^{n}\frac{1}{n!}.
$$

把它写成从 $r=0$ 开始的完整级数——注意 $1-1=0$，可以补上首项：

$$
P(\text{无人拿对})=\sum_{r=0}^{n}\frac{(-1)^r}{r!}.
$$

当 $n\to\infty$ 时，

$$
\sum_{r=0}^{\infty}\frac{(-1)^r}{r!}=\frac1e\approx0.3679 .
$$

**答案浮现：$e$ 从一个纯粹的排列计数问题里冒了出来。** 具体数值：$n=2$ 时 $1/2$，$n=3$ 时 $1/3$，$n=4$ 时 $9/24=0.375$，之后在 $1/e$ 附近来回摆动并迅速收敛。

### 一个有用的启发

严格地说，$A_i$ 之间并不独立。但当 $n$ 很大时，它们「几乎独立」：第一个人是否拿对，对第二个人的影响只有 $1/n$ 量级。于是可以做一个不严谨但很快的计算：

$$
P(\text{无人拿对})\approx\prod_{i=1}^{n}\left(1-\frac1n\right)
=\left(1-\frac1n\right)^{n}\xrightarrow[n\to\infty]{}\frac1e .
$$

这个推导**不是证明**（独立性并不成立），却给出了正确答案。容斥的作用正是把这种「几乎独立」的直觉变成严格结论。

## 容斥公式的归纳证明

**定理。** 对任意事件 $A_1,\dots,A_n$，上面的容斥公式成立。

**证明。** 对 $n$ 归纳。$n=2$ 的情形就是韦恩图给出的等式。

设公式对 $n$ 成立，记 $C=A_1\cup\cdots\cup A_n$，要证 $n+1$ 个事件的情形。把公式中的项分成两类：**不含 $A_{n+1}$** 的，与**含 $A_{n+1}$** 的。

不含 $A_{n+1}$ 的那些项，正好是 $n$ 个事件的容斥公式，由归纳假设等于 $P(C)$。

含 $A_{n+1}$ 的项，其符号在 $n+1$ 的公式里与原公式相反。定义辅助事件

$$
B_i=A_i\cap A_{n+1}\qquad(i=1,\dots,n).
$$

则含 $A_{n+1}$ 的那组项恰好是 $-1$ 乘以「对 $B_1,\dots,B_n$ 写出的容斥公式」，因为

$$
B_i\cap B_j=(A_i\cap A_{n+1})\cap(A_j\cap A_{n+1})=A_i\cap A_j\cap A_{n+1}
$$

（$A_{n+1}$ 交两次与交一次相同）。由归纳假设，这组项等于

$$
-P(B_1\cup\cdots\cup B_n)
=-P\bigl((A_1\cup\cdots\cup A_n)\cap A_{n+1}\bigr)
=-P(C\cap A_{n+1}).
$$

两类相加：

$$
P(C)+P(A_{n+1})-P(C\cap A_{n+1}).
$$

这正是 $n=2$ 情形的公式，等于 $P(C\cup A_{n+1})=P(A_1\cup\cdots\cup A_{n+1})$。归纳完成。$\square$

这个证明值得回味的不是代数，而是**结构**：把 $n+1$ 的表达式拆成「旧公式」与「旧公式的负数」，再把后者解释成新的辅助事件。写证明时，把读者需要跟随的逻辑顺序设计好，比逐步验算更重要。

## 用期望线性性一行解决相关问题

容斥用了一整节课才算出「无人拿对」的概率。现在换一个问题：**拿到自己作业的人数，期望是多少？**

定义随机变量

$$
X=\sum_{i=1}^{n}\mathbf{1}_{A_i},
$$

即拿到自己作业的人数。由期望的线性性（不需要任何独立性假设）：

$$
\mathbb{E}[X]=\sum_{i=1}^{n}\mathbb{E}[\mathbf{1}_{A_i}]
=\sum_{i=1}^{n}P(A_i)
=\sum_{i=1}^{n}\frac1n=1 .
$$

**期望恰好是 $1$ 人**，与 $n$ 无关。

这正是线性性最有价值的地方：它把「依赖关系」整个绕开了。$A_i$ 之间高度相关（一个人拿对会显著改变别人拿对的概率），但期望的可加性对此毫不在意。课程特意强调：这一点对期望成立，对期望的乘积不成立，对方差也不成立。

## 优惠券收集问题

### 问题

每份报纸随机附赠 $n$ 种优惠券中的一种（均匀分布、相互独立）。要收集齐全部 $n$ 种，平均需要看多少份报纸？取 $n=365$，就是「要问多少个学生，才能问遍所有生日」。

### 拆成阶段

关键技巧仍是「把复杂随机变量拆成简单随机变量之和」。令

$$
T=T_0+T_1+\cdots+T_{n-1},
$$

其中 $T_i$ 是「从已收集 $i$ 种，到收集第 $i+1$ 种」所需的份数。

已收集 $i$ 种时，下一份报纸带来**新**优惠券的概率是

$$
p_i=\frac{n-i}{n},
$$

因为 $n$ 种中有 $n-i$ 种还没见过。每一次尝试都是独立的，所以 $T_i$ 服从成功概率 $p_i$ 的几何分布，由上一讲的结论

$$
\mathbb{E}[T_i]=\frac1{p_i}=\frac{n}{n-i}.
$$

### 求和

$$
\mathbb{E}[T]=\sum_{i=0}^{n-1}\frac{n}{n-i}
=n\left(\frac1n+\frac1{n-1}+\cdots+\frac11\right)
=nH_n,
$$

其中 $H_n=\sum_{k=1}^{n}1/k$ 是第 $n$ 个调和数。取 $n=365$：

$$
H_{365}\approx6.47,
\qquad
\mathbb{E}[T]\approx6.47\times365\approx2361 .
$$

也就是说，要问大约 $2361$ 个学生，才能覆盖所有 $365$ 个生日——约为天数的 $6.5$ 倍。

### 渐近形式

由 $H_n\approx\ln n+\gamma$（$\gamma\approx0.577$ 为欧拉常数），

$$
\mathbb{E}[T]=nH_n\approx n\ln n .
$$

所以「覆盖 $n$ 种需要 $n\log n$ 次」是一个很好用的经验法则。它的直觉来源是：当还剩 $k$ 种没收集时，每次命中的概率只有 $k/n$，需要 $n/k$ 次；把 $k=1,\dots,n$ 累加就得到 $nH_n$。

## 随机变量的独立性

上一讲定义了事件的独立性，现在推广到随机变量。

**定义。** 随机变量 $f,g$ **独立**，若对任意实数 $\alpha,\beta$，事件

$$
\{x:f(x)=\alpha\},
\qquad
\{x:g(x)=\beta\}
$$

都独立，即

$$
P(f=\alpha,\ g=\beta)=P(f=\alpha)\,P(g=\beta).
$$

注意这里有一个**对所有 $\alpha,\beta$ 成立**的量词，所以验证起来比事件独立麻烦得多。

一致性检查：取 $f=\mathbf{1}_A$、$g=\mathbf{1}_B$，此时 $\alpha,\beta$ 只需取 $0,1$，定义退化为「事件 $A$ 与 $B$ 独立」。所以随机变量的独立性确实是事件独立性的推广。

### 引理：独立随机变量的乘积期望

**引理。** 若 $f,g$ 独立，则

$$
\mathbb{E}[fg]=\mathbb{E}[f]\,\mathbb{E}[g].
$$

**证明。** 按定义展开，并按 $f,g$ 的取值把样本空间分块：

$$
\mathbb{E}[fg]=\sum_{x}p(x)f(x)g(x)
=\sum_{\alpha,\beta}\alpha\beta\sum_{x:\,f(x)=\alpha,\,g(x)=\beta}p(x).
$$

内层和正是 $P(f=\alpha,\ g=\beta)$。由独立性，

$$
\mathbb{E}[fg]
=\sum_{\alpha,\beta}\alpha\beta\,P(f=\alpha)P(g=\beta)
=\left(\sum_{\alpha}\alpha P(f=\alpha)\right)
 \left(\sum_{\beta}\beta P(g=\beta)\right)
=\mathbb{E}[f]\,\mathbb{E}[g].
$$

最后一步是把双重和拆成两个独立求和，并认出它们分别是期望的另一种写法（按取值分组求和）。$\square$

### 独立性不可省

取 $f=\mathbf{1}_A$、$g=\mathbf{1}_{A^{c}}$，其中 $0<P(A)<1$。两者显然不独立。此时

$$
fg=\mathbf{1}_{A}\mathbf{1}_{A^{c}}=0
\quad\Longrightarrow\quad
\mathbb{E}[fg]=0,
$$

但

$$
\mathbb{E}[f]\,\mathbb{E}[g]=P(A)\,(1-P(A))>0 .
$$

所以没有独立性，引理不成立。这个反例也提醒：证明中用到独立性的一步，正是把联合概率拆成乘积的那一步。

## 方差

### 定义

随机变量 $f$ 的**方差**是

$$
\operatorname{Var}(f)=\mathbb{E}\left[\bigl(f(x)-\mathbb{E}[f]\bigr)^2\right].
$$

它先减去均值，把分布平移到中心为 $0$，再对偏离量的平方取期望。方差衡量的是**随机变量有多分散**，是一个粗粒度的指标。

### 两种等价写法

展开平方并用线性性：

$$
\begin{aligned}
\operatorname{Var}(f)
&=\mathbb{E}\left[f^2-2f\,\mathbb{E}[f]+(\mathbb{E}[f])^2\right]\\
&=\mathbb{E}[f^2]-2\mathbb{E}[f]\,\mathbb{E}[f]+(\mathbb{E}[f])^2\\
&=\mathbb{E}[f^2]-(\mathbb{E}[f])^2 .
\end{aligned}
$$

第二行用到关键一点：$\mathbb{E}[f]$ 是**常数**，不是随机变量，所以可以从期望里提出来。两种写法各有方便之处，视情况选用。

### 两条基本性质

- **非负性**：$\operatorname{Var}(f)\ge0$，因为它是一个非负随机变量的期望。
- **为零即常数**：$\operatorname{Var}(f)=0$ 当且仅当 $f$ 取常数值。若方差为零，则 $(f-\mathbb{E}[f])^2$ 的期望为零；由于它非负，只能处处为零，故 $f=\mathbb{E}[f]$ 恒成立。

### 独立随机变量的方差可加

**定理。** 若 $f,g$ 独立，则

$$
\operatorname{Var}(f+g)=\operatorname{Var}(f)+\operatorname{Var}(g).
$$

**证明。** 记 $\mu_f=\mathbb{E}[f]$、$\mu_g=\mathbb{E}[g]$。由定义并利用期望的线性性，

$$
\begin{aligned}
\operatorname{Var}(f+g)
&=\mathbb{E}\left[\bigl((f-\mu_f)+(g-\mu_g)\bigr)^2\right]\\
&=\mathbb{E}\left[(f-\mu_f)^2\right]
+2\,\mathbb{E}\left[(f-\mu_f)(g-\mu_g)\right]
+\mathbb{E}\left[(g-\mu_g)^2\right]\\
&=\operatorname{Var}(f)+\operatorname{Var}(g)
+2\,\mathbb{E}\left[(f-\mu_f)(g-\mu_g)\right].
\end{aligned}
$$

剩下的是交叉项。由独立性，$f-\mu_f$ 与 $g-\mu_g$ 也独立，于是乘积的期望等于期望的乘积：

$$
\mathbb{E}\left[(f-\mu_f)(g-\mu_g)\right]
=\mathbb{E}[f-\mu_f]\,\mathbb{E}[g-\mu_g]=0\cdot0=0 .
$$

交叉项消失，结论成立。$\square$

这次线性性不够用了：如果 $f,g$ 不独立，交叉项一般不为零，方差就不一定可加。这正是课程反复强调的对比——**期望的线性性无条件成立，方差的可加性需要独立性**。

## 这些工具通向哪里

方差可加是后面「集中不等式」的起点。设想做民意调查：随机抽取 $n$ 个人，每人以概率 $p$ 支持某候选人，用 $\hat p$ 表示样本中的支持比例，

$$
\hat p=\frac1n\sum_{i=1}^{n}\mathbf{1}_{A_i}.
$$

每个 $\mathbf{1}_{A_i}$ 的方差是 $p(1-p)$；由独立性，$\hat p$ 的方差是

$$
\operatorname{Var}(\hat p)=\frac{1}{n^2}\cdot n\,p(1-p)=\frac{p(1-p)}{n}.
$$

方差按 $1/n$ 衰减，标准差按 $1/\sqrt n$ 衰减——这就是「样本量翻四倍，误差减半」的来源。下一阶段的课程会用尾界把这个结论变成严格的置信区间。

## 本节结论

- 容斥公式：并的概率等于「单事件和 − 两两交和 + 三重交和 − …」，符号交替。
- 符号交替的原因：恰好属于 $r$ 个事件的结果被计数 $\sum_{k=1}^r(-1)^{k+1}\binom rk=1$ 次。
- 错排问题：$P(\text{无人拿对})=\sum_{r=0}^{n}(-1)^r/r!\to1/e$。
- 二项式系数 $\binom nr=\frac{n(n-1)\cdots(n-r+1)}{r!}$ 用来数 $r$ 重交的项数。
- 期望线性性无需独立性：拿到自己作业的人数期望恒为 $1$。
- 优惠券收集：把总时间拆成阶段，$\mathbb{E}[T]=nH_n\approx n\ln n$；$n=365$ 时约为 $2361$。
- 独立随机变量满足 $\mathbb{E}[fg]=\mathbb{E}[f]\mathbb{E}[g]$；不独立时可能失败（如 $\mathbf{1}_A$ 与 $\mathbf{1}_{A^c}$）。
- 方差 $\operatorname{Var}(f)=\mathbb{E}[(f-\mathbb{E}f)^2]=\mathbb{E}[f^2]-(\mathbb{E}f)^2\ge0$，为零当且仅当 $f$ 为常数。
- 独立随机变量的方差可加；没有独立性时交叉项一般不为零。

## 理解检验

**1. $n=2$ 时，为什么 $P(A_1\cap A_2)=1/2$ 而不是 $1/4$？**

参考答案：样本空间是两名学生的全部排列，只有 $2$ 个：两人各自拿到自己的作业，或两人互换。事件 $A_1\cap A_2$「两人都拿到自己的作业」只包含第一个排列，所以概率是 $1/2$。若误用独立性写成 $P(A_1)P(A_2)=1/2\cdot1/2=1/4$，就错了：一旦第一个人拿到自己的作业，剩下的作业只剩一份，第二个人必然也拿到自己的，两者高度相关。一般地，$P(A_i\cap A_j)=1/(n(n-1))$，而不是 $1/n^2$。

**2. 写出容斥公式，并解释为什么符号必须交替。**

参考答案：
$$
P\!\left(\bigcup_{i=1}^n A_i\right)=\sum_i P(A_i)-\sum_{i<j}P(A_i\cap A_j)+\sum_{i<j<k}P(A_i\cap A_j\cap A_k)-\cdots+(-1)^{n+1}P(A_1\cap\cdots\cap A_n).
$$
设某结果恰好属于 $r$ 个事件。它在「单事件和」里被计 $\binom r1$ 次，在「两两交和」里被计 $\binom r2$ 次，依此类推，总次数为
$$
\binom r1-\binom r2+\binom r3-\cdots+(-1)^{r-1}\binom rr=1-(1-1)^r=1.
$$
所以每个结果恰好被计一次。若符号不交替，这个和就不可能恒为 $1$：多计或少计都取决于 $r$，无法统一修正。

**3. 用容斥计算 $n=4$ 时「无人拿对」的概率。**

参考答案：
$$
P(\text{至少一人拿对})=\binom41\frac14-\binom42\frac{1}{4\cdot3}+\binom43\frac{1}{4\cdot3\cdot2}-\frac{1}{4!}
=1-\frac{6}{12}+\frac{4}{24}-\frac{1}{24}
=1-\frac12+\frac16-\frac1{24}.
$$
于是
$$
P(\text{无人拿对})=\frac12-\frac16+\frac1{24}=\frac{12-4+1}{24}=\frac{9}{24}=\frac38=0.375 .
$$
与错排数 $D_4=9$、总排列数 $4!=24$ 一致。

**4. 为什么「拿到自己作业的人数期望为 $1$」不需要利用 $A_i$ 之间的独立性？优惠券收集问题在哪里用了同一招？**

参考答案：期望的线性性对任意随机变量成立：
$$
\mathbb{E}\Bigl[\sum_i \mathbf{1}_{A_i}\Bigr]=\sum_i \mathbb{E}[\mathbf{1}_{A_i}]=\sum_i P(A_i),
$$
推导只用到「和的期望等于期望的和」，与 $A_i$ 是否独立无关。$P(A_i)=1/n$ 对每个 $i$ 都成立，求和得 $n\cdot(1/n)=1$。优惠券收集问题同样把总时间拆成阶段 $T=\sum_{i=0}^{n-1}T_i$，每个 $T_i$ 是成功概率 $(n-i)/n$ 的几何分布，期望 $n/(n-i)$；相加得 $nH_n$。拆分的合法性只依赖线性性，不依赖各阶段之间的相关性。

**5. 举一个反例说明 $\mathbb{E}[fg]=\mathbb{E}[f]\mathbb{E}[g]$ 在没有独立性时不成立。**

参考答案：取 $f=\mathbf{1}_A$、$g=\mathbf{1}_{A^{c}}$，其中 $0<P(A)<1$。因为一个结果不可能同时在 $A$ 与 $A^c$ 中，所以 $fg\equiv0$，故 $\mathbb{E}[fg]=0$。但
$$
\mathbb{E}[f]\mathbb{E}[g]=P(A)\,(1-P(A))>0 .
$$
两者不等。这两个随机变量显然不独立（知道 $f$ 的值就完全确定了 $g$），说明引理中的独立性条件不可省。

**6. 方差可加为什么需要独立性？请指出证明中哪一步失效。**

参考答案：展开
$$
\operatorname{Var}(f+g)=\operatorname{Var}(f)+\operatorname{Var}(g)+2\,\mathbb{E}[(f-\mu_f)(g-\mu_g)].
$$
证明独立时交叉项为零，依据是「独立随机变量的乘积期望等于期望的乘积」：
$$
\mathbb{E}[(f-\mu_f)(g-\mu_g)]=\mathbb{E}[f-\mu_f]\,\mathbb{E}[g-\mu_g]=0.
$$
若 $f,g$ 不独立，这一步不能做，交叉项一般不为零，方差也就不可加。反例：取 $g=f$，则 $\operatorname{Var}(f+g)=\operatorname{Var}(2f)=4\operatorname{Var}(f)$，而 $\operatorname{Var}(f)+\operatorname{Var}(g)=2\operatorname{Var}(f)$，两者相差一倍，交叉项为 $2\operatorname{Var}(f)$。

## 与前后课的关系

这一讲把概率的三件工具串了起来：容斥负责「至少一个事件」的精确计数，期望线性性负责绕开依赖关系，方差可加性则预告了集中不等式。下一讲正式进入计数单元，系统处理排列、组合与二项式系数；之后生成函数会把这里出现的 $1/e$、$nH_n$ 与 $\binom nr$ 放进同一个代数框架里。

一句话概括这一讲：**只要会「先过计再修正」，并，就变成了和；只要会用指示函数，计数就变成了期望。**
