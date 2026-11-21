---
slug: "04-relations-and-functions"
title: "关系和函数"
summary: "二元关系、复合与闭包、等价与偏序、函数及集合的基数。"
updatedAt: "2026-11-16"
content_type: "reference"
group: "course"
displayNumber: "04"
tags: ["离散数学"]
sources:
  - kind: article
    title: "第4章关系和函数.pdf"
    url: "https://drive.google.com/file/d/1u45UJfgfB7nN8XXZy2Recl5ZeTMf93mS/view?usp=drivesdk"
---

本章把“两个对象之间是否存在某种联系”抽象成集合论意义下的关系：先由有序对与笛卡儿积给出关系的集合定义，再讨论关系图与关系矩阵两种表示法，然后研究关系的运算（并、交、差、补、逆、复合、幂）、五种基本性质（自反、反自反、对称、反对称、传递），以及为“补上”性质而引入的闭包。关系的两类重要特例——等价关系与偏序关系——分别在 4.6、4.7 中展开；4.8 把函数看作满足单值性条件的特殊二元关系，并讨论复合、反函数与集合的基数。

## 4.1 关系的概念

### 4.1.1 有序对与有序 n 元组

**定义**

由两个元素 $a$ 和 $b$ 按一定顺序排列成的二元组称为有序对（序偶），记作 $(a,b)$，其中 $a$ 是第一元素，$b$ 是第二元素。

有序对的两条基本性质：

1. 若 $a\neq b$，则 $(a,b)\neq(b,a)$；
2. $(a,b)=(c,d)$ 当且仅当 $a=c$ 且 $b=d$。

> **易混点**：有序对与二元集要分清：$\{a,b\}=\{b,a\}$ 恒成立，而 $(a,b)$ 与 $(b,a)$ 一般不相等。

**定义**

由 $n$ 个元素 $a_1,a_2,\dots,a_n$ 按一定顺序排列成的序列 $(a_1,a_2,\dots,a_n)$ 称为有序 $n$ 元组，$a_1$ 为第一元素，$a_n$ 为第 $n$ 元素。$n$ 维空间中点的坐标、$n$ 维向量都是有序 $n$ 元组。

两个有序 $n$ 元组相等当且仅当每一位置上的元素都相等：

$$
(a_1,a_2,\dots,a_n)=(b_1,b_2,\dots,b_n)\iff a_i=b_i\quad(i=1,2,\dots,n).
$$

### 4.1.2 笛卡儿积

**定义**

设 $A,B$ 为集合，取 $A$ 中元素作第一元素、$B$ 中元素作第二元素，所有这样的有序对组成的集合称为 $A$ 与 $B$ 的笛卡儿积（直积）：

$$
A\times B=\{(x,y)\mid x\in A\ \land\ y\in B\}.
$$

**例** 设 $A=\{a,b,c\}$，$B=\{1,3\}$，求 $A\times B$、$B\times A$、$A\times\varnothing$、$\varnothing\times B$。

**解**

$$
A\times B=\{(a,1),(a,3),(b,1),(b,3),(c,1),(c,3)\},
$$
$$
B\times A=\{(1,a),(1,b),(1,c),(3,a),(3,b),(3,c)\},
$$
$$
A\times\varnothing=\varnothing,\qquad \varnothing\times B=\varnothing.
$$

最后两式说明：任一侧为空集，笛卡儿积就是空集。

**例** 设 $A=\{a,b,c\}$，$B=\{1,3\}$，$C=\{x\}$，求 $(A\times B)\times C$ 与 $A\times(B\times C)$。

**解**

$$
(A\times B)\times C=\{\,((a,1),x),((a,3),x),((b,1),x),((b,3),x),((c,1),x),((c,3),x)\,\},
$$
$$
A\times(B\times C)=\{\,(a,(1,x)),(a,(3,x)),(b,(1,x)),(b,(3,x)),(c,(1,x)),(c,(3,x))\,\}.
$$

两者元素个数相同，但元素的结构不同：前者是“有序对的坐标”，后者是“第二坐标为有序对”，所以 $(A\times B)\times C\neq A\times(B\times C)$。

**笛卡儿积的基本性质**

1. 当 $A,B$ 非空且 $A\neq B$ 时，运算不满足交换律：$A\times B\neq B\times A$。
2. $A\times B=\varnothing$ 当且仅当 $A=\varnothing$ 或 $B=\varnothing$。
3. 当 $A,B,C$ 均非空时，运算不满足结合律：$(A\times B)\times C\neq A\times(B\times C)$。
4. 当 $A,B$ 为有限集时，$|A\times B|=|A|\cdot|B|$。

**定理（分配律）**

设 $A,B,C$ 为任意集合，则

$$
A\times(B\cup C)=(A\times B)\cup(A\times C),
$$
$$
A\times(B\cap C)=(A\times B)\cap(A\times C),
$$
$$
(A\cup B)\times C=(A\times C)\cup(B\times C),
$$
$$
(A\cap B)\times C=(A\times C)\cap(B\times C).
$$

**例** 证明 $A\times(B\cup C)=(A\times B)\cup(A\times C)$。

**证明** 对任意有序对 $(x,y)$，按“属于”逐条等价变形：

$$
\begin{aligned}
(x,y)\in A\times(B\cup C)
&\iff x\in A\ \land\ y\in B\cup C\\
&\iff x\in A\ \land\ (y\in B\ \lor\ y\in C)\\
&\iff (x\in A\ \land\ y\in B)\ \lor\ (x\in A\ \land\ y\in C)\\
&\iff (x,y)\in A\times B\ \lor\ (x,y)\in A\times C\\
&\iff (x,y)\in (A\times B)\cup(A\times C).
\end{aligned}
$$

两边的元素完全相同，故等式成立。关键一步是 $\land$ 对 $\lor$ 的分配：$p\land(q\lor r)\iff(p\land q)\lor(p\land r)$。

**例** 证明 $A\times(B-C)=(A\times B)-(A\times C)$。

**证明** 对任意 $(x,y)$：

$$
\begin{aligned}
(x,y)\in A\times(B-C)
&\iff x\in A\ \land\ (y\in B\ \land\ y\notin C)\\
&\iff (x\in A\land y\in B)\ \land\ (x\in A\land y\notin C)\\
&\iff (x,y)\in A\times B\ \land\ (x,y)\notin A\times C\\
&\iff (x,y)\in (A\times B)-(A\times C).
\end{aligned}
$$

第二行到第三行用到 $(x,y)\notin A\times C\iff x\notin A\ \lor\ y\notin C$；由于这里已有 $x\in A$，“$x\notin A$”不成立，故只剩 $y\notin C$。

> **补充证明**（分配律的其余三式）
>
> 三式都用“对任意 $(x,y)$ 作等价变形”的同一方法。
>
> **(1) $A\times(B\cap C)=(A\times B)\cap(A\times C)$。**
>
> $$
> \begin{aligned}
> (x,y)\in A\times(B\cap C)
> &\iff x\in A\ \land\ y\in B\cap C\\
> &\iff x\in A\ \land\ (y\in B\ \land\ y\in C)\\
> &\iff (x\in A\land y\in B)\ \land\ (x\in A\land y\in C)\\
> &\iff (x,y)\in A\times B\ \land\ (x,y)\in A\times C\\
> &\iff (x,y)\in(A\times B)\cap(A\times C).
> \end{aligned}
> $$
>
> **(2) $(A\cup B)\times C=(A\times C)\cup(B\times C)$。**
>
> $$
> \begin{aligned}
> (x,y)\in(A\cup B)\times C
> &\iff x\in A\cup B\ \land\ y\in C\\
> &\iff (x\in A\ \lor\ x\in B)\ \land\ y\in C\\
> &\iff (x\in A\land y\in C)\ \lor\ (x\in B\land y\in C)\\
> &\iff (x,y)\in A\times C\ \lor\ (x,y)\in B\times C\\
> &\iff (x,y)\in(A\times C)\cup(B\times C).
> \end{aligned}
> $$
>
> **(3) $(A\cap B)\times C=(A\times C)\cap(B\times C)$。**
>
> $$
> \begin{aligned}
> (x,y)\in(A\cap B)\times C
> &\iff x\in A\cap B\ \land\ y\in C\\
> &\iff x\in A\ \land\ x\in B\ \land\ y\in C\\
> &\iff (x\in A\land y\in C)\ \land\ (x\in B\land y\in C)\\
> &\iff (x,y)\in A\times C\ \land\ (x,y)\in B\times C\\
> &\iff (x,y)\in(A\times C)\cap(B\times C).
> \end{aligned}
> $$
>
> 三式的关键都只有一条：$\land$ 对 $\lor$ 可分配，而 $\land$ 对 $\land$ 可直接合并。注意第 (2) 式不能把 $y\in C$ 漏到某一支里，否则会得到只在一个因子中出现的“半分配”。

**n 阶直积** 设 $A_1,A_2,\dots,A_n$ 为任意 $n$ 个集合，它们的笛卡儿积（$n$ 阶直积）为

$$
A_1\times A_2\times\cdots\times A_n=\{(a_1,a_2,\dots,a_n)\mid a_i\in A_i,\ i=1,2,\dots,n\}.
$$

当 $A_1=A_2=\cdots=A_n=A$ 时记作 $A^n$；若 $|A_i|=n_i$，则

$$
|A_1\times A_2\times\cdots\times A_n|=n_1n_2\cdots n_n.
$$

**例（判断三个命题的真假）** 设 $A,B,C,D$ 为任意集合，判断：

(1) $A\subseteq C\ \land\ B\subseteq D\iff A\times B\subseteq C\times D$；

(2) $(A\cap B)\times(C\cap D)=(A\times C)\cap(B\times D)$；

(3) $(A\cup B)\times(C\cup D)=(A\times C)\cup(B\times D)$。

**解** (1) 由左到右为真，由右到左不一定为真，所以作为“充要条件”不成立。

由左到右：若 $A\subseteq C$、$B\subseteq D$，任取 $(x,y)\in A\times B$，则 $x\in A\subseteq C$、$y\in B\subseteq D$，故 $(x,y)\in C\times D$。

反向需要小心。只要 $A\neq\varnothing$，取 $a\in A$，由 $A\times B\subseteq C\times D$ 得 $\{a\}\times B\subseteq C\times D$，而 $C\times D$ 中元素的第二坐标都取自 $D$，于是 $B\subseteq D$；同理若 $B\neq\varnothing$ 可得 $A\subseteq C$。反例只能出现在某侧为空集的情形：取

$$
A=\varnothing,\quad B=\{1\},\quad C=\{2\},\quad D=\varnothing .
$$

此时 $A\times B=\varnothing\subseteq\varnothing=C\times D$，且 $A\subseteq C$，但 $B=\{1\}\not\subseteq D=\varnothing$。

(2) 为真。对任意 $(x,y)$，

$$
\begin{aligned}
(x,y)\in (A\cap B)\times(C\cap D)
&\iff x\in A\land x\in B\ \land\ y\in C\land y\in D\\
&\iff (x\in A\land y\in C)\ \land\ (x\in B\land y\in D)\\
&\iff (x,y)\in A\times C\ \land\ (x,y)\in B\times D\\
&\iff (x,y)\in (A\times C)\cap(B\times D).
\end{aligned}
$$

(3) 不一定为真。取 $A=\{1\}$，$B=\{2\}$，$C=\{3\}$，$D=\{4\}$，则

$$
(A\cup B)\times(C\cup D)=\{(1,3),(1,4),(2,3),(2,4)\},
$$
$$
(A\times C)\cup(B\times D)=\{(1,3),(2,4)\},
$$

前者多出 $(1,4)$ 与 $(2,3)$，等式不成立。

### 4.1.3 二元关系

**定义**

若一个集合非空且其元素全是有序对，或者该集合为空，则称它为一个二元关系，记作 $R$。对二元关系 $R$，若 $(a,b)\in R$，称 $a$ 与 $b$ 有 $R$ 关系，记作 $aRb$；若 $(a,b)\notin R$，记作 $\lnot(aRb)$。

例如 $R=\{(0,a),(0,b),(1,a),(2,b)\}$ 是二元关系，其中 $0Ra$、$0Rb$、$1Ra$、$2Rb$，而 $1Rb$、$2Ra$ 不成立。而 $\{(1,2),(1,3),2,3\}$ 不是二元关系，因为它含有不是有序对的元素 $2$ 与 $3$。

**定义**

设 $A,B$ 为集合，$A\times B$ 的任意一个子集都是 $A$ 到 $B$ 的一个二元关系；当 $A=B$ 时称为 $A$ 上的二元关系。

例如 $A=\{0,1,2\}$、$B=\{a,b\}$ 时，$R_1=\{(0,a),(1,b),(1,a),(2,b)\}$ 是 $A$ 到 $B$ 的二元关系，$R_2=\{(0,1),(1,2),(0,2)\}$ 是 $A$ 上的二元关系。

**三种特殊关系**（设 $A$ 为集合）

| 名称 | 定义 | 说明 |
| --- | --- | --- |
| 空关系 | $\varnothing$ | $\varnothing\subseteq A\times A$ |
| 全域关系 | $E_A=A\times A=\{(x,y)\mid x\in A\land y\in A\}$ | 所有有序对都在其中 |
| 恒等关系 | $I_A=\{(x,x)\mid x\in A\}$ | 只含“自己与自己”的有序对 |

以 $A=\{a,b\}$ 为例：$E_A=\{(a,a),(a,b),(b,a),(b,b)\}$，$I_A=\{(a,a),(b,b)\}$。

**关系的个数** 若 $|A|=n$、$|B|=m$，则 $|A\times B|=nm$，而 $A\times B$ 有 $2^{nm}$ 个子集，所以 $A$ 到 $B$ 共有 $2^{nm}$ 个不同的二元关系；若 $B=A$，则 $|A\times A|=n^2$，$A$ 上共有 $2^{n^2}$ 个不同的二元关系。

**例** 设 $A=\{0,1\}$，$B=\{a,b\}$，写出 $A$ 到 $B$ 的所有二元关系。

**解** $A\times B=\{(0,a),(0,b),(1,a),(1,b)\}$，其所有子集（即全部二元关系）按元素个数分类列出：

- 0 元子集（1 个）：$\varnothing$；
- 1 元子集（4 个）：$\{(0,a)\}$、$\{(0,b)\}$、$\{(1,a)\}$、$\{(1,b)\}$；
- 2 元子集（6 个）：$\{(0,a),(0,b)\}$、$\{(0,a),(1,a)\}$、$\{(0,a),(1,b)\}$、$\{(0,b),(1,a)\}$、$\{(0,b),(1,b)\}$、$\{(1,a),(1,b)\}$；
- 3 元子集（4 个）：$\{(0,a),(0,b),(1,a)\}$、$\{(0,a),(0,b),(1,b)\}$、$\{(0,a),(1,a),(1,b)\}$、$\{(0,b),(1,a),(1,b)\}$；
- 4 元子集（1 个）：$\{(0,a),(0,b),(1,a),(1,b)\}$。

合计 $1+4+6+4+1=16=2^{2\times 2}$ 个。

**例** 设 $A=\{0,1,2\}$，写出 $A$ 上的整除关系 $D_R$ 与小于或等于关系 $L_A$。

**解**

$$
D_R=\{(1,1),(1,2),(2,2)\},\qquad L_A=\{(0,0),(0,1),(0,2),(1,1),(1,2),(2,2)\}.
$$

注意 $D_R$ 中不含 $(0,1)$、$(0,2)$，因为通常约定除数不为 $0$。

**例** 写出实数集 $\mathbb{R}$ 上的小于等于关系与正整数集 $\mathbb{Z}^+$ 上的整除关系。

**解**

$$
L=\{(x,y)\mid x,y\in\mathbb{R}\ \land\ x\le y\},\qquad D=\{(x,y)\mid x,y\in\mathbb{Z}^+\ \land\ x\mid y\}.
$$

### 4.1.4 定义域、值域与 n 元关系

**定义**

设 $R$ 是从 $A$ 到 $B$ 的二元关系。$R$ 中所有有序对的第一个元素组成的集合称为 $R$ 的定义域（前域），记作 $\operatorname{dom}R$；所有第二个元素组成的集合称为值域（后域），记作 $\operatorname{ran}R$；两者之并称为 $R$ 的域，记作 $\operatorname{fld}R$。

$$
\operatorname{dom}R=\{x\mid \exists y\,((x,y)\in R)\},\qquad \operatorname{ran}R=\{y\mid \exists x\,((x,y)\in R)\},\qquad \operatorname{fld}R=\operatorname{dom}R\cup\operatorname{ran}R.
$$

当 $R$ 是 $A$ 到 $B$ 的关系时，必有 $\operatorname{dom}R\subseteq A$、$\operatorname{ran}R\subseteq B$，但一般不相等——关系可以“不覆盖”整个 $A$ 或 $B$。

**例** 设 $A=\{\text{甲},\text{乙},\text{丙},\text{丁}\}$，$B=\{a,b,c\}$，$R=\{(\text{甲},a),(\text{乙},b),(\text{丁},c)\}$，求 $\operatorname{dom}R$ 与 $\operatorname{ran}R$。

**解** $\operatorname{dom}R=\{\text{甲},\text{乙},\text{丁}\}$，$\operatorname{ran}R=\{a,b,c\}$。这里“丙”不在定义域中，说明 $R$ 没有覆盖整个 $A$。

**例** 设 $\mathbb{Z}$ 为整数集，$R=\{(x,y)\mid x,y\in\mathbb{Z}\land y=x^2\}$，求 $\operatorname{dom}R$ 与 $\operatorname{ran}R$。

**解** $\operatorname{dom}R=\mathbb{Z}$；$\operatorname{ran}R=\{y\mid \exists x\in\mathbb{Z},\,y=x^2\}=\{0,1,4,9,16,\dots\}$，即全体完全平方数。

**定义（n 元关系）**

设 $A_1,A_2,\dots,A_n$ 是 $n$ 个集合，$A_1\times A_2\times\cdots\times A_n$ 的任一子集称为 $A_1,A_2,\dots,A_n$ 间的一个 $n$ 元关系。

二元关系是 $n=2$ 的特殊情形；数据库中的二维表就是二元关系的一种直观载体：每一行是一个有序对（或有序 $n$ 元组），“学号—姓名—课程—成绩”四列对应四元组。

## 4.2 关系的表示法

### 4.2.1 集合表示法

关系本身是集合，因此列举法与描述法都可用。例如“$a,b,c$ 为整数且 $0<a<b<c<5$”的三元关系，用描述法写作

$$
R=\{(a,b,c)\mid a,b,c\in\mathbb{Z},\ 0<a<b<c<5\},
$$

逐个列举即

$$
R=\{(1,2,3),(1,2,4),(1,3,4),(2,3,4)\}.
$$

### 4.2.2 关系图

**定义**

设 $A=\{a_1,a_2,\dots,a_m\}$，$B=\{b_1,b_2,\dots,b_n\}$，$R$ 是从 $A$ 到 $B$ 的二元关系。把 $A$、$B$ 的每个元素画成一个结点，每个有序对 $(a_i,b_j)\in R$ 画成一条由 $a_i$ 指向 $b_j$ 的有向边，所得图形称为 $R$ 的关系图。

**例** 设 $X=\{x_1,x_2,x_3,x_4\}$，$Y=\{y_1,y_2,y_3\}$，$R=\{(x_1,y_2),(x_2,y_3),(x_3,y_3),(x_4,y_1)\}$，其关系图为：$x_1\to y_2$，$x_2\to y_3$，$x_3\to y_3$，$x_4\to y_1$，左侧四个结点、右侧三个结点。

**例** 设 $A=\{1,2,3,4\}$，$R=\{(1,1),(1,4),(2,1),(2,3),(2,4),(3,1),(4,1),(4,2)\}$，画其关系图。

**解** 图中结点 $1,2,3,4$ 按同一集合排列，边为 $1\to1$（即结点 1 上的环）、$1\to4$、$2\to1$、$2\to3$、$2\to4$、$3\to1$、$4\to1$、$4\to2$。

在关系图中，$(a,b)$ 对应的边以 $a$ 为起点、$b$ 为终点；若 $aRa$，则从 $a$ 出发又回到 $a$ 的边称为**环**。

### 4.2.3 关系矩阵

**定义**

设 $A=\{a_1,\dots,a_m\}$，$B=\{b_1,\dots,b_n\}$，$R$ 是 $A$ 到 $B$ 的二元关系。用 $m$ 行 $n$ 列的矩阵 $M_R=(m_{ij})$ 表示 $R$，其中

$$
m_{ij}=\begin{cases}1, & (a_i,b_j)\in R,\\ 0, & (a_i,b_j)\notin R,\end{cases}
$$

称 $M_R$ 为 $R$ 的关系矩阵（邻接矩阵）。

关系矩阵是布尔矩阵（元素只取 0、1）。三种特殊关系的矩阵形态：空关系全为 $0$；全域关系全为 $1$；恒等关系是单位矩阵。

**例** 设 $A=\{1,2,3\}$，$B=\{1,2\}$，$R$ 是 $A$ 到 $B$ 的“大于”关系，求 $M_R$。

**解** $R=\{(a,b)\mid a\in A,\ b\in B,\ a>b\}=\{(2,1),(3,1),(3,2)\}$，行依次对应 $1,2,3$，列依次对应 $1,2$：

$$
M_R=\begin{pmatrix}0&0\\1&0\\1&1\end{pmatrix}.
$$

第一行全 0，因为 $1$ 不大于 $B$ 中任何元素；第二行对应 $2>1$ 成立、$2>2$ 不成立。

**例** 设 $A=\{a,b,c\}$，$A$ 上关系 $R$ 的关系矩阵为

$$
M_R=\begin{pmatrix}1&1&0\\1&0&1\\1&1&0\end{pmatrix},
$$

写出 $R$ 的集合表达式。

**解** 行、列依次对应 $a,b,c$。$m_{ij}=1$ 表示 $(a_i,a_j)\in R$，于是

$$
R=\{(a,a),(a,b),(b,a),(b,c),(c,a),(c,b)\}.
$$

核对：第 1 行 $(a,a),(a,b)$；第 2 行 $(b,a),(b,c)$；第 3 行 $(c,a),(c,b)$。

## 4.3 关系的运算

设 $R,S$ 都是 $A$ 到 $B$ 的二元关系，则 $R\cup S$、$R\cap S$、$R-S$、$\sim R$、$R^{-1}$、$S\circ R$ 等仍是（相应集合间的）二元关系。本节把“集合运算”与“关系特有的运算（逆、复合、幂）”分开处理。

### 4.3.1 并、交、差、补

关系的并、交、差按集合意义逐对进行；补运算必须指明“相对于哪个全集”，在 $A$ 到 $B$ 的关系中取全集 $A\times B$：

$$
\sim R=A\times B-R.
$$

**例** 设 $A=\{3,6,9\}$，$R$ 是 $A$ 上的整除关系，$S$ 是 $A$ 上的小于关系，求 $R\cup S$、$R\cap S$、$R-S$、$S-R$、$\sim R$、$\sim S$。

**解** 先写出两个关系：

$$
R=\{(3,3),(3,6),(3,9),(6,6),(9,9)\},\qquad S=\{(3,6),(3,9),(6,9)\}.
$$

于是

$$
R\cup S=\{(3,3),(3,6),(3,9),(6,6),(9,9),(6,9)\},
$$
$$
R\cap S=\{(3,6),(3,9)\},
$$
$$
R-S=\{(3,3),(6,6),(9,9)\},
$$
$$
S-R=\{(6,9)\},
$$
$$
\sim R=A\times A-R=\{(6,3),(6,9),(9,3),(9,6)\},
$$
$$
\sim S=A\times A-S=\{(3,3),(6,3),(6,6),(9,3),(9,6),(9,9)\}.
$$

注意 $R-S\neq S-R$，差运算不满足交换律；而 $\sim R$ 是“$A\times A$ 中不属于 $R$ 的全部有序对”，不是“$R$ 中元素取反”。

### 4.3.2 逆关系

**定义**

设 $R$ 是从 $A$ 到 $B$ 的关系，把 $R$ 中每个有序对的两个元素顺序交换，得到的集合是从 $B$ 到 $A$ 的关系，称为 $R$ 的逆关系，记作 $R^{-1}$：

$$
R^{-1}=\{(y,x)\mid (x,y)\in R\}.
$$

**例** 设 $R=\{(1,a),(2,c),(3,d),(4,a),(4,b)\}$，(1) 求 $R^{-1}$ 并画两者的关系图；(2) 写出两者关系矩阵。

**解** (1) $R^{-1}=\{(a,1),(c,2),(d,3),(a,4),(b,4)\}$。$R^{-1}$ 的关系图就是把 $R$ 的每条有向边反向后的图。

(2) 行依次对应 $1,2,3,4$，列依次对应 $a,b,c,d$：

$$
M_R=\begin{pmatrix}1&0&0&0\\0&0&1&0\\0&0&0&1\\1&1&0&0\end{pmatrix},\qquad
M_{R^{-1}}=\begin{pmatrix}1&0&0&1\\0&0&0&1\\0&1&0&0\\0&0&1&0\end{pmatrix}.
$$

两个矩阵互为转置：$M_{R^{-1}}=M_R^{\mathrm T}$。

逆关系的基本性质：

1. 关系图把每条有向边反向即得 $R^{-1}$ 的图，反之亦然；
2. 关系矩阵互为转置，$M_{R^{-1}}=M_R^{\mathrm T}$；
3. $\operatorname{dom}R^{-1}=\operatorname{ran}R$，$\operatorname{ran}R^{-1}=\operatorname{dom}R$；
4. $|R|=|R^{-1}|$。

**定理**

设 $R,S$ 为任意关系，则

(1) $(R^{-1})^{-1}=R$；

(2) $(R\cup S)^{-1}=R^{-1}\cup S^{-1}$；

(3) $(R\cap S)^{-1}=R^{-1}\cap S^{-1}$；

(4) $(\sim R)^{-1}=\sim(R^{-1})$；

(5) $(R-S)^{-1}=R^{-1}-S^{-1}$；

(6) 若 $R\subseteq S$，则 $R^{-1}\subseteq S^{-1}$。

**证明** (1) 对任意 $(x,y)$：$(x,y)\in(R^{-1})^{-1}\iff(y,x)\in R^{-1}\iff(x,y)\in R$。

(2) 对任意 $(x,y)$：

$$
\begin{aligned}
(x,y)\in(R\cup S)^{-1}
&\iff (y,x)\in R\cup S\\
&\iff (y,x)\in R\ \lor\ (y,x)\in S\\
&\iff (x,y)\in R^{-1}\ \lor\ (x,y)\in S^{-1}\\
&\iff (x,y)\in R^{-1}\cup S^{-1}.
\end{aligned}
$$

> **补充证明**（3）（4）
>
> (3) 对任意 $(x,y)$：
>
> $$
> \begin{aligned}
> (x,y)\in(R\cap S)^{-1}
> &\iff (y,x)\in R\cap S\\
> &\iff (y,x)\in R\ \land\ (y,x)\in S\\
> &\iff (x,y)\in R^{-1}\ \land\ (x,y)\in S^{-1}\\
> &\iff (x,y)\in R^{-1}\cap S^{-1}.
> \end{aligned}
> $$
>
> (4) 设 $R$ 是 $A$ 到 $B$ 的关系，则 $R^{-1}$ 是 $B$ 到 $A$ 的关系，两边的补集都相对于 $B\times A$ 取。对任意 $(x,y)\in B\times A$：
>
> $$
> \begin{aligned}
> (x,y)\in(\sim R)^{-1}
> &\iff (y,x)\in\sim R\\
> &\iff (y,x)\notin R\\
> &\iff (x,y)\notin R^{-1}\\
> &\iff (x,y)\in\sim(R^{-1}).
> \end{aligned}
> $$
>
> 四个等价都是“属于/不属于”的直接改写，不涉及任何额外条件。

(5) 把差写成“交补”，再用 (3)(4)：

$$
(R-S)^{-1}=(R\cap\sim S)^{-1}=R^{-1}\cap(\sim S)^{-1}=R^{-1}\cap\sim(S^{-1})=R^{-1}-S^{-1}.
$$

(6) 任取 $(y,x)\in R^{-1}$，则 $(x,y)\in R$；由 $R\subseteq S$ 得 $(x,y)\in S$，故 $(y,x)\in S^{-1}$，于是 $R^{-1}\subseteq S^{-1}$。反过来同理，故 $R\subseteq S\iff R^{-1}\subseteq S^{-1}$。

### 4.3.3 复合关系

**定义**

设 $R$ 是 $A$ 到 $B$ 的二元关系，$S$ 是 $B$ 到 $C$ 的二元关系，则 $R$ 与 $S$ 的复合关系 $S\circ R$ 是 $A$ 到 $C$ 的二元关系：

$$
S\circ R=\{(x,z)\mid x\in A\ \land\ z\in C\ \land\ \exists y\,(y\in B\ \land\ (x,y)\in R\ \land\ (y,z)\in S)\}.
$$

> **易混点**：从 $R,S$ 求 $S\circ R$ 的运算称为关系的复合（合成）运算。记号 $S\circ R$ 读作“$S$ 在 $R$ 之后作用”：先走 $R$ 的边，再走 $S$ 的边。有些教材把复合写成 $R\circ S$，顺序相反，做题时须先确认记号约定。

**例** 设 $X=\{x_1,x_2,x_3\}$，$Y=\{y_1,y_2,y_3,y_4\}$，$Z=\{z_1,z_2,z_3\}$，

$$
R=\{(x_1,y_2),(x_1,y_3),(x_2,y_1),(x_2,y_4),(x_3,y_2)\},
$$
$$
S=\{(y_1,z_2),(y_2,z_3),(y_3,z_1),(y_4,z_3)\},
$$

求 $S\circ R$。

**解** 逐个 $x_i$ 找“经一个 $y$ 中转”的终点：

- $x_1$：$x_1\to y_2\to z_3$，$x_1\to y_3\to z_1$，得 $(x_1,z_3),(x_1,z_1)$；
- $x_2$：$x_2\to y_1\to z_2$，$x_2\to y_4\to z_3$，得 $(x_2,z_2),(x_2,z_3)$；
- $x_3$：$x_3\to y_2\to z_3$，得 $(x_3,z_3)$。

所以

$$
S\circ R=\{(x_1,z_1),(x_1,z_3),(x_2,z_2),(x_2,z_3),(x_3,z_3)\}.
$$

**例** 设 $X=\{0,1,2,3,4\}$，

$$
R=\{(1,1),(1,4),(2,3),(3,1),(3,4)\},\qquad S=\{(1,0),(2,0),(3,1),(3,2),(4,1)\},
$$

求 $S\circ R$ 与 $R\circ S$。

**解** $S\circ R$：对每个 $(x,y)\in R$ 接上 $S$ 中起点为 $y$ 的边。

- $(1,1)$ 接 $1\to0$（$S$ 中起点 1 只有 $(1,0)$）得 $(1,0)$；
- $(1,4)$ 接 $4\to1$ 得 $(1,1)$；
- $(2,3)$ 接 $3\to1,3\to2$ 得 $(2,1),(2,2)$；
- $(3,1)$ 接 $1\to0$ 得 $(3,0)$；
- $(3,4)$ 接 $4\to1$ 得 $(3,1)$。

$$
S\circ R=\{(1,0),(1,1),(2,1),(2,2),(3,0),(3,1)\}.
$$

$R\circ S$：对每个 $(x,y)\in S$ 接上 $R$ 中起点为 $y$ 的边。

- $(1,0)$ 无可接（$R$ 中无起点 0 的边）；
- $(2,0)$ 同样无可接；
- $(3,1)$ 接 $1\to1,1\to4$ 得 $(3,1),(3,4)$；
- $(3,2)$ 接 $2\to3$ 得 $(3,3)$；
- $(4,1)$ 接 $1\to1,1\to4$ 得 $(4,1),(4,4)$。

$$
R\circ S=\{(3,1),(3,3),(3,4),(4,1),(4,4)\}.
$$

两者不同，说明关系的复合不满足交换律。

**定理（结合律）**

设 $R,S,P$ 为任意二元关系，则

$$
P\circ(S\circ R)=(P\circ S)\circ R.
$$

**证明** 对任意 $(x,w)$，

$$
\begin{aligned}
(x,w)\in P\circ(S\circ R)
&\iff \exists z\,((x,z)\in S\circ R\ \land\ (z,w)\in P)\\
&\iff \exists z\exists y\,((x,y)\in R\ \land\ (y,z)\in S\ \land\ (z,w)\in P)\\
&\iff \exists y\,((x,y)\in R\ \land\ (y,w)\in P\circ S)\\
&\iff (x,w)\in(P\circ S)\circ R.
\end{aligned}
$$

其中第二个等价是把 $\exists z$ 展开，第三个等价把对 $z$ 的约束收进 $P\circ S$；$\exists y\exists z$ 与 $\exists z\exists y$ 可交换，这正是结合律成立的根源。

**定理（对并、交的分配）**

设 $R,S,P$ 为任意二元关系，则

$$
(S\cup P)\circ R=(S\circ R)\cup(P\circ R),\qquad R\circ(S\cup P)=R\circ S\ \cup\ R\circ P,
$$
$$
(S\cap P)\circ R\subseteq (S\circ R)\cap(P\circ R),\qquad R\circ(S\cap P)\subseteq R\circ S\ \cap\ R\circ P.
$$

> **关键结论**：对并可以分配，得到等式；对交只能得到包含式，一般不能反向。

**证明（并的情形）** 对任意 $(x,y)$：

$$
\begin{aligned}
(x,y)\in(S\cup P)\circ R
&\iff \exists z\,((x,z)\in R\ \land\ (z,y)\in S\cup P)\\
&\iff \exists z\,((x,z)\in R\ \land\ ((z,y)\in S\ \lor\ (z,y)\in P))\\
&\iff \exists z\,(((x,z)\in R\ \land\ (z,y)\in S)\ \lor\ ((x,z)\in R\ \land\ (z,y)\in P))\\
&\iff \exists z((x,z)\in R\land(z,y)\in S)\ \lor\ \exists z((x,z)\in R\land(z,y)\in P)\\
&\iff (x,y)\in S\circ R\ \lor\ (x,y)\in P\circ R.
\end{aligned}
$$

倒数第二步用到了 $\exists z(A\lor B)\iff\exists zA\ \lor\ \exists zB$。

> **补充证明**（右复合的并、交情形）
>
> 右复合只是把 $R$ 放在复合的左侧，展开方式与上面完全对称。
>
> **并：$R\circ(S\cup P)=R\circ S\cup R\circ P$。** 对任意 $(x,y)$，
>
> $$
> \begin{aligned}
> (x,y)\in R\circ(S\cup P)
> &\iff \exists z\,\bigl((x,z)\in R\ \land\ (z,y)\in S\cup P\bigr)\\
> &\iff \exists z\,\bigl((x,z)\in R\ \land\ ((z,y)\in S\lor(z,y)\in P)\bigr)\\
> &\iff \exists z\,\bigl(((x,z)\in R\land(z,y)\in S)\ \lor\ ((x,z)\in R\land(z,y)\in P)\bigr)\\
> &\iff (x,y)\in R\circ S\ \lor\ (x,y)\in R\circ P\\
> &\iff (x,y)\in R\circ S\cup R\circ P.
> \end{aligned}
> $$
>
> **交：$R\circ(S\cap P)\subseteq R\circ S\cap R\circ P$。** 若 $(x,y)\in R\circ(S\cap P)$，则存在 $z$ 使 $(x,z)\in R$ 且 $(z,y)\in S\cap P$；于是 $(z,y)\in S$ 且 $(z,y)\in P$，分别给出 $(x,y)\in R\circ S$ 与 $(x,y)\in R\circ P$，故 $(x,y)$ 属于两者的交。反向不一定成立，理由与左复合的交情形相同：两个包含关系可能由不同的中转点 $z$ 实现。

**证明（交的情形）** 同样展开，但 $\exists z(A\land B)\Rightarrow\exists zA\ \land\ \exists zB$ 只是单向的（同一 $z$ 未必同时满足两侧），所以

$$
(x,y)\in(S\cap P)\circ R\ \Rightarrow\ (x,y)\in S\circ R\ \land\ (x,y)\in P\circ R,
$$

即 $(S\cap P)\circ R\subseteq(S\circ R)\cap(P\circ R)$。反向不成立的原因是：$(x,y)\in S\circ R$ 与 $(x,y)\in P\circ R$ 可能分别由**不同**的中转点实现，因而不存在同一个中转点使两边同时成立。

反例：$A=\{1,2,3,4\}$，$R=\{(1,2),(1,3)\}$，$S=\{(2,4)\}$，$P=\{(3,4)\}$。此时 $S\cap P=\varnothing$，故 $(S\cap P)\circ R=\varnothing$；而

$$
S\circ R=\{(1,4)\}=P\circ R,\qquad (S\circ R)\cap(P\circ R)=\{(1,4)\},
$$

包含式严格成立而不取等。

**定理**

设 $R,S$ 为任意关系，则

$$
(S\circ R)^{-1}=R^{-1}\circ S^{-1}.
$$

**证明** 对任意 $(x,y)$：

$$
(x,y)\in(S\circ R)^{-1}\iff(y,x)\in S\circ R\iff\exists z\,((y,z)\in R\ \land\ (z,x)\in S)
$$
$$
\iff\exists z\,((z,y)\in R^{-1}\ \land\ (x,z)\in S^{-1})\iff(x,y)\in R^{-1}\circ S^{-1}.
$$

注意顺序：复合的逆要把两个逆关系的顺序也颠倒。

**定理**

设 $R$ 是 $A$ 上的关系，则

$$
R\circ I_A=I_A\circ R=R.
$$

**证明** 任取 $(x,y)$：

$(x,y)\in R\circ I_A\iff\exists t\,((x,t)\in I_A\ \land\ (t,y)\in R)\iff\exists t\,(t=x\ \land\ (t,y)\in R)\iff(x,y)\in R$；

反之 $(x,y)\in R$ 时取 $t=x$ 即得 $(x,y)\in R\circ I_A$。故 $R\circ I_A=R$，同理 $I_A\circ R=R$。恒等关系是复合运算的单位元。

### 4.3.4 关系的幂

**定义**

设 $R$ 为 $A$ 上的关系，$n$ 为非负整数，$R$ 的 $n$ 次幂定义为

$$
R^0=I_A,\qquad R^n=R^{n-1}\circ R\ (n\ge 1).
$$

于是 $R^2=R\circ R$，$R^3=R^2\circ R=(R\circ R)\circ R$，依此类推。$R^n$ 表示“沿 $R$ 的边连续走 $n$ 步”所得到的关系。

**定理**

设 $R$ 为 $A$ 上的关系，$m,n$ 为非负整数，则

$$
R^m\circ R^n=R^{m+n},\qquad (R^m)^n=R^{mn}.
$$

证明（1）对 $n$ 归纳。$n=0$ 时 $R^m\circ R^0=R^m\circ I_A=R^m=R^{m+0}$。设 $R^m\circ R^n=R^{m+n}$，则

$$
R^m\circ R^{n+1}=R^m\circ(R^n\circ R)=(R^m\circ R^n)\circ R=R^{m+n}\circ R=R^{m+n+1}.
$$

（2）对 $n$ 归纳。$n=0$ 时 $(R^m)^0=I_A=R^{m\cdot0}$。设 $(R^m)^n=R^{mn}$，则

$$
(R^m)^{n+1}=R^m\circ(R^m)^n=R^m\circ R^{mn}=R^{m+mn}=R^{m(n+1)}.
$$

**例** 设 $A=\{1,2,3,4\}$，$R=\{(1,1),(2,1),(3,2),(4,3)\}$，求 $R^n$（$n=2,3,\dots$）。

**解** 逐次复合：

$$
R^2=R\circ R=\{(1,1),(2,1),(3,1),(4,2)\},
$$
$$
R^3=R^2\circ R=\{(1,1),(2,1),(3,1),(4,1)\},
$$
$$
R^4=R^3\circ R=\{(1,1),(2,1),(3,1),(4,1)\}=R^3.
$$

由于 $R^4=R^3$，继续复合不会产生新有序对，故

$$
R^n=R^3\quad(n\ge 3).
$$

这里 $R$ 是一条“链” $4\to3\to2\to1$ 加 $1$ 上的环，走 3 步后所有点都落到 $1$，再走也不变。

**定理（幂的周期性）**

设 $R$ 为 $A$ 上的关系，$|A|=n$，则存在自然数 $s<t$ 使得

(1) $R^s=R^t$，此时称 $T=t-s$ 为 $R$ 的周期；

(2) 对任何 $k\in\mathbb{N}$，$R^{s+k}=R^{t+k}$。

证明（1）$|A|=n$ 时 $|A\times A|=n^2$，故 $A$ 上共有 $2^{n^2}$ 个不同的二元关系，而每个 $R^k$ 都是 $A\times A$ 的子集。考察序列

$$
R^0,\ R^1,\ R^2,\ \dots,\ R^{2^{n^2}},
$$

共 $2^{n^2}+1$ 项，只有 $2^{n^2}$ 种可能的取值。由鸽巢原理，必有两项相同，即存在 $0\le s<t\le 2^{n^2}$ 使 $R^s=R^t$。

(2) 若 $R^s=R^t$，两边右复合 $R^k$：

$$
R^{s+k}=R^s\circ R^k=R^t\circ R^k=R^{t+k}.
$$

由此，$A$ 上的关系 $R$ 的各次幂虽然形式上有无穷多个，本质不同的只有有限多个，且从某项起以周期 $T$ 重复。

### 4.3.5 用矩阵计算复合

设 $R$ 是 $A$ 到 $B$ 的关系（$|A|=m$，$|B|=n$），$S$ 是 $B$ 到 $C$ 的关系（$|C|=p$），$M_R=(r_{ik})_{m\times n}$，$M_S=(s_{kj})_{n\times p}$，则 $S\circ R$ 的矩阵为 $m\times p$ 的布尔积：

$$
(M_{S\circ R})_{ij}=\bigvee_{k=1}^{n}\left(r_{ik}\wedge s_{kj}\right),\qquad i=1,\dots,m;\ j=1,\dots,p,
$$

其中 $\vee$ 是逻辑或、$\wedge$ 是逻辑与。含义是：$v_i$ 与 $w_j$ 之间只要存在一个中转点 $u_k$ 使两段都通，就记 1。

**例** 设 $R=\{(1,2),(3,4),(2,2)\}$，$S=\{(4,2),(2,5),(3,1),(1,3)\}$ 是 $A=\{1,2,3,4,5\}$ 上的关系，用矩阵求 $S\circ R$。

**解** 行、列依次对应 $1,2,3,4,5$：

$$
M_R=\begin{pmatrix}0&1&0&0&0\\0&1&0&0&0\\0&0&0&1&0\\0&0&0&0&0\\0&0&0&0&0\end{pmatrix},\qquad
M_S=\begin{pmatrix}0&0&1&0&0\\0&0&0&0&1\\1&0&0&0&0\\0&1&0&0&0\\0&0&0&0&0\end{pmatrix}.
$$

按布尔积计算，只有 $M_R$ 的前三行可能非零：

- 第 1 行（$1\to2$）与 $M_S$ 第 2 行（$2\to5$）相乘，得 $(1,5)$；
- 第 2 行（$2\to2$）同样得 $(2,5)$；
- 第 3 行（$3\to4$）与 $M_S$ 第 4 行（$4\to2$）相乘，得 $(3,2)$。

$$
M_{S\circ R}=\begin{pmatrix}0&0&0&0&1\\0&0&0&0&1\\0&1&0&0&0\\0&0&0&0&0\\0&0&0&0&0\end{pmatrix},\qquad S\circ R=\{(1,5),(2,5),(3,2)\}.
$$

与逐个有序对推算的结果一致。

## 4.4 关系的性质

### 4.4.1 自反与反自反

**定义（自反）**

设 $R$ 是 $A$ 上的关系，若对 $A$ 中每个元素 $x$ 都有 $(x,x)\in R$，则称 $R$ 是自反的：

$$
R\ \text{自反}\iff\forall x\,(x\in A\to(x,x)\in R).
$$

**定义（反自反）**

若对 $A$ 中每个元素 $x$ 都有 $(x,x)\notin R$，则称 $R$ 是反自反的：

$$
R\ \text{反自反}\iff\forall x\,(x\in A\to(x,x)\notin R).
$$

例如整数集上的整除关系、相等关系是自反的；大于、小于关系是反自反的。整除关系不是反自反的（每个数整除自己），大于等于关系也不是反自反的。

**例** 设 $A=\{1,2,3,4\}$，$R=\{(1,1),(1,2),(1,4),(2,1),(2,2),(3,3),(4,1),(4,4)\}$，判断 $R$ 是否自反，并写出关系矩阵。

**解** $1,2,3,4$ 都与自己有 $R$ 关系（$(1,1),(2,2),(3,3),(4,4)$ 均在 $R$ 中），故 $R$ 自反。行、列依次对应 $1,2,3,4$：

$$
M_R=\begin{pmatrix}1&1&0&1\\1&1&0&0\\0&0&1&0\\1&0&0&1\end{pmatrix}.
$$

主对角线全为 1，与“自反”一致。

**例** 设 $A=\{1,2,3,4\}$，

$$
R=\{(1,2),(1,4),(2,1),(2,3),(3,2),(4,1),(4,2)\},\qquad S=\{(1,2),(1,3),(2,2),(3,1),(4,3)\},
$$

判断 $R,S$ 是否反自反、是否自反。

**解** $R$ 中不含任何 $(x,x)$，故 $R$ 反自反，且 $R$ 当然不是自反的。$S$ 含 $(2,2)$，故 $S$ 不是反自反的；$S$ 又缺 $(1,1),(3,3),(4,4)$，故 $S$ 也不是自反的。

$$
M_R=\begin{pmatrix}0&1&0&1\\1&0&1&0\\0&1&0&0\\1&1&0&0\end{pmatrix},\qquad
M_S=\begin{pmatrix}0&1&1&0\\0&1&0&0\\1&0&0&0\\0&0&1&0\end{pmatrix}.
$$

$M_R$ 主对角线全 0（反自反）；$M_S$ 主对角线既有 1 又有 0，所以两种性质都不具备。

**不要混淆的几点**

1. 自反与反自反不能同时成立（当 $A\neq\varnothing$ 时）；
2. “不是自反”不等于“反自反”：只要有一个 $x$ 缺 $(x,x)$ 就不自反，但只要有一个 $x$ 有 $(x,x)$ 就不反自反，中间存在两者都不成立的关系；
3. 图特征：$R$ 自反 $\iff$ 每个结点都有环；$R$ 反自反 $\iff$ 每个结点都没有环；
4. 矩阵特征：$R$ 自反 $\iff$ 主对角线全为 1；$R$ 反自反 $\iff$ 主对角线全为 0。

### 4.4.2 对称与反对称

**定义（对称）**

设 $R$ 是 $A$ 上的关系，若对 $A$ 中任意 $x,y$，由 $(x,y)\in R$ 必有 $(y,x)\in R$，则称 $R$ 是对称的：

$$
R\ \text{对称}\iff\forall x\forall y\,(x\in A\land y\in A\land (x,y)\in R\to(y,x)\in R).
$$

**定义（反对称）**

若对 $A$ 中任意 $x,y$，由 $(x,y)\in R$ 且 $(y,x)\in R$ 必有 $x=y$，则称 $R$ 是反对称的：

$$
R\ \text{反对称}\iff\forall x\forall y\,(x\in A\land y\in A\land (x,y)\in R\land (y,x)\in R\to x=y).
$$

反对称的等价说法：当 $x\neq y$ 且 $(x,y)\in R$ 时，必有 $(y,x)\notin R$。

例如整数集上的相等关系、任意集合上的全域关系是对称的；整除关系、大于关系不是对称的。实数集上的大于等于关系、大于关系，幂集上的包含关系都是反对称的。

**例** 设 $A=\{1,2,3,4\}$，$R=\{(1,2),(1,4),(2,1),(2,2),(2,3),(3,2),(4,1)\}$，判断 $R$ 是否对称。

**解** 逐个检查：$(1,2)$ 与 $(2,1)$ 都在；$(1,4)$ 与 $(4,1)$ 都在；$(2,3)$ 与 $(3,2)$ 都在；$(2,2)$ 自身配对。故 $R$ 对称。矩阵（行、列依次对应 $1,2,3,4$）为

$$
M_R=\begin{pmatrix}0&1&0&1\\1&1&1&0\\0&1&0&0\\1&0&0&0\end{pmatrix},
$$

它关于主对角线对称。

**例** 设 $A=\{1,2,3,4\}$，$R=\{(1,2),(1,4),(2,2),(2,3),(3,1),(4,3)\}$，判断 $R$ 是否反对称。

**解** 检查所有“成对出现”的可能：$(1,2)$ 无 $(2,1)$；$(1,4)$ 无 $(4,1)$；$(2,3)$ 无 $(3,2)$；$(3,1)$ 无 $(1,3)$；$(4,3)$ 无 $(3,4)$；$(2,2)$ 的“配对”就是自身，满足 $x=y$。故 $R$ 反对称。

$$
M_R=\begin{pmatrix}0&1&0&1\\0&1&1&0\\1&0&0&0\\0&0&1&0\end{pmatrix}.
$$

非对角位置上，关于主对角线对称的两个元素没有同时为 1 的情形。

**例** 设 $A=\{1,2,3,4\}$，$S=\{(1,2),(1,4),(2,1),(2,2),(3,1),(4,3)\}$，判断 $S$ 是否反对称、是否对称。

**解** $S$ 中 $(1,2)$ 与 $(2,1)$ 同时出现而 $1\neq2$，所以 $S$ 不是反对称的；又 $S$ 中 $(1,4)\in S$ 但 $(4,1)\notin S$，所以 $S$ 也不是对称的。一个关系可以既不对称也不反对称。

$$
M_S=\begin{pmatrix}0&1&0&1\\1&1&0&0\\1&0&0&0\\0&0&1&0\end{pmatrix}.
$$

**对称性与反对称性的关系**

1. 两个概念不是互补的：可以既不对称也不反对称（如上例 $S$），也可以既对称又反对称（如恒等关系，以及只含 $(x,x)$ 型有序对的关系）。
2. 图特征：$R$ 对称 $\iff$ 任意两结点间若有边，则必成对反向出现；$R$ 反对称 $\iff$ 任意两不同结点间至多只有一条有向边。
3. 矩阵特征：$R$ 对称 $\iff m_{ij}=m_{ji}$（对称矩阵）；$R$ 反对称 $\iff$ 当 $i\neq j$ 时 $m_{ij}=1$ 必有 $m_{ji}=0$。

### 4.4.3 传递

**定义**

设 $R$ 是 $A$ 上的关系，若对 $A$ 中任意 $x,y,z$，由 $(x,y)\in R$ 且 $(y,z)\in R$ 必有 $(x,z)\in R$，则称 $R$ 是传递的：

$$
R\ \text{传递}\iff\forall x\forall y\forall z\,(x,y,z\in A\land (x,y)\in R\land (y,z)\in R\to(x,z)\in R).
$$

例如实数集上的大于、小于关系是传递的；同学关系、朋友关系一般不传递（朋友的朋友未必是朋友）。

**例** 设 $A=\{1,2,3,4\}$，$R=\{(2,1),(3,1),(3,2),(4,1),(4,2),(4,3)\}$，判断 $R$ 是否传递。

**解** 逐个检查两段相接的情形：

- $(3,2),(2,1)$ 需要 $(3,1)$，在 $R$ 中；
- $(4,2),(2,1)$ 需要 $(4,1)$，在；
- $(4,3),(3,1)$ 需要 $(4,1)$，在；
- $(4,3),(3,2)$ 需要 $(4,2)$，在。

其余情形没有“两段相接”，前提不成立，无须验证。故 $R$ 传递。

$$
M_R=\begin{pmatrix}0&0&0&0\\1&0&0&0\\1&1&0&0\\1&1&1&0\end{pmatrix}.
$$

这是一个严格下三角矩阵：所有 1 都在主对角线下方，行号大于列号，直观上“只能向编号更小的点走”，因此走两步必仍在下方，不会产生矩阵之外的 1。

传递性的图特征与矩阵特征：

- 图：若存在 $a\to b$ 与 $b\to c$，则必有 $a\to c$；
- 矩阵：若 $m_{ij}=1$ 且 $m_{jk}=1$，则 $m_{ik}=1$（$i,j,k=1,\dots,n$）。

### 4.4.4 五个等价刻画

**定理**

设 $R$ 是集合 $A$ 上的关系，则

(1) $R$ 自反 $\iff I_A\subseteq R$；

(2) $R$ 反自反 $\iff R\cap I_A=\varnothing$；

(3) $R$ 对称 $\iff R=R^{-1}$；

(4) $R$ 反对称 $\iff R\cap R^{-1}\subseteq I_A$；

(5) $R$ 传递 $\iff R\circ R\subseteq R$。

> **关键结论**：这五条把“逐对验证”的性质判断转化为“集合包含/相等”的运算，是证明性质时最常用的入口。

**证明** (1) 必要性：任取 $(x,x)\in I_A$，由 $R$ 自反得 $(x,x)\in R$，故 $I_A\subseteq R$。充分性：任取 $x\in A$，$(x,x)\in I_A\subseteq R$，故 $(x,x)\in R$，$R$ 自反。

(2) 必要性用反证：若 $R\cap I_A\neq\varnothing$，取 $(x,y)\in R\cap I_A$，则 $(x,y)\in R$ 且 $(x,y)\in I_A$，后者给出 $x=y$，于是 $(x,x)\in R$，与反自反矛盾。充分性：任取 $x\in A$，$(x,x)\in I_A$，而 $R\cap I_A=\varnothing$，故 $(x,x)\notin R$，$R$ 反自反。

> **补充证明**（3） 若 $R$ 对称，则对任意 $(x,y)\in R$ 有 $(y,x)\in R$，即 $(x,y)\in R^{-1}$，故 $R\subseteq R^{-1}$；把 $x,y$ 互换又得 $R^{-1}\subseteq R$，故 $R=R^{-1}$。反之若 $R=R^{-1}$，任取 $(x,y)\in R=R^{-1}$，由逆关系的定义得 $(y,x)\in R$，故 $R$ 对称。

(4) 必要性：若 $(x,y)\in R\cap R^{-1}$，则 $(x,y)\in R$ 且 $(y,x)\in R$，由反对称得 $x=y$，故 $(x,y)=(x,x)\in I_A$，于是 $R\cap R^{-1}\subseteq I_A$。充分性：若 $(x,y)\in R$ 且 $(y,x)\in R$，则 $(x,y)\in R\cap R^{-1}\subseteq I_A$，而 $I_A$ 中元素的两个坐标相等，故 $x=y$，$R$ 反对称。

(5) 必要性：任取 $(x,z)\in R\circ R$，则存在 $y$ 使 $(x,y)\in R$、$(y,z)\in R$，由传递得 $(x,z)\in R$，故 $R\circ R\subseteq R$。充分性：若 $(x,y)\in R$、$(y,z)\in R$，则 $(x,z)\in R\circ R\subseteq R$，故 $(x,z)\in R$，$R$ 传递。

### 4.4.5 性质的保持与反例

**定理（性质的保持）**

设 $R,S$ 是 $A$ 上的二元关系，则

1. 若 $R,S$ 都自反，则 $R^{-1}$、$R\cup S$、$R\cap S$、$R\circ S$ 都自反；
2. 若 $R,S$ 都反自反，则 $R^{-1}$、$R\cup S$、$R\cap S$、$R-S$ 都反自反；
3. 若 $R,S$ 都对称，则 $R^{-1}$、$R\cup S$、$R\cap S$、$R-S$ 都对称；
4. 若 $R,S$ 都反对称，则 $R^{-1}$、$R\cap S$、$R-S$ 都反对称；
5. 若 $R,S$ 都传递，则 $R^{-1}$、$R\cap S$ 都传递。

> **补充证明**
>
> 以下每条都只验证“结论中列出的运算”；未列出的并、差等运算确实可能破坏该性质，后面的反例会说明。
>
> **(1) 自反。** 设 $R,S$ 自反，任取 $x\in A$，有 $(x,x)\in R$、$(x,x)\in S$。
> - $R^{-1}$：由 $(x,x)\in R$ 得 $(x,x)\in R^{-1}$。
> - $R\cup S$、$R\cap S$：$(x,x)$ 同时属于 $R$ 与 $S$，故属于两者的并与交。
> - $R\circ S$：取中转点 $y=x$，由 $(x,x)\in R$ 与 $(x,x)\in S$ 得 $(x,x)\in R\circ S$。
>
> **(2) 反自反。** 设 $R,S$ 反自反。
> - $R^{-1}$：若 $(x,x)\in R^{-1}$，则 $(x,x)\in R$，矛盾。
> - $R\cup S$：若 $(x,x)\in R\cup S$，则 $(x,x)\in R$ 或 $(x,x)\in S$，都与反自反矛盾。
> - $R\cap S$、$R-S$：两者都是 $R$ 的子集，而 $R$ 不含任何 $(x,x)$。
>
> **(3) 对称。** 设 $R,S$ 对称。
> - $R^{-1}$：若 $(x,y)\in R^{-1}$，则 $(y,x)\in R$；由 $R$ 对称得 $(x,y)\in R$，于是 $(y,x)\in R^{-1}$。
> - $R\cup S$：若 $(x,y)$ 属于 $R$ 或 $S$，对称性把 $(y,x)$ 放回同一个关系，故仍在并集中。
> - $R\cap S$：$(x,y)$ 同时属于 $R$ 与 $S$，$(y,x)$ 也同时属于两者。
> - $R-S$：设 $(x,y)\in R-S$，则 $(x,y)\in R$，故 $(y,x)\in R$。若 $(y,x)\in S$，由 $S$ 对称得 $(x,y)\in S$，与 $(x,y)\in R-S$ 矛盾；所以 $(y,x)\in R-S$。
>
> **(4) 反对称。** 设 $R,S$ 反对称。
> - $R^{-1}$：若 $(x,y),(y,x)\in R^{-1}$，则 $(y,x),(x,y)\in R$，由 $R$ 反对称得 $x=y$。
> - $R\cap S$、$R-S$：两者都是 $R$ 的子集，$R$ 中已不可能同时出现 $(x,y)$ 与 $(y,x)$（$x\neq y$）。
>
> **(5) 传递。** 设 $R,S$ 传递。
> - $R^{-1}$：若 $(x,y),(y,z)\in R^{-1}$，则 $(z,y),(y,x)\in R$；由 $R$ 传递得 $(z,x)\in R$，即 $(x,z)\in R^{-1}$。
> - $R\cap S$：若 $(x,y),(y,z)\in R\cap S$，则这两对同时属于 $R$ 与 $S$；由 $R$、$S$ 各自传递得 $(x,z)\in R$ 且 $(x,z)\in S$，故 $(x,z)\in R\cap S$。

注意哪些运算**不在**结论中：反对称性对并集不保持，传递性对并集、差集不保持。原因是“合并两条关系”会把原本分开的两段边接在一起，从而制造出前提成立而结论缺失的情形。

**例** 设 $A$ 非空且不是单元集，判断 $A$ 上全域关系、恒等关系、空关系各具有哪些性质。

**解**

| 关系 | 自反 | 反自反 | 对称 | 反对称 | 传递 |
| --- | --- | --- | --- | --- | --- |
| 全域关系 $E_A$ | 是 | 否 | 是 | 否 | 是 |
| 恒等关系 $I_A$ | 是 | 否 | 是 | 是 | 是 |
| 空关系 $\varnothing$ | 否 | 是 | 是 | 是 | 是 |

两点补充说明：空集上的空关系还是自反的（“每个元素都与自己有 $R$ 关系”对空集真 vacuous）；单元集上的全域关系还是反对称的（唯一的有序对是 $(a,a)$，其“反向配对”仍是自身）。

**例** 设 $R_1,R_2$ 是 $A$ 上的关系，且都自反、对称、传递，问 $R_1\cup R_2$ 是否也自反、对称、传递？

**解** 自反性保持：任取 $x\in A$，$(x,x)\in R_1\subseteq R_1\cup R_2$。对称性保持：若 $(x,y)\in R_1\cup R_2$，则 $(x,y)\in R_1$ 或 $\in R_2$，对应地 $(y,x)$ 也在同一个关系中，故在并集中。

传递性不保持。要构造一个满足题设（自反、对称、传递）的反例，取 $A=\{1,2,3\}$，令

$$
R_1=I_A\cup\{(1,2),(2,1)\},\qquad R_2=I_A\cup\{(2,3),(3,2)\}.
$$

$R_1$ 的等价类为 $\{1,2\},\{3\}$，$R_2$ 的等价类为 $\{1\},\{2,3\}$，两者都自反、对称、传递。但

$$
R_1\cup R_2=I_A\cup\{(1,2),(2,1),(2,3),(3,2)\},
$$

其中 $(1,2)$ 与 $(2,3)$ 都在，而 $(1,3)$ 不在，所以并集不传递。

（若只要求两个关系各自传递、不要求自反与对称，取 $R_1=\{(1,2)\}$、$R_2=\{(2,3)\}$ 也能说明“传递性对并不保持”；但那不满足本题“自反且对称”的前提，所以上面的构造才是针对本题的有效反例。）

## 4.5 关系的闭包

一个关系可能缺自反性、对称性或传递性。闭包运算的想法是：往 $R$ 里补入**最少**的有序对，得到一个新关系 $R'$，使所需性质成立，且任何包含 $R$ 并具有该性质的关系都包含 $R'$。

**定义**

设 $R$ 是非空集合 $A$ 上的二元关系。若 $A$ 上的关系 $R'$ 满足

(1) $R'$ 是自反的（对称的、传递的）；

(2) $R\subseteq R'$；

(3) 对 $A$ 上任何包含 $R$ 且自反（对称、传递）的关系 $R''$，都有 $R''\supseteq R'$，

则称 $R'$ 为 $R$ 的自反（对称、传递）闭包，分别记作 $r(R)$、$s(R)$、$t(R)$。

> **理解关键**：条件 (3) 是“最小性”：补进去的有序对不能再少。

**例** 设 $A=\{1,2,3\}$，$R=\{(1,1),(1,2),(2,1),(3,2)\}$，求 $r(R)$、$s(R)$、$t(R)$。

**解** 自反闭包补上对角线缺的两个对：

$$
r(R)=R\cup\{(2,2),(3,3)\}=\{(1,1),(1,2),(2,1),(3,2),(2,2),(3,3)\}.
$$

对称闭包把每条边配上反向边（已有的不重复）：

$$
s(R)=R\cup\{(2,3)\}=\{(1,1),(1,2),(2,1),(3,2),(2,3)\}.
$$

传递闭包需要反复接链：$(3,2)$ 与 $(2,1)$ 接出 $(3,1)$；$(2,1)$ 与 $(1,2)$ 接出 $(2,2)$；$(3,2)$ 与 $(2,2)$ 接出 $(3,2)$（已有）。再接一轮不再产生新对，故

$$
t(R)=\{(1,1),(1,2),(2,1),(3,2),(2,2),(3,1)\}.
$$

**定理**

设 $R$ 是非空集合 $A$ 上的二元关系，则

(1) $R$ 自反 $\iff r(R)=R$；

(2) $R$ 对称 $\iff s(R)=R$；

(3) $R$ 传递 $\iff t(R)=R$。

**证明** (1) 由定义 $R\subseteq r(R)$。若 $R$ 自反，则 $R$ 本身就是“包含 $R$ 的自反关系”，由最小性 $r(R)\subseteq R$，故 $r(R)=R$；反向由 $r(R)=R$ 直接得 $R$ 自反。其余两条同理。

**定理（闭包的构造）**

设 $R$ 为非空集合 $A$ 上的关系，则

$$
r(R)=R\cup I_A,\qquad s(R)=R\cup R^{-1},\qquad t(R)=\bigcup_{i=1}^{\infty}R^i.
$$

当 $A$ 为有限集（$|A|=n$）时，传递闭包只需有限次并：

$$
t(R)=R\cup R^2\cup\cdots\cup R^n.
$$

**证明** $r(R)$：令 $R'=R\cup I_A$。任取 $x\in A$，$(x,x)\in I_A\subseteq R'$，故 $R'$ 自反且 $R\subseteq R'$。设 $R''$ 是任一包含 $R$ 的自反关系，则 $R''\supseteq R$ 且 $R''\supseteq I_A$，故 $R''\supseteq R\cup I_A=R'$。由定义 $r(R)=R\cup I_A$。

$s(R)$：$R\cup R^{-1}$ 显然包含 $R$。若 $(x,y)\in R\cup R^{-1}$，则 $(x,y)\in R$ 或 $(x,y)\in R^{-1}$；前者给出 $(y,x)\in R^{-1}$，后者给出 $(y,x)\in R$，两种情况都有 $(y,x)\in R\cup R^{-1}$，故它对称。设 $R''$ 包含 $R$ 且对称，对任一 $(x,y)\in R^{-1}$ 有 $(y,x)\in R\subseteq R''$，由 $R''$ 对称得 $(x,y)\in R''$，故 $R^{-1}\subseteq R''$，于是 $R\cup R^{-1}\subseteq R''$。所以 $s(R)=R\cup R^{-1}$。

$t(R)$：先用归纳证明每个 $R^i\subseteq t(R)$。$R\subseteq t(R)$ 由定义成立；设 $R^n\subseteq t(R)$，任取 $(x,y)\in R^{n+1}=R^n\circ R$，则存在 $z$ 使 $(x,z)\in R^n\subseteq t(R)$、$(z,y)\in R\subseteq t(R)$，由 $t(R)$ 传递得 $(x,y)\in t(R)$，故 $R^{n+1}\subseteq t(R)$。于是 $\bigcup_{i\ge1}R^i\subseteq t(R)$。

再证 $\bigcup_{i\ge1}R^i$ 传递：若 $(x,y)\in R^s$、$(y,z)\in R^t$，则 $(x,z)\in R^s\circ R^t=R^{s+t}\subseteq\bigcup_{i\ge1}R^i$。又由定义中的最小性，任何包含 $R$ 的传递关系 $R''$ 都满足 $t(R)\subseteq R''$；取 $R''=\bigcup_{i\ge1}R^i$（它包含 $R$，且已证传递），即得 $t(R)\subseteq\bigcup_{i\ge1}R^i$。两边合起来即得 $t(R)=\bigcup_{i\ge1}R^i$。

有限情形只需并到 $R^n$：设 $|A|=n$。

- 若 $x\neq y$ 且从 $x$ 到 $y$ 有通路，取其中最短的一条，它不能含重复顶点（否则删去两个相同顶点之间的那一段，剩下的仍是从 $x$ 到 $y$ 的通路且更短），故长度不超过 $n-1$，即 $(x,y)\in R^s$ 对某个 $s\le n-1$ 成立；
- 若 $x$ 到自身有正长度的通路，取最短的一条闭通路，同理它除首尾外不含重复顶点，长度不超过 $n$。

所以 $R\cup R^2\cup\cdots\cup R^n$ 已经含有一切**正幂**中的有序对，再高的正幂不会带来新元素。这里不能把 $R^0=I_A$ 也算进去：传递闭包不要求自反，$(x,x)$ 只有在存在从 $x$ 到自身的正长度通路时才必须补入。两种情形的上界不同：不同顶点之间是 $n-1$，回到自身则可能是 $n$（如长度为 $n$ 的圈）。

**例** 设 $A=\{a,b,c\}$，$R=\{(a,b),(b,c),(c,a)\}$，求 $r(R)$、$s(R)$、$t(R)$。

**解** 这是一个三元环，每走一步绕到下一个点：

$$
R^2=\{(a,c),(b,a),(c,b)\},\qquad R^3=\{(a,a),(b,b),(c,c)\}=I_A,\qquad R^4=R.
$$

于是

$$
r(R)=R\cup I_A=\{(a,b),(b,c),(c,a),(a,a),(b,b),(c,c)\},
$$
$$
s(R)=R\cup R^{-1}=\{(a,b),(b,c),(c,a),(b,a),(c,b),(a,c)\},
$$
$$
t(R)=R\cup R^2\cup R^3=A\times A.
$$

这里 $t(R)$ 变成全域关系，因为三元环上任意两点都能通过绕圈走到。

**例** 求整数集 $\mathbb{Z}$ 上关系 $R=\{(a,b)\mid a<b\}$ 的三个闭包。

**解** $r(R)=R\cup I_{\mathbb{Z}}=\{(a,b)\mid a\le b\}$；$s(R)=R\cup R^{-1}=\{(a,b)\mid a\neq b\}$（$a<b$ 或 $b<a$）；$t(R)=R$，因为小于关系本身传递。

**定理（闭包的单调性）**

设 $R_1,R_2$ 为非空集合 $A$ 上的二元关系，且 $R_1\subseteq R_2$，则

$$
r(R_1)\subseteq r(R_2),\qquad s(R_1)\subseteq s(R_2),\qquad t(R_1)\subseteq t(R_2).
$$

证明（传递闭包）先证对任意正整数 $n$ 有 $R_1^n\subseteq R_2^n$。$n=1$ 时即 $R_1\subseteq R_2$。设 $n=k$ 时成立，任取 $(x,y)\in R_1^{k+1}$，则存在 $z$ 使 $(x,z)\in R_1^k\subseteq R_2^k$、$(z,y)\in R_1\subseteq R_2$，故 $(x,y)\in R_2^{k+1}$。于是

$$
t(R_1)=\bigcup_{n\ge1}R_1^n\subseteq\bigcup_{n\ge1}R_2^n=t(R_2).
$$

自反、对称闭包的单调性由 $R\cup I_A$、$R\cup R^{-1}$ 的形式直接得到。

**定理（闭包对原性质的保持）**

设 $R$ 是非空集合 $A$ 上的二元关系，则

| 已知 $R$ 的性质 | $r(R)$ | $s(R)$ | $t(R)$ |
| --- | --- | --- | --- |
| 自反 | 保持自反 | 保持自反 | 保持自反 |
| 对称 | 保持对称 | 保持对称 | 保持对称 |
| 传递 | 保持传递 | **不保持** | 保持传递 |

> **补充证明**（自反与传递的保持，以及 $s(R)$ 的对称性）
>
> **自反性。** 设 $R$ 自反，任取 $x\in A$，则 $(x,x)\in R$。
> - $r(R)=R\cup I_A$ 含 $I_A$，故自反。
> - $s(R)=R\cup R^{-1}$ 含 $R$，故 $(x,x)\in s(R)$，自反。
> - $t(R)=\bigcup_{n\ge1}R^n$ 含 $R^1=R$，故 $(x,x)\in t(R)$，自反。
>
> **传递性。**
> - $r(R)=R\cup I_A$：设 $(x,y),(y,z)\in R\cup I_A$。若两对都在 $R$ 中，由 $R$ 传递得 $(x,z)\in R$。若其中至少一对属于 $I_A$，则 $x=y$ 或 $y=z$，复合所得的有序对就是另一对，仍属于 $R\cup I_A$。故 $r(R)$ 传递。
> - $t(R)$：传递闭包按定义就是传递的。
> - $s(R)$ 不一定传递，反例见下文 $R=\{(1,2)\}$。
>
> **$s(R)$ 的对称性。** 若 $(x,y)\in R\cup R^{-1}$，则 $(x,y)\in R$ 或 $(x,y)\in R^{-1}$；前者给出 $(y,x)\in R^{-1}$，后者给出 $(y,x)\in R$。两种情形都有 $(y,x)\in R\cup R^{-1}$，故 $s(R)$ 对称。

证明（对称性）若 $R$ 对称，则 $R=R^{-1}$，于是

$$
(r(R))^{-1}=(R\cup I_A)^{-1}=R^{-1}\cup I_A=R\cup I_A=r(R),
$$

故 $r(R)$ 对称。

对 $t(R)$：先证“$R$ 对称 $\Rightarrow$ 对任意正整数 $n$，$R^n$ 对称”。$n=1$ 成立；设 $R^k$ 对称，则对任意 $(x,y)$：

$$
\begin{aligned}
(x,y)\in R^{k+1}=R^k\circ R
&\iff \exists z\,\bigl((x,z)\in R^k\ \land\ (z,y)\in R\bigr)\\
&\iff \exists z\,\bigl((z,x)\in R^k\ \land\ (y,z)\in R\bigr)\\
&\iff (y,x)\in R\circ R^k\\
&\iff (y,x)\in R^{k+1}.
\end{aligned}
$$

第二行用了 $R^k$ 与 $R$ 的对称性；第三行把“先走 $R$ 再走 $R^k$”写成复合 $R\circ R^k$；最后一行的依据是幂的指数相加 $R\circ R^k=R^{1+k}=R^{k+1}$（见本节幂运算定理）。于是 $R^{k+1}$ 对称。

于是对任意 $(x,y)\in t(R)$，存在 $m$ 使 $(x,y)\in R^m$，由 $R^m$ 对称得 $(y,x)\in R^m\subseteq t(R)$，故 $t(R)$ 对称。

对称闭包不保持传递性：$R=\{(1,2)\}$ 传递，但 $s(R)=\{(1,2),(2,1)\}$ 不传递（缺 $(1,1)$）。

**定理（三种闭包的合成）**

令 $tsr(R)=t(s(r(R)))$，则 $tsr(R)$ 是 $R$ 的自反、对称、传递闭包（常称等价闭包）。

也就是说，要使一个关系同时具备自反、对称、传递三种性质，按“先自反、再对称、最后传递”的顺序做三次闭包即可；顺序不能随意交换。

> **补充证明**
>
> 令
>
> $$
> R_1=r(R)=R\cup I_A,\qquad
> R_2=s(R_1)=R_1\cup R_1^{-1},\qquad
> R_3=t(R_2)=\bigcup_{n\ge1}R_2^{\,n}.
> $$
>
> 依次验证 $R_3$ 满足等价关系的三条性质、包含 $R$，并满足最小性。
>
> **包含 $R$ 且自反。** 由构造，$R\subseteq R_1\subseteq R_2\subseteq R_3$；又 $I_A\subseteq R_1\subseteq R_3$，故 $R_3$ 自反。
>
> **对称。** $R_2=R_1\cup R_1^{-1}$ 是对称的：若 $(x,y)\in R_2$，则 $(x,y)\in R_1$ 或 $(x,y)\in R_1^{-1}$；前者给出 $(y,x)\in R_1^{-1}\subseteq R_2$，后者给出 $(y,x)\in R_1\subseteq R_2$。再由“对称关系的传递闭包仍对称”（本节上一定理），$R_3=t(R_2)$ 对称。
>
> **传递。** $R_3$ 是 $R_2$ 的传递闭包，按传递闭包的定义即传递。
>
> **最小性。** 设 $R''$ 是任一包含 $R$ 的自反、对称、传递关系。
> - 由 $R\subseteq R''$ 且 $R''$ 自反，得 $I_A\subseteq R''$，故 $R_1=R\cup I_A\subseteq R''$。
> - 任取 $(x,y)\in R_1^{-1}$，则 $(y,x)\in R_1\subseteq R''$；由 $R''$ 对称得 $(x,y)\in R''$，故 $R_1^{-1}\subseteq R''$，于是 $R_2=R_1\cup R_1^{-1}\subseteq R''$。
> - 归纳证明每个 $R_2^{\,n}\subseteq R''$。$n=1$ 已证。设 $R_2^{\,n}\subseteq R''$，任取 $(x,y)\in R_2^{\,n+1}=R_2^{\,n}\circ R_2$，则存在 $z$ 使 $(x,z)\in R_2^{\,n}\subseteq R''$、$(z,y)\in R_2\subseteq R''$；由 $R''$ 传递得 $(x,y)\in R''$。
> - 于是 $R_3=\bigcup_{n\ge1}R_2^{\,n}\subseteq R''$。
>
> 所以 $R_3$ 是包含 $R$ 的最小自反、对称、传递关系，即 $R$ 的等价闭包。

### 4.5.1 用矩阵求闭包

设 $R$、$r(R)$、$s(R)$、$t(R)$ 的关系矩阵分别为 $M_R$、$M_{r(R)}$、$M_{s(R)}$、$M_{t(R)}$，$E$ 为同阶单位矩阵，则

$$
M_{r(R)}=M_R\vee E,\qquad M_{s(R)}=M_R\vee M_R^{\mathrm T},\qquad M_{t(R)}=M_R\vee M_R^2\vee\cdots\vee M_R^n,
$$

其中 $\vee$ 为逐元素逻辑或，$M_R^k$ 为布尔幂。

**例** 设 $A=\{1,2,3\}$，$R=\{(1,1),(1,3),(2,2),(3,1),(3,2)\}$，用矩阵求 $r(R)$、$s(R)$、$t(R)$。

**解** 行、列依次对应 $1,2,3$：

$$
M_R=\begin{pmatrix}1&0&1\\0&1&0\\1&1&0\end{pmatrix}.
$$

自反闭包把主对角线补成 1：

$$
M_{r(R)}=M_R\vee E=\begin{pmatrix}1&0&1\\0&1&0\\1&1&1\end{pmatrix},\qquad r(R)=\{(1,1),(1,3),(2,2),(3,1),(3,2),(3,3)\}.
$$

对称闭包把矩阵与其转置取或：

$$
M_{s(R)}=M_R\vee M_R^{\mathrm T}=\begin{pmatrix}1&0&1\\0&1&1\\1&1&0\end{pmatrix},\qquad s(R)=\{(1,1),(1,3),(2,2),(2,3),(3,1),(3,2)\}.
$$

传递闭包需要布尔幂：

$$
M_R^2=\begin{pmatrix}1&1&1\\0&1&0\\1&1&1\end{pmatrix},\qquad M_R^3=\begin{pmatrix}1&1&1\\0&1&0\\1&1&1\end{pmatrix},
$$

故

$$
M_{t(R)}=M_R\vee M_R^2\vee M_R^3=\begin{pmatrix}1&1&1\\0&1&0\\1&1&1\end{pmatrix},\qquad t(R)=\{(1,1),(1,2),(1,3),(2,2),(3,1),(3,2),(3,3)\}.
$$

逐项看 $M_{t(R)}$ 的来源：$(1,2)$ 来自 $1\to3\to2$（长度 2）；$(3,3)$ 来自 $3\to1\to3$（长度 2）；$(1,1),(3,1)$ 等由原有的边或复合补足。

### 4.5.2 Warshall 算法

$M_R\vee M_R^2\vee\cdots\vee M_R^n$ 要做 $n-1$ 次 $n\times n$ 布尔乘法，计算量大。Warshall 算法用 $n$ 轮、每轮 $n^2$ 次布尔运算即可求出传递闭包。

**基本思想** 记 $W^k=(w_{ij}^k)$，其中 $w_{ij}^k=1$ 表示存在一条从 $v_i$ 到 $v_j$、且**内点**（起点与终点之间的结点）全部取自 $\{v_1,v_2,\dots,v_k\}$ 的通路；否则为 0。于是 $W^0=M_R$（只允许“没有内点”的直接边），而 $W^n$ 允许内点取遍全部结点，正好给出所有通路，即

$$
W^n=M_{t(R)}.
$$

**递推公式** 从 $W^{k-1}$ 到 $W^k$ 只增加“允许经过 $v_k$”这一条：

$$
w_{ij}^k=w_{ij}^{k-1}\ \lor\ \left(w_{ik}^{k-1}\ \land\ w_{kj}^{k-1}\right).
$$

含义是：从 $v_i$ 到 $v_j$ 要么本来就不用 $v_k$（第一项），要么可以拆成“$v_i\rightsquigarrow v_k$”与“$v_k\rightsquigarrow v_j$”两段，两段都不经过 $v_k$ 作内点（第二项）。

> **补充证明**（递推公式为什么成立）
>
> 记“内点全部取自 $\{v_1,\dots,v_{k-1}\}$”为“旧允许集”。
>
> **充分性。** 若 $w_{ij}^{k-1}=1$，原来就有一条旧通路，当然也是 $W^k$ 的通路。若 $w_{ik}^{k-1}=1$ 且 $w_{kj}^{k-1}=1$，把“$v_i$ 到 $v_k$”的旧通路与“$v_k$ 到 $v_j$”的旧通路在 $v_k$ 处拼接；$v_k$ 只是拼接点，不是任何一段的内点，所以新通路的内点仍全部来自旧允许集，特别不会把 $v_k$ 当作内点。
>
> **必要性。** 设从 $v_i$ 到 $v_j$ 有一条内点全在 $\{v_1,\dots,v_k\}$ 中的通路。若它不含 $v_k$，则 $w_{ij}^{k-1}=1$。若它含 $v_k$，取 $v_k$ 在该通路中第一次出现的位置和最后一次出现的位置：从起点到第一次出现的这一段，内点不含 $v_k$；从最后一次出现到终点的这一段，内点也不含 $v_k$。这两段分别给出 $w_{ik}^{k-1}=1$ 与 $w_{kj}^{k-1}=1$。中间从第一次到最后一次的那一段虽然可能还经过 $v_k$，但它是从 $v_k$ 回到 $v_k$ 的部分，拼接时不需要它；只取前后两段即可。
>
> 因此递推公式的两项恰好覆盖“不用 $v_k$”与“用 $v_k$”两种可能，且没有重复计算。

**例** 设关系 $R$ 的关系矩阵为

$$
W^0=M_R=\begin{pmatrix}0&0&0&1\\1&0&1&0\\1&0&0&1\\0&0&1&0\end{pmatrix},
$$

行、列依次对应 $a,b,c,d$。求 $W^1,W^2,W^3,W^4$。

**解** 按 $k=1,2,3,4$（对应 $a,b,c,d$）逐轮更新。

取 $k=1$（允许经过 $a$）：凡是能到 $a$ 的行，都可以接上 $a$ 的出边 $(a,d)$，于是第 2 行（$b\to a$）补上 $b\to d$：

$$
W^1=\begin{pmatrix}0&0&0&1\\1&0&1&1\\1&0&0&1\\0&0&1&0\end{pmatrix}.
$$

取 $k=2$（允许经过 $b$）：第 2 列全为 0（没有任何点能到 $b$），故没有任何新增：

$$
W^2=W^1=\begin{pmatrix}0&0&0&1\\1&0&1&1\\1&0&0&1\\0&0&1&0\end{pmatrix}.
$$

取 $k=3$（允许经过 $c$）：第 4 行能到 $c$（$d\to c$），而第 3 行有 $c\to a$、$c\to d$，故 $d$ 可以经 $c$ 到 $a$、$d$：

$$
W^3=\begin{pmatrix}0&0&0&1\\1&0&1&1\\1&0&0&1\\1&0&1&1\end{pmatrix}.
$$

取 $k=4$（允许经过 $d$）：第 1 行能到 $d$（$a\to d$），而第 4 行能到 $a,c,d$，于是 $a$ 可经 $d$ 到达 $a$、$c$，补上 $a\to a$ 与 $a\to c$；第 3 行也能到 $d$（$c\to d$），同样补上 $c\to c$。第 2、4 行在第 3 轮后已含 $a,c,d$ 三列，不再变化。逐行更新后每行都含 $a,c,d$ 三个位置：

$$
W^4=\begin{pmatrix}1&0&1&1\\1&0&1&1\\1&0&1&1\\1&0&1&1\end{pmatrix}=M_{t(R)}.
$$

$W^4$ 的第 2 列全为 0，说明任何结点都到不了 $b$；这与 $R$ 中 $b$ 只有出边、没有入边的事实一致。

![Warshall 例中关系 R 的关系图](/images/campus-discrete-mathematics/ch04-04.png)

### 4.5.3 传递闭包的应用：文法推导

**例** 设字母表 $V=\{A,B,C,D,e,d,f\}$，给定六条产生规则

$$
A\to Af,\quad B\to Dde,\quad C\to e,\quad A\to B,\quad B\to De,\quad D\to Bf.
$$

定义 $V$ 上的关系 $R$：从 $x_i$ 出发用**一条**规则推出一个字符串、且该串的第一个字符为 $x_j$ 时，$(x_i,x_j)\in R$。求 $t(R)$，并说明每个字母可推出的首字符。

**解** 逐条规则读“首字符”：

- $A\to Af$：首位仍是 $A$，得 $(A,A)$；
- $A\to B$：得 $(A,B)$；
- $B\to Dde$、$B\to De$：得 $(B,D)$；
- $D\to Bf$：得 $(D,B)$；
- $C\to e$：得 $(C,e)$。

所以 $R=\{(A,A),(A,B),(B,D),(D,B),(C,e)\}$。取传递闭包，把可连续推导的首字符全部补上：

- $A\to B\to D$，得 $(A,D)$；
- $B\to D\to B$，得 $(B,B)$；
- $D\to B\to D$，得 $(D,D)$。

$$
t(R)=\{(A,A),(A,B),(A,D),(B,B),(B,D),(C,e),(D,B),(D,D)\}.
$$

结论：从 $A$ 出发，推导串的首字符可能是 $A,B,D$；从 $B$ 出发可能是 $B,D$；从 $C$ 出发只能是 $e$；从 $D$ 出发可能是 $B,D$。

这里“首字符”只与规则左部的替换链有关，因此用传递闭包一次算清所有可达的首字符，比逐条枚举字符串高效得多。

## 4.6 等价关系与等价类

### 4.6.1 等价关系

**定义**

设 $R$ 为非空集合 $A$ 上的关系，若 $R$ 是自反的、对称的、传递的，则称 $R$ 为 $A$ 上的等价关系。若 $(x,y)\in R$，称 $x$ 等价于 $y$，记作 $x\sim y$。

集合上的恒等关系与全域关系都是等价关系：前者把每个元素只与自身归为一类，后者把所有元素归为一类。

**例** 在某班同学的集合上判断下列关系是否为等价关系：

$$
R_1=\{(a,b)\mid a\ \text{和}\ b\ \text{选修同一门课}\},
$$
$$
R_2=\{(a,b)\mid a\ \text{和}\ b\ \text{毕业于同一所中学}\},
$$
$$
R_3=\{(a,b)\mid a\ \text{和}\ b\ \text{年龄相同}\}.
$$

**解** $R_1$ 不是等价关系，它不传递：甲与乙同选一门课、乙与丙同选另一门课，并不能推出甲与丙同选某门课。$R_2$、$R_3$ 都满足自反、对称、传递，是等价关系。

这个例子说明：等价关系的三个条件中，“传递”最容易出问题——它要求“同一类别”的划分真正一致，而不是“通过中间人间接相连”。

**同余关系** 设 $x,y$ 为整数，$n$ 为正整数。若 $x$ 除以 $n$ 的余数与 $y$ 除以 $n$ 的余数相等，称 $x$ 与 $y$ 模 $n$ 同余，记作 $x\equiv y\ (\mathrm{mod}\ n)$。关系

$$
R=\{(x,y)\mid x\equiv y\ (\mathrm{mod}\ n)\}
$$

称为模 $n$ 同余关系。

**例** 证明整数集 $\mathbb{Z}$ 上的模 $n$ 同余关系是等价关系。

**证明** (1) 自反：对任意 $x\in\mathbb{Z}$，$x-x=0=0\cdot n$，故 $x\equiv x\ (\mathrm{mod}\ n)$。

(2) 对称：设 $x\equiv y\ (\mathrm{mod}\ n)$，即 $x-y=kn$（$k\in\mathbb{Z}$），则 $y-x=-kn$，仍为 $n$ 的整数倍，故 $y\equiv x\ (\mathrm{mod}\ n)$。

(3) 传递：设 $x\equiv y$、$y\equiv z\ (\mathrm{mod}\ n)$，即 $x-y=kn$、$y-z=ln$，相加得 $x-z=(k+l)n$，故 $x\equiv z\ (\mathrm{mod}\ n)$。

三条齐备，$R$ 是等价关系。

这里的关键是把“同余”翻译成“差是 $n$ 的整数倍”，三条性质就分别对应 $0$、相反数、加法封闭。

### 4.6.2 等价类

**定义**

设 $R$ 是非空集合 $A$ 上的等价关系，$x\in A$，所有与 $x$ 有 $R$ 关系的元素组成的集合称为 $x$ 的等价类，记作 $[x]_R$：

$$
[x]_R=\{y\mid y\in A\ \land\ xRy\}.
$$

**例** 设 $A=\{1,2,\dots,8\}$，$R$ 是 $A$ 上的模 3 同余关系，求各元素的等价类。

**解** 按除以 3 的余数分组：

$$
[1]_R=[4]_R=[7]_R=\{1,4,7\},\qquad [2]_R=[5]_R=[8]_R=\{2,5,8\},\qquad [3]_R=[6]_R=\{3,6\}.
$$

> **易混点**：同一个等价类中的元素可以互为“代表”，所以 $[1]=[4]=[7]$，但类本身是集合 $\{1,4,7\}$，不要写成“$[1]=\{1\}$”。

**定理（等价类的性质）**

设 $R$ 是非空集合 $A$ 上的等价关系，对任意 $x,y\in A$：

(1) $[x]_R\neq\varnothing$，且 $[x]_R\subseteq A$；

(2) 若 $(x,y)\in R$，则 $[x]_R=[y]_R$；

(3) 若 $(x,y)\notin R$，则 $[x]_R\cap[y]_R=\varnothing$；

(4) $\bigcup_{x\in A}[x]_R=A$。

这四条合起来说明：等价类非空、同类可互换代表、异类互不相交、全体覆盖 $A$——这正是“划分”的四要素。

**证明** (1) 由自反性 $(x,x)\in R$，故 $x\in[x]_R$，类非空；类中元素都取自 $A$，故 $[x]_R\subseteq A$。

(2) 设 $(x,y)\in R$。任取 $z\in[x]_R$，则 $(x,z)\in R$，由对称得 $(z,x)\in R$，再由传递（$(z,x),(x,y)\in R$）得 $(z,y)\in R$，故 $z\in[y]_R$，于是 $[x]_R\subseteq[y]_R$；对称地 $[y]_R\subseteq[x]_R$，故相等。

(3) 反证：若存在 $z\in[x]_R\cap[y]_R$，则 $(x,z)\in R$、$(y,z)\in R$，由对称得 $(z,y)\in R$，再由传递得 $(x,y)\in R$，与 $(x,y)\notin R$ 矛盾。

(4) 每个 $[x]_R\subseteq A$ 给出“$\subseteq$”；任取 $a\in A$，由 (1) 中 $a\in[a]_R$ 得 $a$ 属于某个等价类，故“$\supseteq$”成立。

### 4.6.3 商集

**定义**

设 $R$ 为非空集合 $A$ 上的等价关系，以 $R$ 的所有等价类为元素构成的集合称为 $A$ 在 $R$ 下的商集，记作 $A/R$：

$$
A/R=\{[x]_R\mid x\in A\}.
$$

商集的元素是“类”，不是“元素”；写 $A/R$ 时不能把类再拆开。

**例** 求整数集 $\mathbb{Z}$ 上模 $n$ 同余关系的商集 $\mathbb{Z}/R$。

**解** 各等价类为

$$
[0]_R=\{\dots,-2n,-n,0,n,2n,\dots\}=\{nz\mid z\in\mathbb{Z}\},
$$
$$
[1]_R=\{\dots,-2n+1,-n+1,1,n+1,2n+1,\dots\}=\{nz+1\mid z\in\mathbb{Z}\},
$$
$$
\vdots
$$
$$
[n-1]_R=\{\dots,-n-1,-1,n-1,2n-1,\dots\}=\{nz+n-1\mid z\in\mathbb{Z}\}.
$$

所以

$$
\mathbb{Z}/R=\{[0]_R,[1]_R,\dots,[n-1]_R\},
$$

共 $n$ 个等价类。模 $n$ 的余数只有 $0,1,\dots,n-1$ 这 $n$ 种，商集正好把这 $n$ 种余数各收成一个类。

### 4.6.4 覆盖与划分

**定义**

设 $A$ 是非空集合，$A_1,A_2,\dots,A_m$ 是 $A$ 的一簇子集，满足

(1) $A_i\neq\varnothing$（$i=1,2,\dots,m$）；

(2) $\bigcup_{i=1}^{m}A_i=A$；

(3) $A_i\cap A_j=\varnothing$（$i\neq j$）。

若满足 (1)(2)，称 $\{A_1,\dots,A_m\}$ 是 $A$ 的覆盖；若同时满足 (1)(2)(3)，称它是 $A$ 的一个划分，其中每个 $A_i$ 称为一个类或一个块。

**例** 设 $S=\{a,b,c,d\}$，判断下列各簇子集的性质：

| 子集簇 | 判断 |
| --- | --- |
| $\{\{a\},\{b,c\},\{d\}\}$ | 划分 |
| $\{\{a,b\},\{c\},\{a,d\}\}$ | 覆盖（$\{a,b\}$ 与 $\{a,d\}$ 相交，不构成划分） |
| $\{\{a\},\{b\},\{c\},\{d\}\}$ | 最大划分（块数最多） |
| $\{\{a,b,c,d\}\}$ | 最小划分（块数最少） |
| $\{\varnothing,\{a,b\},\{c,d\}\}$ | 既不是覆盖也不是划分（含空块） |

**例** 设 $\{A_1,A_2,\dots,A_m\}$ 是 $A$ 的一个划分，令

$$
R=\{(x,y)\mid x\ \text{和}\ y\ \text{属于划分的同一个子集}\ A_i\}.
$$

**证明** $R$ 是等价关系。

**证明** (1) 自反：每个 $x$ 与自己在同一块，$(x,x)\in R$。

(2) 对称：若 $x,y$ 同块，则 $y,x$ 同块，$(y,x)\in R$。

(3) 传递：设 $(x,y)\in R$、$(y,z)\in R$，即 $x,y$ 同属块 $A_i$，$y,z$ 同属块 $A_j$，于是 $y\in A_i\cap A_j$。划分的不同块不相交，故 $A_i=A_j$，从而 $x,z$ 同块，$(x,z)\in R$。

所以 $R$ 是等价关系。

**由划分造等价关系** 划分 $\{A_1,\dots,A_m\}$ 对应的等价关系就是各块上笛卡儿积的并：

$$
R=(A_1\times A_1)\cup(A_2\times A_2)\cup\cdots\cup(A_m\times A_m).
$$

**例** 设 $A=\{a,b,c,d,e\}$，划分 $\pi=\{\{a,b,c\},\{d,e\}\}$，求 $\pi$ 确定的等价关系。

**解**

$$
\begin{aligned}
R&=\{a,b,c\}\times\{a,b,c\}\ \cup\ \{d,e\}\times\{d,e\}\\
&=\{(a,a),(a,b),(a,c),(b,a),(b,b),(b,c),(c,a),(c,b),(c,c),(d,d),(d,e),(e,d),(e,e)\}.
\end{aligned}
$$

关系与划分是一一对应的：给定等价关系 $R$，商集 $A/R$ 就是 $A$ 的一个划分；给定划分，各块的笛卡儿积之并就是对应的等价关系。两者是同一件事的两种说法。

**例** 设 $A=\{1,2,3\}$，求 $A$ 上全部等价关系及其商集。

**解** $A$ 的划分共 5 种，对应 5 个等价关系：

| 等价关系 | 商集 |
| --- | --- |
| $R_1=A\times A$ | $A/R_1=\{\{1,2,3\}\}$ |
| $R_2=I_A\cup\{(2,3),(3,2)\}$ | $A/R_2=\{\{1\},\{2,3\}\}$ |
| $R_3=I_A\cup\{(1,3),(3,1)\}$ | $A/R_3=\{\{2\},\{1,3\}\}$ |
| $R_4=I_A\cup\{(1,2),(2,1)\}$ | $A/R_4=\{\{3\},\{1,2\}\}$ |
| $R_5=I_A$ | $A/R_5=\{\{1\},\{2\},\{3\}\}$ |

三种常见等价关系的商集形态：

- 全域关系 $E_A$：对任意 $x$ 有 $[x]=A$，商集 $A/E_A=\{A\}$；
- 恒等关系 $I_A$：对任意 $x$ 有 $[x]=\{x\}$，商集 $A/I_A=\{\{x\}\mid x\in A\}$；
- 模 $n$ 同余关系：$[k]=\{nz+k\mid z\in\mathbb{Z}\}$（$k=0,1,\dots,n-1$），商集含 $n$ 个类。

## 4.7 偏序关系

### 4.7.1 偏序与偏序集

**定义**

设 $R$ 为非空集合 $A$ 上的关系，若 $R$ 是自反的、反对称的、传递的，则称 $R$ 为 $A$ 上的偏序关系，简称偏序，记作 $\preceq$。集合 $A$ 与 $A$ 上的偏序 $R$ 合称偏序集，记作 $(A,R)$。若 $(a,b)\in R$，记作 $a\preceq b$。

偏序与等价关系只差一条：把“对称”换成“反对称”。等价关系刻画“同类”，偏序刻画“次序”。

**例** 证明 $A=\{1,2,3,4\}$ 上的“$\le$”关系是偏序关系。

**证明** (1) 自反：对任意 $x\in A$，$x\le x$，故 $(x,x)\in R$。

(2) 反对称：若 $x\le y$ 且 $y\le x$，则 $x=y$；等价地，当 $x\neq y$ 且 $x\le y$ 时 $y\le x$ 不成立。

(3) 传递：若 $x\le y$、$y\le z$，则 $x\le z$。

三条成立，故 $\le$ 是 $A$ 上的偏序。

### 4.7.2 可比、覆盖与哈斯图

**定义**

设 $(A,\preceq)$ 为偏序集，$x,y\in A$。

- 若 $x\preceq y$ 或 $y\preceq x$ 成立，称 $x$ 与 $y$ 可比；若两者都不成立，称 $x$ 与 $y$ 不可比。
- 若 $x\preceq y$、$x\neq y$，且不存在 $z\in A$ 使 $x\preceq z\preceq y$（$z$ 与 $x,y$ 都不同），则称 $y$ 覆盖 $x$。

“覆盖”就是“紧挨着的上一层”，中间不能再插入别的元素。

**例** 设 $A=\{1,2,3,4,5\}$，$\preceq$ 为整除关系，则 $4$ 覆盖 $2$，$2$ 覆盖 $1$，$3$ 覆盖 $1$；而 $4$ 不覆盖 $1$，因为中间隔着 $2$（$1\mid 2\mid 4$）。

**哈斯图的画法** 对偏序关系画图时：

1. 每个元素画成一个结点，位置按偏序的次序自下而上排列：若 $x\preceq y$ 且 $x\neq y$，则 $x$ 画在 $y$ 下方；
2. 只对“覆盖”关系 $x\prec y$ 连一条线段，并省略箭头（方向由下往上默认）。

这样得到的图称为哈斯图。它比完整关系图省去了所有由自反性和传递性“自动成立”的边，只保留覆盖关系。

**例** 画出 $\{1,2,\dots,12\}$ 上整除关系的哈斯图。

**解** 覆盖关系为：$2,3,5,7,11$ 覆盖 $1$；$4$ 覆盖 $2$；$6$ 覆盖 $2,3$；$10$ 覆盖 $2,5$；$9$ 覆盖 $3$；$8$ 覆盖 $4$；$12$ 覆盖 $4,6$。哈斯图如下。

![{1,2,…,12} 上整除关系的哈斯图](/images/campus-discrete-mathematics/ch04-01.png)

读图要点：$1$ 在最底层；质数 $2,3,5,7,11$ 都在第二层；$12$ 在最上层，且同时覆盖 $4$ 与 $6$。

**例** 画出 $(P(\{a,b,c\}),\subseteq)$ 的哈斯图。

**解** 设 $X=\{a,b,c\}$。先列出幂集，再按第一坐标分组列出包含关系。

$$
\begin{aligned}
P(X)=\{&\varnothing,\{a\},\{b\},\{c\},\\
&\{a,b\},\{b,c\},\{a,c\},X\}.
\end{aligned}
$$

$$
\begin{aligned}
R_\subseteq={}&I_{P(X)}\\
&\cup\bigl\{(\varnothing,\{a\}),\ (\varnothing,\{b\}),\\
&\quad (\varnothing,\{c\}),\ (\varnothing,\{a,b\}),\\
&\quad (\varnothing,\{a,c\}),\ (\varnothing,\{b,c\}),\\
&\quad (\varnothing,X)\bigr\}\\
&\cup\bigl\{(\{a\},\{a,b\}),\ (\{a\},\{a,c\}),\\
&\quad (\{a\},X)\bigr\}\\
&\cup\bigl\{(\{b\},\{a,b\}),\ (\{b\},\{b,c\}),\\
&\quad (\{b\},X)\bigr\}\\
&\cup\bigl\{(\{c\},\{b,c\}),\ (\{c\},\{a,c\}),\\
&\quad (\{c\},X)\bigr\}\\
&\cup\bigl\{(\{a,b\},X),\\
&\quad (\{a,c\},X),\\
&\quad (\{b,c\},X)\bigr\}.
\end{aligned}
$$

逐组核对个数：$\varnothing$ 引出 $7$ 个（它的真超集恰是其余 $7$ 个元素），$\{a\},\{b\},\{c\}$ 各引出 $3$ 个（$\{c\}$ 的三个真超集是 $\{a,c\},\{b,c\},\{a,b,c\}$，逐个列举时最容易漏掉最后一个），三个二元集各引出 $1$ 个，故真包含有序对共 $7+3\times3+3=19$ 个；再加上 $I_{P(X)}$ 的 $8$ 个恒等对，$|R_\subseteq|=27$。分组只改变书写方式，不改变元素：$19+8=27$ 恰是满足 $X\subseteq Y$ 的有序对 $(X,Y)$ 的总数。

按集合大小分层：$\varnothing$ 在最下；三个一元集在第二层；三个二元集在第三层；$\{a,b,c\}$ 在最上。哈斯图是一个立方体骨架。

![P({a,b,c}) 幂集上包含关系的哈斯图](/images/campus-discrete-mathematics/ch04-03.png)

**例** 设偏序集 $(A,\preceq)$ 的哈斯图如下，求 $A$ 上的偏序关系。

![由哈斯图反求偏序关系](/images/campus-discrete-mathematics/ch04-05.png)

**解** 从图上读出覆盖关系：$a\prec c$、$a\prec d$、$b\prec c$、$b\prec d$、$c\prec e$、$d\prec e$、$f\prec g$；$h$ 是孤立点。

$$
A=\{a,b,c,d,e,f,g,h\},
$$

$$
\preceq\ =I_A\cup\{(a,c),(a,d),(b,c),(b,d),(c,e),(d,e),(f,g)\}\cup\{(a,e),(b,e)\}.
$$

最后两个有序对 $(a,e)$、$(b,e)$ 不能漏：$a\preceq c\preceq e$ 与 $b\preceq d\preceq e$ 由传递性必然成立，而哈斯图只画覆盖边，所以补全关系时要把传递得到的对补上。$h$ 与其他元素都不可比，除 $(h,h)$ 外没有任何含 $h$ 的有序对。

### 4.7.3 全序

**定义**

设 $(A,\preceq)$ 为偏序集，若对任意 $x,y\in A$，$x$ 与 $y$ 都可比，则称 $\preceq$ 为 $A$ 上的全序关系，$(A,\preceq)$ 称为全序集。

例如 $\{1,2,3,4,5\}$ 上的 $\le$ 是全序，而整除关系不是全序（$2$ 与 $3$ 不可比）。

**例** $A=\{2,4,6,8\}$ 上的 $\le$ 是全序关系，其哈斯图为一条竖直直线 $2-4-6-8$。有限全序集的哈斯图总是一条竖直直线，故全序集也称为线序集。

**例** 判断下列关系是否为全序关系：

(1) $A=\{a,b,c\}$，$R=\{(a,a),(b,b),(c,c),(a,b),(b,c),(a,c)\}$；

(2) 实数集 $\mathbb{R}$ 上的 $\le$；

(3) 实数集 $\mathbb{R}$ 上的 $<$。

**解** (1) 是。$R$ 满足自反、反对称、传递（$a\prec b\prec c$ 且补上了 $a\prec c$），且 $a,b,c$ 两两可比。

(2) 是。任意两个实数都有 $\le$ 关系，且 $\le$ 是偏序。

(3) 不是。$<$ 不是自反的（$x<x$ 不成立），因此根本不是偏序关系，更不是全序。

(3) 提醒：判断全序前必须先确认它是偏序；一个“看起来能排序”的关系若缺自反性，就已经出局。

### 4.7.4 最小元、最大元、极小元、极大元

**定义**

设 $(A,\preceq)$ 为偏序集，$B\subseteq A$。

- 若存在 $y\in B$，使对一切 $x\in B$ 有 $y\preceq x$，称 $y$ 为 $B$ 的最小元；
- 若存在 $y\in B$，使对一切 $x\in B$ 有 $x\preceq y$，称 $y$ 为 $B$ 的最大元；
- 若存在 $y\in B$，使不存在 $x\in B$ 满足 $x\prec y$（即 $x\preceq y$ 且 $x\neq y$），称 $y$ 为 $B$ 的极小元；
- 若存在 $y\in B$，使不存在 $x\in B$ 满足 $y\prec x$，称 $y$ 为 $B$ 的极大元。

> **易混点**：区别在于“与全体比较”还是“只与上下邻居比较”：最小元/最大元要求与 $B$ 中**所有**元素可比且处在端点；极小元/极大元只要求**没有更小的/更大的**元素，允许存在与它不可比的其他元素。

**例** 设偏序集如上图（$a,b$ 在下，$c,d$ 居中，$e$ 在上），取

$$
B_1=\{a,c,d,e\},\qquad B_2=\{a,b,c,d,e\}.
$$

**解** $B_1$ 中 $a$ 与 $c,d,e$ 都可比且最小，故 $a$ 是 $B_1$ 的最小元，也是极小元；$e$ 是 $B_1$ 的最大元，也是极大元。

$B_2$ 中 $a$ 与 $b$ 不可比，故不存在最小元；但 $a$、$b$ 都没有更小的元素，都是极小元。$e$ 与所有元素可比且最大，是最大元，也是唯一的极大元。

**例** 求 $\{1,2,\dots,12\}$ 上整除偏序集的极大元与极小元；求 $(P(\{a,b,c\}),\subseteq)$ 的极大元与极小元。

**解** 整除关系中，$7,8,9,10,11,12$ 都没有（除自身外的）倍数在集合内，是极大元；$1$ 整除所有元素，是极小元（也是最小元）。

幂集偏序中，唯一的极大元是 $\{a,b,c\}$，唯一的极小元（也是最小元）是 $\varnothing$。

**四条结论**（设 $B\subseteq A$）

1. $B$ 的最大元、最小元可能存在也可能不存在；若存在，则唯一。
2. $B$ 的极大元、极小元可能不存在；若存在，可以不唯一。
3. $B$ 的最大元一定是极大元，最小元一定是极小元。
4. $B$ 的极大元不一定是最大元，极小元不一定是最小元（如 $B_2$ 中 $a$ 是极小元但不是最小元）。

### 4.7.5 上界、下界与确界

**定义**

设 $(A,\preceq)$ 为偏序集，$B\subseteq A$ 且 $B\neq\varnothing$。

- 若存在 $a\in A$，使对一切 $x\in B$ 有 $x\preceq a$，称 $a$ 为 $B$ 的上界；
- 若存在 $a\in A$，使对一切 $x\in B$ 有 $a\preceq x$，称 $a$ 为 $B$ 的下界；
- 若 $a$ 是 $B$ 的上界，且对 $B$ 的任意上界 $b$ 都有 $a\preceq b$，称 $a$ 为 $B$ 的最小上界（上确界）；
- 若 $a$ 是 $B$ 的下界，且对 $B$ 的任意下界 $b$ 都有 $b\preceq a$，称 $a$ 为 $B$ 的最大下界（下确界）。

> **易错点**：上界、下界是在**整个 $A$** 中取的，可以不属于 $B$；而最大元、最小元必须属于 $B$。

**例** 在 $\{1,2,3,4,6,8,12,24\}$ 的整除偏序集中，求下列子集的上界、下界、上确界、下确界。

![{1,2,3,4,6,8,12,24} 上整除关系的哈斯图](/images/campus-discrete-mathematics/ch04-02.png)

| $B$ | 上界 | 下界 | 上确界 | 下确界 |
| --- | --- | --- | --- | --- |
| $\{1,2,3\}$ | $6,12,24$ | $1$ | $6$ | $1$ |
| $\{1,3,4,12\}$ | $12,24$ | $1$ | $12$ | $1$ |

对 $\{1,2,3\}$：能同时被 $1,2,3$ 整除的元素是 $6,12,24$，其中 $6$ 最小（$6\mid12\mid24$），故上确界为 $6$；能整除 $1,2,3$ 的只有 $1$，故下确界为 $1$。

对 $\{1,3,4,12\}$：上界须是 $12$ 的倍数，集合内只有 $12,24$，上确界为 $12$；下界须整除 $1$，只有 $1$。

**两条结论**

1. $B$ 的上界、下界不一定存在；若存在，可以不唯一。
2. $B$ 的上确界、下确界不一定存在；若存在，一定唯一。

唯一性来自反对称性：若两个元素都是最小上界，则互相 $\preceq$，只能是同一个。

### 4.7.6 良序

**定义**

设 $(A,\preceq)$ 为偏序集，若 $A$ 的每一个非空子集都存在最小元，则称 $(A,\preceq)$ 为良序集，$\preceq$ 为良序关系。

例如自然数集 $\mathbb{N}=\{0,1,2,\dots\}$ 上的 $\le$ 是良序关系。

**例** 判断下列关系是否为良序关系：

(1) $A=\{a,b,c\}$，$R=\{(a,a),(b,b),(c,c),(a,b),(b,c),(a,c)\}$；

(2) 实数集 $\mathbb{R}$ 上的 $\le$。

**解** (1) 逐类检查非空子集的最小元：

- 一元子集 $\{a\},\{b\},\{c\}$：最小元分别为 $a,b,c$；
- 二元子集 $\{a,b\},\{b,c\},\{a,c\}$：最小元分别为 $a,b,a$；
- 三元子集 $\{a,b,c\}$：最小元为 $a$。

每个非空子集都有最小元，故是良序关系。

(2) 不是。$\mathbb{R}$ 自身没有最小元，开区间 $(0,1)$ 也没有最小元（任取 $x\in(0,1)$，$x/2$ 更小且仍在区间内），存在无最小元的非空子集，故不是良序。

**两条结论**

1. 每个良序集一定是全序集；反之不成立（如 $(\mathbb{R},\le)$ 是全序但非良序）。
2. 每个**有限**全序集一定是良序集：有限全序集的哈斯图是一条有限直线，任取非空子集，最下面那个元素就是最小元。

> **补充证明**
>
> **1. 良序 $\Rightarrow$ 全序。** 设 $(A,\preceq)$ 良序，任取 $x,y\in A$。若 $x=y$，当然可比。若 $x\neq y$，取非空子集 $B=\{x,y\}$；由良序性，$B$ 有最小元。最小元只能是 $x$ 或 $y$：若为 $x$，则 $x\preceq y$；若为 $y$，则 $y\preceq x$。所以 $x,y$ 可比，$\preceq$ 是全序。
>
> **2. 有限全序 $\Rightarrow$ 良序。** 设 $(A,\preceq)$ 是有限全序集，$B\subseteq A$ 非空。把 $B$ 的元素排成 $b_1,\dots,b_k$，令 $m_1=b_1$；对 $i=2,\dots,k$，若 $b_i\prec m_{i-1}$ 则令 $m_i=b_i$，否则令 $m_i=m_{i-1}$。由全序性，$b_i$ 与 $m_{i-1}$ 一定可比，所以每一步都有定义。归纳可见 $m_i$ 是 $\{b_1,\dots,b_i\}$ 的最小元；特别地 $m_k$ 是 $B$ 的最小元。故 $A$ 的每个非空子集都有最小元，$(A,\preceq)$ 良序。

### 4.7.7 字典序

**定义**

设 $(A_1,\preceq_1)$、$(A_2,\preceq_2)$ 是两个偏序集，记 $\prec_i$ 为 $\preceq_i$ 的严格部分，即 $a\prec_ib$ 当且仅当 $a\preceq_ib$ 且 $a\neq b$。在 $A_1\times A_2$ 上定义字典顺序 $\preceq$：

$$
(x_1,y_1)\preceq(x_2,y_2)\iff x_1\prec_1x_2\ \ \text{或}\ \ \bigl(x_1=x_2\ \text{且}\ y_1\preceq_2y_2\bigr).
$$

即先比第一坐标，第一坐标分出大小就定胜负；第一坐标相等时才比第二坐标。

**易混点** 第一个条件必须用严格序 $\prec_1$，不能写成 $x_1\preceq_1x_2$。若用非严格序，由自反性 $x_1\preceq_1x_1$ 恒成立，于是同一第一坐标下的 $(x_1,y_1)$ 与 $(x_1,y_2)$ 会互相比“小”：两个方向都满足条件，而两者并不相等，反对称性立刻被破坏，这样定义出的关系根本不是偏序。

> **补充证明** 验证 $\preceq$ 满足偏序的三条性质。
>
> **自反**：取 $x_1=x_2=x$、$y_1=y_2=y$，由 $\preceq_2$ 的自反性得 $y\preceq_2y$，故 $(x,y)\preceq(x,y)$。
>
> **反对称**：设 $(x_1,y_1)\preceq(x_2,y_2)$ 且 $(x_2,y_2)\preceq(x_1,y_1)$。若前一式由 $x_1\prec_1x_2$ 成立，则 $x_1\preceq_1x_2$ 且 $x_1\neq x_2$；而后一式或者给出 $x_2\prec_1x_1$（与 $x_1\preceq_1x_2$ 一起违反 $\preceq_1$ 的反对称性），或者给出 $x_2=x_1$（与 $x_1\neq x_2$ 矛盾），两种都不可能。故 $x_1\prec_1x_2$ 不成立，对称地 $x_2\prec_1x_1$ 也不成立。于是两个关系都只能由第二个条件给出，即 $x_1=x_2$、$y_1\preceq_2y_2$ 且 $y_2\preceq_2y_1$；由 $\preceq_2$ 的反对称性得 $y_1=y_2$，故 $(x_1,y_1)=(x_2,y_2)$。
>
> **传递**：设 $(x_1,y_1)\preceq(x_2,y_2)$ 且 $(x_2,y_2)\preceq(x_3,y_3)$。若第一式由 $x_1\prec_1x_2$ 成立，则 $x_1\preceq_1x_2$，而第二式无论走哪个条件都给出 $x_2\preceq_1x_3$，由传递性得 $x_1\preceq_1x_3$；又 $x_1\neq x_2$，若 $x_1=x_3$ 则 $x_2\preceq_1x_1$，与 $x_1\prec_1x_2$ 矛盾，故 $x_1\neq x_3$，即 $x_1\prec_1x_3$，结论成立。若第一式由 $x_1=x_2$ 且 $y_1\preceq_2y_2$ 成立，则第二式若为 $x_2\prec_1x_3$，由 $x_1=x_2$ 直接得 $x_1\prec_1x_3$；若为 $x_2=x_3$ 且 $y_2\preceq_2y_3$，则 $x_1=x_3$ 且由 $\preceq_2$ 的传递性得 $y_1\preceq_2y_3$。两种情形都得到 $(x_1,y_1)\preceq(x_3,y_3)$。

字典序可推广到 $n$ 个偏序集的笛卡儿积。先定义它的严格部分：

$$
(a_1,\dots,a_n)\prec(b_1,\dots,b_n)\iff \text{存在}\ i\ (1\le i\le n)\ \text{使}\ a_1=b_1,\ \dots,\ a_{i-1}=b_{i-1},\ a_i\prec_ib_i,
$$

再令 $\preceq$ 为 $\prec$ 与相等之并，即 $(a_1,\dots,a_n)\preceq(b_1,\dots,b_n)$ 当且仅当两者相等或前者严格小于后者。这里必须把“完全相等”这一情形算进去：只写严格比较会漏掉每个元素与自身的关系。

**应用：字符串比较** 设偏序集 $A$ 上的两个字符串 $a_1a_2\dots a_m$ 与 $b_1b_2\dots b_n$，且两者不同。令 $t=\min(m,n)$，定义

$$
a_1a_2\dots a_m<b_1b_2\dots b_n
$$

当且仅当 $(a_1,\dots,a_t)\prec(b_1,\dots,b_t)$，或者 $(a_1,\dots,a_t)=(b_1,\dots,b_t)$ 且 $m<n$。

即逐位比较，先出现较小字符的串更小；若前 $t$ 位全同，则短串更小。例如按字母表顺序 $\text{discreet}<\text{discrete}$（第 7 位 $e<t$），$\text{good}<\text{goodness}$（前缀相同而更短）。这正是字典排版的规则，也是编程中字符串比较的常用语义。

## 4.8 函数

### 4.8.1 函数的定义

**定义**

设 $f$ 是从集合 $A$ 到 $B$ 的一个二元关系，且对任一 $x\in A$，都有**唯一**的 $y\in B$ 使 $(x,y)\in f$，则称 $f$ 为从 $A$ 到 $B$ 的函数（映射），记作 $f:A\to B$。

函数首先是关系，比一般关系多了两条约束：

1. 定义域必须是整个 $A$，不能是 $A$ 的真子集——$A$ 中每个元素都要有像；
2. 每个 $x$ 的像必须唯一——不能一个 $x$ 对应两个 $y$。

**例** 设 $A=\{a,b,c\}$，$B=\{1,2,3,4,5\}$，$f=\{(a,1),(b,3),(c,5)\}$，判断 $f$ 是否为 $A$ 到 $B$ 的函数。

**解** 是。$A$ 中三个元素都有像，且各自的像唯一；虽然 $2,4$ 没有被用到，但这不影响“函数”的资格（只影响是否满射）。

**定义（定义域、陪域、值域）**

若 $f$ 是从 $A$ 到 $B$ 的函数，称 $A$ 为 $f$ 的定义域，$B$ 为 $f$ 的陪域。若 $(x,y)\in f$，记 $y=f(x)$，称 $y$ 为 $x$ 的像，$x$ 为 $y$ 的原像。$A$ 中所有元素的像组成的集合称为 $f$ 的值域。

$$
\operatorname{dom}f=A,\qquad \operatorname{ran}f=\{f(x)\mid x\in A\}\subseteq B.
$$

注意 $\operatorname{ran}f\subseteq B$ 一般不取等：陪域是“允许落在的范围”，值域是“实际取到的值”。

**例** 设 $A=\{x_1,x_2\}$，$B=\{y_1,y_2\}$，$f=\{(x_1,y_1),(x_2,y_2),(x_2,y_1)\}$，$g=\{(x_1,y_1),(x_2,y_1)\}$，判断 $f,g$ 是否为 $A$ 到 $B$ 的函数。

**解** $f$ 不是：$x_2$ 同时对应 $y_2$ 与 $y_1$，像不唯一。$g$ 是：两个元素都有像且各自唯一（$x_1$ 与 $x_2$ 的像相同并不违反函数定义）。

**定义（函数相等）**

设 $f,g$ 均为 $A$ 到 $B$ 的函数，若对一切 $x\in A$ 都有 $f(x)=g(x)$，则称 $f$ 与 $g$ 相等，记作 $f=g$。

**定义（函数集合）**

设 $A,B$ 为集合，所有从 $A$ 到 $B$ 的函数构成的集合记作 $B^A$（读作“$B$ 上 $A$”）：

$$
B^A=\{f\mid f:A\to B\}.
$$

**例** 设 $A=\{0,1,2\}$，$B=\{a,b\}$，写出所有从 $A$ 到 $B$ 的函数。

**解** 每个 $x\in A$ 的像可取 $a$ 或 $b$，共 $2^3=8$ 个函数：

$$
f_1=\{(0,a),(1,a),(2,a)\},\quad f_2=\{(0,a),(1,a),(2,b)\},\quad f_3=\{(0,a),(1,b),(2,a)\},\quad f_4=\{(0,a),(1,b),(2,b)\},
$$
$$
f_5=\{(0,b),(1,a),(2,a)\},\quad f_6=\{(0,b),(1,a),(2,b)\},\quad f_7=\{(0,b),(1,b),(2,a)\},\quad f_8=\{(0,b),(1,b),(2,b)\}.
$$

若 $|A|=m$、$|B|=n$，则 $|B^A|=n^m$：$A$ 中每个元素有 $n$ 种像的选法，$m$ 个元素独立选择。

### 4.8.2 单射、满射、双射

**定义**

给定函数 $f:A\to B$：

- 若对任意 $x_1,x_2\in A$，$x_1\neq x_2$ 都有 $f(x_1)\neq f(x_2)$，称 $f$ 是单射函数（一对一映射）；
- 若对任意 $y\in B$，都存在 $x\in A$ 使 $f(x)=y$，称 $f$ 是满射函数（从 $A$ 到 $B$ 上的映射）；
- 若 $f$ 既是满射又是单射，称 $f$ 是双射函数（一一对应）。

单射等价说法：$f(x_1)=f(x_2)\Rightarrow x_1=x_2$，即不同原像不能挤到同一个像上。满射等价说法：$\operatorname{ran}f=B$，即陪域中每个元素都被用到。

**例** 设 $f$ 是从 $A=\{a,b,c,d\}$ 到 $B=\{1,2,3,4,5\}$ 的函数，$f(a)=1$，$f(b)=2$，$f(c)=3$，$f(d)=5$，判断 $f$ 的类型。

**解** $f$ 是单射：四个原像的像互不相同。$f$ 不是满射：$4\in B$ 没有原像。故 $f$ 是单射但非满射，不是双射。

**例** 判断下列三个函数的类型：

(1) $f:\{1,2,3\}\to\{a,b,c,d\}$，$f(1)=a$，$f(2)=b$，$f(3)=c$；

(2) $g:\{1,2,3\}\to\{a,b\}$，$g(1)=a$，$g(2)=b$，$g(3)=a$；

(3) $h:\{1,2,3\}\to\{a,b,c\}$，$h(1)=a$，$h(2)=b$，$h(3)=c$。

**解** (1) $f$ 是单射（三个像互不相同），但不是满射（$d$ 没有原像），故不是双射。

(2) $g$ 是满射（$a,b$ 都有原像），但不是单射（$g(1)=g(3)=a$），故不是双射。

(3) $h$ 既是单射又是满射，故是双射。

由此可总结：有限集之间，若 $|A|<|B|$，则 $A\to B$ 的函数不可能是满射；若 $|A|>|B|$，则不可能单射；只有 $|A|=|B|$ 时才可能双射。这是判断类型的“计数捷径”，但仍需核对具体对应关系。

### 4.8.3 常用函数

1. **常函数**：$f:A\to B$，若存在 $b\in B$ 使对一切 $x\in A$ 有 $f(x)=b$，称 $f$ 为常函数。常函数在 $|A|>1$ 时不是单射。
2. **恒等函数**：$f:A\to A$，若对一切 $x\in A$ 有 $f(x)=x$，称 $f$ 为 $A$ 上的恒等函数。恒等函数总是双射。
3. **特征函数**：设 $A'\subseteq A$，定义 $f_{A'}:A\to\{0,1\}$ 为

$$
f_{A'}(a)=\begin{cases}1,& a\in A',\\ 0,& a\notin A'.\end{cases}
$$

特征函数把“是否属于某个子集”编码成 0/1，是计数与集合运算的常用工具。

4. **自然映射**：设 $R$ 是 $A$ 上的等价关系，令 $g:A\to A/R$，$g(a)=[a]_R$，称 $g$ 为从 $A$ 到商集 $A/R$ 的自然映射。它把每个元素送到它所在的等价类，一般不是单射（同类元素送到同一处）。
5. **上取整与下取整**：对有理数 $x$，$\lceil x\rceil$ 表示大于或等于 $x$ 的最小整数（上取整），$\lfloor x\rfloor$ 表示小于或等于 $x$ 的最大整数（下取整）。例如 $\lceil 2.3\rceil=3$、$\lfloor 2.9\rfloor=2$、$\lceil -1.2\rceil=-1$、$\lfloor -1.2\rfloor=-2$。

### 4.8.4 复合函数

**定义**

设 $f:A\to B$、$g:B\to C$ 是函数，$f$ 与 $g$ 的复合记作 $g\circ f$：

$$
g\circ f=\{(x,z)\mid x\in A\ \land\ z\in C\ \land\ \exists y\,(y\in B\ \land\ (x,y)\in f\ \land\ (y,z)\in g)\},
$$

$g\circ f$ 是从 $A$ 到 $C$ 的函数，且对任意 $x\in A$ 有 $(g\circ f)(x)=g(f(x))$。

**注意定义的前提**：必须有 $\operatorname{ran}f\subseteq\operatorname{dom}g=B$。若 $f$ 的值域不是 $g$ 的定义域的子集，$g\circ f$ 就无法定义。

**例** 令 $f$ 是从 $\{a,b,c\}$ 到 $\{1,2,3\}$ 的函数，$f(a)=3$、$f(b)=2$、$f(c)=1$；$g$ 是 $\{a,b,c\}$ 到自身的函数，$g(a)=b$、$g(b)=c$、$g(c)=a$。求 $f\circ g$ 与 $g\circ f$。

**解** $f\circ g$：先 $g$ 后 $f$，$g$ 的陪域 $\{a,b,c\}$ 正好是 $f$ 的定义域，故可复合。

$$
(f\circ g)(a)=f(g(a))=f(b)=2,\quad (f\circ g)(b)=f(g(b))=f(c)=1,\quad (f\circ g)(c)=f(g(c))=f(a)=3.
$$

$g\circ f$ 没有定义：$\operatorname{ran}f=\{1,2,3\}$ 不是 $g$ 的定义域 $\{a,b,c\}$ 的子集，$f(x)$ 落在 $g$ 无法接受的位置。

**定理**

设 $g:A\to B$、$f:B\to C$，则

(1) $f\circ g$ 是 $A$ 到 $C$ 的函数；

(2) 对任意 $x\in A$，$(f\circ g)(x)=f(g(x))$。

**证明** (1) 任取 $x\in A$。$g$ 是函数，存在 $y\in B$ 使 $(x,y)\in g$；$f$ 是函数，对 $y\in B$ 存在 $z\in C$ 使 $(y,z)\in f$。由复合关系定义，$(x,z)\in f\circ g$，故 $\operatorname{dom}(f\circ g)=A$。

再证像唯一。设 $(x,z_1)\in f\circ g$ 且 $(x,z_2)\in f\circ g$，则存在 $t_1,t_2$ 使 $(x,t_1)\in g$、$(t_1,z_1)\in f$，$(x,t_2)\in g$、$(t_2,z_2)\in f$。由 $g$ 是函数得 $t_1=t_2$（同一个 $x$ 只有一个像）；再由 $f$ 是函数得 $z_1=z_2$。故 $f\circ g$ 是函数。

(2) 任取 $x\in A$，$(x,g(x))\in g$ 且 $g(x)\in B$；由 $f$ 是 $B$ 上的函数，$(g(x),f(g(x)))\in f$，故 $(x,f(g(x)))\in f\circ g$。又 $f\circ g$ 是函数，像唯一，所以 $(f\circ g)(x)=f(g(x))$。

**例** 设 $f,g$ 都是从整数集到整数集的函数，$f(x)=x+2$，$g(x)=2x+1$，求 $f\circ g$ 与 $g\circ f$。

**解**

$$
(f\circ g)(x)=f(g(x))=f(2x+1)=(2x+1)+2=2x+3,
$$
$$
(g\circ f)(x)=g(f(x))=g(x+2)=2(x+2)+1=2x+5.
$$

两者不同，函数的复合不满足交换律。

**定理（结合律）**

设 $f:A\to B$、$g:B\to C$、$h:C\to D$ 均为函数，则

$$
h\circ(g\circ f)=(h\circ g)\circ f.
$$

**证明** 由前一定理，$h\circ(g\circ f)$ 与 $(h\circ g)\circ f$ 都是 $A$ 到 $D$ 的函数。对任意 $x\in A$，

$$
(h\circ(g\circ f))(x)=h((g\circ f)(x))=h(g(f(x)))=((h\circ g)\circ f)(x).
$$

两边在每个 $x$ 上取值相同，故相等。

**定理（复合保持单射、满射、双射）**

设 $f,g$ 是函数，$g\circ f$ 有意义，则

- $f,g$ 都是满射 $\Rightarrow$ $g\circ f$ 是满射；
- $f,g$ 都是单射 $\Rightarrow$ $g\circ f$ 是单射；
- $f,g$ 都是双射 $\Rightarrow$ $g\circ f$ 是双射。

**证明** (1) 设 $f:A\to B$、$g:B\to C$，任取 $z\in C$，由 $g$ 满射存在 $y\in B$ 使 $g(y)=z$，由 $f$ 满射存在 $x\in A$ 使 $f(x)=y$，于是 $(g\circ f)(x)=g(f(x))=g(y)=z$，故 $g\circ f$ 的值域为 $C$。

(2) 设 $x_1\neq x_2$，由 $f$ 单射得 $f(x_1)\neq f(x_2)$，再由 $g$ 单射得 $g(f(x_1))\neq g(f(x_2))$，即 $(g\circ f)(x_1)\neq(g\circ f)(x_2)$。

(3) 由 (1)(2) 即得。

**定理（复合的“反推”）**

设 $g\circ f$ 有意义，则

- $g\circ f$ 是满射 $\Rightarrow$ $g$ 是满射；
- $g\circ f$ 是单射 $\Rightarrow$ $f$ 是单射；
- $g\circ f$ 是双射 $\Rightarrow$ $g$ 是满射且 $f$ 是单射。

**证明** (1) 任取 $z\in C$，由 $g\circ f$ 满射存在 $x\in A$ 使 $(g\circ f)(x)=z$，即 $g(f(x))=z$，而 $f(x)\in B$，故 $g$ 的值域为 $C$。

(2) 设 $x_1\neq x_2$，若 $f(x_1)=f(x_2)$，则 $g(f(x_1))=g(f(x_2))$，与 $g\circ f$ 单射矛盾，故 $f(x_1)\neq f(x_2)$。

(3) 由 (1)(2) 直接得到。

> **理解关键**：这两组定理的方向差别：复合**保持**性质（正向），复合的性质只能**反推**到“后一个满射、前一个单射”（不能反推到 $f$ 满射或 $g$ 单射）。

**定理**

设 $f:A\to B$，则

$$
f\circ I_A=I_B\circ f=f.
$$

**证明** 对任意 $x\in A$，$(f\circ I_A)(x)=f(I_A(x))=f(x)$，$(I_B\circ f)(x)=I_B(f(x))=f(x)$，故两者都等于 $f$。

### 4.8.5 反函数

**定义**

设 $f:A\to B$ 是双射函数，则 $f$ 的逆关系称为 $f$ 的反函数（逆映射），记作 $f^{-1}$，并称 $f$ 可逆。

双射是反函数存在的前提：单射保证逆关系的像唯一，满射保证逆关系的定义域覆盖整个 $B$。

**例** 设 $\mathbb{R}$ 为实数集，$f:\mathbb{R}\to\mathbb{R}$，$f=\{(x,x+1)\mid x\in\mathbb{R}\}$。$f$ 是双射，其反函数为

$$
f^{-1}=\{(x+1,x)\mid x\in\mathbb{R}\},
$$

即 $f^{-1}(y)=y-1$。

**定理**

若 $f$ 是从 $A$ 到 $B$ 的双射，则 $f^{-1}$ 是从 $B$ 到 $A$ 的双射。

> **补充证明**
>
> 先说明 $f^{-1}$ 是 $B$ 到 $A$ 的函数。
>
> - **定义域覆盖 $B$。** 任取 $y\in B$，由 $f$ 满射，存在 $x\in A$ 使 $f(x)=y$，即 $(y,x)\in f^{-1}$。故 $\operatorname{dom}f^{-1}=B$。
> - **像唯一。** 若 $(y,x_1),(y,x_2)\in f^{-1}$，则 $(x_1,y),(x_2,y)\in f$，即 $f(x_1)=f(x_2)=y$。由 $f$ 单射得 $x_1=x_2$。所以每个 $y$ 的像唯一。
>
> 再说明 $f^{-1}$ 是双射。
>
> - **单射。** 若 $f^{-1}(y_1)=f^{-1}(y_2)=x$，则 $f(x)=y_1$ 且 $f(x)=y_2$。由 $f$ 是函数（同一个 $x$ 只有一个像）得 $y_1=y_2$。
> - **满射。** 任取 $x\in A$，令 $y=f(x)\in B$，则 $(y,x)\in f^{-1}$，即 $f^{-1}(y)=x$。故 $\operatorname{ran}f^{-1}=A$。
>
> 两条合起来，$f^{-1}:B\to A$ 是双射。

**定理**

若 $f:A\to B$ 是双射，则 $(f^{-1})^{-1}=f$。

**证明** 任取 $(x,y)\in f$，由 $f$ 双射知 $(y,x)\in f^{-1}$；又 $f^{-1}$ 双射，故 $(x,y)\in(f^{-1})^{-1}$，于是 $f\subseteq(f^{-1})^{-1}$。

反过来，任取 $(x,y)\in(f^{-1})^{-1}$，按逆关系的定义有 $(y,x)\in f^{-1}$，再按逆关系定义得 $(x,y)\in f$，故 $(f^{-1})^{-1}\subseteq f$。两个包含合起来得 $(f^{-1})^{-1}=f$。

**定理**

若 $f:A\to B$、$g:B\to C$ 均为双射，则

$$
(g\circ f)^{-1}=f^{-1}\circ g^{-1}.
$$

这与 4.3 中“复合的逆等于逆的反序复合”是同一结论在函数情形下的表述。

> **补充证明**
>
> 任取 $z\in C$。因为 $g$ 是双射，令 $y=g^{-1}(z)\in B$；因为 $f$ 是双射，令 $x=f^{-1}(y)\in A$。于是
>
> $$
> (g\circ f)(x)=g(f(x))=g(y)=z,
> $$
>
> 故 $(g\circ f)^{-1}(z)=x$。另一方面，
>
> $$
> (f^{-1}\circ g^{-1})(z)=f^{-1}(g^{-1}(z))=f^{-1}(y)=x.
> $$
>
> 两个函数在任意 $z\in C$ 上取值相同，故 $(g\circ f)^{-1}=f^{-1}\circ g^{-1}$。这里顺序必须颠倒：先撤销 $g$，再撤销 $f$。

### 4.8.6 集合的基数

**约定与记号**

本章统一取 $\mathbb{N}=\{0,1,2,\dots\}$。等势、基数的大小按下面的方式定义：

$$
A\sim B\iff \text{存在双射 }f:A\to B,\qquad |A|=|B|;
$$

$$
|A|\le|B|\iff \text{存在单射 }f:A\to B;
$$

$$
|A|<|B|\iff |A|\le|B|\ \text{且}\ |A|\neq|B|.
$$

最后一式中的“$|A|\neq|B|$”指**不存在双射**。因此要证明严格不等式 $|A|<|B|$，必须做两件事：给出一个单射 $A\to B$，再证明不存在满射（从而不存在双射）。只给出单射只能得到 $|A|\le|B|$。

**定义（有限集与无限集）**

若存在 $n\in\mathbb{N}$ 使 $A\sim\{0,1,\dots,n-1\}$，称 $A$ 为有限集，并记 $|A|=n$；不是有限集的集合称为无限集。

这里“无限”的确切含义是“不存在与某个有限初始段 $\{0,1,\dots,n-1\}$ 的双射”，而不是“已经给定了一个从 $\mathbb{N}$ 到 $A$ 的单射”。两者在 ZF 下并不等价；结论 1 的证明会用到选择原则，原因就在这里。

**定义（可数集）**

若 $A\sim\mathbb{N}$，称 $A$ 为可数集（可列集），其基数记为 $\aleph_0$（阿列夫零）。

按课程定义，“可数”就是“与 $\mathbb{N}$ 等势”，所以可数集一定是无限集；有限集不称为可数集。若采用另一种把有限集也算作“可数”的约定，后面几处结论的措辞要相应改成“至多可数”，正文会在相应位置注明。

**例** 验证非负偶数集 $M=\{0,2,4,6,\dots\}$ 是可数集。

**证明** 只需建立 $M$ 与 $\mathbb{N}$ 的双射：

$$
\mathbb{N}:\ 0,\ 1,\ 2,\ 3,\ 4,\ \dots,\ n,\ \dots
$$

$$
M:\ 0,\ 2,\ 4,\ 6,\ 8,\ \dots,\ 2n,\ \dots
$$

对应 $n\mapsto 2n$ 是一一对应：不同的 $n$ 给出不同的 $2n$，每个非负偶数也都是某个 $n$ 的 $2n$。故 $M\sim\mathbb{N}$，$M$ 可数。

这个例子说明“无限集可以与其真子集等势”——这正是无限集与有限集的本质区别。

**定理（可数集的序列刻画）**

集合 $S$ 可数，当且仅当存在两两不同的无穷序列 $a_0,a_1,a_2,\dots$，使

$$
S=\{a_n\mid n\in\mathbb{N}\}.
$$

**证明** 若存在这样的序列，定义 $f:\mathbb{N}\to S$，$f(n)=a_n$。由 $S=\{a_n\mid n\in\mathbb{N}\}$ 知 $f$ 满射；由 $a_n$ 两两不同知 $f$ 单射；故 $f$ 是双射，$S\sim\mathbb{N}$，$S$ 可数。

反之，若 $S$ 可数，则存在双射 $g:\mathbb{N}\to S$。令 $a_n=g(n)$，则 $a_n$ 两两不同（$g$ 单射），且 $S=\{a_n\mid n\in\mathbb{N}\}$（$g$ 满射），即为所求。

> **条件核对**：“两两不同”不能省略。若允许序列中有重复项，例如 $S=\{0\}$ 写成 $0,0,0,\dots$，这个序列只给出从 $\mathbb{N}$ 到 $S$ 的满射，而不是双射；此时不能推出 $S\sim\mathbb{N}$。只有“无重复的无穷序列”才与可数集一一对应。

#### 关于基数的常用结论

本节沿用「可数」指与 $\mathbb{N}$ 等势的约定。有限集与可数无限集统称为「至多可数」。

**结论 1（任意无限集含可数子集）**

任意无限集 $S$ 必含有可数子集。

> **补充证明**
>
> 设 $S$ 无限（即不是有限集）。递归构造一列元素：
>
> - 先取 $a_0\in S$；
> - 已取定两两不同的 $a_0,\dots,a_{n-1}$ 后，令 $F_n=\{a_0,\dots,a_{n-1}\}$。由于 $S$ 不是有限集，$S-F_n$ 不能为空（否则 $S=F_n$ 只有 $n$ 个元素），故可取 $a_n\in S-F_n$。
>
> 这样得到的 $a_n$ 两两不同，令 $T=\{a_n\mid n\in\mathbb{N}\}$。映射 $n\mapsto a_n$ 是 $\mathbb{N}$ 到 $T$ 的双射：单射由两两不同保证，满射由 $T$ 的定义保证。故 $T$ 是可数子集。
>
> **选择假设。** 对任意无限集，每一步可选的元素依赖此前的选择。上述递归可用**依赖选择公理**（DC）保证，这在 ZFC 中成立。如果已经给定单射 $\mathbb{N}\to S$，直接取它的像即可。

**结论 2（可数集的无限子集）**

可数集的任意无限子集是可数集。

> **补充证明**
>
> 设 $A$ 可数，按两两不同的序列写成 $A=\{a_n\mid n\in\mathbb{N}\}$；设 $B\subseteq A$ 无限。用“取最小下标”的方式枚举 $B$：
>
> - 令 $n_0=\min\{n\mid a_n\in B\}$；因为 $B$ 非空，这个最小元存在；
> - 已取定 $n_0<n_1<\cdots<n_k$ 后，令 $n_{k+1}=\min\{n>n_k\mid a_n\in B\}$。因为 $B$ 无限，而 $\{0,1,\dots,n_k\}$ 只有有限个下标，故大于 $n_k$ 且落在 $B$ 中的下标一定存在。
>
> 于是 $n_0<n_1<\cdots$，映射 $k\mapsto a_{n_k}$ 是单射。任取 $a_m\in B$。若 $m$ 未被取到，则 $m>n_0$，且递增的自然数序列一定会超过 $m$。于是存在 $k$ 使 $n_k<m<n_{k+1}$，可在第 $k+1$ 步选择的下标 $m$ 比所取的 $n_{k+1}$ 更小，矛盾。因此映射也是满射，$B$ 可数。
>
> **选择假设。** 每一步取的是非空下标集合的最小元，由 $\mathbb{N}$ 的良序性唯一确定，不需要选择公理。
>
> **条件核对。** “$B$ 无限”不能去掉：若 $B$ 有限，则 $|B|$ 是某个自然数，按课程定义它不是可数集。若采用“有限也算可数”的约定，本条应改述为“可数集的任意子集至多可数”。

**结论 3（可数个可数集的并）**

设 $I$ 可数，$\{A_i\}_{i\in I}$ 中每个 $A_i$ 都可数，则并集

$$
U=\bigcup_{i\in I}A_i
$$

是可数集。

> **补充证明**
>
> **第一步：把索引集排成序列。** 因为 $I$ 可数，存在双射 $\mathbb{N}\to I$，必要时重新编号，以下不妨设 $I=\mathbb{N}$，家族为 $\{A_n\mid n\in\mathbb{N}\}$。
>
> **第二步：为每个 $A_n$ 选一个枚举。** 每个 $A_n$ 可数，故存在双射 $\mathbb{N}\to A_n$。把第 $n$ 个枚举写成
>
> $$
> A_n=\{a_{n,0},a_{n,1},a_{n,2},\dots\},
> $$
>
> 其中 $j\mapsto a_{n,j}$ 是双射。这里要同时从可数多个非空集合（每个 $A_n$ 的全体枚举构成的集合）中各选一个枚举，需要**可数选择公理**（$\mathrm{AC}_\omega$）。如果题目已经给出每个 $A_n$ 的枚举，或索引集 $I$ 有限，则这一步不需要选择公理，有限次选择在 ZF 中可用。
>
> **第三步：对角线枚举 $\mathbb{N}\times\mathbb{N}$。** 按下标和 $n+j$ 分组：
>
> $$
> (0,0);\quad (0,1),(1,0);\quad (0,2),(1,1),(2,0);\quad \dots
> $$
>
> 第 $s$ 组列出所有满足 $n+j=s$ 的有序对，组内按 $n=0,1,\dots,s$ 排列。每个有序对 $(n,j)$ 恰好在第 $n+j$ 组出现一次，所以这是 $\mathbb{N}\times\mathbb{N}$ 的一个无重复枚举。
>
> **第四步：得到到 $U$ 的满射。** 定义
>
> $$
> \Phi:\mathbb{N}\times\mathbb{N}\to U,\qquad \Phi(n,j)=a_{n,j}.
> $$
>
> 任取 $x\in U$，存在 $n$ 使 $x\in A_n$；而 $j\mapsto a_{n,j}$ 满射，故存在 $j$ 使 $a_{n,j}=x$。所以 $\Phi$ 是满射。把 $\Phi$ 与第三步的枚举复合，得到满射 $\psi:\mathbb{N}\to U$。
>
> **第五步：去重。** 满射可能把不同下标送到同一个元素，不能直接当作枚举。按下面的方式筛出不同值：
>
> - 令 $b_0=\psi(0)$；
> - 已取定两两不同的 $b_0,\dots,b_{k-1}$ 后，令
>
> $$
> m_k=\min\{m\mid \psi(m)\notin\{b_0,\dots,b_{k-1}\}\},
> $$
>
> 并令 $b_k=\psi(m_k)$。
>
> 因为 $U$ 无限（每个 $A_n$ 都无限，故并集无限），未列出的值总存在，所以 $m_k$ 有定义；又 $b_k$ 按“未列出”选取，故与前面的 $b$ 不同。这个筛选过程按下标从小到大进行：由于每一步取的是“尚未列出的值”中下标最小的，$m_k$ 严格递增。任取 $x\in U$，设 $x=\psi(m)$。只要 $x$ 还没被列出，下标 $m$ 就属于候选集，故下一步的 $m_k\le m$；而 $m_k$ 严格递增，这样的步骤最多持续 $m+1$ 步，之后必然把 $x$ 列出（否则 $m$ 仍是候选下标，$m_k$ 不可能超过 $m$）。于是 $U=\{b_k\mid k\in\mathbb{N}\}$ 是两两不同的无穷序列，$U$ 可数。
>
> **条件核对。** 对有限个集合，只需枚举有限行的数对，也无需 $\mathrm{AC}_\omega$。若家族中的集合都允许有限，应用同样的枚举与去重可得「并集至多可数」，只要其中有一个无限集，并集就是可数无限的。

**结论 4（开区间 $(0,1)$ 不可数）**

开区间 $(0,1)$ 不可数。

> **补充证明**（对角线构造）
>
> 反设 $(0,1)$ 可数，写成枚举 $(0,1)=\{x_1,x_2,\dots\}$。将每个 $x_n$ 写成小数 $0.d_{n1}d_{n2}\cdots$，统一选取末尾不全为 $9$ 的表示。例如 $0.5000\cdots$ 与 $0.4999\cdots$ 相等，选取前者。
>
> 构造 $y=0.e_1e_2\cdots$，令它的第 $n$ 位与 $x_n$ 的第 $n$ 位不同：
>
> $$
> e_n=\begin{cases}
> 2,& d_{nn}=1,\\
> 1,& d_{nn}\ne 1.
> \end{cases}
> $$
>
> $y$ 的每位都是 $1$ 或 $2$，故 $0<y\le 0.222\cdots=2/9<1$。它的小数表示同样没有全为 $9$ 的尾巴，所以 $e_n\ne d_{nn}$ 确实给出 $y\ne x_n$，而非同一个数的两种写法。于是 $y$ 属于 $(0,1)$ 却不在枚举里，与假设矛盾。

**结论 5（实数集 $\mathbb{R}$ 不可数）**

实数集 $\mathbb{R}$ 不可数。

> **补充证明**（由子集推出）
>
> $(0,1)$ 是 $\mathbb{R}$ 的无限子集。若 $\mathbb{R}$ 可数，由结论 2 可得 $(0,1)$ 可数，与结论 4 矛盾。因此 $\mathbb{R}$ 不可数。

**结论 6（幂集严格更大）**

设 $M$ 为集合，$P(M)$ 为其幂集，则

$$
|M|<|P(M)|.
$$

> **补充证明**
>
> **第一步：给出单射。** 定义
>
> $$
> f:M\to P(M),\qquad f(x)=\{x\}.
> $$
>
> 若 $x\neq y$，则 $\{x\}\neq\{y\}$，故 $f$ 是单射。由定义得 $|M|\le|P(M)|$。
>
> **第二步：反证不存在满射。** 反设存在满射
>
> $$
> g:M\to P(M).
> $$
>
> 定义对角线集合
>
> $$
> D=\{x\in M\mid x\notin g(x)\}.
> $$
>
> 因为 $D\subseteq M$，所以 $D\in P(M)$。由 $g$ 满射，存在 $d\in M$ 使 $g(d)=D$。现在考察 $d$ 是否属于 $D$：
>
> $$
> d\in D\iff d\notin g(d)\iff d\notin D,
> $$
>
> 矛盾。故不存在满射 $M\to P(M)$。
>
> **第三步：合起来。** 已有单射，故 $|M|\le|P(M)|$；又不存在满射，当然不存在双射，故 $|M|\neq|P(M)|$。按严格不等式的定义，$|M|<|P(M)|$。
>
> **条件核对。** 证明对 $M=\varnothing$ 也成立：此时 $P(M)=\{\varnothing\}$，单射 $\varnothing\to\{\varnothing\}$ 存在；而任何映射 $\varnothing\to\{\varnothing\}$ 都不可能是满射，因为 $\varnothing$ 中没有元素可以映到 $\varnothing$。对角集 $D=\varnothing$ 的论证在“假设存在满射”的前提下同样会导出矛盾（只是这个前提本身对空集不可能成立）。本结论不需要选择公理。

**六条结论的条件与假设一览**

| 结论 | 关键条件 | 选择假设 | 证明工具 |
| --- | --- | --- | --- |
| 1 无限集含可数子集 | $S$ 无限（非有限） | DC（依赖选择） | 递归选取 |
| 2 可数集的无限子集 | 子集无限 | 无 | $\mathbb{N}$ 良序，取最小下标 |
| 3 可数个可数集的并 | 可数多个、每个可数 | $\mathrm{AC}_\omega$（可数选择） | 对角线枚举 + 去重 |
| 4 $(0,1)$ 不可数 | 开区间；十进制表示 | 无 | 对角线 + 排除尾随 9 |
| 5 $\mathbb{R}$ 不可数 | $(0,1)\subseteq\mathbb{R}$ | 无（用 2、4） | 子集反证 |
| 6 $\lvert M\rvert<\lvert P(M)\rvert$ | 无 | 无 | 单射 $x\mapsto\{x\}$ + 反证无满射 |

最后再说明约定差异：若把有限集也算作“可数”，则结论 2 应改成“任意子集至多可数”，结论 3 应改成“并集至多可数”；本课程按“可数 = 与 $\mathbb{N}$ 等势”，所以正文保留“可数”的强表述。第 6 条同时说明“没有最大的基数”：对任何集合 $M$，幂集总比 $M$ 严格更大，即使 $M$ 是无限集也不例外。

## 课堂小结

本章的主线是“关系是集合的子集”这一句话的层层展开：

- **定义链**：有序对 → 笛卡儿积 → 二元关系（$A\times B$ 的子集）→ $n$ 元关系。关系是集合，因此并、交、差、补都照集合运算进行；补运算要先明确全集 $A\times B$。
- **两种表示**：关系图（有向边，自反表现为环）与关系矩阵（布尔矩阵）。两者都是“把有序对可视化”，矩阵尤其适合做复合与闭包的计算。
- **三种特有运算**：逆（矩阵转置，边反向）、复合（先 $R$ 后 $S$ 记作 $S\circ R$，矩阵用布尔积）、幂（$R^0=I_A$）。复合不交换、但可结合；对并可分配，对交只能得到包含式。
- **五条性质**：自反、反自反、对称、反对称、传递。最实用的判据是定理 4.4.1 的五个等价刻画：$I_A\subseteq R$、$R\cap I_A=\varnothing$、$R=R^{-1}$、$R\cap R^{-1}\subseteq I_A$、$R\circ R\subseteq R$。
- **闭包**：$r(R)=R\cup I_A$，$s(R)=R\cup R^{-1}$，$t(R)=\bigcup_{i\ge1}R^i$（有限集只需并到 $R^n$）。闭包的定义含“最小性”，这决定了构造式为何是“恰好补这些”。Warshall 算法把传递闭包的计算从 $n$ 次布尔乘法降到 $n$ 轮 $n^2$ 次更新。
- **两类特殊关系**：等价关系（自反+对称+传递）把集合分成互不相交的等价类，商集就是划分；偏序关系（自反+反对称+传递）用哈斯图刻画层次，由此产生覆盖、全序、极值元、上下界与良序等概念。
- **函数**：是“定义域全覆盖 + 像唯一”的特殊关系；单射、满射、双射分别对应“不撞像”“陪域用尽”“两者兼具”。复合要求 $\operatorname{ran}f\subseteq\operatorname{dom}g$，反函数只在双射时存在。

最容易出错的地方：

1. 把“不是自反”当成“反自反”，或把“不对称”当成“反对称”——这两组概念都不是互补的。
2. 复合顺序写反：$S\circ R$ 是“先 $R$ 后 $S$”，逆关系的公式是 $(S\circ R)^{-1}=R^{-1}\circ S^{-1}$，顺序要颠倒。
3. 闭包公式漏掉“最小性”，或把 $t(R)$ 只算到 $R^2$；有限集要并到 $R^n$ 才闭合。
4. 以为“两个传递关系的并仍传递”“两个反对称关系的并仍反对称”——这两种性质对并运算都不保持。
5. 商集 $A/R$ 的元素是等价类（集合），不是原集合的元素；$[x]=[y]$ 与 $x=y$ 是两件事。
6. 覆盖与划分只差“块是否互不相交”，含空块的簇两者都不是。
7. 极大元与最大元混用：最大元要求与全体可比，极大元只要求“没有更大的”；上界允许不属于 $B$，最大元必须属于 $B$。
8. 判断全序前先确认是偏序；$<$ 因缺自反性直接出局。良序比全序更强，$(\mathbb{R},\le)$ 是全序却不是良序。
9. 函数与一般关系的差别就在“定义域是否全覆盖、像是否唯一”，$f=\{(x_1,y_1),(x_2,y_2),(x_2,y_1)\}$ 这类“一对多”不是函数。
10. 复合函数存在的前提是 $\operatorname{ran}f\subseteq\operatorname{dom}g$，否则 $g\circ f$ 无定义。
11. 写字典序时用非严格序比较第一坐标（$x_1\preceq_1x_2$）：同一第一坐标下的两个有序对会互相比“小”，反对称性立刻失效；第一坐标必须用严格序 $\prec_1$。
