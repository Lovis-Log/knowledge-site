---
slug: "03-sets"
title: "集合"
summary: "集合的表示与运算、包含关系、自然数构造与特征函数。"
updatedAt: "2026-11-16"
content_type: "reference"
group: "course"
displayNumber: "03"
tags: ["离散数学"]
sources:
  - kind: article
    title: "第3章集合.pdf"
    url: "https://drive.google.com/file/d/1zBEq8Ne-_fyFk3lbhQ2POc-9Z-xcV-I-/view?usp=drivesdk"
---

集合论研究对象及其构成的集合：属于关系判断一个对象是否为某集合的元素，包含关系比较两个集合的元素范围。集合本身也可以作为另一个集合的元素，属于与包含必须分别判断。本章的主线是：先用外延原则把"两个集合相等"化归为"元素相同"，再用逻辑等价把集合运算化成命题运算，得到并、交、差、补、对称差的一套代数律；最后用空集和后继集把自然数本身也构造成集合，并用特征函数把集合运算翻译成 0-1 串的位运算。

## 3.1 集合及其表示

### 集合与元素

集合是由一些对象聚集在一起构成的整体。**定义 3.1.1** 集合中的对象叫集合的**元素**，或成员。对象 $x$ 是集合 $A$ 的元素记作 $x\in A$，否则记作 $x\notin A$。元素可以是任意类型的事物，不要求同质：$\{2,\ \text{Tom},\ \text{计算机},\ \text{广州}\}$ 也是一个集合。

常用数集记号：

- $\mathbb{N}$：自然数集（本书约定包含 $0$）；
- $\mathbb{Z}$：整数集；
- $\mathbb{Q}$：有理数集；
- $\mathbb{R}$：实数集；
- $\mathbb{C}$：复数集。

所考虑的所有对象构成的集合称为**全集**，记作 $E$。全集不是绝对的，换一个问题就可能换一个全集；补运算尤其依赖全集的选取。

### 三种表示法

**列举法**把元素逐一写出，元素间用逗号隔开，整体用花括号括起来：

$$
A=\{a,b,c,d\},\qquad B=\{1,2,3,4\},\qquad Z=\{0,\pm1,\pm2,\dots\}.
$$

元素较多但有规律时，可写出前几项并用省略号，如偶数集 $\{2,4,6,\dots,2n,\dots\}$；省略号必须让人能唯一看出规律，否则这种写法不合法。

> 注意 $\mathbb{N}$ 是否含 $0$：本书约定含 $0$，应写 $\mathbb{N}=\{0,1,2,\dots\}$。若写成 $\{1,2,3,\dots\}$ 就与这一约定冲突；别的教材可能规定 $\mathbb{N}$ 不含 $0$，答题时若结论依赖这一点，应显式说明所采用的约定。

**描述法**不列出元素，只给出元素应满足的性质：

$$
B=\{x\mid P(x)\}
$$

表示 $B$ 由所有使 $P(x)$ 为真的 $x$ 组成。例如

$$
B=\{x\mid x\in\mathbb{Z}\wedge 3<x\le 6\}=\{4,5,6\},\qquad
C=\{x\mid x\ \text{是小于}\ 10\ \text{的正整数}\}=\{1,2,\dots,9\}.
$$

描述法的关键限制是：$P(x)$ 的论域和判断标准必须明确。像"$x$ 是公园里的美丽的花"这种谓词，"美丽"没有客观标准，论域也没有限定，无法对任意对象判定真假，因此不能确定一个集合。写描述法时，$x$ 的取值范围（$x\in\mathbb{Z}$、$x\in\mathbb{R}$ 等）不能省。

**归纳法**通过三条规则定义集合：

1. **基础**：指出某些最基本的元素属于该集合；
2. **构造**：指出由已有元素产生新元素的方法；
3. **界限**：指出该集合只包含由前两条有限次生成的那些元素。

例如集合 $A$ 定义为：

1. $0$ 和 $1$ 都是 $A$ 的元素；
2. 若 $a,b\in A$，则字符串 $ab$ 和 $ba$ 也是 $A$ 的元素（$ab$ 表示把 $a$ 与 $b$ 拼接）；
3. 只有有限次使用 (1)(2) 得到的字符串才是 $A$ 的元素。

第三条常被忽略，但它决定了 $A$ 是"最小闭包"：没有它，任何包含 $0,1$ 且对拼接封闭的更大集合都符合前两条，$A$ 就不唯一了。

### 元素的相异性与无序性

集合论规定元素彼此相异、元素之间没有次序。因此

$$
\{3,4,5\}=\{3,4,4,5,5\}=\{5,3,4\}.
$$

重复书写不增加元素，交换顺序不改变集合。若 $A=\{3,4,5\}$，则 $3\in A$，$6\notin A$。判断两个用列举法写出的集合是否相等，只需检查每个元素是否也出现在另一集合中，不必给元素排序。

### 特殊集合

**定义 3.1.2** 有限个元素构成的集合 $A$ 称为**有限集**，其中元素个数称为该集合的**元素数**，记作 $|A|$；无限个元素构成的集合称为**无限集**。

**定义 3.1.3** 不含任何元素的集合称为**空集**，记作 $\varnothing$。它可以符号化地写成

$$
\varnothing=\{x\mid x\ne x\},
$$

因为条件 $x\ne x$ 对任何 $x$ 都为假，所以没有任何对象满足它。

**定义 3.1.4** 所考虑的所有对象构成的集合称为**全集**，记作 $E$。

对任一元素 $x$，有

$$
x\in\varnothing\Leftrightarrow F,\qquad x\in E\Leftrightarrow T.
$$

这两个等价式是后面处理空集与全集的出发点：$x\in\varnothing$ 恒假，$x\in E$ 恒真（在全集范围内讨论时）。

注意区分 $\varnothing$ 与 $\{\varnothing\}$：前者没有元素，$|\varnothing|=0$；后者恰有一个元素，即空集，$|\{\varnothing\}|=1$。空集不是"元素为 $0$ 的集合"。

## 3.2 集合间的关系

### 相等、子集、真子集

**定义 3.2.1** 设 $A,B$ 为集合，当且仅当它们恰有完全相同的元素时，称 $A$ 与 $B$ **相等**，记作 $A=B$：

$$
A=B\Leftrightarrow \forall x(x\in A\leftrightarrow x\in B).
$$

**定义 3.2.2** 设 $A,B$ 为集合，如果 $B$ 中的每个元素都是 $A$ 中的元素，则称 $B$ 为 $A$ 的**子集**，也称 $B$ 被 $A$ 包含、$A$ 包含 $B$，记作 $B\subseteq A$ 或 $A\supseteq B$：

$$
B\subseteq A\Leftrightarrow \forall x(x\in B\rightarrow x\in A).
$$

若 $B$ 不被 $A$ 包含，记作 $B\nsubseteq A$。

**定义 3.2.3** 设 $A,B$ 为集合，如果 $B\subseteq A$ 且 $B\ne A$（即 $B$ 的每个元素都属于 $A$，但 $A$ 中至少有一个元素不属于 $B$），则称 $B$ 是 $A$ 的**真子集**，记作 $B\subset A$ 或 $A\supset B$：

$$
B\subset A\Leftrightarrow \forall x(x\in B\rightarrow x\in A)\wedge\exists x(x\in A\wedge x\notin B).
$$

本课程用 $\subset$ 表示真子集，用 $\subseteq$ 表示"包含或相等"；有些教材把 $\subset$ 当作 $\subseteq$ 的同义词，另用 $\subsetneq$ 表示真子集。读题时要看符号旁是否有"$B\ne A$"的条件，不能只凭符号形状判断。

三个记号连接的对象不同：

| 记号 | 含义 | 两侧是什么 |
| --- | --- | --- |
| $x\in A$ | $x$ 是 $A$ 的元素 | 左边元素，右边集合 |
| $B\subseteq A$ | $B$ 的每个元素都在 $A$ 中 | 两边都是集合 |
| $B\subset A$ | $B$ 是 $A$ 的真子集 | 两边都是集合 |

因此 $x\subseteq A$ 一般没有意义（除非 $x$ 本身也是集合），而 $A\in B$ 表示"集合 $A$ 作为元素属于 $B$"，与 $A\subseteq B$ 完全不同。

### 包含关系的三条性质

对任意集合 $A,B,C$：

1. $A\subseteq A$；
2. $A\subseteq B\wedge B\subseteq A\Leftrightarrow A=B$；
3. $A\subseteq B\wedge B\subseteq C\Rightarrow A\subseteq C$。

① 由定义直接成立：$\forall x(x\in A\rightarrow x\in A)$ 恒真。

② 的证明把子集定义展开，再用第 2 章的两个谓词逻辑等价式：

$$
\begin{aligned}
A\subseteq B\wedge B\subseteq A
&\Leftrightarrow \forall x(x\in A\rightarrow x\in B)\wedge\forall x(x\in B\rightarrow x\in A)\\
&\Leftrightarrow \forall x\big((x\in A\rightarrow x\in B)\wedge(x\in B\rightarrow x\in A)\big)\\
&\Leftrightarrow \forall x(x\in A\leftrightarrow x\in B)\\
&\Leftrightarrow A=B.
\end{aligned}
$$

第二步用了 $\forall xP(x)\wedge\forall xQ(x)\Leftrightarrow\forall x(P(x)\wedge Q(x))$，第三步用了 $(P\rightarrow Q)\wedge(Q\rightarrow P)\Leftrightarrow(P\leftrightarrow Q)$。这条性质是证明集合相等最常用的方式：**要证 $A=B$，就分别证 $A\subseteq B$ 与 $B\subseteq A$**。

③ 的证明：

$$
\begin{aligned}
A\subseteq B\wedge B\subseteq C
&\Leftrightarrow \forall x(x\in A\rightarrow x\in B)\wedge\forall x(x\in B\rightarrow x\in C)\\
&\Leftrightarrow \forall x\big((x\in A\rightarrow x\in B)\wedge(x\in B\rightarrow x\in C)\big)\\
&\Rightarrow \forall x(x\in A\rightarrow x\in C)\\
&\Leftrightarrow A\subseteq C.
\end{aligned}
$$

第三步是假言三段论，对每个 $x$ 都有 $(x\in A\to x\in B)\wedge(x\in B\to x\in C)\Rightarrow(x\in A\to x\in C)$。注意这里是"$\Rightarrow$"而不是"$\Leftrightarrow$"：传递性反过来不成立。

### 空集

**定理 3.2.1** 空集 $\varnothing$ 是一切集合的子集。

证明：任给集合 $A$，按子集定义，

$$
\varnothing\subseteq A\Leftrightarrow\forall x(x\in\varnothing\rightarrow x\in A).
$$

对任意 $x$，前件 $x\in\varnothing$ 为假，所以蕴含式 $x\in\varnothing\rightarrow x\in A$ 为真；由于这对一切 $x$ 都成立，$\forall x(x\in\varnothing\rightarrow x\in A)$ 为真，故 $\varnothing\subseteq A$。

这里用的是"前件假则蕴含真"，不是"存在一个元素"。空集没有元素，谈不上"取出一个元素来验证"，只能从定义出发判断整个全称命题的真假。

**推论** 空集是唯一的。

证明：假设 $\varnothing_1$ 和 $\varnothing_2$ 都是空集。由定理 3.2.1，$\varnothing_1\subseteq\varnothing_2$ 且 $\varnothing_2\subseteq\varnothing_1$；由包含关系的反对称性得 $\varnothing_1=\varnothing_2$。

### 例题：空集与集合的属于、包含

判断下列命题是否为真：

(1) $\varnothing\subseteq\varnothing$；(2) $\varnothing\in\varnothing$；(3) $\varnothing\subseteq\{\varnothing\}$；(4) $\varnothing\in\{\varnothing\}$。

解：

- (1) 真。任何集合都是自身的子集（自反性）。
- (2) 假。$\varnothing$ 不含任何元素，故没有任何对象属于它，包括 $\varnothing$ 自身。
- (3) 真。空集是任意集合的子集，$\{\varnothing\}$ 也是集合。
- (4) 真。$\{\varnothing\}$ 是只有一个元素的集合，这个元素正是 $\varnothing$。

判断时要先看关系符：遇到 $\in$，问"右边集合列出的元素中有没有左边这个对象"；遇到 $\subseteq$，问"左边集合的每个元素是否都在右边集合中"。四个小题只差一个关系符，结论却是三真一假，靠直觉很容易出错。

### 子集计数与幂集

求 $A=\{a,b,c\}$ 的全部子集。

解：按元素个数分类列举：

- 0 元子集：$\varnothing$，共 $1$ 个；
- 1 元子集：$\{a\},\{b\},\{c\}$，共 $3$ 个；
- 2 元子集：$\{a,b\},\{a,c\},\{b,c\}$，共 $3$ 个；
- 3 元子集：$\{a,b,c\}$，共 $1$ 个。

合计 $1+3+3+1=8=2^3$ 个。

一般地，$n$ 元集合有 $2^n$ 个子集，其中真子集 $2^n-1$ 个，非空子集 $2^n-1$ 个，非空真子集 $2^n-2$ 个。计数理由：构造一个子集时，每个元素独立地做一次"取"或"不取"的二选一，$n$ 个元素共有 $2^n$ 种选择，且不同选择得到的子集不同。

**定义 3.2.4** 设 $A$ 为集合，把 $A$ 的全体子集构成的集合称为 $A$ 的**幂集**，记作 $P(A)$（或 $2^A$）：

$$
P(A)=\{x\mid x\subseteq A\}.
$$

若 $A$ 是 $n$ 元集，则 $|P(A)|=2^n$。幂集的元素是集合，不是 $A$ 的元素；$P(A)$ 本身也是一个集合，所以还可以继续取幂集。

例如 $A=\{a,b,c\}$ 时，

$$
P(A)=\{\varnothing,\{a\},\{b\},\{c\},\{a,b\},\{a,c\},\{b,c\},\{a,b,c\}\}.
$$

计算下列幂集：$\varnothing$，$\{\varnothing\}$，$\{\varnothing,\{\varnothing\}\}$。

解：

$$
P(\varnothing)=\{\varnothing\},
$$

空集只有一个子集，就是它自己。

$$
P(\{\varnothing\})=\{\varnothing,\{\varnothing\}\},
$$

一元集的两个子集是空集和它本身。

$$
P(\{\varnothing,\{\varnothing\}\})=\{\varnothing,\{\varnothing\},\{\{\varnothing\}\},\{\varnothing,\{\varnothing\}\}\}.
$$

第三式按"每个元素取或不取"核对：两个元素分别是 $\varnothing$ 与 $\{\varnothing\}$，四种组合恰好是空集、只取第一个、只取第二个、两个都取。

注意 $P(\varnothing)=\{\varnothing\}\ne\varnothing$，且 $|P(\varnothing)|=1=2^0$。每取一次幂集，外层就多一层花括号，元素个数翻倍；把 $P(\varnothing)$ 误写成 $\varnothing$ 是这一节最常见的错误。

## 3.3 集合的运算

### 并集

**定义 3.3.1** 设 $A,B$ 为集合，由 $A$ 和 $B$ 的所有元素组成的集合称为 $A$ 与 $B$ 的**并集**：

$$
A\cup B=\{x\mid x\in A\vee x\in B\}.
$$

对 $n$ 个集合 $A_1,A_2,\dots,A_n$，

$$
\bigcup_{i=1}^{n}A_i=A_1\cup A_2\cup\cdots\cup A_n=\{x\mid(\exists i)(x\in A_i)\},
$$

其中 $i$ 取遍 $1,2,\dots,n$。

### 交集

**定义 3.3.2** 设 $A,B$ 为集合，由同时属于 $A$ 和 $B$ 的元素组成的集合称为 $A$ 与 $B$ 的**交集**：

$$
A\cap B=\{x\mid x\in A\wedge x\in B\}.
$$

对 $n$ 个集合，

$$
\bigcap_{i=1}^{n}A_i=A_1\cap A_2\cap\cdots\cap A_n=\{x\mid(\forall i)(x\in A_i)\}.
$$

当 $A\cap B=\varnothing$ 时，称 $A$ 与 $B$ **不交**。例如 $A=\{1,2,3\}$，$B=\{4,5\}$ 不交。

并对应存在量词 $\exists$，交对应全称量词 $\forall$：一个元素只要属于某一个集合就进并集，必须属于每一个集合才进交集。这个对应关系是后面所有运算律的来源。

### 运算律

**定理 3.3.1（交换律）** 设 $A,B$ 为集合，则

$$
A\cup B=B\cup A,\qquad A\cap B=B\cap A.
$$

**定理 3.3.2（结合律）** 设 $A,B,C$ 为任意三个集合，则

$$
(A\cup B)\cup C=A\cup(B\cup C),\qquad (A\cap B)\cap C=A\cap(B\cap C).
$$

证明（以交为例）：对任意 $x$，

$$
\begin{aligned}
x\in(A\cap B)\cap C
&\Leftrightarrow x\in(A\cap B)\wedge x\in C\\
&\Leftrightarrow x\in A\wedge x\in B\wedge x\in C\\
&\Leftrightarrow x\in A\wedge x\in(B\cap C)\\
&\Leftrightarrow x\in A\cap(B\cap C).
\end{aligned}
$$

由于每一步对任意 $x$ 都等价，两边的元素完全相同，故集合相等。并的结合律同理，只需把 $\wedge$ 换成 $\vee$。

**定理 3.3.3（分配律）** 设 $A,B,C$ 为任意三个集合，则

$$
A\cup(B\cap C)=(A\cup B)\cap(A\cup C),\qquad
A\cap(B\cup C)=(A\cap B)\cup(A\cap C).
$$

证明 (1)：对任意 $x$，

$$
\begin{aligned}
x\in A\cup(B\cap C)
&\Leftrightarrow x\in A\vee x\in B\cap C\\
&\Leftrightarrow x\in A\vee(x\in B\wedge x\in C)\\
&\Leftrightarrow (x\in A\vee x\in B)\wedge(x\in A\vee x\in C)\\
&\Leftrightarrow (x\in A\cup B)\wedge(x\in A\cup C)\\
&\Leftrightarrow x\in(A\cup B)\cap(A\cup C).
\end{aligned}
$$

关键在从第三行到第四行这一步：命题逻辑中 $\vee$ 对 $\wedge$ 有分配律 $P\vee(Q\wedge R)\Leftrightarrow(P\vee Q)\wedge(P\vee R)$。这一步是把集合分配律"翻译"回逻辑之后直接套用的结果。

(2) 是对偶情形，把 $\vee$ 与 $\wedge$ 互换即可：

$$
x\in A\cap(B\cup C)\Leftrightarrow x\in A\wedge(x\in B\vee x\in C)
\Leftrightarrow(x\in A\wedge x\in B)\vee(x\in A\wedge x\in C)
\Leftrightarrow x\in(A\cap B)\cup(A\cap C).
$$

**定理 3.3.4（吸收律）** 设 $A,B$ 为任意两个集合，则

$$
A\cup(A\cap B)=A,\qquad A\cap(A\cup B)=A.
$$

证明 (1)：对任意 $x$，

$$
x\in A\cup(A\cap B)\Leftrightarrow x\in A\vee(x\in A\wedge x\in B)\Leftrightarrow x\in A.
$$

最后一步是逻辑吸收律 $P\vee(P\wedge Q)\Leftrightarrow P$：若 $x\in A$ 已经成立，后半句对真假没有影响；若 $x\in A$ 不成立，则整个析取式两边都为假。反过来 $x\in A\Rightarrow x\in A\cup(A\cap B)$ 由并集定义直接成立，所以等式成立。

(2) 对偶地，

$$
x\in A\cap(A\cup B)\Leftrightarrow x\in A\wedge(x\in A\vee x\in B)\Leftrightarrow x\in A,
$$

用的是 $P\wedge(P\vee Q)\Leftrightarrow P$。

这一组运算律的证明方法叫**元素法**（也叫逻辑等价法）：要证两个集合相等，就任取 $x$，把"$x$ 属于左边"逐步等价变形为"$x$ 属于右边"。因为集合的运算定义本身就是用 $\vee,\wedge,\neg$ 写的，所以集合恒等式与命题逻辑等价式一一对应。

### 差集

**定义 3.3.3** 设 $A,B$ 为任意两个集合，由属于 $A$ 但不属于 $B$ 的元素构成的集合称为 $A$ 和 $B$ 的**差**，又称为 $B$ 对于 $A$ 的相对补集，记作 $A-B$：

$$
A-B=\{x\mid x\in A\wedge x\notin B\}.
$$

由定义立即得到

$$
A-B=A\cap\sim B,
$$

其中 $\sim B$ 是 $B$ 的绝对补集。差运算不交换：一般 $A-B\ne B-A$。例如 $A=\{1,2,3\}$，$B=\{3,4\}$ 时，$A-B=\{1,2\}$，$B-A=\{4\}$。

### 补集

**定义 3.3.4** 设 $E$ 为全集，$A\subseteq E$，则称 $E$ 与 $A$ 的差集为 $A$ 的**补集**（绝对补集），记作 $\sim A$：

$$
\sim A=E-A=\{x\mid x\in E\wedge x\notin A\}=\{x\mid x\notin A\}.
$$

最后一式省略了 $x\in E$，是因为讨论范围已限定在全集 $E$ 内；若离开全集，"$x\notin A$"可能指向 $E$ 之外的对象，补集就不再是 $E$ 的子集了。补运算必须相对于某个全集才有意义。

![补集：A 在全集 E 内，阴影部分为 ~A](/images/campus-discrete-mathematics/ch03-venn-complement.png)

由定义可得

$$
\sim E=\varnothing,\qquad \sim\varnothing=E,\qquad \sim(\sim A)=A,
$$

$$
A\cap\sim A=\varnothing,\qquad A\cup\sim A=E.
$$

前三个等式说明补运算在 $E$ 与 $\varnothing$ 之间互换、连补两次回到原集合；后两个说明 $A$ 与它的补把全集分成互不相交的两块。

### 德摩根律

**定理 3.3.5** 设 $A,B$ 为任意两个集合，则

$$
\sim(A\cap B)=\sim A\cup\sim B,\qquad \sim(A\cup B)=\sim A\cap\sim B.
$$

证明 (1)：设 $E$ 为全集，显然 $A\cap E=A$，$A\cup E=E$。对任意 $x$，

$$
\begin{aligned}
\sim(A\cap B)
&=\{x\mid x\in E\wedge x\notin A\cap B\}\\
&=\{x\mid x\in E\wedge\neg(x\in A\wedge x\in B)\}\\
&=\{x\mid x\in E\wedge\big(\neg(x\in A)\vee\neg(x\in B)\big)\}\\
&=\{x\mid x\in E\wedge(x\notin A\vee x\notin B)\}\\
&=\{x\mid(x\in E\wedge x\notin A)\vee(x\in E\wedge x\notin B)\}\\
&=\sim A\cup\sim B.
\end{aligned}
$$

第三行用了 $\neg(P\wedge Q)\Leftrightarrow\neg P\vee\neg Q$；第五行把 $x\in E$ 分别乘进两个析取项，用的是 $\wedge$ 对 $\vee$ 的分配律。由于 $x\in E$ 恒真，这个"乘进去"不会漏掉或增加元素。

(2) 完全对偶：把 $\neg(P\vee Q)\Leftrightarrow\neg P\wedge\neg Q$ 代进去，

$$
\sim(A\cup B)=\{x\mid x\in E\wedge(x\notin A\wedge x\notin B)\}=\sim A\cap\sim B.
$$

德摩根律是化简集合表达式时最常主动使用的一条：把"交的补"拆成"补的并"，或反过来把"并的补"合成"补的交"，通常能让表达式朝目标形式靠近。

### 对称差

**定义 3.3.5** 设 $A,B$ 为集合，由属于 $A$ 而不属于 $B$ 的所有元素和属于 $B$ 而不属于 $A$ 的所有元素组成的集合，称为 $A$ 与 $B$ 的**对称差**，记作 $A\oplus B$：

$$
A\oplus B=\{x\mid(x\in A\wedge x\notin B)\vee(x\in B\wedge x\notin A)\}.
$$

等价地，

$$
A\oplus B=(A-B)\cup(B-A)=(A\cap\sim B)\cup(B\cap\sim A).
$$

![对称差：两圆不重叠的部分为 A⊕B](/images/campus-discrete-mathematics/ch03-venn-symdiff.png)

例 3.3.4 设 $A=\{1,2,3,4,5\}$，$B=\{2,4,6\}$，则

$$
A-B=\{1,3,5\},\qquad B-A=\{6\},\qquad A\oplus B=\{1,3,5,6\}.
$$

对称差满足

$$
A\oplus A=\varnothing,\qquad A\oplus\varnothing=A,\qquad A\oplus B=B\oplus A,\qquad (A\oplus B)\oplus C=A\oplus(B\oplus C).
$$

前两条可直接由定义验证：$A\oplus A$ 中每个元素都要求"属于 $A$ 又不属于 $A$"，条件恒假；$A\oplus\varnothing$ 只剩"属于 $A$ 而不属于 $\varnothing$"这一支，即 $A$。交换律来自析取两支互换；结合律可按元素逐个检查——$x$ 在三个集合中的隶属情况有 $2^3=8$ 种，每种情况下两边同为真或同为假。

对称差刻画的是"恰属于其中一个集合"的元素，因此 $A\oplus B$ 与 $(A\cup B)-(A\cap B)$ 相等。

### 集合恒等式

| 名称 | 等式 |
| --- | --- |
| 恒等律 | $A\cup\varnothing=A$，$A\cap E=A$ |
| 支配律 | $A\cup E=E$，$A\cap\varnothing=\varnothing$ |
| 幂等律 | $A\cup A=A$，$A\cap A=A$ |
| 双重否定律 | $\sim(\sim A)=A$ |
| 交换律 | $A\cup B=B\cup A$，$A\cap B=B\cap A$ |
| 结合律 | $A\cup(B\cup C)=(A\cup B)\cup C$，$A\cap(B\cap C)=(A\cap B)\cap C$ |
| 分配律 | $A\cap(B\cup C)=(A\cap B)\cup(A\cap C)$，$A\cup(B\cap C)=(A\cup B)\cap(A\cup C)$ |
| 德摩根律 | $\sim(A\cup B)=\sim A\cap\sim B$，$\sim(A\cap B)=\sim A\cup\sim B$ |
| 吸收律 | $A\cup(A\cap B)=A$，$A\cap(A\cup B)=A$ |
| 补律 | $A\cap\sim A=\varnothing$，$A\cup\sim A=E$ |

这张表与命题逻辑的等值式表逐条对应：把 $\cup$ 读成 $\vee$、$\cap$ 读成 $\wedge$、$\sim$ 读成 $\neg$、$\varnothing$ 读成 $F$、$E$ 读成 $T$，就得到命题逻辑的等值式。记不住某条集合恒等式时，可以退回元素层面重新推导，而不必死记。

### 例题：差与并的分配

例 3.3.5 证明

$$
A-(B\cup C)=(A-B)\cap(A-C).
$$

**思路：** 左边要求元素属于 $A$，同时不属于 $B$ 和 $C$；“不属于并集”提示用德摩根律拆开否定，再分别凑出 $A-B$ 与 $A-C$。可以在元素层面展开定义，也可以先把差集改写为交补，再用集合恒等式变形。

**证法一（元素法）** 对任意 $x$，

$$
\begin{aligned}
x\in A-(B\cup C)
&\Leftrightarrow x\in A\wedge x\notin B\cup C\\
&\Leftrightarrow x\in A\wedge\neg(x\in B\vee x\in C)\\
&\Leftrightarrow x\in A\wedge\neg(x\in B)\wedge\neg(x\in C)\\
&\Leftrightarrow x\in A\wedge x\notin B\wedge x\notin C\\
&\Leftrightarrow(x\in A\wedge x\notin B)\wedge(x\in A\wedge x\notin C)\\
&\Leftrightarrow x\in A-B\wedge x\in A-C\\
&\Leftrightarrow x\in(A-B)\cap(A-C).
\end{aligned}
$$

倒数第三行把同一个 $x\in A$ 复制成两份，分别与 $x\notin B$、$x\notin C$ 组合；这是"一分为二"的技巧，因为要凑出两个差集的交，必须让两个合取项都带上 $x\in A$。

**证法二（恒等式法）**

$$
\begin{aligned}
A-(B\cup C)
&=A\cap\sim(B\cup C)\\
&=A\cap(\sim B\cap\sim C)\\
&=(A\cap\sim B)\cap(A\cap\sim C)\\
&=(A-B)\cap(A-C).
\end{aligned}
$$

第一步把差化成"交补"，第二步用德摩根律，第三步把 $A$ 复制成 $A\cap A$（幂等律）再重新结合，最后一步再把交补写回差。

两种证法都要会：恒等式法短，但要求记得 $\sim(B\cup C)=\sim B\cap\sim C$ 和 $A-B=A\cap\sim B$；元素法不需要背律，只要按定义展开、按逻辑等价变形，适合考试时一时想不起该用哪条恒等式的情况。

### 例题：用包含关系刻画并、交

例 3.3.6 证明 $A\subseteq B$ 当且仅当 $A\cup B=B$ 或 $A\cap B=A$。

证明分两个方向。

**先证"若 $A\cup B=B$ 或 $A\cap B=A$，则 $A\subseteq B$"。**

若 $A\cup B=B$：任取 $x\in A$，由并集定义 $x\in A\cup B=B$，故 $x\in B$，所以 $A\subseteq B$。

若 $A\cap B=A$：任取 $x\in A=A\cap B$，由交集定义 $x\in B$，所以 $A\subseteq B$。

**再证"若 $A\subseteq B$，则 $A\cup B=B$ 且 $A\cap B=A$"。**

先证 $A\cup B=B$。一方面，任取 $x\in A\cup B$，则 $x\in A$ 或 $x\in B$；若 $x\in A$，由 $A\subseteq B$ 得 $x\in B$，两种情形都有 $x\in B$，故 $A\cup B\subseteq B$。另一方面，由并集定义 $B\subseteq A\cup B$ 恒成立。于是 $A\cup B=B$。

再证 $A\cap B=A$。一方面，$A\cap B\subseteq A$ 恒成立。另一方面，任取 $x\in A$，由 $A\subseteq B$ 得 $x\in B$，从而 $x\in A\cap B$，故 $A\subseteq A\cap B$。于是 $A\cap B=A$。

原命题写的是"或"，而第二个方向实际上证明了两个等式同时成立。这不矛盾：由 $A\subseteq B$ 能推出"$A\cup B=B$ 且 $A\cap B=A$"，自然也能推出用"或"连接的较弱命题；反过来，只要其中一个等式成立就足以推出 $A\subseteq B$。因此"或"在这里是成立的，只是比实际结论弱。证明时把两个等式都证出来，逻辑上最省事。

这类题的结构值得记住：证 $A\cup B=B$ 时，"$B\subseteq A\cup B$"是白送的，只需证另一半；证 $A\cap B=A$ 时，"$A\cap B\subseteq A$"是白送的，只需证 $A\subseteq A\cap B$。把显然的一半指出、把力气花在需要条件的一半上，是集合等式证明的通用节奏。

## 3.4 自然数

自然数集合包含无限多元素。用空集和后继集，可以把每个自然数本身定义成一个集合，从而在集合论内部"造出"自然数。

### 后继集与自然数的构造

**定义 3.4.1** 设 $A$ 是一集合，$A$ 的**后继集** $A^+$ 为

$$
A^+=A\cup\{A\}.
$$

例 3.4.1 已知 $A=\{1,2,3\}$，求 $A^+$。

解：

$$
A^+=A\cup\{A\}=\{1,2,3\}\cup\{\{1,2,3\}\}=\{1,2,3,\{1,2,3\}\}.
$$

注意新增的元素是"$A$ 整体"作为一个对象，写成 $\{1,2,3\}$，而不是把 $1,2,3$ 再写一遍。

例 3.4.2 对空集 $\varnothing$，求 (1) $\varnothing^+$；(2) $(\varnothing^+)^+$；(3) $((\varnothing^+)^+)^+$。

解：

(1)

$$
\varnothing^+=\varnothing\cup\{\varnothing\}=\{\varnothing\}.
$$

(2)

$$
(\varnothing^+)^+=\{\varnothing\}^+=\{\varnothing\}\cup\{\{\varnothing\}\}=\{\varnothing,\{\varnothing\}\}.
$$

(3)

$$
((\varnothing^+)^+)^+=\{\varnothing,\{\varnothing\}\}^+
=\{\varnothing,\{\varnothing\}\}\cup\big\{\{\varnothing,\{\varnothing\}\}\big\}
=\{\varnothing,\{\varnothing\},\{\varnothing,\{\varnothing\}\}\}.
$$

若集合 $A$ 有 $n$ 个元素，则 $A^+$ 有 $n+1$ 个元素。理由是 $A^+=A\cup\{A\}$ 只新增了 $A$ 这一个候选元素，而 $A\notin A$，所以它确实是新元素。对本章由空集反复取后继得到的集合，$A\notin A$ 始终成立；若换成任意集合，$A\in A$ 的情形需要另行排除，$|A^+|=|A|+1$ 才成立。

把上述结果依次命名为自然数：

$$
0=\varnothing,\qquad
1=\varnothing^+=\{\varnothing\},\qquad
2=(\varnothing^+)^+=\{\varnothing,\{\varnothing\}\},\qquad
3=((\varnothing^+)^+)^+=\{\varnothing,\{\varnothing\},\{\varnothing,\{\varnothing\}\}\},
$$

并继续下去，就有 $1=0^+$，$2=1^+$，$3=2^+$，$\dots$。以这些集合为元素构成的集合 $\{0,1,2,3,\dots\}$ 就是自然数集合。

**定义 3.4.2** 用空集和后继集可以把所有自然数定义为集合：

$$
0=\varnothing,\qquad n^+=n\cup\{n\},\quad n\in\mathbb{N}.
$$

由此可见，任一个自然数都是一个集合的名称。这个构造还顺带给出了"自然数的大小"与"集合的元素个数"的一致：$n=\{0,1,\dots,n-1\}$，所以 $n$ 恰有 $n$ 个元素，$|n|=n$。例如 $3=\{0,1,2\}$，$|3|=3$。后继操作 $n\mapsto n^+$ 就是在集合里"再加入当前这个数"，于是元素个数加一。

## 3.5 集合的特征函数

### 特征函数与 0-1 串

**定义 3.5.1** 设 $E$ 是全集，集合 $A$ 是 $E$ 的子集，定义集合 $A$ 的**特征函数**为

$$
f_A:E\to\{0,1\},\qquad
f_A(x)=
\begin{cases}
1, & x\in A,\\
0, & x\in E\ \text{且}\ x\notin A.
\end{cases}
$$

特征函数把"$x$ 是否属于 $A$"这个判断变成一个 $0$ 或 $1$ 的数。若 $E$ 有 $n$ 个元素并按固定顺序排好，把每个元素的函数值依次写出，就得到一条长为 $n$ 的 0-1 串，用它表示集合 $A$。

例 3.5.1 设 $E=\{1,2,3,4,5,6,7,8,9,10\}$，$A=\{1,2,3,4,5\}$，$B=\{2,4,6,8,10\}$，用特征函数表示 $A$ 和 $B$。

解：$E$ 的元素按 $1,2,\dots,10$ 的顺序排列。$A$ 含 $1$ 到 $5$，不含 $6$ 到 $10$，故

$$
A:\ 1111100000.
$$

$B$ 含 $2,4,6,8,10$，不含 $1,3,5,7,9$，故

$$
B:\ 0101010101.
$$

串的长度必须等于 $|E|$，第 $i$ 位对应 $E$ 中第 $i$ 个元素；换一种排列顺序，串就不同，所以使用 0-1 串前要先固定 $E$ 的元素次序。

例 3.5.2 在同上条件下，计算 $\sim A$，$A\cup B$，$A\cap B$，$A-B$。

解：$\sim A$ 是把 $A$ 的 0-1 串逐位取反：

$$
\sim A:\ 0000011111,
$$

即 $\sim A=\{6,7,8,9,10\}$。

并对应逐位"或"：

$$
1111100000\vee 0101010101=1111110101,
$$

即 $A\cup B=\{1,2,3,4,5,6,8,10\}$。

交对应逐位"与"：

$$
1111100000\wedge 0101010101=0101000000,
$$

即 $A\cap B=\{2,4\}$。

差用 $A-B=A\cap\sim B$。先求 $\sim B=1010101010$，再逐位"与"：

$$
1111100000\wedge 1010101010=1010100000,
$$

即 $A-B=\{1,3,5\}$。

逐位运算的结果可以与集合运算互相校验：例如 $A\cup B$ 中第 $7$ 位为 $0$，说明 $7$ 既不在 $A$ 也不在 $B$，与 $A,B$ 的定义一致。补运算依赖全集：$\sim A$ 的串长和取值都由 $E$ 决定，若把 $E$ 改成 $\{1,\dots,12\}$，同一条 $\sim A$ 就要写成 $000001111111$。

## 课堂小结

本章从"元素属于集合"这一种基本关系出发，用外延原则把集合相等归结为元素相同，再用 $\subseteq$ 把包含关系写成全称蕴含式。空集是这一切的起点：它没有元素，因而"$x\in\varnothing$"恒假，空集自动成为任何集合的子集。由子集得到幂集，$n$ 元集的幂集有 $2^n$ 个元素。

集合运算的代数结构完全平行于命题逻辑：并对应 $\vee$、交对应 $\wedge$、补对应 $\neg$、$\varnothing$ 对应 $F$、$E$ 对应 $T$，于是交换、结合、分配、吸收、德摩根诸律都可以通过"任取 $x$，把'$x$ 属于左边'等价变形为'$x$ 属于右边'"来证明。差可以化成交补，对称差刻画"恰属于一个集合"的元素。自然数用 $0=\varnothing$、$n^+=n\cup\{n\}$ 构造，每个自然数都是一个集合；特征函数则把集合运算翻译成 0-1 串的按位运算。

最容易出错的地方集中在记号与边界：$\in$ 连接元素与集合，$\subseteq$ 连接集合与集合；$\varnothing$ 与 $\{\varnothing\}$ 的元素数不同；$P(\varnothing)=\{\varnothing\}$ 而不是 $\varnothing$；$\subset$ 在本课程中表示真子集；补运算必须先明确全集；空集作为子集时用的是"前件假则蕴含真"，不能理解为"存在元素"；归纳定义不能漏掉"界限"这一条。证明集合相等时，优先考虑"互相包含"；证明集合恒等式时，先尝试恒等式化简，卡住再退回元素法。

## 资料来源

- [第3章集合.pdf](https://drive.google.com/file/d/1zBEq8Ne-_fyFk3lbhQ2POc-9Z-xcV-I-/view?usp=drivesdk)
