---
slug: "02-predicate-logic"
title: "谓词逻辑"
summary: "谓词、量词、公式解释、等值演算、前束范式与谓词推理。"
updatedAt: "2026-11-17"
content_type: "reference"
group: "course"
displayNumber: "02"
tags: ["离散数学"]
sources:
  - kind: article
    title: "第2章谓词逻辑.pdf"
    url: "https://drive.google.com/file/d/1SpvzWRCqaCTPda-sp141bEazV5wVyQuD/view?usp=drivesdk"
---

命题逻辑把简单命题当作不可再分的整体，因此无法刻画命题内部的个体、性质和数量关系。“所有人都是会死的，苏格拉底是人，所以苏格拉底会死”这个推理，若只把它符号化为 $p\land q\to r$，并不是重言式；命题逻辑看不出“所有人”与“苏格拉底”之间的联系。

谓词逻辑把命题进一步分析为个体词、谓词和量词，从而能够表达“所有”“存在”这类数量关系。

## 2.1 谓词逻辑的基本概念

### 2.1.1 个体词和谓词

**定义2.1.1（个体词与谓词）**

个体词是指可以独立存在的客体，可以是一个具体的事物或抽象的概念，是原子命题所描述的对象。

谓词是用来说明个体的性质或个体间关系的词。

例如“小王是个大学生”中，“小王”是个体词，“是个大学生”是谓词；“3 大于 2”中，“3”“2”是个体词，“大于”是谓词。

形如“$b$ 是 $A$”的命题可表示为 $A(b)$；表示多个个体间关系的命题可表示为 $B(a,b)$ 或 $P(a,b,c)$。

**定义2.1.2（谓词的元数）**

和一个个体相联系的谓词称为一元谓词，和两个个体相联系的谓词称为二元谓词，和 $n$ 个个体相联系的谓词称为 $n$ 元谓词。

**个体常元**表示具体的或特定的个体，如 $a,b,c,\dots$；**个体变元**表示抽象的或泛指的个体，如 $x,y,z,\dots$。

**谓词常项**表示具体性质或关系，例如 $R(a)$ 表示“$a$ 是人”；**谓词变项**表示抽象或泛指的谓词，例如 $P(a)$ 表示“$a$ 具有性质 $P$”。

**定义2.1.3（谓词表达式与命题函数）**

一个原子命题可以用一个谓词常项 $P$ 和几个个体常元 $a,b,c,\dots$ 表示成 $P(a,b,c,\dots)$ 的形式，称 $P(a,b,c,\dots)$ 为原子命题或命题的谓词表达式。

一个谓词常项 $P$ 和几个个体变元 $x,y,z,\dots$ 表示成 $P(x,y,z,\dots)$ 的形式，称为命题函数，其中的个体变元可以代表任意一个个体。

命题的谓词表达式是有真值的；命题函数的真值不确定。

**例** 写出下列命题的谓词表达式。

1. 小王和小李是大学生。
2. 北京是中国的首都。
3. 如果你来，他就走。
4. 如果 $3>2$，$2>1$，则 $3>1$。
5. 武汉位于北京和广州之间。

**解**

1. 设 $A(x)$：$x$ 是大学生，$a$：小王，$b$：小李，则 $A(a)\land A(b)$。
2. 设 $F(x,y)$：$x$ 是 $y$ 的首都，$a$：北京，$b$：中国，则 $F(a,b)$。
3. 设 $P(x)$：$x$ 来，$Q(x)$：$x$ 走，$a$：你，$b$：他，则 $P(a)\to Q(b)$。
4. 设 $B(x,y)$：$x>y$，$a$：3，$b$：2，$c$：1，则 $B(a,b)\land B(b,c)\to B(a,c)$。
5. 设 $Q(x,y,z)$：$y$ 位于 $x$ 和 $z$ 之间，$a$：北京，$b$：广州，$c$：武汉，则 $Q(a,c,b)$。

**定义2.1.4（个体域）**

命题函数中，个体变元的取值范围称为个体域或论述域。个体域可以是有限的，也可以是无限的。

把宇宙中一切事物作为对象的集合称为全总个体域。通常，没有特别说明时，个体变元的论述域是指全总个体域。

例如 $A(x)$ 表示“$x$ 是大学生”：

- 若个体域是华工计科 1 班学生，则 $A(x)$ 是永真式；
- 若个体域是华工附中 1 班学生，则 $A(x)$ 是永假式；
- 若个体域是某公司员工，其中有的是大学生、有的不是，则对有些人 $A(x)$ 为真，对有些人为假。

**例** 给出执行语句 `If P(x) then x:=1` 以后 $x$ 的值，其中 $P(x)$ 为语句“$x>1$”，且执行到该语句时 $x$ 的值分别为：

1. $x=0$；
2. $x=1$；
3. $x=2$。

**解**

1. $P(0)$ 即“$0>1$”，真值为 0，不执行赋值语句，所以 $x=0$。
2. $P(1)$ 即“$1>1$”，真值为 0，不执行赋值语句，所以 $x=1$。
3. $P(2)$ 即“$2>1$”，真值为 1，执行赋值语句，所以 $x=1$。

### 2.1.2 量词

**定义2.1.5（量词）**

表示个体常元或个体变元之间数量关系的词称为量词。量词有两种：

- **全称量词** $\forall$：$\forall x$ 表示个体域中“所有的 $x$”“每一个 $x$”“一切 $x$”等；
- **存在量词** $\exists$：$\exists x$ 表示个体域中“存在这样的 $x$”“某个 $x$”“至少有一个 $x$”或“有一些 $x$”等。

$\forall xF(x)$ 表示个体域中所有个体都有性质 $F$；$\exists xF(x)$ 表示个体域中存在个体有性质 $F$。

**例** 设 $F(x)$ 表示 $x$ 选修离散数学，$x$ 的个体域是这个班的同学，将下列命题符号化：

1. 这个班的所有学生都选修离散数学；
2. 这个班有些学生选修离散数学。

**解** 当个体域是这个班的同学时：

1. $\forall xF(x)$；
2. $\exists xF(x)$。

若个体域是全总个体域，则要引入一个新的谓词表示个体的取值范围，称为特性谓词。设 $S(x)$：$x$ 是这个班的同学，则：

1. $\forall x(S(x)\to F(x))$；
2. $\exists x(S(x)\land F(x))$。

使用全称量词时，特性谓词和表示个体性质的谓词构成条件关系式；使用存在量词时，特性谓词和表示个体性质的谓词构成合取关系式。这一点是符号化中最容易出错的地方：$\forall x(S(x)\land F(x))$ 表示“所有人都是这个班的学生且都选修离散数学”，与原意不符；$\exists x(S(x)\to F(x))$ 在存在非本班学生时也可能为真，同样不符合“这个班有些学生”的意思。

**例** 在个体域分别为（a）自然数集合、（b）实数集合时，将下列命题符号化，并给出真值：

1. 对于任意的 $x$，均有 $x^2-3x+2=(x-1)(x-2)$；
2. 存在 $x$，使得 $x+5=2$。

**解** 设 $F(x)$：$x^2-3x+2=(x-1)(x-2)$，$G(x)$：$x+5=2$。

（a）个体域为自然数集合：

1. $\forall xF(x)$，真值为 1；
2. $\exists xG(x)$，真值为 0，因为自然数中没有 $x=-3$。

（b）个体域为实数集合：

1. $\forall xF(x)$，真值为 1；
2. $\exists xG(x)$，真值为 1，取 $x=-3$。

**例** 用谓词逻辑将下列命题符号化。

1. 所有的偶数均能被 2 整除。
2. 这个班有些学生有电脑。
3. 没有不犯错误的人。
4. 尽管有人聪明，但未必一切人都聪明。
5. 有些人喜欢某些体育运动。
6. 并非所有的工作都可以由一些机器人来完成。

**解**

1. 设 $A(x)$：$x$ 是偶数，$B(x)$：$x$ 能被 2 整除，则 $\forall x(A(x)\to B(x))$。
2. 设 $A(x)$：$x$ 是这个班的学生，$B(x)$：$x$ 有电脑，则 $\exists x(A(x)\land B(x))$。
3. 设 $A(x)$：$x$ 是人，$B(x)$：$x$ 犯错误。“没有不犯错误的人”即不存在“是人并且不犯错误”的个体：

   $$
   \neg\exists x(A(x)\land\neg B(x)).
   $$

   它等价于 $\forall x(A(x)\to B(x))$。

4. 设 $A(x)$：$x$ 是人，$B(x)$：$x$ 聪明，则

   $$
   \exists x(A(x)\land B(x))\land\neg\forall x(A(x)\to B(x)).
   $$

5. 设 $A(x)$：$x$ 是人，$B(y)$：$y$ 是体育运动，$C(x,y)$：$x$ 喜欢 $y$，则

   $$
   \exists x(A(x)\land\exists y(B(y)\land C(x,y))).
   $$

6. 设 $A(x)$：$x$ 是工作，$B(x,y)$：$x$ 可以由 $y$ 来完成，$R(x)$：$x$ 是机器人，则

   $$
   \neg\forall x(A(x)\to\exists y(R(y)\land B(x,y))).
   $$

当论述域中的元素个数有限时，例如论述域为 $n$ 个元素的集合 $\{a_1,a_2,\dots,a_n\}$，有
$$
\forall xA(x)\Leftrightarrow A(a_1)\land A(a_2)\land\cdots\land A(a_n),
$$
$$
\exists xA(x)\Leftrightarrow A(a_1)\lor A(a_2)\lor\cdots\lor A(a_n).
$$

**例** 若 $P(x)$ 是语句“$x^2>10$”，论述域为不超过 4 的正整数，$\forall xP(x)$ 和 $\exists xP(x)$ 的真值是什么？

**解** 论述域为 $\{1,2,3,4\}$，所以
$$
\forall xP(x)\Leftrightarrow P(1)\land P(2)\land P(3)\land P(4).
$$
$P(1)$ 即“$1^2>10$”，为假，所以 $\forall xP(x)$ 为假。

又
$$
\exists xP(x)\Leftrightarrow P(1)\lor P(2)\lor P(3)\lor P(4).
$$
$P(4)$ 即“$4^2>10$”，为真，所以 $\exists xP(x)$ 为真。

**例** 设 $P(x,y)$ 表示“$x+y>10$”，论述域为实数，$\forall x\exists yP(x,y)$ 和 $\exists y\forall xP(x,y)$ 的真值是什么？

**解** $\forall x\exists yP(x,y)$ 表示“对每一个实数 $x$，都存在实数 $y$，使得 $x+y>10$”。对任意 $x$，取 $y=11-x$ 即可，真值为 1。

$\exists y\forall xP(x,y)$ 表示“存在实数 $y$，对每一个实数 $x$，都有 $x+y>10$”。无论固定怎样的 $y$，取 $x$ 足够小都会使 $x+y\le10$，所以真值为 0。

多个量词同时出现时，除非所有量词都是全称量词或都是存在量词，否则不能随意颠倒量词的顺序；颠倒后会改变原命题的含义。

## 2.2 谓词合式公式

一个谓词 $P$ 和 $n$ 个个体变元 $x_1,x_2,\dots,x_n$ 表示成 $P(x_1,x_2,\dots,x_n)$ 的形式，称为 $n$ 元原子谓词公式，简称 $n$ 元谓词公式。如果谓词公式中没有个体变元，即 $n=0$，称为 $0$ 元谓词公式；$0$ 元谓词公式就是原子命题。

**定义2.2.1（谓词演算公式）**

谓词演算的合式公式，简称谓词演算公式，按如下规则生成：

1. 每一个原子谓词公式都是谓词演算公式；
2. 如果 $A$ 是谓词公式，则 $(\neg A)$ 是谓词公式；
3. 如果 $A$ 和 $B$ 都是谓词公式，则 $(A\land B)$、$(A\lor B)$、$(A\to B)$、$(A\leftrightarrow B)$ 都是谓词公式；
4. 如果 $A$ 是谓词公式，$x$ 是其中的任一变元，则 $\forall xA$ 和 $\exists xA$ 都是谓词公式；
5. 当且仅当有限次地应用上述步骤得到的符号串才是谓词公式。

**定义2.2.2（辖域、约束变元与自由变元）**

在谓词公式 $\forall xA$ 和 $\exists xA$ 中，出现在量词 $\forall$ 和 $\exists$ 后面的变元 $x$ 称为量词的指导变元。每个量词后面的最小的谓词子公式称为该量词的辖域。

在量词的辖域中，$x$ 的所有出现都称为约束出现，约束出现的变元称为约束变元。除约束变元以外的其他变元的出现称为自由出现，自由出现的变元称为自由变元。

**例** 说明下列谓词公式中各量词的辖域及变元的约束情况。

1. $\forall x(P(x)\land Q(x))$；
2. $\forall x(P(x)\to\exists yQ(x,y))$；
3. $\forall x\forall y(P(x,y)\land Q(y,z))\land\exists xR(x,y)$。

**解**

1. $\forall x$ 的辖域是 $P(x)\land Q(x)$，$x$ 为约束变元。
2. $\forall x$ 的辖域是 $P(x)\to\exists yQ(x,y)$，$\exists y$ 的辖域是 $Q(x,y)$，$x,y$ 均为约束变元。
3. $\forall x$ 的辖域是 $\forall y(P(x,y)\land Q(y,z))$，$\forall y$ 的辖域是 $P(x,y)\land Q(y,z)$，$\exists x$ 的辖域是 $R(x,y)$。在 $\forall x\forall y(P(x,y)\land Q(y,z))$ 中，$x,y$ 为约束变元，$z$ 为自由变元；在 $\exists xR(x,y)$ 中，$x$ 为约束变元，$y$ 为自由变元。

对谓词公式中约束出现的变元更改符号名称，称为约束变元换名。换名规则是：将量词中的指导变元以及该量词辖域中该变元的所有出现，更改为辖域中没有出现的变元名称，公式的其余部分不变。

对谓词公式中自由出现的变元更改符号名称，称为自由变元代入。代入规则是：对某自由出现的个体变元的每一处都代入与原公式中所有变元的名称都不相同的变元。

**例** 对下列谓词公式中的变元更名，使每一变元只呈现一种出现形式。

1. $\forall x(P(x)\to Q(x,y))\land R(x,y)$；
2. $\forall x(P(x,y)\land Q(y,z))\land\exists xR(x,y)\land\forall yS(y)$。

**解**

（1）利用约束变元换名规则，把 $\forall x(P(x)\to Q(x,y))$ 中的约束变元 $x$ 换成 $z$，得
$$
\forall z(P(z)\to Q(z,y))\land R(x,y).
$$
或者利用自由变元代入规则，把 $R(x,y)$ 中的自由变元 $x$ 用 $z$ 代入，得
$$
\forall x(P(x)\to Q(x,y))\land R(z,y).
$$

（2）把 $\exists xR(x,y)$ 中的约束变元 $x$ 换成 $u$；再把自由出现的三处 $y$（前件中的两处和 $R(x,y)$ 中的一处）用 $t$ 代入，得
$$
\forall x(P(x,t)\land Q(t,z))\land\exists uR(u,t)\land\forall yS(y).
$$

**定义2.2.3（闭式）**

任一谓词公式 $A$，若 $A$ 中没有自由出现的个体变元，称 $A$ 是封闭的谓词公式，简称闭式。

**例** 判断下列谓词公式是否是闭式：

1. $\forall x(P(x)\to Q(x))$；
2. $\forall x\exists y(P(x,y)\land Q(y,z))\land\forall yS(y)$。

**解**

1. 是闭式，因为无自由出现的变元。
2. 不是闭式，有自由出现的变元 $z$。

## 2.3 谓词公式的解释和分类

### 2.3.1 谓词公式的解释

**定义2.3.1（解释）**

谓词逻辑中公式 $A$ 的一个解释（或赋值）$I$ 由如下四部分组成：

1. 非空的个体域集合 $D$；
2. 对 $A$ 中的每个常元符号，指定 $D$ 中的某个特定元素；
3. 对 $A$ 中的每个 $n$ 元函数符号，指定 $D^n$ 到 $D$ 的某个特定函数；
4. 对 $A$ 中的每个 $n$ 元谓词符号，指定 $D^n$ 到 $\{0,1\}$ 的某个特定谓词。

**例** 给定解释 $I$ 如下：

- 个体域为自然数集合 $\mathbb{N}$；
- $a=0$；
- $\mathbb{N}$ 中特定的函数 $f(x,y)=x+y$，$g(x,y)=xy$；
- $\mathbb{N}$ 中特定的谓词 $F(x,y)$：$x=y$。

在解释 $I$ 下，求下列公式的真值：

1. $\forall xF(g(x,y),z)$；
2. $\forall xF(g(x,a),x)\to F(x,y)$；
3. $\forall x\forall y\exists zF(f(x,y),z)$。

**解**

（1）$\forall xF(g(x,y),z)\Leftrightarrow\forall x(xy=z)$。式中 $y,z$ 是自由变元，公式不是命题，真值不确定。

（2）$\forall xF(g(x,a),x)\to F(x,y)\Leftrightarrow\forall x(x\cdot0=x)\to(x=y)$，即 $\forall x(0=x)\to(x=y)$。前件 $\forall x(0=x)$ 为假（取 $x=1$ 即不成立），所以整个蕴涵式为真，真值为 1。注意后件中的 $x$ 是自由变元，前面 $\forall x$ 的辖域只到 $F(g(x,a),x)$ 为止。

> **待确认**：严格按辖域，此式在解释 $I$ 下仍含自由变元 $x,y$，因此它不是命题。把它作为“非闭式也可能变成命题”的例子并不妥当；但无论怎样给自由变元赋值，前件都为假，所以蕴涵式恒真，真值为 1 的结论不受影响。

（3）$\forall x\forall y\exists zF(f(x,y),z)\Leftrightarrow\forall x\forall y\exists z(x+y=z)$。对任意自然数 $x,y$，取 $z=x+y$ 即可，真值为 1。

**定理2.3.1**

封闭的谓词公式在任何解释下都变成命题。

**证明** 略。

开放公式在某些解释下，其真值可能不依赖自由变元的赋值；但这不改变它仍含自由变元的语法事实。上面的公式（2）正是这种情形。这里应区分“在该解释下对所有赋值均为真”和“公式是闭式”；“变成命题”的术语用法待课堂确认，不影响本题真值计算。

### 2.3.2 谓词公式的分类

**定义2.3.2（分类）**

设 $A$ 是一个谓词公式：

- 若 $A$ 在任何解释下的真值恒为真，则称 $A$ 为永真式（或逻辑有效式）；
- 若 $A$ 在任何解释下的真值恒为假，则称 $A$ 为永假式（或矛盾式）；
- 若至少存在一个解释使 $A$ 的真值为真，则称 $A$ 为可满足式。

**例** 判定公式 $\exists x\forall yA(x,y)\leftrightarrow\forall y\exists xA(x,y)$ 的类型。

**解** 设个体域为自然数集合，令 $A(x,y)$ 表示 $xy=y$。此时 $\forall y\exists xA(x,y)$ 为真（$y=0$ 时任取 $x$，$y>0$ 时取 $x=1$），$\exists x\forall yA(x,y)$ 也为真（取 $x=1$），所以该等价式在此解释下真值为 1。

再设个体域为自然数集合，$A(x,y)$ 表示 $x>y$。此时 $\forall y\exists xA(x,y)$ 为真（对每个 $y$ 取 $x=y+1$），但 $\exists x\forall yA(x,y)$ 为假（不存在比所有自然数都大的自然数）。所以该等价式在此解释下真值为 0。

因此该公式不是永真式，但存在解释使其为真，是可满足式。

**定义2.3.3（代换实例）**

设 $A_0$ 是含命题变元 $p_1,p_2,\dots,p_n$ 的命题公式，$A_1,A_2,\dots,A_n$ 是 $n$ 个谓词公式。用 $A_i$（$1\le i\le n$）处处代替 $A_0$ 中的 $p_i$，所得公式 $A$ 称为 $A_0$ 的代换实例。

例如 $F(x)\to G(y)$、$\forall xF(x)\to\exists xF(x)$ 都是 $p\to q$ 的代换实例。

**定理2.3.2**

命题公式中永真式的代换实例都是永真式，矛盾式的代换实例都是矛盾式。

**证明** 略。

**例** 判断下列公式是永真式还是矛盾式：

1. $\forall xF(x)\to\exists xF(x)$；
2. $\forall xF(x)\to(\exists yG(y)\to\forall xF(x))$；
3. $F(x,y)\land\neg(G(x,y)\to F(x,y))$。

**解**

1. $\forall xF(x)\to\exists xF(x)$ 为永真式。全称量词成立时，个体域非空，必存在个体使 $F$ 成立。
2. 因为 $p\to(q\to p)\Leftrightarrow1$，而该式是 $p\to(q\to p)$ 的代换实例，所以是永真式。
3. 因为
$$
p\land\neg(q\to p)\Leftrightarrow p\land\neg(\neg q\lor p)\Leftrightarrow p\land q\land\neg p\Leftrightarrow0,
$$
而该式是 $p\land\neg(q\to p)$ 的代换实例，所以是矛盾式。

## 2.4 谓词演算的关系式

**定义2.4.1（等价）**

设 $A$ 和 $B$ 是任意两个谓词公式，如果 $A\leftrightarrow B$ 是永真式，则称谓词公式 $A$ 和 $B$ 等价，记为 $A\Leftrightarrow B$。

谓词逻辑的等价式有两类来源：命题逻辑中等价式的代换实例，以及谓词逻辑特有的关于量词的等价式。

### 2.4.1 量词否定转换律

**定理2.4.1（量词否定转换律）**

设 $A(x)$ 是任意谓词公式，则

1. $\neg\forall xA(x)\Leftrightarrow\exists x\neg A(x)$；
2. $\neg\exists xA(x)\Leftrightarrow\forall x\neg A(x)$。

**证明**

（1）$\neg\forall xA(x)$ 为真，当且仅当 $\forall xA(x)$ 为假，当且仅当存在个体 $a$ 使 $A(a)$ 为假，当且仅当存在个体 $a$ 使 $\neg A(a)$ 为真，当且仅当 $\exists x\neg A(x)$ 为真。所以 $\neg\forall xA(x)\Leftrightarrow\exists x\neg A(x)$。

（2）$\neg\exists xA(x)$ 为真，当且仅当 $\exists xA(x)$ 为假，当且仅当对所有个体 $a$ 都有 $A(a)$ 为假，当且仅当对所有个体 $a$ 都有 $\neg A(a)$ 为真，当且仅当 $\forall x\neg A(x)$ 为真。所以 $\neg\exists xA(x)\Leftrightarrow\forall x\neg A(x)$。

### 2.4.2 量词辖域扩张和收缩律

**定理2.4.2**

设 $A(x)$ 是包含 $x$ 为自由变元的公式，$B$ 是不包含 $x$ 的公式，则

| 序号 | 等值式 |
|:---:|:---|
| 1 | $\forall x(A(x)\land B)\Leftrightarrow\forall xA(x)\land B$ |
| 2 | $\forall x(A(x)\lor B)\Leftrightarrow\forall xA(x)\lor B$ |
| 3 | $\exists x(A(x)\land B)\Leftrightarrow\exists xA(x)\land B$ |
| 4 | $\exists x(A(x)\lor B)\Leftrightarrow\exists xA(x)\lor B$ |
| 5 | $\forall xA(x)\to B\Leftrightarrow\exists x(A(x)\to B)$ |
| 6 | $\exists xA(x)\to B\Leftrightarrow\forall x(A(x)\to B)$ |
| 7 | $B\to\forall xA(x)\Leftrightarrow\forall x(B\to A(x))$ |
| 8 | $B\to\exists xA(x)\Leftrightarrow\exists x(B\to A(x))$ |

**证明（5）**
$$
\begin{aligned}
\forall xA(x)\to B
&\Leftrightarrow\neg\forall xA(x)\lor B\\
&\Leftrightarrow\exists x\neg A(x)\lor B\\
&\Leftrightarrow\exists x(\neg A(x)\lor B)\\
&\Leftrightarrow\exists x(A(x)\to B).
\end{aligned}
$$
其中第三步用到 $B$ 不含 $x$，所以可以把 $B$ 放进 $\exists x$ 的辖域。

**证明（6）**
$$
\begin{aligned}
\exists xA(x)\to B
&\Leftrightarrow\neg\exists xA(x)\lor B\\
&\Leftrightarrow\forall x\neg A(x)\lor B\\
&\Leftrightarrow\forall x(\neg A(x)\lor B)\\
&\Leftrightarrow\forall x(A(x)\to B).
\end{aligned}
$$

### 2.4.3 量词分配律

**定理2.4.3（量词分配律）**

设 $A(x),B(x)$ 是包含自由变元 $x$ 的公式，则

1. $\forall xA(x)\land\forall xB(x)\Leftrightarrow\forall x(A(x)\land B(x))$；
2. $\exists xA(x)\lor\exists xB(x)\Leftrightarrow\exists x(A(x)\lor B(x))$。

**证明（1）** 设 $I$ 为任意解释。

若 $\forall xA(x)\land\forall xB(x)$ 在 $I$ 下为真，则 $\forall xA(x)$ 和 $\forall xB(x)$ 都为真，于是对任意个体 $a$ 都有 $A(a)\land B(a)$ 为真，所以 $\forall x(A(x)\land B(x))$ 为真。因此
$$
\forall xA(x)\land\forall xB(x)\Rightarrow\forall x(A(x)\land B(x)).
$$

反之，若 $\forall x(A(x)\land B(x))$ 在 $I$ 下为真，则对任意个体 $a$ 都有 $A(a)$ 和 $B(a)$ 为真，从而 $\forall xA(x)$ 和 $\forall xB(x)$ 都为真，于是 $\forall xA(x)\land\forall xB(x)$ 为真。因此
$$
\forall x(A(x)\land B(x))\Rightarrow\forall xA(x)\land\forall xB(x).
$$

故两者等价。

**证明（2）** 若 $\exists xA(x)\lor\exists xB(x)$ 为真，则 $\exists xA(x)$ 为真或 $\exists xB(x)$ 为真。若前者为真，存在个体 $a$ 使 $A(a)$ 为真，于是 $A(a)\lor B(a)$ 为真，故 $\exists x(A(x)\lor B(x))$ 为真；后者同理。所以
$$
\exists xA(x)\lor\exists xB(x)\Rightarrow\exists x(A(x)\lor B(x)).
$$

反之，若 $\exists x(A(x)\lor B(x))$ 为真，则存在个体 $c$ 使 $A(c)\lor B(c)$ 为真。若 $A(c)$ 为真，则 $\exists xA(x)$ 为真；若 $B(c)$ 为真，则 $\exists xB(x)$ 为真。无论哪种情况，$\exists xA(x)\lor\exists xB(x)$ 都为真。所以
$$
\exists x(A(x)\lor B(x))\Rightarrow\exists xA(x)\lor\exists xB(x).
$$

故两者等价。

**定理2.4.4**

设 $A(x,y)$ 是包含自由变元 $x,y$ 的二元谓词公式，则

1. $\forall x\forall yA(x,y)\Leftrightarrow\forall y\forall xA(x,y)$；
2. $\exists x\exists yA(x,y)\Leftrightarrow\exists y\exists xA(x,y)$。

**例** 证明下面的等价式成立：

1. $\exists x(A(x)\to B(x))\Leftrightarrow\forall xA(x)\to\exists xB(x)$；
2. $\forall xA(x)\to B(x)\Leftrightarrow\exists y(A(y)\to B(x))$。

**证明（1）**
$$
\begin{aligned}
\exists x(A(x)\to B(x))
&\Leftrightarrow\exists x(\neg A(x)\lor B(x))\\
&\Leftrightarrow\exists x\neg A(x)\lor\exists xB(x)\\
&\Leftrightarrow\neg\forall xA(x)\lor\exists xB(x)\\
&\Leftrightarrow\forall xA(x)\to\exists xB(x).
\end{aligned}
$$

**证明（2）** 注意在 $\forall xA(x)\to B(x)$ 中，$\forall x$ 的辖域只包含 $A(x)$，$B(x)$ 中的 $x$ 是自由的。为了把量词移到前面又不捕获 $B(x)$ 中的 $x$，先把约束变元换名：
$$
\begin{aligned}
\forall xA(x)\to B(x)
&\Leftrightarrow\neg\forall xA(x)\lor B(x)\\
&\Leftrightarrow\exists x\neg A(x)\lor B(x)\\
&\Leftrightarrow\exists y\neg A(y)\lor B(x)\\
&\Leftrightarrow\exists y(\neg A(y)\lor B(x))\\
&\Leftrightarrow\exists y(A(y)\to B(x)).
\end{aligned}
$$
最后一步中 $B(x)$ 不含 $y$，所以可以放进 $\exists y$ 的辖域。

### 2.4.4 谓词逻辑的蕴含式

**定义2.4.2（蕴含）**

设 $A$ 和 $B$ 是任意两个谓词公式，如果 $A\to B$ 是永真式，则称谓词公式 $A$ 蕴含 $B$，记为 $A\Rightarrow B$，称 $A\Rightarrow B$ 为蕴含式。

**定理2.4.5**

设 $A(x),B(x)$ 是包含自由变元 $x$ 的公式，则

1. $\forall xA(x)\lor\forall xB(x)\Rightarrow\forall x(A(x)\lor B(x))$；
2. $\exists x(A(x)\land B(x))\Rightarrow\exists xA(x)\land\exists xB(x)$；
3. $\forall x(A(x)\to B(x))\Rightarrow\forall xA(x)\to\forall xB(x)$；
4. $\exists x(A(x)\to B(x))\Rightarrow\forall xA(x)\to\exists xB(x)$。

**证明（1）** 若 $\forall x(A(x)\lor B(x))$ 为假，则存在个体 $a$ 使 $A(a)\lor B(a)$ 为假，于是 $A(a)$ 和 $B(a)$ 都为假，因而 $\forall xA(x)$ 和 $\forall xB(x)$ 都为假，从而 $\forall xA(x)\lor\forall xB(x)$ 为假。所以
$$
\forall xA(x)\lor\forall xB(x)\Rightarrow\forall x(A(x)\lor B(x)).
$$

**证明（3）** 利用 CP 规则，只需证明
$$
\forall x(A(x)\to B(x))\land\forall xA(x)\Rightarrow\forall xB(x).
$$
由量词分配律，
$$
\begin{aligned}
\forall x(A(x)\to B(x))\land\forall xA(x)
&\Leftrightarrow\forall x((A(x)\to B(x))\land A(x))\\
&\Leftrightarrow\forall x((\neg A(x)\lor B(x))\land A(x))\\
&\Leftrightarrow\forall x(B(x)\land A(x))\\
&\Leftrightarrow\forall xB(x)\land\forall xA(x).
\end{aligned}
$$
于是 $\forall x(A(x)\to B(x))\land\forall xA(x)\Rightarrow\forall xB(x)$，所以
$$
\forall x(A(x)\to B(x))\Rightarrow\forall xA(x)\to\forall xB(x).
$$

**例** 证明下面的蕴含式成立：
$$
\exists xA(x)\to\forall xB(x)\Rightarrow\forall x(A(x)\to B(x)).
$$

**证明**
$$
\begin{aligned}
\exists xA(x)\to\forall xB(x)
&\Leftrightarrow\neg\exists xA(x)\lor\forall xB(x)\\
&\Leftrightarrow\forall x\neg A(x)\lor\forall xB(x)\\
&\Rightarrow\forall x(\neg A(x)\lor B(x))\\
&\Leftrightarrow\forall x(A(x)\to B(x)).
\end{aligned}
$$
其中第三步用到定理2.4.5（1）。

**定理2.4.6**

设 $A(x,y)$ 是包含自由变元 $x,y$ 的二元谓词公式，则

| 序号 | 蕴含式 |
|:---:|:---|
| 1 | $\forall x\forall yA(x,y)\Rightarrow\forall xA(x,x)$ |
| 2 | $\exists xA(x,x)\Rightarrow\exists x\exists yA(x,y)$ |
| 3 | $\forall x\forall yA(x,y)\Rightarrow\exists y\forall xA(x,y)$ |
| 4 | $\forall y\forall xA(x,y)\Rightarrow\exists x\forall yA(x,y)$ |
| 5 | $\exists y\forall xA(x,y)\Rightarrow\forall x\exists yA(x,y)$ |
| 6 | $\forall x\exists yA(x,y)\Rightarrow\exists y\exists xA(x,y)$ |
| 7 | $\exists x\forall yA(x,y)\Rightarrow\forall y\exists xA(x,y)$ |
| 8 | $\forall y\exists xA(x,y)\Rightarrow\exists x\exists yA(x,y)$ |

**证明（1）** 设 $I$ 为任意解释。若 $\forall xA(x,x)$ 在 $I$ 下为假，则存在个体 $a$ 使 $A(a,a)$ 为假。于是 $\forall yA(a,y)$ 为假，因而 $\forall x\forall yA(x,y)$ 为假。所以
$$
\forall x\forall yA(x,y)\Rightarrow\forall xA(x,x).
$$

## 2.5 前束范式

**定义2.5.1（前束范式）**

一个谓词公式 $A$，若具有形式
$$
Q_1x_1Q_2x_2\cdots Q_nx_nM,
$$
其中每个 $Q_i$（$1\le i\le n$）为 $\forall$ 或 $\exists$，$M$ 为不含量词的谓词公式，则称 $A$ 为前束范式。$Q_1x_1Q_2x_2\cdots Q_nx_n$ 称为首标，$M$ 称为母式。

例如 $\forall x\forall y(A(x,y)\to B(x,y))$、$\exists x\forall y(A(x,y,z)\land C(x,y))$ 都是前束范式；而 $\forall xA(x)\to\exists xB(x)$、$\exists xA(x)\lor\exists xB(x,y)$ 都不是前束范式。

**定理2.5.1**

任一谓词公式都存在与之等价的前束范式。

**证明** 设 $A$ 为任意谓词公式，按以下步骤处理：

1. 将公式化成只含 $\neg,\land,\lor$ 三个联结词的形式；
2. 利用 $\neg\neg P\Leftrightarrow P$、德摩根律及量词否定转换律，把公式中的所有 $\neg$ 移到原子公式前面；必要时对约束变元换名；
3. 利用量词辖域收缩及扩张律、量词分配律等，把所有量词提到公式最前面。

每一步变换都保持等价，所以得到的前束范式与原公式等价。

**例** 求 $\forall xA(x)\to\exists xB(x)$ 的前束范式。

**解** 方法一：
$$
\begin{aligned}
\forall xA(x)\to\exists xB(x)
&\Leftrightarrow\neg\forall xA(x)\lor\exists xB(x) &&\text{置换规则}\\
&\Leftrightarrow\exists x\neg A(x)\lor\exists xB(x) &&\text{定理2.4.1}\\
&\Leftrightarrow\exists x(\neg A(x)\lor B(x)) &&\text{定理2.4.3}
\end{aligned}
$$

方法二：
$$
\begin{aligned}
\forall xA(x)\to\exists xB(x)
&\Leftrightarrow\neg\forall xA(x)\lor\exists xB(x) &&\text{置换规则}\\
&\Leftrightarrow\exists x\neg A(x)\lor\exists xB(x) &&\text{定理2.4.1}\\
&\Leftrightarrow\exists x\neg A(x)\lor\exists yB(y) &&\text{换名规则}\\
&\Leftrightarrow\exists x\exists y(\neg A(x)\lor B(y)) &&\text{定理2.4.2}
\end{aligned}
$$

## 2.6 谓词演算的推理

谓词逻辑的推理形式为：若
$$
(A_1\land A_2\land\cdots\land A_n)\to B
$$
是永真式，则称由前提 $A_1,A_2,\dots,A_n$ 可推出结论 $B$，记作
$$
(A_1\land A_2\land\cdots\land A_n)\Rightarrow B.
$$

命题逻辑中使用的等价关系、蕴含关系和推理规则，在谓词逻辑中同样适用；此外还有谓词演算特有的关于量词的规则。

### 2.6.1 量词消去与引入规则

#### 全称量词消去规则（UI）

$$
\forall xA(x)\Rightarrow A(y)\quad\text{或}\quad\forall xA(x)\Rightarrow A(c).
$$

成立条件：

1. $x$ 是 $A(x)$ 中自由出现的个体变元；
2. $y$ 是任意不在 $A(x)$ 中约束出现的个体变元（使用常元 $c$ 时，$c$ 应是任意的个体常元）。

例如，若 $A(x)\Leftrightarrow\exists yF(x,y)$，则 $\forall xA(x)\Leftrightarrow\forall x\exists yF(x,y)$。利用 UI 规则得 $\forall xA(x)\Rightarrow A(y)$，即 $\forall x\exists yF(x,y)\Rightarrow\exists yF(y,y)$。这个蕴含式不成立，原因是使用 UI 时违背了条件 2：$y$ 在 $A(x)$ 中是约束出现的。

#### 存在量词消去规则（EI）

$$
\exists xA(x)\Rightarrow A(c).
$$

这里表示在证明中引入新的见证名 $c$，并非对一个预先指定的常元 $c$ 都有逻辑蕴涵 $\exists xA(x)\to A(c)$。见证名不能带入任何额外假设，也不能在最终结论中保留对该特定见证的依赖。

成立条件：

1. $c$ 是个体域中使 $A$ 成立的特定的个体常元；
2. $c$ 不曾在 $A(x)$ 中出现过；
3. $A(x)$ 中除 $x$ 外还有其他自由出现的个体变元时，不能用此规则。

这里的 $c$ 是使 $A$ 成立的特定个体常元，不要与公式中或推理证明过程中前面步骤的其他常元和变元同名。

例如在实数集上 $F(x,y)$：$x>y$，若 $A(x)\Leftrightarrow F(x,c)$，$c$ 是实数集上的一个常数，则 $\exists xA(x)$ 为真；运用 EI 规则，用 $c$ 取代 $x$，得 $F(c,c)$，这是假命题。原因是违背了条件 2：$c$ 已出现在 $A(x)$ 中。

#### 全称量词引入规则（UG）

$$
A(y)\Rightarrow\forall xA(x).
$$

成立条件：

1. $y$ 是 $A(y)$ 中自由出现的个体变元，$y$ 取个体域中的任何值，$A$ 都为真；
2. 取代 $y$ 的 $x$ 不能在 $A(x)$ 中约束出现。

例如在实数集上 $F(x,y)$：$x>y$，若 $A(y)\Leftrightarrow\exists xF(x,y)$，则对任意的 $y$，$A(y)$ 为真。用 UG 规则，用 $x$ 取代 $y$，得 $\forall x\exists xF(x,x)$，这是假命题。原因是违背了条件 2：$x$ 在 $A(y)$ 中约束出现。

#### 存在量词引入规则（EG）

$$
A(c)\Rightarrow\exists xA(x).
$$

成立条件：

1. $c$ 是特定的个体常元；
2. 取代 $c$ 的 $x$ 不能在 $A(c)$ 中出现过。

例如在实数集上 $F(x,y)$：$x>y$，若 $A(2)\Leftrightarrow\exists xF(x,2)$，则 $A(2)$ 为真。用 EG 规则，用 $x$ 取代 2，得 $\exists xF(x,x)$，这是假命题。原因是违背了条件 2：$x$ 已在 $A(2)$ 中出现。

### 2.6.2 推理问题的证明

**例2.6.1** 证明 $\forall x(P(x)\to\neg Q(x))$ 是
$$
\exists x(P(x)\land Q(x))\to\forall y(R(y)\to S(y)),\qquad \exists y(R(y)\land\neg S(y))
$$
的结论。

**证明**

| 步骤 | 公式 | 理由 |
|:---:|:---|:---|
| 1 | $\exists y(R(y)\land\neg S(y))$ | 前提引入 |
| 2 | $\neg\forall y\neg(R(y)\land\neg S(y))$ | (1) 量词否定转换律 |
| 3 | $\neg\forall y(\neg R(y)\lor S(y))$ | (2) 德摩根律 |
| 4 | $\neg\forall y(R(y)\to S(y))$ | (3) 置换规则 |
| 5 | $\exists x(P(x)\land Q(x))\to\forall y(R(y)\to S(y))$ | 前提引入 |
| 6 | $\neg\exists x(P(x)\land Q(x))$ | (4)，(5) 拒取式 |
| 7 | $\forall x(\neg P(x)\lor\neg Q(x))$ | (6) 量词否定转换律、德摩根律 |
| 8 | $\forall x(P(x)\to\neg Q(x))$ | (7) 置换规则 |

**例2.6.2（苏格拉底三段论）** 证明“所有的人都是要死的。苏格拉底是人。所以苏格拉底是要死的。”

**证明** 设 $M(x)$：$x$ 是人，$P(x)$：$x$ 是要死的，$a$：苏格拉底。前提为 $\forall x(M(x)\to P(x))$、$M(a)$，结论为 $P(a)$。

| 步骤 | 公式 | 理由 |
|:---:|:---|:---|
| 1 | $\forall x(M(x)\to P(x))$ | 前提引入 |
| 2 | $M(a)\to P(a)$ | (1) UI |
| 3 | $M(a)$ | 前提引入 |
| 4 | $P(a)$ | (2)，(3) 假言推理 |

**例2.6.3** 证明“每个大学生都是聪明的，每个勤奋又聪明的大学生在学业中都会取得成功，有些大学生是勤奋的，所以有些大学生在学业中会取得成功”是正确的推理。

**证明** 设 $P(x)$：$x$ 是大学生，$Q(x)$：$x$ 是聪明的，$R(x)$：$x$ 是勤奋的，$S(x)$：$x$ 在学业中会取得成功。前提为
$$
\forall x(P(x)\to Q(x)),\quad \forall x(P(x)\land R(x)\land Q(x)\to S(x)),\quad \exists x(P(x)\land R(x)),
$$
结论为 $\exists x(P(x)\land S(x))$。

| 步骤 | 公式 | 理由 |
|:---:|:---|:---|
| 1 | $\exists x(P(x)\land R(x))$ | 前提引入 |
| 2 | $P(c)\land R(c)$ | (1) EI |
| 3 | $P(c)$ | (2) 化简 |
| 4 | $\forall x(P(x)\to Q(x))$ | 前提引入 |
| 5 | $P(c)\to Q(c)$ | (4) UI |
| 6 | $Q(c)$ | (3)，(5) 假言推理 |
| 7 | $R(c)$ | (2) 化简 |
| 8 | $P(c)\land Q(c)\land R(c)$ | (3)，(6)，(7) 合取 |
| 9 | $\forall x(P(x)\land R(x)\land Q(x)\to S(x))$ | 前提引入 |
| 10 | $P(c)\land Q(c)\land R(c)\to S(c)$ | (9) UI |
| 11 | $S(c)$ | (8)，(10) 假言推理 |
| 12 | $P(c)\land S(c)$ | (3)，(11) 合取 |
| 13 | $\exists x(P(x)\land S(x))$ | (12) EG |

**例2.6.4** 说明下面推理的错误，并指出错误的原因：

1. $\exists xP(x)\land\exists xQ(x)$，前提引入；
2. $\exists xP(x)$，(1) 化简；
3. $P(c)$，(2) EI；
4. $\exists xQ(x)$，(1) 化简；
5. $Q(c)$，(4) EI；
6. $P(c)\land Q(c)$，(3)，(5) 合取；
7. $\exists x(P(x)\land Q(x))$，(6) EG。

**解** 错误在第（5）步。用 EI 规则时又用 $c$ 取代 $x$，而 $c$ 在前面步骤已用于特指使 $P$ 为真的个体，不一定能使 $Q$ 为真。EI 要求每次引入的常元是新的。

正确推理应为：

| 步骤 | 公式 | 理由 |
|:---:|:---|:---|
| 1 | $\exists xP(x)\land\exists xQ(x)$ | 前提引入 |
| 2 | $\exists xP(x)$ | (1) 化简 |
| 3 | $P(c)$ | (2) EI |
| 4 | $\exists xQ(x)$ | (1) 化简 |
| 5 | $Q(d)$ | (4) EI |
| 6 | $P(c)\land Q(d)$ | (3)，(5) 合取 |
| 7 | $\exists x\exists y(P(x)\land Q(y))$ | (6) EG |

注意结论只能是 $\exists x\exists y(P(x)\land Q(y))$，不能写成 $\exists x(P(x)\land Q(x))$。

**例2.6.5** 说明下面推理的错误，并指出错误的原因：

1. $\forall x(P(x)\to Q(x))$，前提引入；
2. $P(c)\to Q(c)$，(1) UI；
3. $\exists xP(x)$，前提引入；
4. $P(c)$，(3) EI；
5. $Q(c)$，(2)，(4) 假言推理；
6. $\exists xQ(x)$，(5) EG。

**解** 错误在第（2）步先使用 UI 引入了常元 $c$，第（4）步使用 EI 时又引入了同一个常元 $c$。EI 要求常元是新的。

正确推理应先使用 EI，再使用 UI：

| 步骤 | 公式 | 理由 |
|:---:|:---|:---|
| 1 | $\exists xP(x)$ | 前提引入 |
| 2 | $P(c)$ | (1) EI |
| 3 | $\forall x(P(x)\to Q(x))$ | 前提引入 |
| 4 | $P(c)\to Q(c)$ | (3) UI |
| 5 | $Q(c)$ | (2)，(4) 假言推理 |
| 6 | $\exists xQ(x)$ | (5) EG |

当前提中同时含有全称量词和存在量词时，一般应先使用 EI 规则，后使用 UI 规则。

**例2.6.6** 下面的推理是否正确？为什么？

1. $\forall x\exists yF(x,y)$，前提引入；
2. $\exists yF(z,y)$，(1) UI；
3. $F(z,b)$，(2) EI；
4. $\forall xF(x,b)$，(3) UG。

**解** 不正确。错在第（3）步：$\exists yF(z,y)$ 中 $z$ 是自由变元，不满足 EI 规则的条件 3，不能使用 EI 规则。

**例2.6.7** 证明 $\forall x(P(x)\to Q(x))\Rightarrow\forall xP(x)\to\exists xQ(x)$。

**证明** 利用 CP 规则，证明
$$
\forall x(P(x)\to Q(x))\land\forall xP(x)\Rightarrow\exists xQ(x).
$$

| 步骤 | 公式 | 理由 |
|:---:|:---|:---|
| 1 | $\forall x(P(x)\to Q(x))$ | 前提引入 |
| 2 | $P(c)\to Q(c)$ | (1) UI |
| 3 | $\forall xP(x)$ | 附加前提 |
| 4 | $P(c)$ | (3) UI |
| 5 | $Q(c)$ | (2)，(4) 假言推理 |
| 6 | $\exists xQ(x)$ | (5) EG |

由 CP 规则，原蕴含式成立。

谓词逻辑是人工智能中重要的知识表示方法，可用于表述各种描述性语句，并可有效地存储到计算机中处理；也可用来建立自动定理证明系统、基于规则的演绎系统等。

## 课堂小结

谓词逻辑把原子命题拆成个体词、谓词和量词，用 $P(x_1,\dots,x_n)$ 表示个体的性质或关系，用 $\forall$、$\exists$ 表示数量关系。符号化的关键是先确定个体域：个体域已经限定为某类对象时可直接写 $\forall xF(x)$、$\exists xF(x)$；个体域为全总个体域时，必须引入特性谓词，全称量词后接条件式 $\forall x(S(x)\to F(x))$，存在量词后接合取式 $\exists x(S(x)\land F(x))$。

公式部分要分清指导变元、辖域、约束出现和自由出现；换名只改约束变元，代入只改自由变元，且新名不能与已有变元冲突。解释由个体域、常元、函数和谓词四部分组成，闭式在任何解释下都成为命题。谓词演算的等值式除命题逻辑等值式的代换实例外，还有量词否定转换律、辖域扩张收缩律、量词分配律和同种量词交换律；蕴含式则要注意哪些方向成立、哪些方向不成立。前束范式通过换名、否定内移和量词前移得到。

推理部分增加了 UI、EI、UG、EG 四条量词规则。它们都带成立条件，尤其是 EI 的常元必须是新的、不能与已有常元相同，UI 替换的变元不能在被替换公式中约束出现；前提中同时有全称和存在量词时，通常先 EI 后 UI。本章最容易出错的地方是：特性谓词与量词的搭配写反；忽略量词辖域；换名时捕获自由变元；混淆 $\forall x\exists y$ 与 $\exists y\forall x$；以及违反 EI/UI 的常元条件。

## 资料来源

- [第2章谓词逻辑.pdf](https://drive.google.com/file/d/1SpvzWRCqaCTPda-sp141bEazV5wVyQuD/view?usp=drivesdk)
