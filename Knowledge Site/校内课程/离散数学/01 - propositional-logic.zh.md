---
slug: "01-propositional-logic"
title: "命题逻辑"
summary: "命题、逻辑联结词、等值演算、范式与命题推理。"
updatedAt: "2026-11-16"
content_type: "reference"
group: "course"
displayNumber: "01"
tags: ["离散数学"]
sources:
  - kind: article
    title: "第1章命题逻辑.pdf"
    url: "https://drive.google.com/file/d/1PA9VNWSvsinD9Tgys9ZmihmtDI7CEkbz/view?usp=drivesdk"
---

数理逻辑用数学符号刻画推理规则，研究推理体系的一致性、可靠性与完备性。命题逻辑是其中最基础的一层：它把简单命题作为不可再分的单位，用联结词把命题组合起来，再通过真值表、等值演算和推理规则判断一个推理是否有效。

## 1.1 命题与联结词

### 1.1.1 命题的概念

**定义（命题）** 命题是用陈述句表示的一个或者为真、或者为假，但不能同时既为真又为假的判断语句。

命题的真值是判断的结果，记为真（T 或 1）或假（F 或 0）。真值为真的命题称为真命题，真值为假的命题称为假命题。

判断一个句子是不是命题，关键看两点：它必须是陈述句；它的真值必须唯一确定。至于这个真值是否已经被人们知道，并不影响它是不是命题。

**例** 判断下列句子哪些是命题；若是命题，指出其真值。

1. 北京是中国的首都。
2. $2+3=6$。
3. $3-x=5$。
4. 请关上门。
5. 几点了？
6. 除地球外的星球有生物。
7. 多漂亮的花啊！
8. 我只给所有不给自己理发的人理发。

**解**

1. 是命题，真值为真。
2. 是命题，真值为假。
3. 不是命题。$x$ 的取值未定，真值不确定。
4. 不是命题，是祈使句。
5. 不是命题，是疑问句。
6. 是命题。真值客观确定，只是目前未知。
7. 不是命题，是感叹句。
8. 不是命题。这是罗素悖论式的自指句，无法一致地赋予真值。

表示命题的符号称为命题变量（命题变元），通常用 $p,q,r,\dots$ 或 $P,Q,R,\dots$ 表示。命题变量本身没有真值；只有用它表示一个确定的命题之后，才有真值。例如用 $p$ 表示“$2+3=6$”，此时 $p$ 的真值为 F；若用 $p$ 表示“$2+3=5$”，则 $p$ 的真值为 T。

不能分解为更简单陈述句的命题称为简单命题（原子命题），例如“北京是中国的首都”。由两个或几个简单命题和连词组合而成的命题称为复合命题，例如“如果明天天气好，我们就去爬山”。用英文字母或英文字母与联结词的组合表示命题，称为命题的符号化。

### 1.1.2 五个基本联结词

#### 否定

**定义1.1.4（否定）** 设 $p$ 是一个命题，$\neg p$ 表示一个新命题“非 $p$”。$\neg p$ 称为 $p$ 的否定。当且仅当 $p$ 的真值为假时，$\neg p$ 的真值为真。

| $p$ | $\neg p$ |
|:---:|:---:|
| T | F |
| F | T |

例如，$p$：今天是晴天，则 $\neg p$：今天不是晴天。“非”“不”“没有”“无”“并非”等通常都可用 $\neg$ 表示。

#### 合取

**定义1.1.5（合取）** 设 $p,q$ 表示任意两个命题，$p\land q$ 表示复合命题“$p$ 并且 $q$”。当且仅当 $p$ 和 $q$ 的真值同时为真时，$p\land q$ 的真值为真。

| $p$ | $q$ | $p\land q$ |
|:---:|:---:|:---:|
| T | T | T |
| T | F | F |
| F | T | F |
| F | F | F |

例如，$p$：今天是晴天，$q$：今天去公园，则 $p\land q$：今天是晴天并且今天去公园。“和”“与”“也”“并且”“既……又……”“不仅……而且……”“虽然……但是……”等通常都可用 $\land$ 表示。

#### 析取

**定义1.1.6（析取）** 设 $p,q$ 表示任意两个命题，$p\lor q$ 表示复合命题“$p$ 或 $q$”。当且仅当 $p$ 和 $q$ 的真值同时为假时，$p\lor q$ 的真值为假。

| $p$ | $q$ | $p\lor q$ |
|:---:|:---:|:---:|
| T | T | T |
| T | F | T |
| F | T | T |
| F | F | F |

例如，$p$：今天去看电影，$q$：今天去公园，则 $p\lor q$：今天去看电影或今天去公园。“或”“可能……可能……”“或者……或者……”等可用 $\lor$ 表示。

自然语言中的“或”有二义性。**兼容或**允许两种情况同时成立，例如“电灯不亮是灯泡或线路有问题所致”；**不兼容或**（排斥或）要求二者恰有一个成立，例如“派小王或小李中的一人去开会”。逻辑联结词 $\lor$ 表示兼容或。排斥或要另行符号化：

设 $p$：派小王去开会，$q$：派小李去开会，则“派小王或小李中的一人去开会”为
$$
(p\land\neg q)\lor(\neg p\land q).
$$

#### 蕴涵

**定义1.1.7（蕴涵）** 设 $p,q$ 表示任意两个命题，$p\to q$ 表示复合命题“如果 $p$，则 $q$”。当且仅当 $p$ 的真值为真、$q$ 的真值为假时，$p\to q$ 的真值为假。

| $p$ | $q$ | $p\to q$ |
|:---:|:---:|:---:|
| T | T | T |
| T | F | F |
| F | T | T |
| F | F | T |

在蕴涵式 $p\to q$ 中，$p$ 称为蕴涵前件，$q$ 称为蕴涵后件。$p$ 是 $q$ 的充分条件，$q$ 是 $p$ 的必要条件。

需要特别注意“仅当”的语序。“$p$ 仅当 $q$”表示 $p\to q$；而“仅当 $p$，才 $q$”表示 $q\to p$。例如设 $p$：天气晴朗，$q$：我们去海滩：

- “如果天气晴朗，我们去海滩”符号化为 $p\to q$；
- “仅当天气晴朗，我们去海滩”符号化为 $q\to p$。

前件为假时，蕴涵式自动为真。这一点常与日常语言直觉不符，但在逻辑中是由真值表规定的：一个假前提下的承诺不算被违背。

#### 等价

**定义1.1.8（等价）** 设 $p,q$ 表示任意两个命题，$p\leftrightarrow q$ 表示复合命题“$p$ 当且仅当 $q$”。当且仅当 $p$ 和 $q$ 的真值同时为真或同时为假时，$p\leftrightarrow q$ 的真值为真。

| $p$ | $q$ | $p\leftrightarrow q$ |
|:---:|:---:|:---:|
| T | T | T |
| T | F | F |
| F | T | F |
| F | F | T |

例如，$p$：两个三角形是全等的，$q$：两个三角形的三条对应边相等，则 $p\leftrightarrow q$ 表示“两个三角形全等当且仅当它们的三条对应边相等”。等值式 $p\leftrightarrow q$ 表示 $p$ 与 $q$ 互为充分必要条件，也可读作“如果 $p$，那么 $q$，反之亦然”。

#### 优先级与综合真值表

五个基本联结词的优先级从高到低为
$$
(\;),\quad \neg,\quad \land,\quad \lor,\quad \to,\quad \leftrightarrow.
$$
括号可以省略时按上述优先级结合。例如 $\neg p\land q$ 表示 $(\neg p)\land q$，而不是 $\neg(p\land q)$。

| $p$ | $q$ | $\neg p$ | $p\land q$ | $p\lor q$ | $p\to q$ | $p\leftrightarrow q$ |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 0 | 0 | 1 | 0 | 0 | 1 | 1 |
| 0 | 1 | 1 | 0 | 1 | 1 | 0 |
| 1 | 0 | 0 | 0 | 1 | 0 | 0 |
| 1 | 1 | 0 | 1 | 1 | 1 | 1 |

**例** 将下列命题符号化。

1. 虽然天气很冷，老王还是来了。
2. 小王和小李是好朋友。
3. 小王和小李是好学生。
4. 小王或小李中的一人是游泳冠军。
5. 只有你学过微积分或是数学系的学生，才可以选修这门课。
6. 如果明天早晨 6 点不下雨，我就去跑步。
7. 今天下雨与 $3+3=6$。
8. 登陆服务器必须输入一个有效的口令。
9. $2+3=5$ 的充要条件是加拿大位于亚洲。

**解**

1. 设 $p$：天气很冷，$q$：老王来了。虽然句中有转折，但前后两件事都成立，符号化为 $p\land q$。
2. “小王和小李是好朋友”虽有“和”，但整体是一个简单命题，不能再拆成两个独立命题，直接用 $p$ 表示。
3. 设 $p$：小王是好学生，$q$：小李是好学生，符号化为 $p\land q$。
4. 设 $p$：小王是游泳冠军，$q$：小李是游泳冠军。“恰有一人”是排斥或，符号化为 $(p\land\neg q)\lor(\neg p\land q)$。
5. 设 $p$：你学过微积分，$q$：你是数学系的学生，$r$：你可以选修这门课。“只有 $p$ 或 $q$，才 $r$”表示 $r\to(p\lor q)$。
6. 设 $p$：明天早晨 6 点下雨，$q$：我去跑步。“不下雨就去跑步”为 $\neg p\to q$；它的逆否命题是 $\neg q\to p$，两者等价。
7. 设 $p$：今天下雨，$q$：$3+3=6$，符号化为 $p\land q$。
8. 设 $p$：登陆服务器，$q$：输入一个有效的口令。“必须”表示 $p\to q$。
9. 设 $p$：$2+3=5$，$q$：加拿大位于亚洲，符号化为 $p\leftrightarrow q$。该命题的真值为假，因为 $p$ 真而 $q$ 假。

**例** 将下列命题符号化，并指出真值。

1. $1+1=2$ 和 $2+3=6$。
2. $1+1=2$ 或猴子是飞禽。
3. 若 $2+3=6$，则猴子是飞禽。
4. 若猴子不是飞禽，则 $1+1=2$ 和 $2+3=6$。
5. 若 $2+3=6$ 或猴子是飞禽，则 $1+1=2$。
6. $2+3=6$ 当且仅当猴子不是飞禽。

**解** 设 $p$：$1+1=2$（真），$q$：$2+3=6$（假），$r$：猴子是飞禽（假）。

1. $p\land q$，真值为 $1\land0=0$。
2. $p\lor r$，真值为 $1\lor0=1$。
3. $q\to r$，真值为 $0\to0=1$。
4. $\neg r\to(p\land q)$，真值为 $1\to(1\land0)=1\to0=0$。注意 $\land$ 的优先级高于 $\to$，所以是 $\neg r\to(p\land q)$。
5. $(q\lor r)\to p$，真值为 $(0\lor0)\to1=0\to1=1$。$\lor$ 的优先级高于 $\to$，所以先算 $q\lor r$。
6. $q\leftrightarrow\neg r$，真值为 $0\leftrightarrow1=0$。

### 1.1.3 其他联结词

**定义1.1.9（与非）** 设 $p,q$ 是任意两个命题，$p\uparrow q$ 表示复合命题“$p$ 和 $q$ 的与非”，$\uparrow$ 称为与非联结词，$p\uparrow q$ 称为 $p$ 和 $q$ 的与非式。当且仅当 $p$ 和 $q$ 的真值同时为真时，$p\uparrow q$ 的真值为假。

| $p$ | $q$ | $p\uparrow q$ |
|:---:|:---:|:---:|
| T | T | F |
| T | F | T |
| F | T | T |
| F | F | T |

**定义1.1.10（或非）** 设 $p,q$ 是任意两个命题，$p\downarrow q$ 表示复合命题“$p$ 和 $q$ 的或非”，$\downarrow$ 称为或非联结词，$p\downarrow q$ 称为 $p$ 和 $q$ 的或非式。当且仅当 $p$ 和 $q$ 的真值同时为假时，$p\downarrow q$ 的真值为真。

| $p$ | $q$ | $p\downarrow q$ |
|:---:|:---:|:---:|
| T | T | F |
| T | F | F |
| F | T | F |
| F | F | T |

**定义1.1.11（异或）** 设 $p,q$ 是任意两个命题，$p\oplus q$ 表示复合命题“$p,q$ 之中恰有一个成立”，$\oplus$ 称为异或（不兼容或）联结词，$p\oplus q$ 称为 $p$ 和 $q$ 的异或式。当且仅当 $p$ 和 $q$ 的真值恰有一个为真时，$p\oplus q$ 的真值为真。

| $p$ | $q$ | $p\oplus q$ |
|:---:|:---:|:---:|
| T | T | F |
| T | F | T |
| F | T | T |
| F | F | F |

八个联结词的真值可并列如下（$T=1,F=0$）：

| $p$ | $q$ | $p\land q$ | $p\uparrow q$ | $p\lor q$ | $p\downarrow q$ | $p\to q$ | $p\leftrightarrow q$ | $p\oplus q$ |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 0 | 0 | 0 | 1 | 0 | 1 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 1 | 0 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 1 | 0 | 0 | 0 | 1 |
| 1 | 1 | 1 | 0 | 1 | 0 | 1 | 1 | 0 |

### 1.1.4 联结词的应用

逻辑联结词可以直接对应数字电路中的门：$\neg$ 用非门实现，$\land$ 用与门实现，$\lor$ 用或门实现。

![非门、与门、或门的电路符号](/images/campus-discrete-mathematics/ch01-logic-gates.png)

例如命题公式 $G\Leftrightarrow(p\lor q)\land\neg p$ 的电路实现如下：$p,q$ 先经过或门得到 $p\lor q$，$p$ 同时经过非门得到 $\neg p$，两路再经过与门得到 $G$。

![公式 $G\Leftrightarrow(p\lor q)\land\neg p$ 的逻辑电路](/images/campus-discrete-mathematics/ch01-formula-circuit.png)

在布尔检索中，AND 用于匹配同时包含两个检索项的记录，OR 用于匹配至少包含一个检索项的记录，NOT 用于排除某个检索项。把自然语言命题翻译成由命题变量和联结词组成的表达式，是进行判断和推理的基础。

**例（咖啡问题）** 三位客人坐在餐馆，服务生问：“每个人都要咖啡吗？”第一位客人回答“我不知道”，第二位客人也回答“我不知道”，第三位客人回答“不是每个人都要咖啡”。服务生如何判断哪位客人需要咖啡？

**解** 设 $p,q,r$ 分别表示第一、二、三位客人要咖啡。若三人全要咖啡，则 $p\land q\land r$ 为真。

第一位客人若不要咖啡，他立刻知道“每个人都要咖啡”为假，就会回答“不是”；既然他说“我不知道”，说明 $p$ 为真。第二位客人已经听到第一位要咖啡；若他不要咖啡，也能立刻判断“不是每个人都要咖啡”，所以他能回答“不是”；既然他也说“我不知道”，说明 $q$ 为真。第三位客人说“不是每个人都要咖啡”，而前两位都要咖啡，因此只能是 $r$ 为假。

所以第一位和第二位客人要咖啡，第三位客人不要咖啡。

## 1.2 命题公式及其分类

**命题常元**代表特定的简单命题；**命题变元**代表任意命题，是取值为 1（真）或 0（假）的变量。

**定义1.2.1（命题公式）** 命题公式按如下规则生成：

1. 每一个命题常元或命题变元都是命题公式。
2. 如果 $A$ 是命题公式，则 $(\neg A)$ 是命题公式。
3. 如果 $A$ 和 $B$ 都是命题公式，则 $(A\land B)$、$(A\lor B)$、$(A\to B)$、$(A\leftrightarrow B)$ 都是命题公式。
4. 一个由命题常元或命题变元、联结词和括号组成的符号串是命题公式，当且仅当它是有限次应用上述步骤得到的。

含有命题变元的命题公式，其真值本身不确定；只有给公式中所有命题变元指定了特定命题之后，公式才成为命题，真值才唯一确定。例如 $p\land q$，若指定 $p$ 为“2 是素数”、$q$ 为“3 是奇数”，则 $p\land q$ 为真；若指定 $q$ 为“3 是偶数”，则 $p\land q$ 为假。

**定义1.2.2（赋值）** 若命题公式 $A$ 含有的全部命题变元为 $p_1,p_2,\dots,p_n$，给它们指定一组真值，称为对 $A$ 的一个解释或赋值。使 $A$ 的真值为真的赋值称为成真赋值，使 $A$ 的真值为假的赋值称为成假赋值。

通常赋值与命题变元按下标或字母顺序对应。给 $A$ 赋值 $\alpha_1\alpha_2\cdots\alpha_n$，是指
$$
p_1=\alpha_1,\ p_2=\alpha_2,\ \dots,\ p_n=\alpha_n.
$$
当 $A$ 的全部命题变元为 $p,q,r,\dots$ 时，赋值 $\alpha_1\alpha_2\alpha_3\cdots$ 是指 $p=\alpha_1,q=\alpha_2,r=\alpha_3,\dots$。

真值表是命题公式在所有可能赋值下取值的列表。含 $n$ 个变元的公式有 $2^n$ 个赋值。

**例** 给出下列公式的真值表：

1. $p\to(q\land\neg r)$；
2. $(p\to q)\lor(\neg p\to q)$；
3. $\neg(\neg p\to q)\land q$。

**解（1）** 先算 $\neg r$，再算 $q\land\neg r$，最后算蕴涵。

| $p$ | $q$ | $r$ | $\neg r$ | $q\land\neg r$ | $p\to(q\land\neg r)$ |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 0 | 0 | 0 | 1 | 0 | 1 |
| 0 | 0 | 1 | 0 | 0 | 1 |
| 0 | 1 | 0 | 1 | 1 | 1 |
| 0 | 1 | 1 | 0 | 0 | 1 |
| 1 | 0 | 0 | 1 | 0 | 0 |
| 1 | 0 | 1 | 0 | 0 | 0 |
| 1 | 1 | 0 | 1 | 1 | 1 |
| 1 | 1 | 1 | 0 | 0 | 0 |

**解（2）**

| $p$ | $q$ | $p\to q$ | $\neg p\to q$ | $(p\to q)\lor(\neg p\to q)$ |
|:---:|:---:|:---:|:---:|:---:|
| 0 | 0 | 1 | 0 | 1 |
| 0 | 1 | 1 | 1 | 1 |
| 1 | 0 | 0 | 1 | 1 |
| 1 | 1 | 1 | 1 | 1 |

**解（3）**

| $p$ | $q$ | $\neg p$ | $\neg p\to q$ | $\neg(\neg p\to q)$ | $\neg(\neg p\to q)\land q$ |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 0 | 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 1 | 0 | 0 |
| 1 | 0 | 0 | 1 | 0 | 0 |
| 1 | 1 | 0 | 1 | 0 | 0 |

$n$ 个命题变元可以产生 $2^{2^n}$ 个不同的真值表，因为每个公式在 $2^n$ 个赋值处各有 2 种取值。

**定义1.2.3（公式的分类）** 设 $A$ 为一个命题公式：

1. 若 $A$ 在各种赋值下取值均为真，则称 $A$ 为重言式或永真式；
2. 若 $A$ 在各种赋值下取值均为假，则称 $A$ 为矛盾式或永假式；
3. 若至少存在一种赋值使 $A$ 的真值为真，则称 $A$ 为可满足式。

在上面的例子中，$p\to(q\land\neg r)$ 是非重言式的可满足式；$(p\to q)\lor(\neg p\to q)$ 是重言式；$\neg(\neg p\to q)\land q$ 是矛盾式。

三类公式之间有下列关系：

- 公式 $A$ 永真，则 $\neg A$ 永假，反之亦然；
- 公式 $A$ 可满足，当且仅当 $\neg A$ 不是永真式；
- 公式 $A$ 不可满足，则 $A$ 一定是永假式；
- 公式 $A$ 不是永假式，则 $A$ 一定是可满足的。

判断命题公式类型的基本方法是构造真值表。

## 1.3 命题演算的关系式

**定义1.3.1（逻辑等价）** 设 $A$ 和 $B$ 是两个命题（或命题公式），若 $A\leftrightarrow B$ 是永真式，则称 $A$ 和 $B$ 逻辑等价，记为 $A\Leftrightarrow B$。

这里 $\leftrightarrow$ 是公式内部的等价联结词，$\Leftrightarrow$ 是两条公式之间的逻辑等价关系；类似地，$\to$ 是蕴涵联结词，$\Rightarrow$ 是前提与结论之间的蕴涵关系。两者不要混用。

$A\leftrightarrow B$ 永真，表示 $A$ 和 $B$ 在所有赋值下都有相同的真值，也就是有相同的真值表。因此可以用真值表判定两个命题是否等价。

**例** 证明 $p\to q$ 和 $\neg p\lor q$ 等价。

**证** 列出真值表：

| $p$ | $q$ | $p\to q$ | $\neg p$ | $\neg p\lor q$ |
|:---:|:---:|:---:|:---:|:---:|
| 0 | 0 | 1 | 1 | 1 |
| 0 | 1 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 | 0 |
| 1 | 1 | 1 | 0 | 1 |

两列完全相同，所以
$$
p\to q\Leftrightarrow\neg p\lor q.
$$
这称为蕴涵等值式。

**例** 证明 $p\land(q\lor r)$ 和 $(p\land q)\lor(p\land r)$ 逻辑等价。

**证** 列出真值表：

| $p$ | $q$ | $r$ | $p\land(q\lor r)$ | $(p\land q)\lor(p\land r)$ |
|:---:|:---:|:---:|:---:|:---:|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 | 0 |
| 0 | 1 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 | 0 |
| 1 | 0 | 0 | 0 | 0 |
| 1 | 0 | 1 | 1 | 1 |
| 1 | 1 | 0 | 1 | 1 |
| 1 | 1 | 1 | 1 | 1 |

两列相同，所以 $p\land(q\lor r)\Leftrightarrow(p\land q)\lor(p\land r)$。这称为分配律。

### 1.3.1 基本等值式

常用的基本等值式如下。

| 名称 | 等值式 |
|:---|:---|
| 双重否定律 | $\neg\neg p\Leftrightarrow p$ |
| 同一律 | $p\lor0\Leftrightarrow p$，$p\land1\Leftrightarrow p$ |
| 零元律 | $p\lor1\Leftrightarrow1$，$p\land0\Leftrightarrow0$ |
| 等幂律 | $p\lor p\Leftrightarrow p$，$p\land p\Leftrightarrow p$ |
| 交换律 | $p\lor q\Leftrightarrow q\lor p$，$p\land q\Leftrightarrow q\land p$ |
| 结合律 | $(p\lor q)\lor r\Leftrightarrow p\lor(q\lor r)$，$(p\land q)\land r\Leftrightarrow p\land(q\land r)$ |
| 德摩根律 | $\neg(p\lor q)\Leftrightarrow\neg p\land\neg q$，$\neg(p\land q)\Leftrightarrow\neg p\lor\neg q$ |
| 吸收律 | $p\lor(p\land q)\Leftrightarrow p$，$p\land(p\lor q)\Leftrightarrow p$ |
| 分配律 | $p\lor(q\land r)\Leftrightarrow(p\lor q)\land(p\lor r)$，$p\land(q\lor r)\Leftrightarrow(p\land q)\lor(p\land r)$ |
| 排中律 | $p\lor\neg p\Leftrightarrow1$ |
| 矛盾律 | $p\land\neg p\Leftrightarrow0$ |
| 蕴涵等值式 | $p\to q\Leftrightarrow\neg p\lor q$ |
| 等价等值式 | $p\leftrightarrow q\Leftrightarrow(p\to q)\land(q\to p)$ |
| 假言易位 | $p\to q\Leftrightarrow\neg q\to\neg p$ |
| 等价否定等值式 | $p\leftrightarrow q\Leftrightarrow\neg p\leftrightarrow\neg q$ |
| 归谬论 | $(p\to q)\land(p\to\neg q)\Leftrightarrow\neg p$ |

**置换规则** 若公式 $G$ 中的一部分 $A$（包含 $G$ 中几个连续的符号）是公式，称 $A$ 为 $G$ 的子公式；用与 $A$ 逻辑等价的公式 $B$ 置换 $A$，不改变 $G$ 的真值。

利用已知等值式，把子公式替换为与它等价的公式，可以推出其他等值式，这一过程称为命题的等价运算。等价运算可用于判断两个命题是否等价、判断公式类型、化简公式等。

**例1.3.3** 证明 $p\to q\Leftrightarrow\neg q\to\neg p$。

**解**

$$
\begin{aligned}
p\to q
&\Leftrightarrow \neg p\lor q &&\text{蕴涵等值式}\\
&\Leftrightarrow \neg(\neg q)\lor\neg p &&\text{交换律和双重否定律}\\
&\Leftrightarrow \neg q\to\neg p &&\text{蕴涵等值式}
\end{aligned}
$$

这里涉及四种命题形式：条件命题 $p\to q$，否命题 $\neg p\to\neg q$，逆命题 $q\to p$，逆否命题 $\neg q\to\neg p$。条件命题与它的逆否命题等价。

### 1.3.2 等价运算的例题

**例1.3.4** 利用命题的等价运算判断下列公式的类型。

（1）$\neg p\land\neg(p\to q)$。

**解**

$$
\begin{aligned}
\neg p\land\neg(p\to q)
&\Leftrightarrow \neg p\land\neg(\neg p\lor q) &&\text{蕴涵等值式}\\
&\Leftrightarrow \neg p\land(p\land\neg q) &&\text{德摩根律、双重否定律}\\
&\Leftrightarrow (\neg p\land p)\land\neg q &&\text{结合律}\\
&\Leftrightarrow 0\land\neg q &&\text{矛盾律}\\
&\Leftrightarrow 0 &&\text{零元律}
\end{aligned}
$$

该式是永假式。

（2）$p\land(p\to q)$。

**解**

$$
\begin{aligned}
p\land(p\to q)
&\Leftrightarrow p\land(\neg p\lor q) &&\text{蕴涵等值式}\\
&\Leftrightarrow (p\land\neg p)\lor(p\land q) &&\text{分配律}\\
&\Leftrightarrow 0\lor(p\land q) &&\text{矛盾律}\\
&\Leftrightarrow p\land q &&\text{同一律}
\end{aligned}
$$

该式是可满足式。

（3）$(p\lor q)\lor(\neg q\land\neg p)$。

**解**

$$
\begin{aligned}
(p\lor q)\lor(\neg q\land\neg p)
&\Leftrightarrow (p\lor q)\lor\neg(q\lor p) &&\text{德摩根律}\\
&\Leftrightarrow (p\lor q)\lor\neg(p\lor q) &&\text{交换律}\\
&\Leftrightarrow 1 &&\text{排中律}
\end{aligned}
$$

该式是永真式。

**例** 化简公式 $(p\land q)\lor(p\land\neg q)$。

**解**

$$
\begin{aligned}
(p\land q)\lor(p\land\neg q)
&\Leftrightarrow p\land(q\lor\neg q) &&\text{分配律}\\
&\Leftrightarrow p\land1 &&\text{排中律}\\
&\Leftrightarrow p &&\text{同一律}
\end{aligned}
$$

**例（电路化简）** 对于下图所示的逻辑电路，能否用更简单的电路实现同一逻辑关系？

![原逻辑电路](/images/campus-discrete-mathematics/ch01-circuit-original.png)

**解** 由电路结构，输出为
$$
F\Leftrightarrow(p\land q)\lor(\neg p\land\neg q)\lor(p\land\neg q).
$$
化简：

$$
\begin{aligned}
F
&\Leftrightarrow (p\land q)\lor(\neg p\land\neg q)\lor(p\land\neg q)\\
&\Leftrightarrow (p\land q)\lor\neg q &&\text{后两项合并为 }\neg q\\
&\Leftrightarrow p\lor\neg q &&\text{吸收/分配}
\end{aligned}
$$

其中 $(\neg p\land\neg q)\lor(p\land\neg q)\Leftrightarrow(\neg p\lor p)\land\neg q\Leftrightarrow\neg q$，而 $(p\land q)\lor\neg q\Leftrightarrow(p\lor\neg q)\land(q\lor\neg q)\Leftrightarrow p\lor\neg q$。

因此只需一个或门和一个非门：

![化简后的逻辑电路](/images/campus-discrete-mathematics/ch01-circuit-simplified.png)

### 1.3.3 全功能联结词集

**定义1.3.2（全功能联结词集）** 设 $G$ 是一个联结词的集合。若任意一个命题公式都可用 $G$ 中的联结词构成的公式来表示，则称 $G$ 为全功能联结词集。若在 $G$ 中去掉任何一个联结词，就不再具有这种特性，则称 $G$ 为最小全功能联结词集。

$\{\neg,\land,\lor\}$、$\{\neg,\land\}$、$\{\neg,\lor\}$、$\{\neg,\to\}$、$\{\uparrow\}$、$\{\downarrow\}$ 都是全功能联结词集；其中 $\{\neg,\land\}$、$\{\neg,\lor\}$、$\{\neg,\to\}$、$\{\uparrow\}$、$\{\downarrow\}$ 都是最小全功能联结词集。

常用的相互表示关系为：

$$
\begin{aligned}
A\uparrow B&\Leftrightarrow\neg(A\land B),\\
A\downarrow B&\Leftrightarrow\neg(A\lor B),\\
A\oplus B&\Leftrightarrow(\neg A\land B)\lor(A\land\neg B),\\
A\leftrightarrow B&\Leftrightarrow(A\to B)\land(B\to A)
\Leftrightarrow(\neg A\lor B)\land(\neg B\lor A),\\
A\lor B&\Leftrightarrow\neg\neg(A\lor B)\Leftrightarrow\neg(\neg A\land\neg B),\\
A\land B&\Leftrightarrow\neg(\neg A\lor\neg B),\\
A\lor B&\Leftrightarrow\neg(\neg A)\lor B\Leftrightarrow\neg A\to B.
\end{aligned}
$$

**例** 证明 $\{\uparrow\}$、$\{\downarrow\}$ 是最小全功能联结词集。

**证** 先用 $\uparrow$ 表示 $\neg$ 和 $\land$：

$$
\neg p\Leftrightarrow\neg(p\land p)\Leftrightarrow p\uparrow p,
$$
$$
p\land q\Leftrightarrow\neg\neg(p\land q)\Leftrightarrow\neg(p\uparrow q)\Leftrightarrow(p\uparrow q)\uparrow(p\uparrow q).
$$

最后一步是把 $\neg r$ 写成 $r\uparrow r$，其中 $r=p\uparrow q$。

由于 $\{\neg,\land\}$ 已是全功能联结词集，所以 $\{\uparrow\}$ 也是全功能联结词集；去掉 $\uparrow$ 后只剩空集，不能表示任何联结词，因此 $\{\uparrow\}$ 是最小的。对 $\{\downarrow\}$ 可类似证明。

只用一个 $\uparrow$ 或 $\downarrow$，就可以实现 $\neg,\land,\lor,\to,\leftrightarrow$ 所表示的全部逻辑关系。在数字电子技术中，只用与非门或者或非门组成的电路就可以实现任何逻辑运算。

![与非门和或非门](/images/campus-discrete-mathematics/ch01-nand-nor-gates.png)

**例** 用只有一种与非门的逻辑电路实现 $F\Leftrightarrow(p\land q)\lor(\neg p\land\neg q)\lor(p\land\neg q)$。

**解**

$$
\begin{aligned}
F
&\Leftrightarrow (p\land q)\lor(\neg p\land\neg q)\lor(p\land\neg q)\\
&\Leftrightarrow p\lor\neg q\\
&\Leftrightarrow \neg(\neg p\land q)\\
&\Leftrightarrow (p\uparrow p)\uparrow q
\end{aligned}
$$

最后一步中 $p\uparrow p\Leftrightarrow\neg p$，再用一次与非得到 $\neg(\neg p\land q)$。对应电路如下：

![仅用与非门实现的电路](/images/campus-discrete-mathematics/ch01-nand-circuit.png)

### 1.3.4 对偶式

**定义1.3.3（对偶式）** 在仅含有联结词 $\neg,\land,\lor$ 的公式 $A$ 中，把 $\land$ 换成 $\lor$，$\lor$ 换成 $\land$，$T$（或 1）换成 $F$（或 0），$F$（或 0）换成 $T$（或 1），其他符号不变，所得公式称为 $A$ 的对偶式，记为 $A^*$。

例如 $p\land q$ 和 $p\lor q$、$p\land\neg q$ 和 $p\lor\neg q$、$\neg p\lor(q\land\neg r)$ 和 $\neg p\land(q\lor\neg r)$ 都互为对偶式。按同样的对偶思想（把 $\uparrow$ 与 $\downarrow$ 视为互为对偶的联结词），$p\uparrow q$ 与 $p\downarrow q$ 也互为对偶式。

设 $A(p_1,p_2,\dots,p_n)$ 和 $A^*(p_1,p_2,\dots,p_n)$ 互为对偶式，其中 $p_1,p_2,\dots,p_n$ 是出现在 $A$ 和 $A^*$ 中的全部命题变元，则
$$
\neg A(p_1,p_2,\dots,p_n)\Leftrightarrow A^*(\neg p_1,\neg p_2,\dots,\neg p_n),
$$
$$
A(\neg p_1,\neg p_2,\dots,\neg p_n)\Leftrightarrow\neg A^*(p_1,p_2,\dots,p_n).
$$

**定理1.3.1（对偶定理）** 设 $A$ 和 $B$ 为两个命题公式，$A$ 和 $A^*$、$B$ 和 $B^*$ 互为对偶式。若 $A\Leftrightarrow B$，则 $A^*\Leftrightarrow B^*$。

**证明** 由对偶式的基本性质，
$$
A(p_1,\dots,p_n)\Leftrightarrow\neg A^*(\neg p_1,\dots,\neg p_n),
$$
$$
B(p_1,\dots,p_n)\Leftrightarrow\neg B^*(\neg p_1,\dots,\neg p_n).
$$
若 $A\Leftrightarrow B$，则
$$
\neg A^*(\neg p_1,\dots,\neg p_n)\Leftrightarrow\neg B^*(\neg p_1,\dots,\neg p_n),
$$
两边同时否定得
$$
A^*(\neg p_1,\dots,\neg p_n)\Leftrightarrow B^*(\neg p_1,\dots,\neg p_n).
$$
由于 $p_1,\dots,p_n$ 可取任意真值，$\neg p_1,\dots,\neg p_n$ 也取遍所有真值组合，故
$$
A^*(p_1,\dots,p_n)\Leftrightarrow B^*(p_1,\dots,p_n).
$$

**例** 求 $A\Leftrightarrow p\lor(\neg p\lor(q\land\neg q))$ 的对偶式。

**解** 把 $\lor$ 与 $\land$ 互换：
$$
A^*\Leftrightarrow p\land(\neg p\land(q\lor\neg q)).
$$
这里 $A$ 是重言式，因为 $q\land\neg q\Leftrightarrow0$，$\neg p\lor0\Leftrightarrow\neg p$，$p\lor\neg p\Leftrightarrow1$；它的对偶式 $A^*$ 是矛盾式。

## 1.4 范式

### 1.4.1 析取范式与合取范式

**定义1.4.1（析取范式）** 一个命题公式具有形式
$$
A_1\lor A_2\lor\cdots\lor A_n\quad(n\ge1),
$$
其中每个 $A_i$ 都是由命题变元或其否定组成的合取式，则称该公式为析取范式。

例如 $p\lor(p\land\neg q\land\neg r)\lor(\neg p\land q)\lor\neg q$ 是析取范式。

**定义1.4.2（合取范式）** 一个命题公式具有形式
$$
B_1\land B_2\land\cdots\land B_n\quad(n\ge1),
$$
其中每个 $B_i$ 都是由命题变元或其否定组成的析取式，则称该公式为合取范式。

例如 $(p\lor\neg q\lor\neg r)\land(\neg p\lor q)\land\neg q$ 是合取范式。

**定理1.4.1（范式存在定理）** 任何一个命题公式都存在与之等值的析取范式与合取范式。

**证明** 设 $G$ 为任意公式，按以下三步处理：

1. 将公式化成只含 $\neg,\land,\lor$ 三个联结词的形式；
2. 将否定联结词内移或消去；
3. 利用分配律、交换律和结合律等，将公式整理为析取范式和合取范式。

这三步得到的公式与原公式等价，所以任意命题公式都存在等值的析取范式和合取范式。上述步骤也是求析取范式和合取范式的步骤。

**例** 求 $(p\land(p\to q))\lor q$ 的析取范式和合取范式。

**解**

$$
\begin{aligned}
(p\land(p\to q))\lor q
&\Leftrightarrow (p\land(\neg p\lor q))\lor q\\
&\Leftrightarrow (p\land\neg p)\lor(p\land q)\lor q &&\text{析取范式}\\
&\Leftrightarrow (p\land q)\lor q &&\text{析取范式}\\
&\Leftrightarrow q &&\text{析取范式}\\
&\Leftrightarrow (p\lor q)\land q &&\text{合取范式}\\
&\Leftrightarrow (p\lor q)\land(\neg p\lor q) &&\text{合取范式}\\
&\Leftrightarrow q &&\text{合取范式}
\end{aligned}
$$

注意：公式的析取范式与合取范式不唯一。

### 1.4.2 主析取范式与主合取范式

**定义1.4.3（极小项）** 含有 $n$ 个命题变元的合取式中，若每个命题变元与其否定不同时出现，而二者之一必出现且仅出现一次，这样的合取式称为极小项。

**定义1.4.4（极大项）** 含有 $n$ 个命题变元的析取式中，若每个命题变元与其否定不同时出现，而二者之一必出现且仅出现一次，这样的析取式称为极大项。

由 $n$ 个命题变元产生的不同极小项和极大项各有 $2^n$ 个。每个极小项在 $2^n$ 个赋值中只有一个成真赋值；每个极大项在 $2^n$ 个赋值中只有一个成假赋值。

三个命题变元的极小项如下：

| 极小项 | 记号 | 成真赋值 |
|:---|:---:|:---:|
| $\neg p\land\neg q\land\neg r$ | $m_{000}$ 或 $m_0$ | 000 |
| $\neg p\land\neg q\land r$ | $m_{001}$ 或 $m_1$ | 001 |
| $\neg p\land q\land\neg r$ | $m_{010}$ 或 $m_2$ | 010 |
| $\neg p\land q\land r$ | $m_{011}$ 或 $m_3$ | 011 |
| $p\land\neg q\land\neg r$ | $m_{100}$ 或 $m_4$ | 100 |
| $p\land\neg q\land r$ | $m_{101}$ 或 $m_5$ | 101 |
| $p\land q\land\neg r$ | $m_{110}$ 或 $m_6$ | 110 |
| $p\land q\land r$ | $m_{111}$ 或 $m_7$ | 111 |

一般地，$n$ 个命题变元形成的极小项可表示为 $m_0,m_1,\dots,m_{2^n-1}$。

三个命题变元的极大项如下：

| 极大项 | 记号 | 成假赋值 |
|:---|:---:|:---:|
| $p\lor q\lor r$ | $M_{000}$ 或 $M_0$ | 000 |
| $p\lor q\lor\neg r$ | $M_{001}$ 或 $M_1$ | 001 |
| $p\lor\neg q\lor r$ | $M_{010}$ 或 $M_2$ | 010 |
| $p\lor\neg q\lor\neg r$ | $M_{011}$ 或 $M_3$ | 011 |
| $\neg p\lor q\lor r$ | $M_{100}$ 或 $M_4$ | 100 |
| $\neg p\lor q\lor\neg r$ | $M_{101}$ 或 $M_5$ | 101 |
| $\neg p\lor\neg q\lor r$ | $M_{110}$ 或 $M_6$ | 110 |
| $\neg p\lor\neg q\lor\neg r$ | $M_{111}$ 或 $M_7$ | 111 |

一般地，$n$ 个命题变元形成的极大项可表示为 $M_0,M_1,\dots,M_{2^n-1}$。

**定义1.4.5（主析取范式）** 如果含 $n$ 个命题变元的命题公式的析取范式的每个合取式全是极小项，则称该析取范式为主析取范式。

**定理1.4.2** 任何命题公式的主析取范式都是存在的，并且是唯一的。

**证明** 给定命题公式 $A$：

1. 求 $A$ 的析取范式 $A'$，$A'$ 的形式为 $A_1\lor A_2\lor\cdots\lor A_n$（$n\ge1$）；
2. 若 $A'$ 中某个简单合取式 $A_i$ 不是极小项，则补入在 $A_i$ 中没有出现的变元。例如，若 $p_i$ 和 $\neg p_i$ 都不在 $A_i$ 中，则
$$
A_i\Leftrightarrow A_i\land(p_i\lor\neg p_i)\Leftrightarrow(A_i\land p_i)\lor(A_i\land\neg p_i);
$$
3. 重复步骤 2，直到所有简单合取式都含有全部命题变元或其否定式；
4. 消去重复出现的命题变项、矛盾式及重复出现的极小项。

按上述步骤求得的就是 $A$ 的主析取范式。唯一性证明略。

**例** 求 $(p\lor(q\land r))\to(p\land q\land r)$ 的主析取范式。

**解**

先把它化为析取范式，再对每个缺少变元的合取式补入 $r\lor\neg r$ 或 $q\lor\neg q$，展开成极小项：

$$
\begin{aligned}
&(p\lor(q\land r))\to(p\land q\land r)\\
\Leftrightarrow{}&\neg(p\lor(q\land r))\lor(p\land q\land r)\\
\Leftrightarrow{}&(\neg p\land(\neg q\lor\neg r))\lor(p\land q\land r)\\
\Leftrightarrow{}&(\neg p\land\neg q)\lor(\neg p\land\neg r)\lor(p\land q\land r) &&\text{析取范式}\\
\Leftrightarrow{}&((\neg p\land\neg q)\land(r\lor\neg r))\lor((\neg p\land\neg r)\land(q\lor\neg q))\lor(p\land q\land r)\\
\Leftrightarrow{}&(\neg p\land\neg q\land r)\lor(\neg p\land\neg q\land\neg r)\lor(\neg p\land\neg r\land q)\lor(\neg p\land\neg r\land\neg q)\lor(p\land q\land r)\\
\Leftrightarrow{}&(\neg p\land\neg q\land\neg r)\lor(\neg p\land\neg q\land r)\lor(\neg p\land q\land\neg r)\lor(p\land q\land r)\\
\Leftrightarrow{}&m_0\lor m_1\lor m_2\lor m_7\\
\Leftrightarrow{}&\Sigma(0,1,2,7)
\end{aligned}
$$

**例** 由 $p\land q\lor r$ 的真值表求它的主析取范式。

**解** 先明确运算顺序：$\land$ 优先于 $\lor$，所以该式为 $(p\land q)\lor r$。

| $p$ | $q$ | $r$ | $p\land q\lor r$ |
|:---:|:---:|:---:|:---:|
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 |
| 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 |

成真赋值为 $001,011,101,110,111$，所以
$$
p\land q\lor r\Leftrightarrow\Sigma(1,3,5,6,7)
$$
$$
\Leftrightarrow(\neg p\land\neg q\land r)\lor(\neg p\land q\land r)\lor(p\land\neg q\land r)\lor(p\land q\land\neg r)\lor(p\land q\land r).
$$

主析取范式中每一个极小项的成真赋值，就是原公式的一个成真赋值。

**定义1.4.6（主合取范式）** 如果含 $n$ 个命题变元的命题公式的合取范式的每个析取式全是极大项，则称该合取范式为主合取范式。

**定理1.4.3** 任何命题公式的主合取范式都是存在的，并且是唯一的。

**证明** 给定命题公式 $A$：

1. 求 $A$ 的合取范式 $B'$，$B'$ 的形式为 $B_1\land B_2\land\cdots\land B_n$（$n\ge1$）；
2. 若 $B'$ 中某个析取式 $B_i$ 不是极大项，则补入在 $B_i$ 中没有出现的变元。例如，若 $p_i$ 和 $\neg p_i$ 都不在 $B_i$ 中，则
$$
B_i\Leftrightarrow B_i\lor(p_i\land\neg p_i)\Leftrightarrow(B_i\lor p_i)\land(B_i\lor\neg p_i);
$$
3. 重复步骤 2，直到所有简单析取式都含有全部命题变元或其否定式；
4. 消去重复出现的命题变项、重言式及重复出现的极大项。

按上述步骤求得的就是 $A$ 的主合取范式。唯一性证明略。

**例** 求 $(p\lor(q\land r))\to(p\land q\land r)$ 的主合取范式。

**解**

先化为合取范式。关键一步是把 $(\neg p\land(\neg q\lor\neg r))\lor(p\land q\land r)$ 看成 $(A\land B)\lor C$，用分配律展开，再分别化简两个因子：
$$
\neg p\lor(p\land q\land r)\Leftrightarrow\neg p\lor(q\land r)\Leftrightarrow(\neg p\lor q)\land(\neg p\lor r),
$$
$$
(\neg q\lor\neg r)\lor(p\land q\land r)\Leftrightarrow p\lor\neg q\lor\neg r.
$$
于是得到合取范式，再把缺少变元的子句补成极大项：

$$
\begin{aligned}
&(p\lor(q\land r))\to(p\land q\land r)\\
\Leftrightarrow{}&(\neg p\land(\neg q\lor\neg r))\lor(p\land q\land r)\\
\Leftrightarrow{}&(\neg p\lor q)\land(\neg p\lor r)\land(\neg q\lor\neg r\lor p) &&\text{合取范式}\\
\Leftrightarrow{}&((\neg p\lor q)\lor(r\land\neg r))\land((\neg p\lor r)\lor(q\land\neg q))\land(p\lor\neg q\lor\neg r)\\
\Leftrightarrow{}&(\neg p\lor q\lor r)\land(\neg p\lor q\lor\neg r)\land(\neg p\lor\neg q\lor r)\land(p\lor\neg q\lor\neg r)\\
\Leftrightarrow{}&M_3\land M_4\land M_5\land M_6\\
\Leftrightarrow{}&\Pi(3,4,5,6)
\end{aligned}
$$

同一公式的主析取范式与主合取范式互为补充：
$$
M_3\land M_4\land M_5\land M_6\Leftrightarrow m_0\lor m_1\lor m_2\lor m_7\Leftrightarrow\Sigma(0,1,2,7).
$$
因为一个赋值若不属于成真赋值集合 $\{0,1,2,7\}$，就必属于成假赋值集合 $\{3,4,5,6\}$，对应极大项的编号正是这些成假赋值。

### 1.4.3 主范式的用途

#### 判断公式是否等价

**例1.4.5** 判断
$$
(\neg p\lor q)\land(\neg q\lor r)\land(\neg r\lor p)
$$
和
$$
(p\lor\neg q)\land(q\lor\neg r)\land(r\lor\neg p)
$$
是否等价。

**解** 把各子句写成极大项的合取。第一个公式中：

- $\neg p\lor q$ 在 $p=1,q=0$ 时为假，对应 $M_{100},M_{101}$，即 $M_4,M_5$；
- $\neg q\lor r$ 在 $q=1,r=0$ 时为假，对应 $M_{010},M_{110}$，即 $M_2,M_6$；
- $\neg r\lor p$ 在 $r=1,p=0$ 时为假，对应 $M_{001},M_{011}$，即 $M_1,M_3$。

所以第一个公式
$$
\Leftrightarrow M_4\land M_5\land M_2\land M_6\land M_1\land M_3
\Leftrightarrow\Pi(1,2,3,4,5,6).
$$

第二个公式中：

- $p\lor\neg q$ 在 $p=0,q=1$ 时为假，对应 $M_{010},M_{011}$，即 $M_2,M_3$；
- $q\lor\neg r$ 在 $q=0,r=1$ 时为假，对应 $M_{001},M_{101}$，即 $M_1,M_5$；
- $r\lor\neg p$ 在 $r=0,p=1$ 时为假，对应 $M_{100},M_{110}$，即 $M_4,M_6$。

所以第二个公式
$$
\Leftrightarrow M_2\land M_3\land M_1\land M_5\land M_4\land M_6
\Leftrightarrow\Pi(1,2,3,4,5,6).
$$

两者主合取范式相同，因此等价。

#### 求成真赋值和成假赋值

设公式 $A$ 含 $n$ 个命题变元，$A$ 的主析取范式有 $s$ 个极小项，则 $A$ 有 $s$ 个成真赋值，它们是这些极小项下标的二进制表示；其余 $2^n-s$ 个赋值都是成假赋值。

例如
$$
\neg(p\to q)\lor\neg r\Leftrightarrow m_0\lor m_2\lor m_4\lor m_5\lor m_6,
$$
成真赋值为 $000,010,100,101,110$；成假赋值为 $001,011,111$。

#### 判断公式的类型

设 $A$ 含 $n$ 个命题变元，则：

- $A$ 为重言式，当且仅当 $A$ 的主析取范式含 $2^n$ 个极小项；
- $A$ 为矛盾式，当且仅当 $A$ 的主析取范式不含任何极小项，记作 $0$；
- $A$ 为可满足式，当且仅当 $A$ 的主析取范式至少含一个极小项；
- $A$ 为矛盾式，当且仅当 $A$ 的主合取范式含 $2^n$ 个极大项；
- $A$ 为重言式，当且仅当 $A$ 的主合取范式不含任何极大项，记作 $1$；
- $A$ 为可满足式，当且仅当 $A$ 的主合取范式不包含全部 $2^n$ 个极大项。

**例** 判断公式 $G\Leftrightarrow(p\to q)\to(\neg q\to\neg p)$ 是否重言式。

**解**

$$
\begin{aligned}
G
&\Leftrightarrow(p\to q)\to(\neg q\to\neg p)\\
&\Leftrightarrow\neg(\neg p\lor q)\lor(q\lor\neg p)\\
&\Leftrightarrow(p\land\neg q)\lor q\lor\neg p\\
&\Leftrightarrow m_{10}\lor(m_{01}\lor m_{11})\lor(m_{00}\lor m_{01})\\
&\Leftrightarrow m_2\lor m_1\lor m_3\lor m_0\lor m_1\\
&\Leftrightarrow m_0\lor m_1\lor m_2\lor m_3\\
&\Leftrightarrow\Sigma(0,1,2,3)
\end{aligned}
$$

主析取范式含全部 4 个极小项，所以 $G$ 是重言式。

#### 应用：三人表决器

**例** 一种简单的三人表决器，每位表决者座位旁有一个按钮，同意则按按钮，不同意则不按；表决结果超过半数时喇叭发声。设计满足条件的表决器。

**解** 设三个按钮为 $p,q,r$，按下为 1，不按为 0；喇叭为 $A$，发声为 1，不发声为 0。超过半数即至少两人同意，所以
$$
A\Leftrightarrow(\neg p\land q\land r)\lor(p\land\neg q\land r)\lor(p\land q\land\neg r)\lor(p\land q\land r).
$$
化简：

$$
\begin{aligned}
A
&\Leftrightarrow(p\land q)\lor(p\land r)\lor(q\land r)\\
&\Leftrightarrow(p\land(q\lor r))\lor(q\land r).
\end{aligned}
$$

真值表为：

| $p$ | $q$ | $r$ | $A$ |
|:---:|:---:|:---:|:---:|
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 |

对应电路为：

![三人表决器电路](/images/campus-discrete-mathematics/ch01-voting-circuit.png)

#### 应用：选派方案

**例** 某单位选派 $A,B,C$ 三位业务骨干去进修，选派要满足：

- 若 $A$ 去，则 $C$ 同去；
- 若 $B$ 去，则 $C$ 不能去；
- 若 $C$ 不去，则 $A$ 或 $B$ 可以去。

问可以有哪些选派方案？

**解** 设 $p$：派 $A$ 去，$q$：派 $B$ 去，$r$：派 $C$ 去。由条件得
$$
(p\to r)\land(q\to\neg r)\land(\neg r\to(p\lor q)).
$$
该公式的成真赋值就是可行方案。求主析取范式：

$$
\begin{aligned}
&(p\to r)\land(q\to\neg r)\land(\neg r\to(p\lor q))\\
\Leftrightarrow{}&(\neg p\land\neg q\land r)\lor(\neg p\land q\land\neg r)\lor(p\land\neg q\land r).
\end{aligned}
$$

三个成真赋值对应三种方案：

1. $001$：$A,B$ 不去，$C$ 去；
2. $010$：$A,C$ 不去，$B$ 去；
3. $101$：$A,C$ 去，$B$ 不去。

## 1.5 命题演算的推理

### 1.5.1 推理理论

**定义1.5.1（蕴涵）** 设 $A$ 和 $B$ 是两个命题公式，当且仅当 $A\to B$ 是重言式（即 $A\to B\Leftrightarrow T$）时，称从 $A$ 可推出 $B$，或 $A$ 蕴涵 $B$，或 $B$ 是前提 $A$ 的结论，记作 $A\Rightarrow B$。

一般地，推理的前提可以有多个。若
$$
(A_1\land A_2\land\cdots\land A_n)\to B
$$
是重言式，则称由前提 $A_1,A_2,\dots,A_n$ 可推出结论 $B$，记作
$$
(A_1\land A_2\land\cdots\land A_n)\Rightarrow B.
$$

**例** 判断下列推理是否正确：

1. $p\land(p\to q)\Rightarrow q$；
2. $(p\to q)\land q\Rightarrow p$。

**解** 写出 $p\land(p\to q)\to q$ 和 $(p\to q)\land q\to p$ 的真值表：

| $p$ | $q$ | $p\land(p\to q)\to q$ | $(p\to q)\land q\to p$ |
|:---:|:---:|:---:|:---:|
| 0 | 0 | 1 | 1 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 1 | 1 |

第一式是重言式，所以 $p\land(p\to q)\Rightarrow q$ 正确。第二式在 $p=0,q=1$ 时为假，所以 $(p\to q)\land q\Rightarrow p$ 不正确。后者是“肯定后件”的错误：$q$ 真不能反推出 $p$ 真。

**例** 证明“如果牛吃草，则马会飞；马不会飞，所以牛不吃草”是正确的推理。

**证明** 设 $p$：牛吃草，$q$：马会飞。前提为 $p\to q$、$\neg q$，结论为 $\neg p$。考察
$$
\begin{aligned}
(p\to q)\land\neg q\to\neg p
&\Leftrightarrow\neg((p\to q)\land\neg q)\lor\neg p\\
&\Leftrightarrow\neg(p\to q)\lor q\lor\neg p\\
&\Leftrightarrow\neg(p\to q)\lor(p\to q)\\
&\Leftrightarrow T.
\end{aligned}
$$
其中 $q\lor\neg p\Leftrightarrow\neg p\lor q\Leftrightarrow p\to q$。所以 $\neg p$ 是 $p\to q$ 和 $\neg q$ 的有效结论，该推理正确。

推理时，只要推理过程的每一步都遵循正确的推理规则，推出的结论都称为有效结论，推理都是有效的。

### 1.5.2 推理定律

常用的推理定律如下：

| 序号 | 推理形式 | 名称 |
|:---:|:---|:---|
| 1 | $p\land q\Rightarrow p$；$p\land q\Rightarrow q$ | 化简 |
| 2 | $p\Rightarrow p\lor q$；$q\Rightarrow p\lor q$ | 附加 |
| 3 | $p,\ p\to q\Rightarrow q$ | 假言推理 |
| 4 | $\neg q,\ p\to q\Rightarrow\neg p$ | 拒取式 |
| 5 | $\neg p,\ p\lor q\Rightarrow q$ | 析取三段论 |
| 6 | $p,\ q\Rightarrow p\land q$ | 合取 |
| 7 | $p\to q,\ q\to r\Rightarrow p\to r$ | 假言三段论 |
| 8 | $p\leftrightarrow q,\ q\leftrightarrow r\Rightarrow p\leftrightarrow r$ | 等价三段论 |
| 9 | $p\to q,\ r\to s,\ p\lor r\Rightarrow q\lor s$ | 构造性二难 |
| 10 | $p\lor q,\ \neg p\lor r\Rightarrow q\lor r$ | 归结式 |

**定理（CP 规则）** 若 $H_1,H_2,\dots,H_m$ 和 $P$ 推出 $Q$，则 $H_1,H_2,\dots,H_m$ 推出 $P\to Q$。

**证明** 由假设，
$$
H_1\land H_2\land\cdots\land H_m\land P\Rightarrow Q,
$$
即
$$
H_1\land H_2\land\cdots\land H_m\land P\to Q\Leftrightarrow T.
$$
令 $H\Leftrightarrow H_1\land H_2\land\cdots\land H_m$，则
$$
\begin{aligned}
H\land P\to Q
&\Leftrightarrow\neg(H\land P)\lor Q\\
&\Leftrightarrow\neg H\lor\neg P\lor Q\\
&\Leftrightarrow H\to(P\to Q)\\
&\Leftrightarrow T.
\end{aligned}
$$
所以 $H\Rightarrow P\to Q$，即 $H_1\land H_2\land\cdots\land H_m\Rightarrow P\to Q$。

### 1.5.3 推理证明方法

命题演算的推理证明方法主要有：真值表法、等价演算法、演绎法、附加前提证明法、间接推演法（归谬法）、归结证明法。

#### 真值表法

通过写出真值表判断 $A\to B$ 的类型；若 $A\to B$ 是重言式，则由前提 $A$ 可以推出结论 $B$。

**例** 证明前提 $p\lor q$ 和 $\neg p\lor r$ 可以推出结论 $q\lor r$。

**证明** 根据定义1.5.1，只需证明 $(p\lor q)\land(\neg p\lor r)\to q\lor r$ 是重言式。列出真值表：

| $p$ | $q$ | $r$ | $p\lor q$ | $\neg p\lor r$ | $q\lor r$ | $(p\lor q)\land(\neg p\lor r)\to q\lor r$ |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 0 | 0 | 0 | 0 | 1 | 0 | 1 |
| 0 | 0 | 1 | 0 | 1 | 1 | 1 |
| 0 | 1 | 0 | 1 | 1 | 1 | 1 |
| 0 | 1 | 1 | 1 | 1 | 1 | 1 |
| 1 | 0 | 0 | 1 | 0 | 0 | 1 |
| 1 | 0 | 1 | 1 | 1 | 1 | 1 |
| 1 | 1 | 0 | 1 | 0 | 1 | 1 |
| 1 | 1 | 1 | 1 | 1 | 1 | 1 |

最后一列全为真，所以该式是重言式，推理成立。

#### 等价演算法

利用命题的等值演算判断 $A\to B$ 的类型；若 $A\to B$ 是重言式，则由前提 $A$ 可以推出结论 $B$。

**例** 证明 $q$ 是 $\neg p$ 和 $p\lor q$ 的结论。

**证明**

$$
\begin{aligned}
\neg p\land(p\lor q)\to q
&\Leftrightarrow\neg(\neg p\land(p\lor q))\lor q\\
&\Leftrightarrow p\lor(\neg p\land\neg q)\lor q\\
&\Leftrightarrow p\lor\neg q\lor q\\
&\Leftrightarrow T.
\end{aligned}
$$

#### 演绎法

演绎法从前提（假设）出发，依据公认的推理规则和推理定律，推导出一个结论。命题演算推理系统包括推理规则、推理定律和基本等值公式。

推理规则有：

1. **前提引入规则**：推导过程中，可随时引入前提集合中的任意一个前提。
2. **结论引入规则**：推导过程中得到的结论都可作为后续推导的前提。
3. **置换规则**：推导过程中，命题公式的子公式都可以用等值的公式置换。
4. **CP 规则（附加前提规则）**：如果推出的结论形为 $P\to Q$，可以把 $P$ 放到前提中去，设法推出 $Q$。

**例** 证明：由前提“今天下午有课且今天比昨天冷；只有今天下午没有课，我们才去游泳；如果我们不去游泳，则我们打篮球；如果我们打篮球，我们就会感到精力充沛”，推出结论“我们感到精力充沛”是正确的。

**证明** 设 $p$：今天下午有课，$q$：今天比昨天冷，$r$：我们去游泳，$s$：我们打篮球，$h$：我们感到精力充沛。前提为
$$
p\land q,\quad r\to\neg p,\quad \neg r\to s,\quad s\to h,
$$
结论为 $h$。

| 步骤 | 公式 | 理由 |
|:---:|:---|:---|
| 1 | $p\land q$ | 前提引入（今天下午有课且今天比昨天冷） |
| 2 | $p$ | (1) 化简 |
| 3 | $r\to\neg p$ | 前提引入（只有今天下午没有课，我们才去游泳） |
| 4 | $\neg r$ | (2)，(3) 拒取式 |
| 5 | $\neg r\to s$ | 前提引入（如果我们不去游泳，则我们打篮球） |
| 6 | $s$ | (4)，(5) 假言推理 |
| 7 | $s\to h$ | 前提引入（如果我们打篮球，我们就会感到精力充沛） |
| 8 | $h$ | (6)，(7) 假言推理 |

**例** 证明 $\neg r\to s$ 是 $p\to(q\to r)$、$p\land q$ 的结论。

**证明**

| 步骤 | 公式 | 理由 |
|:---:|:---|:---|
| 1 | $p\land q$ | 前提引入 |
| 2 | $p$ | (1) 化简 |
| 3 | $q$ | (1) 化简 |
| 4 | $p\to(q\to r)$ | 前提引入 |
| 5 | $q\to r$ | (2)，(4) 假言推理 |
| 6 | $r$ | (3)，(5) 假言推理 |
| 7 | $r\lor s$ | (6) 附加 |
| 8 | $\neg r\to s$ | (7) 置换规则 |

#### 附加前提证明法

**例** 证明 $r\to s$ 是 $p\to(q\to s)$、$\neg r\lor p$、$q$ 的结论。

**证明** 结论形为 $r\to s$，把 $r$ 作为附加前提引入。

| 步骤 | 公式 | 理由 |
|:---:|:---|:---|
| 1 | $r$ | 附加前提引入 |
| 2 | $\neg r\lor p$ | 前提引入 |
| 3 | $p$ | (1)，(2) 析取三段论 |
| 4 | $p\to(q\to s)$ | 前提引入 |
| 5 | $q\to s$ | (3)，(4) 假言推理 |
| 6 | $q$ | 前提引入 |
| 7 | $s$ | (6)，(5) 假言推理 |

由 CP 规则，$r\to s$ 成立。

#### 间接推演法（归谬法）

间接推演法把要推出的结论否定后，与原来的前提一起使用，推出矛盾。

**定义1.5.2（相容与不相容）** 设 $H_1,H_2,\dots,H_r$ 是 $r$ 个命题公式。若 $H_1\land H_2\land\cdots\land H_r$ 是矛盾式，则称 $H_1,H_2,\dots,H_r$ 是不相容的；否则称为相容的。

**例** 用间接法证明 $\neg p$ 是 $p\to\neg q$、$q\lor\neg r$、$r\land\neg s$ 的结论。

**证明** 否定结论，即假设 $\neg\neg p$。

| 步骤 | 公式 | 理由 |
|:---:|:---|:---|
| 1 | $\neg\neg p$ | 否定结论 |
| 2 | $p$ | (1) 双重否定 |
| 3 | $p\to\neg q$ | 前提引入 |
| 4 | $\neg q$ | (2)，(3) 假言推理 |
| 5 | $q\lor\neg r$ | 前提引入 |
| 6 | $\neg r$ | (4)，(5) 析取三段论 |
| 7 | $r\land\neg s$ | 前提引入 |
| 8 | $r$ | (7) 化简 |
| 9 | $F$ | (8)，(6) 合取 |

推出矛盾，故原结论成立。

#### 归结证明法

**归结规则**
$$
(p\lor q)\land(\neg p\lor r)\Rightarrow q\lor r.
$$

归结证明法要求前提和结论都表示为子句。子句是变元或其否定的析取，如 $p\lor q$、$\neg p\lor r$。对于非子句的语句，可以用一个或多个等价的子句语句替换。

**例** 证明：如果小张守门或小李上场，则 $A$ 队获胜；或者 $A$ 队未获胜，或者 $A$ 队成为联赛第一名；$A$ 队没有成为联赛第一名。因此小张没有守门并且小李没有上场。

**证明** 设 $p$：小张守门，$q$：小李上场，$r$：$A$ 队获胜，$s$：$A$ 队成为联赛第一名。

前提：$(p\lor q)\to r$，$\neg r\lor s$，$\neg s$；结论：$\neg p\land\neg q$。

先把 $(p\lor q)\to r$ 化为子句：
$$
(p\lor q)\to r\Leftrightarrow\neg(p\lor q)\lor r\Leftrightarrow(\neg p\lor r)\land(\neg q\lor r).
$$
所以用两个子句 $\neg p\lor r$ 和 $\neg q\lor r$ 代替它。结论为两个子句 $\neg p$ 和 $\neg q$。

| 步骤 | 公式 | 理由 |
|:---:|:---|:---|
| 1 | $\neg p\lor r$ | 前提引入 |
| 2 | $\neg r\lor s$ | 前提引入 |
| 3 | $\neg p\lor s$ | (1)，(2) 归结规则 |
| 4 | $\neg q\lor r$ | 前提引入 |
| 5 | $\neg q\lor s$ | (2)，(4) 归结规则 |
| 6 | $\neg s$ | 前提引入 |
| 7 | $\neg p$ | (3)，(6) 归结规则 |
| 8 | $\neg q$ | (5)，(6) 归结规则 |
| 9 | $\neg p\land\neg q$ | (7)，(8) 合取 |

## 课堂小结

命题逻辑把命题作为最小单位，先用五个基本联结词（否定、合取、析取、蕴涵、等价）以及与非、或非、异或构造命题公式，再用真值表或等值演算研究公式的类型与关系。核心工具是基本等值式和范式：任意公式都能化为唯一的极小项之和（主析取范式）或极大项之积（主合取范式），由此可以判断等价、求成真/成假赋值、判断公式类型，并解决表决器、选派方案等实际问题。推理部分把“前提推出结论”严格定义为蕴涵式永真，常用真值表、等价演算、演绎法、附加前提法和归谬法；演绎时要熟悉十条推理定律，并注意每一步的理由必须是真的规则，而不是凭直觉。

本章最容易出错的地方有：把“仅当”的箭头方向写反；蕴涵前件为假时误以为整个蕴涵为假；混淆兼容或与排斥或；在公式中漏写括号导致优先级改变；把“逆命题”与“逆否命题”混为一谈；求主范式时漏掉极小项或极大项；以及推理中把“肯定后件”“否定前件”当成有效规则。

## 资料来源

- [第1章命题逻辑.pdf](https://drive.google.com/file/d/1PA9VNWSvsinD9Tgys9ZmihmtDI7CEkbz/view?usp=drivesdk)
