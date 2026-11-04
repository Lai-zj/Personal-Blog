---
title: '[生物力学]-[Biomechanics of Movement]-01First Steps'
mathjax: true
date: 2026-11-02 15:34:27
tags:
categories:
  - '生物力学'
  - 'Biomechanics of Movement'
---

# 目录
[一、什么是运动生物力学Biomechanics of Movement](#一、什么是运动生物力学Biomechanics-of-Movement)\
[二、简史与学科交叉History and Disciplines](#二、简史与学科交叉History-and-Disciplines)\
[三、Cybathlon与功能性电刺激Functional Electrical Stimulation](#三、Cybathlon与功能性电刺激Functional-Electrical-Stimulation)\
[四、研究运动的工具Tools to Study Movement](#四、研究运动的工具Tools-to-Study-Movement)\
[五、概念模型与计算机仿真Models and Simulations](#五、概念模型与计算机仿真Models-and-Simulations)\
[六、运动的语言Language of Movement](#六、运动的语言Language-of-Movement)

## 一、什么是运动生物力学Biomechanics of Movement

用**力学**的视角研究人和动物的运动，就是**运动生物力学**（biomechanics of movement）。

研究目标：

- 理解产生运动的生物结构与过程：从整体运动，一直到肌肉内部微观的力发生器
- 把知识用于改善**活动能力**（mobility）、**身体活动**（physical activity）和**健康**（health）

为什么研究运动：

- 运动是生命的基本特征，人体兼具力量与灵巧
- 规律运动能预防心脏病、癌症、骨质疏松、肥胖、糖尿病、抑郁、焦虑等疾病
- 但全球不到一半人口的活动量达到维持身心健康所需的水平

## 二、简史与学科交叉History and Disciplines

### 关键人物

- **亚里士多德**（约公元前 350 年）：《论动物的运动》，最早研究动物运动的一般原理；认为肌肉靠“pneuma（生命之气）”充气收缩
- **达·芬奇**（1452–1519）：留下大量解剖图，研究肌肉骨骼系统的力学功能
- **博雷利**（Giovanni Borelli，1608–1679）：第一个用力学定律把**肌肉力**与它产生的**关节力矩**联系起来，常被称为生物力学之父；但仍相信肌肉靠充气收缩
- **斯泰诺**（Nicolas Steno，1638–1686）：指出肌肉收缩时体积保持不变，否定了充气说
- **伽伐尼**（Luigi Galvani，1737–1798）：发现电刺激能使肌肉收缩，奠定电生理学基础
- **迈布里奇**（Eadweard Muybridge，1830–1904）：用连续摄影记录人和动物的运动，是动作捕捉（motion capture）的先驱

### 学科交叉

- 生物学家：研究动物形态与功能的关系，如蜥蜴用尾巴控制空中姿态、霸王龙能否奔跑
- 神经科学家：大脑如何协调肌肉，损伤和疾病如何破坏神经回路
- 外科医生：用生物力学模型判断脑瘫患者是否适合做肌腱延长手术
- 机器人专家：设计假肢和双足机器人
- 运动科学家：分析跳高等动作（如背越式跳高 Fosbury flop），提高成绩并减少损伤
- 计算机科学家与生物力学工程师：开发仿真算法和软件

应用还包括人体工学设计、人工髋/膝关节置换、动力外骨骼、深部脑刺激、脊髓硬膜外刺激和运动装备设计等。

## 三、Cybathlon与功能性电刺激Functional Electrical Stimulation

2016 年，苏黎世联邦理工学院（ETH Zurich）的 Robert Riener 创办了 **Cybathlon**：把科学与竞技结合，比赛项目是**日常生活任务**，参赛者称为“pilot”。

- 假肢手臂：搬运物品、切面包、开罐子、晾衣服
- 假肢腿：上下坡、端着一杯水上下楼梯
- 腿部瘫痪者的自行车赛：Case Western Reserve University 团队（Ronald Triolo 领导）夺冠，选手 Mark Muhn 用 2 分 58 秒骑完 750 m

### 功能性电刺激

**功能性电刺激**（functional electrical stimulation, FES）：把电极贴在皮肤上，或植入瘫痪肌肉的神经附近，用电脉冲刺激神经，使肌肉收缩、产生力。

- 植入式电极比表面电极更有选择性，能激活特定肌肉，产生的收缩也更强
- 每位 pilot 的刺激模式都要用**肌肉驱动的生物力学模型**定制：瘫痪后肌肉性质会改变，可激活的肌肉数量又少，健康人的骑行模式不能直接照搬
- 模型有两个用处：排除走不通的方案，以及优化电刺激模式

### 反向募集

自然运动时，神经系统先募集**慢肌纤维**（较小、抗疲劳），再募集**快肌纤维**（力大、易疲劳）。电刺激的募集顺序相反，先激活快肌纤维，所以肌肉很容易疲劳，称为**反向募集**（reverse recruitment）。

这是 FES 骑行最初只能坚持约一分钟的原因。经过 5 个月训练，瘫痪肌肉变强后，选手才完成 3 分钟的比赛。

## 四、研究运动的工具Tools to Study Movement

- **动作捕捉**（motion capture）：红外相机跟踪贴在皮肤上的 marker；也有不需要 marker 的视频方法
- **IMU**（inertial measurement unit，惯性测量单元）：测量速度和加速度，已集成到手机和可穿戴设备中；可在自然环境中长时间采集，适合大规模研究和疾病监测
- **测力台**（force plate）：测量地面对脚的反作用力（ground reaction force）；也有带测力功能的跑步机
- **肌电图**（EMG, electromyography）：测量肌肉活动的时间与强度
- **代谢测量**：测耗氧量和二氧化碳产量，估计运动所需的代谢能量
- **影像技术**：MRI、透视（fluoroscopy）等，可以观察运动中的体内结构

实验数据用于建立和检验肌肉骨骼动力学模型，模型再反过来解释和预测运动。

## 五、概念模型与计算机仿真Models and Simulations

### 概念模型

- 尽量用**简单模型**：能解决问题就够，过于复杂反而难建立、难理解
- 行走可以用**钟摆模型**近似（第 2 章）；跑步可以用**质量-弹簧模型**（第 3 章）
- 简单模型也有局限，复杂现象需要**肌肉驱动仿真**来补充细节（第 11、12 章）

### 正向动力学Forward Dynamics

给定一块或几块肌肉的**神经激活模式**，用肌肉骨骼模型**预测**产生的运动。

神经、肌肉、骨骼、感觉系统共同作用，计算模型把这些系统表示出来，就能预测和分析人和动物的运动。

### 逆向动力学Inverse Dynamics

已知运动，反推产生该运动所需的力和力矩。流程是：

1. 测量 marker 轨迹和外部力
2. **逆向运动学**（inverse kinematics）：用身体模型把 marker 位置转换为关节角
3. 对关节角求时间导数，得到关节角速度和角加速度
4. 结合外部力，估计关节力矩
5. 用生物力学模型和优化算法，估计各块肌肉的力

称为“逆向”，是因为从测量的运动反推力和力矩。仿真可以计算无法直接测量的量，如肌肉力、关节载荷、肌腱应变，也可以预测假想情况和研究损伤。

## 六、运动的语言Language of Movement

### 解剖平面与方向

- **额状面**（frontal plane）：把身体分为前、后；此平面内的运动如外展/内收
- **矢状面**（sagittal plane）：把身体分为左、右；此平面内的运动如屈/伸、踝背屈/跖屈
- **横断面**（transverse plane）：把身体分为上、下；此平面内的运动如内旋/外旋

方向术语：

- **前**（anterior）/**后**（posterior）
- **上**（superior）/**下**（inferior）
- **内**（medial，靠近中线）/**外**（lateral，远离中线）
- **近端**（proximal，靠近躯干）/**远端**（distal，远离躯干）

### 关节运动

- 肩：外展（abduction）/内收（adduction），额状面
- 肘：屈（flexion）/伸（extension），矢状面
- 髋：外展/内收（额状面），屈/伸（矢状面），内旋/外旋（横断面）
- 骨盆：侧倾（list，额状面），前倾/后倾（tilt，矢状面），旋转（rotation，横断面）
- 膝：屈/伸，矢状面
- 踝：背屈（dorsiflexion）/跖屈（plantarflexion），矢状面

### 下肢骨骼与肌肉

骨骼：

- 骨盆：髂嵴（iliac crest）、髂骨（ilium）、髋臼（acetabulum）、耻骨（pubis）、坐骨（ischium）、骶骨（sacrum）、腰椎（lumbar vertebrae）
- 股骨：头（head）、颈（neck）、骨干（shaft）、大转子（greater trochanter）、内侧髁/外侧髁（medial/lateral epicondyle）
- 髌骨（patella）、胫骨平台（tibial plateau）、胫骨（tibia）、腓骨（fibula）、内踝/外踝（medial/lateral malleolus）
- 足：跗骨（tarsus）、跖骨（metatarsals）、跟骨（calcaneus）、趾骨（phalanges）

前侧肌肉：

- 髂腰肌（iliopsoas）：髂肌（iliacus）+ 腰大肌（psoas）
- 臀中肌（gluteus medius）、臀小肌（gluteus minimus）、缝匠肌（sartorius）
- 内收肌群：短肌（brevis）、长肌（longus）、大肌（magnus）
- 股四头肌（quadriceps）：股直肌（rectus femoris）、股外侧肌（vastus lateralis）、股内侧肌（vastus medialis）、股中间肌（vastus intermedius）
- 髌韧带（patellar ligament）
- 胫骨前肌（tibialis anterior）、趾长伸肌（extensor digitorum longus）、腓肠肌（gastrocnemius）、比目鱼肌（soleus）

后侧肌肉：

- 臀中肌（gluteus medius）、臀大肌（gluteus maximus）、股外侧肌（vastus lateralis）、大收肌（adductor magnus）
- 腘绳肌（hamstrings）：股二头肌长头（biceps femoris long head）、半腱肌（semitendinosus）、半膜肌（semimembranosus）
- 腓肠肌（gastrocnemius）：外侧头（lateralis）、内侧头（medialis）
- 比目鱼肌（soleus）、跟腱（Achilles tendon）

身体分段：躯干（trunk）、骨盆（pelvis）、大腿（thigh）、小腿（shank）、足（foot）。

以上术语对应书中图 1.15–1.19，后续章节会反复使用。

---
参考教材:
* 《Biomechanics of Movement: The Science of Sports, Robotics, and Rehabilitation》Thomas K. Uchida, Scott L. Delp, David Delp, MIT Press
