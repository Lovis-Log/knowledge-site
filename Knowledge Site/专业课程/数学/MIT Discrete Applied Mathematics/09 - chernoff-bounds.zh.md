---
slug: 09-chernoff-bounds
title: "Chernoff 界：用指数矩控制偏差"
summary: "通过指数变换把「偏离」变成非负随机变量，再用 Markov 与相互独立把矩母函数拆成乘积，逐步推出独立 Bernoulli 和的上尾、下尾与合并界，得到随样本量指数衰减的失败概率。"
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [probability, chernoff-bound, concentration, independence]
sources:
  - kind: video
    title: "Lecture 9: Chernoff Bounds"
    url: https://www.youtube.com/watch?v=FPj3OOM6DEc
    author: "Ankur Moitra, MIT OpenCourseWare"
    publishedAt: 2025-12-18
---

## 本讲要解决的问题

上一讲用 Chebyshev 估计随机算法的失败率，得到了 $\mathbb P(\text{失败})\le18/n$。要把失败率压到 $10^{-10}$，需要重复 $10^{11}$ 次——工程上不可行。

问题出在信息量：Chebyshev 只用了方差。本讲用**全部矩**，把尾部衰减从 $1/n$ 提升到 $e^{-cn}$。工具是三点：

1. 指数变换：把「$X$ 很大」变成「$e^{bX}$ 很大」，从而得到一个非负随机变量；
2. 矩母函数：$\mathbb E[e^{bX}]$ 的 Taylor 展开编码了 $X$ 的所有矩；
3. 相互独立：矩母函数对独立和分解为乘积。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 0:00 | 回顾 Markov 与 Chebyshev；为什么需要更强的界 |
| 2:13 | 上尾、下尾与合并界三种形式 |
| 6:41 | 证明策略：事件等价 + 指数变换 |
| 11:53 | 用 Markov 得到矩母函数 |
| 13:23 | 矩母函数的定义与矩的提取 |
| 19:44 | 引理 1：独立和的矩母函数是乘积 |
| 23:37 | 引理 2：Bernoulli 的矩母函数上界 |
| 28:34 | 选取 $a$ 与 $b$，合并三部分 |
| 33:43 | 引理 3：最后的代数估计 |
| 37:53 | 证明的组织方式与教学价值 |
| 47:13 | 使用边界：相互独立，2008 与 CMO |

## 三种形式

设 $X_1,\dots,X_n$ 相互独立，$X_i\in\{0,1\}$，$\mathbb P(X_i=1)=p_i$。令

$$
X=\sum_{i=1}^{n}X_i,\qquad \mu=\mathbb E[X]=\sum_{i=1}^{n}p_i .
$$

### 上尾

对任意 $\delta>0$，

$$
\mathbb P\big(X\ge(1+\delta)\mu\big)
\le\left(\frac{e^{\delta}}{(1+\delta)^{1+\delta}}\right)^{\mu}.
$$

### 下尾

对 $0<\delta<1$，

$$
\mathbb P\big(X\le(1-\delta)\mu\big)
\le\left(\frac{e^{-\delta}}{(1-\delta)^{1-\delta}}\right)^{\mu}.
$$

### 合并

对 $0<\delta<1$，把两边的界加起来：

$$
\mathbb P\big(|X-\mu|\ge\delta\mu\big)\le2e^{-\mu\delta^2/3}.
$$

合并形式牺牲了 $\delta$ 的精确依赖，换来一个容易记忆、容易引用的式子。三种形式都体现同一件事：**失败概率随 $\mu$（也就是随 $n$）指数下降**。

注意 $\mu$ 必须为正。若 $\mu=0$，所有 $p_i=0$，结论平凡；若随机变量可取负值，需要先平移缩放，这会改变指数中的常数。

## 证明的架构

整场证明由三个引理拼成，每个引理只负责一件事。这种组织方式本身就是本讲想教的方法：先搭骨架，再填计算。

### 第一步：事件等价

固定 $a$，取 $b>0$。因为 $t\mapsto e^{bt}$ 严格递增，

$$
\{X\ge a\}=\{e^{bX}\ge e^{ba}\}.
$$

两个事件完全相同，概率相等。这一步与 Chebyshev 中「平方」的作用一样：把一个可能取负值的量，换成非负量，同时保持事件不变。区别在于这里用的是指数而不是平方。

### 第二步：对 $Y=e^{bX}$ 用 Markov

$Y\ge0$，Markov 可用：

$$
\mathbb P(X\ge a)=\mathbb P\big(Y\ge e^{ba}\big)
\le\frac{\mathbb E[e^{bX}]}{e^{ba}} .
$$

右边的分子就是**矩母函数**。

### 矩母函数

定义

$$
M_X(b)=\mathbb E\big[e^{bX}\big].
$$

把 $e^{bX}$ 展开：

$$
e^{bX}=1+bX+\frac{b^2X^2}{2!}+\frac{b^3X^3}{3!}+\cdots,
$$

由线性期望，

$$
M_X(b)=\sum_{i\ge0}\frac{b^i}{i!}\mathbb E[X^i].
$$

所以 $b$ 的系数记录着 $X$ 的各阶矩：一次项系数是 $\mathbb E[X]$，二次项系数是 $\mathbb E[X^2]/2!$，依此类推。对 $b$ 求导并在 $0$ 处取值即可取回矩：

$$
M_X'(0)=\mathbb E[X],\qquad M_X''(0)=\mathbb E[X^2].
$$

这与组合数学里的生成函数是同一件事：那里 $x^n$ 的系数数对象，这里 $b^i$ 的系数记录矩。**Chernoff 界之所以比 Chebyshev 强，就是因为它一次用上了所有阶矩，而不是只用前两阶。**

### 引理 1：独立和的矩母函数是乘积

若 $X_1,\dots,X_n$ **相互独立**，则

$$
M_X(b)=\prod_{i=1}^{n}M_{X_i}(b).
$$

**证明。** 由定义，

$$
M_X(b)=\mathbb E\Big[e^{b\sum_iX_i}\Big]=\mathbb E\Big[\prod_{i=1}^{n}e^{bX_i}\Big].
$$

独立随机变量的函数仍然独立，所以乘积的期望等于期望的乘积：

$$
\mathbb E\Big[\prod_{i=1}^{n}e^{bX_i}\Big]=\prod_{i=1}^{n}\mathbb E\big[e^{bX_i}\big]=\prod_{i=1}^{n}M_{X_i}(b). \qquad\square
$$

**这里必须是相互独立，成对独立不够。** 把 $n$ 个随机变量之积的期望拆成 $n$ 个期望之积，需要的是整个集合的联合独立；成对独立只能保证两两的乘积可以拆开。

### 引理 2：Bernoulli 的矩母函数

若 $X_i\in\{0,1\}$ 且 $\mathbb P(X_i=1)=p_i$，则

$$
M_{X_i}(b)=1+p_i(e^b-1)\le e^{\,p_i(e^b-1)} .
$$

**证明。** 直接按两种取值算期望：

$$
M_{X_i}(b)=p_i\,e^{b}+(1-p_i)\cdot e^{0}
=1+p_i(e^b-1).
$$

再用对所有实数 $y$ 成立的不等式

$$
1+y\le e^{y},
$$

取 $y=p_i(e^b-1)$，即得 $1+p_i(e^b-1)\le e^{p_i(e^b-1)}$。$\square$

不等式 $1+y\le e^y$ 的几何意义是：直线 $1+y$ 始终位于指数曲线下方，且在 $y=0$ 处相切。这一步把「$1+$ 某量」变成纯指数，为的是让后面的乘积合并成 $\sum p_i=\mu$。

### 合起来

把三步串起来：

$$
\mathbb P(X\ge a)
\le\frac{\mathbb E[e^{bX}]}{e^{ba}}
=\frac{\prod_{i=1}^{n}M_{X_i}(b)}{e^{ba}}
\le\frac{\prod_{i=1}^{n}e^{p_i(e^b-1)}}{e^{ba}}
=\frac{e^{\mu(e^b-1)}}{e^{ba}} .
$$

最后一步用了 $\sum_i p_i=\mu$。

现在选参数。对上尾，取

$$
a=(1+\delta)\mu,\qquad b=\ln(1+\delta).
$$

则 $e^b-1=\delta$，分子是 $e^{\delta\mu}$；分母 $e^{ba}=(1+\delta)^{(1+\delta)\mu}$。于是

$$
\mathbb P\big(X\ge(1+\delta)\mu\big)
\le\frac{e^{\delta\mu}}{(1+\delta)^{(1+\delta)\mu}}
=\left[\frac{e^{\delta}}{(1+\delta)^{1+\delta}}\right]^{\mu}.
$$

这就是上尾的形式。$b$ 的取法不是猜出来的：把 $b$ 留作自由参数，对右边求导取极小，最优解正是 $b=\ln(1+\delta)$。

### 引理 3：把式子收紧成指数

要得到 $e^{-\mu\delta^2/3}$，需要估计

$$
L=\left[\frac{e^{\delta}}{(1+\delta)^{1+\delta}}\right]^{\mu}.
$$

取对数：

$$
\ln L=\mu\big[\delta-(1+\delta)\ln(1+\delta)\big].
$$

用到不等式：对 $x>0$，

$$
\ln(1+x)\ge\frac{2x}{2+x}.
$$

它来自 $\ln(1+x)$ 的 Taylor 展开——线性项是 $x$，其余项需要被一个不改变符号的式子压住；也可以用微积分或画图验证。

代入 $x=\delta$：

$$
\delta-(1+\delta)\ln(1+\delta)
\le\delta-(1+\delta)\cdot\frac{2\delta}{2+\delta}
=\delta\cdot\frac{(2+\delta)-2(1+\delta)}{2+\delta}
=\delta\cdot\frac{-\delta}{2+\delta}
=-\frac{\delta^2}{2+\delta}.
$$

因此

$$
\ln L\le-\frac{\mu\delta^2}{2+\delta}\le-\frac{\mu\delta^2}{3}\quad(0<\delta\le1),
$$

最后一步因为 $2+\delta\le3$。于是

$$
\mathbb P\big(X\ge(1+\delta)\mu\big)\le e^{-\mu\delta^2/3}.
$$

这就是上尾。$\square$

## 下尾

下尾的证明完全平行：取 $a=(1-\delta)\mu$、$b=\ln(1-\delta)<0$，此时指数函数递减，事件方向随之翻转，最后得到

$$
\mathbb P\big(X\le(1-\delta)\mu\big)
\le e^{-\mu\delta^2/2}\le e^{-\mu\delta^2/3}.
$$

把上尾与下尾相加，即得合并界

$$
\mathbb P\big(|X-\mu|\ge\delta\mu\big)\le2e^{-\mu\delta^2/3}.
$$

细节在课程讲义里；关键结构与上尾相同，只是常数从 $2+\delta$ 变成 $2$。

## 应用：把重复次数从多项式降到对数

回到随机算法。每次正确率 $2/3$，取 $p_i=2/3$，$\mu=2n/3$。失败意味着偏离超过 $\delta\mu$，其中 $\delta\approx1/4$（因为 $1/2$ 是 $\frac34\cdot\frac23$，偏离为 $\frac14\mu$）。合并界给出

$$
\mathbb P(\text{失败})\le2e^{-\mu\delta^2/3}
=2\exp\!\left(-\frac{2n}{3}\cdot\frac{1}{16}\cdot\frac13\right)
=2e^{-n/72}.
$$

要让失败概率低于 $\varepsilon$，只需

$$
n\ge72\ln\frac{2}{\varepsilon}.
$$

对比 Chebyshev 的 $n\approx18/\varepsilon$：$\varepsilon=10^{-10}$ 时，前者约 $1.8\times10^{11}$，后者约 $1.7\times10^{3}$。差距是八个数量级。

这就是随机素性测试能在工程中使用的原因：重复几千次而不是几千亿次。**指数衰减的尾部，是把「理论上可行」变成「实践上可行」的关键。**

## 证明为什么这样组织

讲者在证明结束后专门讨论了表达方式，值得记录：

- **拆成引理**。整场证明拆成一个架构图加三个引理，读者可以先看骨架，再逐个核对细节。线性的「证明开始—证明结束」写法会让读者失去方向。
- **矩母函数不是必需的**。严格说，只要写 $\mathbb E[e^{bX}]$、用独立性拆成乘积即可，不必命名。之所以命名并解释，是为了**去神秘化**：为什么偏偏选指数而不是别的函数？因为指数的 Taylor 系数记录全部矩，而证明真正需要的是全部矩。
- **连接已学内容**。课程刚讲过组合生成函数，矩母函数与它是同一套语言，讲者有意把两者接上。

这些是写作与讲授层面的选择，不影响正确性，却决定了读者能否真正理解。

## 何时不适用：2008 与 CMO

Chernoff 界威力巨大，但它的全部力量来自**相互独立**。忘了这一点，结论会灾难性地错。

讲者讲了 2008 年金融危机的例子。次级抵押贷款被打包成债务抵押凭证（CMO），再按瀑布结构分成不同层级（tranches）：最先违约的损失由底层承担，顶层只有在很大比例的贷款同时违约时才受损。

如果每笔贷款独立地以 $10\%$ 的概率违约，那么「$40\%$ 同时违约」的概率按上尾界是指数小的，顶层因此被评为极安全资产，甚至被养老基金大量持有。

问题在于：**违约并不独立**。经济下行时，大量借款人同时失去还款能力，违约高度相关。Chernoff 界不适用，被评级为「比美国国债还安全」的资产在危机中迅速崩塌。

结论不是「Chernoff 界错了」，而是：**知道一个工具在什么条件下不成立，和知道怎么用它一样重要。**

## 本节结论

- 上尾：$\mathbb P(X\ge(1+\delta)\mu)\le\left(\frac{e^\delta}{(1+\delta)^{1+\delta}}\right)^\mu$。
- 下尾：$\mathbb P(X\le(1-\delta)\mu)\le\left(\frac{e^{-\delta}}{(1-\delta)^{1-\delta}}\right)^\mu$，$0<\delta<1$。
- 合并：$\mathbb P(|X-\mu|\ge\delta\mu)\le2e^{-\mu\delta^2/3}$。
- 证明三件套：事件等价 $\{X\ge a\}=\{e^{bX}\ge e^{ba}\}$；Markov 给出 $\mathbb E[e^{bX}]/e^{ba}$；相互独立把矩母函数拆成乘积。
- 关键不等式：$1+y\le e^y$、$\ln(1+x)\ge\frac{2x}{2+x}$。
- 应用：重复次数从 $O(1/\varepsilon)$ 降到 $O(\log(1/\varepsilon))$。
- 前提是相互独立；条件不成立时（如 2008 年的相关违约），界完全失效。

## 理解检验

**1. 为什么 $\{X\ge a\}=\{e^{bX}\ge e^{ba}\}$？这里 $b>0$ 用在哪里？**

参考答案：因为 $t\mapsto e^{bt}$ 在 $b>0$ 时是严格递增函数，所以 $X\ge a$ 与 $e^{bX}\ge e^{ba}$ 互为充要条件，两个事件完全相同。若 $b<0$，指数函数递减，$X\ge a$ 会等价于 $e^{bX}\le e^{ba}$，不等号方向翻转；若 $b=0$，两边恒为 $1$，事件退化为全集或空集。证明中之所以能保持「$\ge$」不变，正是靠 $b>0$。

**2. 证明引理 1：相互独立时 $M_X(b)=\prod_iM_{X_i}(b)$。为什么成对独立不够？**

参考答案：
$M_X(b)=\mathbb E[e^{b\sum_iX_i}]=\mathbb E[\prod_ie^{bX_i}]$。相互独立保证 $e^{bX_1},\dots,e^{bX_n}$ 仍然相互独立，于是乘积的期望等于期望的乘积，得到 $\prod_i\mathbb E[e^{bX_i}]$。要拆开 $n$ 个因子的期望，需要整个集合的联合独立；成对独立只能拆两个因子，无法处理三项以上的乘积。

**3. 写出引理 2 的证明，并说明 $1+y\le e^y$ 在其中的作用。**

参考答案：$M_{X_i}(b)=p_ie^b+(1-p_i)=1+p_i(e^b-1)$。取 $y=p_i(e^b-1)$，由 $1+y\le e^y$ 得 $M_{X_i}(b)\le e^{p_i(e^b-1)}$。作用是把「$1+$ 正量」写成纯指数，这样在取乘积时指数相加，$\sum_ip_i=\mu$ 自然浮现，得到 $e^{\mu(e^b-1)}$。若停在上一步的 $1+p_i(e^b-1)$，不等式仍然成立，但乘积无法化简出 $\mu$。

**4. 取 $a=(1+\delta)\mu$、$b=\ln(1+\delta)$，推出上尾的表达式。**

参考答案：代入 $\mathbb P(X\ge a)\le e^{\mu(e^b-1)}/e^{ba}$。由 $b=\ln(1+\delta)$ 得 $e^b=1+\delta$，故 $e^b-1=\delta$，分子是 $e^{\delta\mu}$；分母 $e^{ba}=e^{b(1+\delta)\mu}=\left(e^b\right)^{(1+\delta)\mu}=(1+\delta)^{(1+\delta)\mu}$。于是
$\mathbb P(X\ge(1+\delta)\mu)\le\left[\frac{e^\delta}{(1+\delta)^{1+\delta}}\right]^\mu$。

**5. 用 $\ln(1+x)\ge\frac{2x}{2+x}$ 完成引理 3，说明每一步代数。**

参考答案：取对数得 $\ln L=\mu[\delta-(1+\delta)\ln(1+\delta)]$。用不等式放缩 $\ln(1+\delta)\ge\frac{2\delta}{2+\delta}$：
$\delta-(1+\delta)\ln(1+\delta)\le\delta-(1+\delta)\frac{2\delta}{2+\delta}=\delta\cdot\frac{2+\delta-2-2\delta}{2+\delta}=-\frac{\delta^2}{2+\delta}$。
因此 $\ln L\le-\frac{\mu\delta^2}{2+\delta}$；当 $0<\delta\le1$ 时 $2+\delta\le3$，故 $\ln L\le-\frac{\mu\delta^2}{3}$，取指数得 $L\le e^{-\mu\delta^2/3}$。

**6. Chernoff 界比 Chebyshev 强在哪里？这份强度依赖什么假设？**

参考答案：Chebyshev 给出 $O(1/n)$ 的多项式衰减，Chernoff 给出 $e^{-cn}$ 的指数衰减；前者把失败率降到 $10^{-10}$ 需要约 $10^{11}$ 次重复，后者只需约 $10^3$ 次。强度来自两点：一是使用了全部矩（矩母函数），二是相互独立使得矩母函数分解为乘积。代价是假设更强：相互独立（而非成对独立）是必需的，且 Bernoulli 结构用于计算矩母函数。

**7. 2008 年的 CMO 评级为什么是对 Chernoff 界的误用？**

参考答案：评级机构把每笔抵押贷款的违约近似看作独立事件，于是「很大比例同时违约」的概率按 Chernoff 上尾界是指数小的，顶层档被视为极安全。但违约并不独立：经济下行时借款人同时失去还款能力，违约高度正相关。相互独立这一前提不成立，指数小的结论随之失效，被评级的「安全资产」在危机中大量违约。

## 与前后课的关系

上一讲用 Markov 与 Chebyshev 建立尾界，并把随机算法的失败率压到 $18/n$；本讲用矩母函数把同样的量压到 $e^{-n/72}$，代价是要求相互独立。

下一讲转入模运算。概率工具在本课程后面仍会出现：编码理论中的随机编码、哈希与算法分析都要用到集中不等式。矩母函数与组合生成函数的对应关系，也会在后续的概率分析中反复出现。
