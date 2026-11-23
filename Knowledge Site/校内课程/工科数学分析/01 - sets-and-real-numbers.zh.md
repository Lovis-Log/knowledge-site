---
slug: "01-sets-and-real-numbers"
title: "集合与实数集"
summary: "第 1 讲：集合与实数集。"
updatedAt: "2026-11-15"
content_type: "reference"
group: "course"
displayNumber: "01"
tags:
  - "数学分析"
sources:
  - kind: article
    title: "1集合与实数集.pdf"
    url: "https://drive.google.com/file/d/1EdO-uEof3GuUwpOlbNK-Pm_1gobJl7mj/view?usp=drivesdk"
---

数学分析研究函数，而函数的定义域、值域都是实数集。为了把“在一点的附近”“越来越接近”“有界”“最小上界”这些说法讲清楚，先要准备集合的语言、实数的连续性以及确界的概念。这一讲的内容看起来是预备知识，但后面极限的 $\varepsilon$-语言、连续函数的性质、闭区间上连续函数的最值定理，都要建立在确界原理之上。

## 集合与元素

把具有某种特征或满足一定性质的所有对象看成一个整体，这个整体称为**集合**，其中的对象称为集合的**元素**。性质必须足够明确，能够判断任意一个对象是否属于该集合。

集合通常用大写字母 $A,B,C,\dots$ 表示，元素用小写字母 $a,b,c,\dots$ 表示。若 $a$ 是 $A$ 的元素，记 $a\in A$；否则记 $a\notin A$。

本课程约定：

- $\mathbb N$ 表示全体自然数，**不含 0**；
- $\mathbb Z$ 表示全体整数；
- $\mathbb Q$ 表示全体有理数；
- $\mathbb R$ 表示全体实数。

例如 $\frac23\in\mathbb Q$，而 $\sqrt2\notin\mathbb Q$。

集合有两种常用表示法。

**列举法**：把元素逐个列出。例如由 $1,2,3,4,5$ 构成的集合写成

$$
A=\{1,2,3,4,5\}.
$$

**描述法**：用元素满足的条件来描述。上面的 $A$ 也可写成

$$
A=\{x:x<6,\ x\in\mathbb N\}=\{x\in\mathbb N:x<6\}.
$$

例如

$$
\{x\in\mathbb R:0<\sin x\le \tfrac12\}
$$

表示由满足 $0<\sin x\le\frac12$ 的实数组成的集合。再如，对 $x_0\in\mathbb R$、$\delta>0$，

$$
\{x\in\mathbb R:|x-x_0|<\delta\}
$$

就是数轴上的开区间 $(x_0-\delta,x_0+\delta)$，称为 $x_0$ 的 $\delta$ 邻域。

## 子集、相等与集合运算

### 子集与相等

设 $A,B$ 是两个集合。若

$$
x\in A\Longrightarrow x\in B,
$$

则称 $A$ 是 $B$ 的**子集**，记 $A\subseteq B$ 或 $B\supseteq A$，读作“$A$ 包含于 $B$”。按这个定义，$A\subseteq A$。

若 $A\subseteq B$ 且 $B$ 中存在不属于 $A$ 的元素，则称 $A$ 是 $B$ 的**真子集**，记 $A\subsetneq B$。

记号要按来源区分：本课程课件把“包含”直接写成 $A\subset B$，那里的 $\subset$ 表示子集，并不是真子集；这里统一用 $\subseteq$ 表示子集、$\subsetneq$ 表示真子集。读课件或别的教材时，先确认 $\subset$ 指的是哪一种。

例如 $A=\{1,2,3,4,5\}$，则 $\{1\}$、$\{1,3\}$、$\{1,3,5\}$、$\{1,2,3\}$ 都是 $A$ 的真子集；$\{1,2,3,4,5\}$ 不是 $A$ 的真子集。

> **易错点**：要注意“元素”和“子集”的区别：$\{1\}$ 是由单个元素 $1$ 构成的集合，它是 $A$ 的子集，但不是 $A$ 的元素。又例如 $\{1,\{2,3\}\}$ 不是 $A$ 的子集，因为它含有元素 $\{2,3\}$，而 $\{2,3\}$ 不是 $A$ 的元素。

不包含任何元素的集合称为**空集**，记 $\varnothing$。空集是任何集合的子集。

若 $A\subseteq B$ 且 $B\subseteq A$，则称 $A$ 与 $B$ **相等**，记 $A=B$。判断两个集合相等，就是判断两个描述条件是否等价。例如

$$
\{x\in\mathbb R:x^2>1\}=\{x\in\mathbb R:|x|>1\}.
$$

### 并、交与集合族

集合 $A$ 与 $B$ 的**并集**定义为

$$
A\cup B=\{x:x\in A\ \text{或}\ x\in B\}.
$$

**交集**定义为

$$
A\cap B=\{x:x\in A\ \text{且}\ x\in B\}.
$$

若 $A\cap B=\varnothing$，称 $A$ 与 $B$ **互不相交**；此时并集也记作 $A\sqcup B$，表示无交并。

设 $I$ 是一个指标集，对每个 $\alpha\in I$ 指定一个集合 $A_\alpha$，总体

$$
\{A_\alpha:\alpha\in I\}
$$

称为**集合族**，$I$ 称为**指标集**。当 $I=\mathbb N$ 时，集合族也称为**集合列**。任意多个集合的并与交定义为

$$
\bigcup_{\alpha\in I}A_\alpha
=\{x:\exists\,\alpha\in I,\ x\in A_\alpha\},
$$

$$
\bigcap_{\alpha\in I}A_\alpha
=\{x:\forall\,\alpha\in I,\ x\in A_\alpha\}.
$$

并集是“至少属于其中一个集合”的元素，交集是“属于每一个集合”的元素。

### 运算律

设 $A,B,C$ 是集合，则

$$
A\cup B=B\cup A,\qquad A\cap B=B\cap A;
$$

$$
A\cup(B\cup C)=(A\cup B)\cup C,\qquad
A\cap(B\cap C)=(A\cap B)\cap C.
$$

分配律对任意集合族也成立：

$$
A\cap(B\cup C)=(A\cap B)\cup(A\cap C),
$$

$$
A\cap\bigcup_{\alpha\in I}B_\alpha
=\bigcup_{\alpha\in I}(A\cap B_\alpha),
$$

$$
A\cup(B\cap C)=(A\cup B)\cap(A\cup C),
$$

$$
A\cup\bigcap_{\alpha\in I}B_\alpha
=\bigcap_{\alpha\in I}(A\cup B_\alpha).
$$

这里要特别注意：交集对并集分配时，交号进去、并号留在外面；并集对交集分配时，并号进去、交号留在外面。

### 差集与补集

称

$$
A\setminus B=\{x:x\in A,\ x\notin B\}
$$

为 $A$ 与 $B$ 的**差集**，即从 $A$ 中挖去属于 $B$ 的元素。

当 $B\subseteq A$ 时，$A\setminus B$ 称为 $B$ 相对于 $A$ 的**补集**或**余集**。在很多问题中，所讨论的集合都是某个固定“大”集合 $X$ 的子集，称 $X$ 为**基本集**；此时 $B$ 相对于 $X$ 的补集简称为 $B$ 的补集，记

$$
B^c=X\setminus B=\{x\in X:x\notin B\}.
$$

如果没有特别标出基本集，就约定所讨论的一切集合都预先包含在同一个基本集中。

补集的基本性质：

$$
A\cup A^c=X,\qquad A\cap A^c=\varnothing,\qquad (A^c)^c=A,
$$

$$
X^c=\varnothing,\qquad \varnothing^c=X,
$$

$$
A\setminus B=A\cap B^c.
$$

并且

$$
A\supseteq B\Longrightarrow A^c\subseteq B^c,
$$

$$
A\cap B=\varnothing\Longrightarrow A\subseteq B^c.
$$

### 摩根对偶律

对任意集合族 $\{A_\alpha:\alpha\in I\}$，有

$$
\left(\bigcup_{\alpha\in I}A_\alpha\right)^c
=\bigcap_{\alpha\in I}A_\alpha^c,
$$

$$
\left(\bigcap_{\alpha\in I}A_\alpha\right)^c
=\bigcup_{\alpha\in I}A_\alpha^c.
$$

这两条对偶律可以用元素隶属关系直接验证。以第一式为例：$x$ 属于左边，等价于 $x$ 不属于任何一个 $A_\alpha$，也就是对一切 $\alpha\in I$，$x\notin A_\alpha$，即 $x$ 属于每一个 $A_\alpha^c$；这正是右边的含义。第二式同理。口诀是“并的补等于补的交，交的补等于补的并”。

### 笛卡尔乘积

设 $X,Y$ 是两个集合，称一切有序元素对 $(x,y)$（其中 $x\in X$，$y\in Y$）组成的集合为 $X$ 与 $Y$ 的**笛卡尔乘积**，记

$$
X\times Y=\{(x,y):x\in X,\ y\in Y\}.
$$

有序对相等是指

$$
(x,y)=(x',y')\Longleftrightarrow x=x',\ y=y'.
$$

$X\times X$ 也记作 $X^2$。例如 $[0,1]\times[0,1]$ 是平面上的单位闭正方形。

设 $A=\{1,2\}$，$B=\{-3,2,4\}$，则

$$
A\times B=\{(1,-3),(1,2),(1,4),(2,-3),(2,2),(2,4)\},
$$

$$
B\times A=\{(-3,1),(-3,2),(2,1),(2,2),(4,1),(4,2)\}.
$$

显然 $A\times B\ne B\times A$：有序对的次序不同。

多个集合的笛卡尔乘积

$$
A_1\times A_2\times\cdots\times A_n
$$

由所有 $n$ 元有序组 $(a_1,a_2,\dots,a_n)$ 组成，其中 $a_i\in A_i$。特别地，

$$
\mathbb R^2=\mathbb R\times\mathbb R
=\{(x,y):x\in\mathbb R,\ y\in\mathbb R\},
$$

$$
\mathbb R^n
=\{(x_1,x_2,\dots,x_n):x_1,\dots,x_n\in\mathbb R\}.
$$

## 逻辑符号

设 $P,Q$ 是两个命题。

- $P\Rightarrow Q$ 表示“若 $P$ 成立，则 $Q$ 成立”；
- $P\Leftrightarrow Q$ 表示 $P$ 与 $Q$ 等价，即 $P\Rightarrow Q$ 且 $Q\Rightarrow P$；
- $\forall$ 表示“任给”“对一切”；
- $\exists$ 表示“存在”。

例如 $\forall x,\ f(x)\ge0$ 表示对任给的 $x$，都有 $f(x)\ge0$；$\exists x$ 使得 $|x-a|<1$ 表示存在实数 $x$，使不等式成立。

> **注意**：后面写极限定义时，$\forall\varepsilon>0,\ \exists\delta>0$ 的次序不能随意交换，原因就在这里。

## 实数与数轴

实数由有理数和无理数组成；无理数是无限不循环小数。数轴是取定了原点、长度单位和方向的直线。实数与数轴上的点一一对应：有理数对应的点叫有理点，无理数对应的点叫无理点。

实数有两个基本性质。

**有序性**：任意两个互异的实数 $a,b$ 都可以比较大小，或者 $a<b$，或者 $a>b$。实数按由小到大的顺序排列在数轴上。

**连续性**：实数充满整个数轴，没有空隙。这就是实数的连续性。

有理点在数轴上处处稠密：任意两个实数之间都有有理数。但有理点并没有充满整个数轴。例如 $\sqrt2$ 对应的点就不是有理点；有理数集在 $\sqrt2$ 处留下了一个“空隙”。因此有理数集不具有连续性。

这个差别会直接影响确界的存在性。集合

$$
E=\{x\in\mathbb Q:x^2<2\}
$$

在有理数范围内没有上确界；把 $E$ 看成实数集的子集时，它的上确界是 $\sqrt2$。

> **补充说明**：为什么 $E$ 在 $\mathbb Q$ 中没有上确界？设 $r$ 是有理上界。由 $1\in E$ 知 $r\ge1$。若 $r^2<2$，可取充分小的正有理数 $h$ 使 $(r+h)^2<2$，这与 $r$ 是上界矛盾。因此 $r^2>2$（有理数的平方无法等于 2）。取
>
> $$
> q=\frac12\left(r+\frac2r\right).
> $$
>
> 因 $r^2>2$，有 $0<q<r$ 且 $q^2-2=\tfrac14(r-2/r)^2>0$。所以 $q$ 仍是有理上界，却比 $r$ 更小。任一有理上界都能这样缩小，因此没有最小的有理上界。

> **关键结论**：实数的连续性正是通过“非空有上界的数集必有上确界”这一条公理来刻画的。

## 区间与邻域

设 $a,b\in\mathbb R$，且 $a<b$。有限区间有四种：

$$
(a,b)=\{x\in\mathbb R:a<x<b\},
$$

$$
[a,b]=\{x\in\mathbb R:a\le x\le b\},
$$

$$
(a,b]=\{x\in\mathbb R:a<x\le b\},\qquad
[a,b)=\{x\in\mathbb R:a\le x<b\}.
$$

$b-a$ 称为这些区间的长度。开区间不含端点，闭区间含两个端点，半开区间只含一个端点。

无穷区间有五种：

$$
(a,+\infty)=\{x:x>a\},\qquad
[a,+\infty)=\{x:x\ge a\},
$$

$$
(-\infty,b)=\{x:x<b\},\qquad
(-\infty,b]=\{x:x\le b\},
$$

$$
(-\infty,+\infty)=\mathbb R.
$$

设 $\delta>0$。称开区间

$$
O(x_0,\delta)=(x_0-\delta,x_0+\delta)
=\{x\in\mathbb R:|x-x_0|<\delta\}
$$

为点 $x_0$ 的 **$\delta$ 邻域**。它是以 $x_0$ 为中心、长度为 $2\delta$ 的开区间。

去掉中心 $x_0$，得到**去心 $\delta$ 邻域**

$$
O_0(x_0,\delta)
=\{x\in\mathbb R:0<|x-x_0|<\delta\}.
$$

此外还有右邻域和左邻域：

$$
O_+(x_0,\delta)=\{x:x_0<x<x_0+\delta\},
$$

$$
O_-(x_0,\delta)=\{x:x_0-\delta<x<x_0\}.
$$

![δ 邻域与去心 δ 邻域](/images/campus-mathematical-analysis/lec01-neighborhood.svg)

当不需要强调 $\delta$ 的大小时，常说“$x_0$ 的邻域”或“$x_0$ 附近”。

## 界与确界

### 上界、下界与有界集

设 $X$ 是一个数集。若存在常数 $M$，使得

$$
x\le M,\qquad \forall x\in X,
$$

则称 $X$ **有上界**，$M$ 是 $X$ 的一个**上界**。若存在常数 $m$，使得

$$
x\ge m,\qquad \forall x\in X,
$$

则称 $X$ **有下界**，$m$ 是 $X$ 的一个**下界**。

既有上界又有下界的数集称为**有界数集**，否则称为**无界数集**。

数集 $Z$ 有界，等价于存在常数 $M>0$，使得

$$
|x|\le M,\qquad \forall x\in Z.
$$

无界数集 $Z$ 则等价于：对任意 $M>0$，都存在 $x\in Z$，使得 $|x|>M$。

若一个数集有上界，那么它就有无穷多个上界：比某个上界更大的数仍然是上界。例如

$$
X=\{x\in\mathbb R:x<1\}
$$

以 $1$ 为上界，任何大于 $1$ 的数也都是它的上界。

有最大值的数集一定有上界；但有上界的数集未必有最大值。例如 $(-\infty,1)$ 有上界 $1$，却没有最大值。

### 上确界与下确界

设 $X$ 是非空数集。称 $\mu$ 是 $X$ 的**上确界**，记

$$
\mu=\sup X,
$$

是指 $\mu$ 满足两条：

1. 对一切 $x\in X$，有 $x\le\mu$，即 $\mu$ 是 $X$ 的上界；
2. 对任意 $\varepsilon>0$，存在 $x\in X$，使得 $x>\mu-\varepsilon$，即 $\mu$ 只要减小一点，就不再是 $X$ 的上界。

换句话说，上确界就是**最小上界**。

> **补充说明**：第二条写成 $x\ge\mu-\varepsilon$ 也等价：若对每个 $\varepsilon>0$ 只能保证取到 $x\ge\mu-\varepsilon$，把 $\varepsilon$ 换成 $\varepsilon/2$ 就得到 $x>\mu-\varepsilon$。但第一条不能改成严格不等式——当 $\mu\in X$ 时，必须允许 $x=\mu$。一条管“是上界”，一条管“最小”，缺一条都不是上确界。

> **补充证明**（上确界唯一）：设 $\mu_1,\mu_2$ 都是 $X$ 的上确界。$\mu_1$ 是上界而 $\mu_2$ 是最小上界，故 $\mu_1\ge\mu_2$；交换两者又得 $\mu_2\ge\mu_1$。于是 $\mu_1=\mu_2$。这里只用到“上界”和“最小上界”两条，与确界是否存在无关。

**确界原理（公理）**：在实数集内，凡非空有上界的数集 $X$，一定有上确界。

这条结论来自实数集的连续性，在有理数集范围内不成立。前面提到的 $\{x\in\mathbb Q:x^2<2\}$ 就是一个反例。

由确界原理可以推出：非空有下界的数集一定有**下确界**，即最大下界，记 $\inf X$。下确界 $\gamma$ 满足：

1. 对一切 $x\in X$，有 $x\ge\gamma$；
2. 对任意 $\varepsilon>0$，存在 $x\in X$，使得 $x<\gamma+\varepsilon$。

上确界和下确界可能属于集合，也可能不属于集合。例如 $1$ 是

$$
\{x:x<1\}\quad\text{和}\quad\{x:x\le1\}
$$

的上确界：它不属于前者，但属于后者。

![上确界是最小上界](/images/campus-mathematical-analysis/lec01-sup.svg)

> **易错点**：判断一个数 $\mu$ 是不是上确界，不能只验证“它是上界”，还必须验证“任何比它小的数都不是上界”。第二条性质是确界证明中最常用的部分。

## 基本不等式

### 绝对值不等式

对任意实数 $a,b$，有

$$
|a+b|\le|a|+|b|,
$$

以及反向三角不等式

$$
\bigl||a|-|b|\bigr|\le|a-b|.
$$

由归纳法可得，对任意 $n$ 个实数 $a_1,\dots,a_n$，

$$
|a_1+a_2+\cdots+a_n|
\le |a_1|+|a_2|+\cdots+|a_n|.
$$

### 伯努利不等式

设 $x>-1$，$n$ 为自然数，则

$$
(1+x)^n\ge1+nx.
$$

当 $n\ge2$ 且 $x\ne0$ 时，等号一般不成立。这个不等式在估计幂函数、证明数列单调性时经常出现。

> **补充说明**：本节证明的是正整数指数的伯努利不等式。指数换成实数 $0<\alpha<1$ 时方向相反：
>
> $$
> (1+x)^\alpha\le1+\alpha x,\qquad x>-1,
> $$
>
> 因为 $t^\alpha$ 在 $t>0$ 上是凹函数。第 4 讲用这一估计控制 $(n+1)^\alpha-n^\alpha$。

### 平均值不等式

设 $x_1,x_2,\dots,x_n$ 是 $n$ 个正实数，则

$$
\frac{n}{\dfrac1{x_1}+\dfrac1{x_2}+\cdots+\dfrac1{x_n}}
\le\sqrt[n]{x_1x_2\cdots x_n}
\le\frac{x_1+x_2+\cdots+x_n}{n}.
$$

即

$$
\text{调和平均}\le\text{几何平均}\le\text{算术平均}.
$$

等号成立当且仅当 $x_1=x_2=\cdots=x_n$。这三类平均在后面的极限估计和不等式证明中都会用到。

## 课堂练习

**练习 1** 集合 $\{1,2,3,4,5\}$ 的子集一共有多少个？

每个元素都有“选”与“不选”两种可能，且各元素的选择相互独立，所以子集总数为

$$
2^5=32.
$$

其中包括空集和集合本身。

**练习 2** 一个有界数集的上界、上确界、最大值有什么关系？

- 最大值若存在，它一定是上界，并且等于上确界；
- 上确界一定存在（非空有上界时），但不一定属于该集合；
- 上界不一定是上确界；上确界是所有上界中最小的那个；
- 有上界不一定有最大值。

下界、下确界、最小值的关系完全对偶：最小值若存在，则等于下确界；下确界不一定属于集合；下确界是所有下界中最大的那个。

## 课堂小结

这一讲的主线是：用集合语言描述对象，用实数连续性保证确界存在。集合部分要熟练掌握并、交、差、补和笛卡尔积，特别是任意集合族的分配律与摩根对偶律；实数部分的核心是确界原理，它把“没有空隙”这一几何直观变成了可以使用的分析工具。

常见的错误有：把 $\subset$ 当成真包含（课件中 $\subset$ 恰恰表示子集）；忘记空集是任何集合的子集；把上确界误认为一定属于集合；证明上确界时只验证上界、不验证最小性；在有理数范围内随意使用确界原理。后面的极限定义会反复使用邻域和确界，这些概念要在这里打牢。
