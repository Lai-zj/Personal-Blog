---
title: '[OpenSim]-[理论]-四个步骤'
mathjax: true
date: 2026-10-26 16:54:29
tags:
categories:
  - 'OpenSim'
  - '理论'
---

参考文献：
1. OpenSim: Open-Source Software to Create and Analyze Dynamic Simulations of Movement. Scott L. Delp*, Frank C. Anderson, Allison S. Arnold, Peter Loan, Ayman Habib, Chand T. John, Eran Guendelman, and Darryl G. Thelen

如下是OpenSim工作流的四个步骤:

![图3](图3.png)

## 步骤1：Scale
通过缩放将模型骨骼同受试者个体相匹配

## 步骤2：IK（逆运动学问题）
在第二步中，需要解决逆运动学问题，以确定能够最好地再现从
运动捕捉中获得的模型通用坐标值（关节角度和位移）。第二步
可以被看作是一个最小二乘法问题，其目的是最小化测量得到的
标记位置与模型中的虚拟标记位置之间的差异，同时需要满足关
节约束

$$
\begin{aligned}
\text{Squared Error} 
=& \sum_{i=1}^{\text{markers}} w_i \left\\| \overrightarrow{x_i}^{\text{subject}} - \overrightarrow{x_i}^{\text{model}} \right\\|^2 \\\\
&+ \sum_{j=1}^{\text{joint angles}} w_j \left\\| {\theta_j}^{\text{subject}} - {\theta_j}^{\text{model}} \right\\|^2
\end{aligned}
$$