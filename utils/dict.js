// 认知任务列表
let cognitiveAbilityTaskList = [
  // {
  //   flag: '1',
  //   id: '0',
  //   taskCode:"MEMORY",
  //   description: '本测试中，测试者需要完成 0-back、1-back和 2-back 三种难度的测试。每个难度的测试都分为6组，每两组之间有8秒的休息时间。在每个组块中，屏幕上会依次呈现一个随机字母。 在 0-back 任务中，测试者需要判断当前呈现的字母是否与本组测试的第一个字母相同，是就按键，不是就不按键；在 1-back 任务中，测试者需要判断当前呈现的字母与前一个位置呈现的字母是否相同，相同就按键，不相同就不按键；在 2-back 任务中，测试者需要判断当前呈现的字母与两个位置前呈现的字母是否相同，相同就按键，不相同就不按键。 如您已清楚测试规则，请点击“进入练习测试”按钮进行练习测试。',
  //   name: '工作记忆能力测试(字母记忆版)',
  //   imageUrl: '',//require('../../assets/congnitiveAblitity/memoryAbility.jpg'),
  //   imageName: 'continuousAddition',
  //   testDescription: '工作记忆任务练习次数：0-back、1-back、2-back各一组。练习结束后自动判断被试成绩，如果0-back正确率达到90%，1-back正确率达到80%，2-back正确率达到70%，则说明您已经掌握测试规则，请点击开始按钮进入正式测试；否则请您认真阅读测试规则，点击重新练习按钮继续练习。',
  //   testNum: 0,
  //   type: '1',
  //   pageUrl:'rememberAbilityTask',
  //   testExplain:'工作记忆任务任务说明: 在本测试中，测试者需要完成 0-back、1-back和 2-back 三种难度的测试。每个难度的测试都分为2组，每两组之间有8秒的休息时间。在每个组块中，屏幕上会依次呈现一个随机字母。在 0-back 难度下，测试者需要判断当前呈现的字母是否与本组测试的第一个字母相同，是就按键，不是就不按键；在 1-back 难度下，测试者需要判断当前呈现的字母与前一个位置呈现的字母是否相同，相同就按键，不相同就不按键；在 2-back 条件下，测试者需要判断当前呈现的字母与两个位置前呈现的字母是否相同，相同就按键，不相同就不按键。'
  // },
  // {
  //   flag: '2',
  //   id: '1',
  //   taskCode:"ALERTNESS",
  //   description: '测试期间，请注视屏幕中的灰色区域，其中会随机闪现黑色方块。当黑色方块出现时，请用手指点击黑色区域中的任意位置。在确保正确反应的情况下，反应速度越快越好。如您已清楚测试规则，请点击“进入练习测试”按钮进行练习测试。',
  //   name: '精神运动警觉度测试',
  //   imageUrl: '',//require('../../assets/congnitiveAblitity/memoryAbility.jpg'),
  //   imageName: 'psychomotorAlertness',
  //   testDescription: '精神运动警觉度测试练习时间：20秒。随机呈现的刺激间隔为2-4秒。测试期间，请注视屏幕中的灰色区域，其中会随机闪现黑色方块。当黑色方块出现时，请点击灰色黑色区域中的任意位置。在确保正确反应的情况下，反应速度越快越好，练习结束后自动判断被试成绩。如您成绩达标，则说明您已经掌握测试规则，请点击开始按钮进入正式测试；否则请您认真阅读测试规则，点击重新练习按钮继续练习。',//如果小于0.5秒的反应次数占比超过60%则说明达标
  //   testNum: 0,
  //   type: '1',
  //   pageUrl:'CoginitiveTask',
  //   testExplain:'精神运动警觉度测试练习：60次。随机呈现的刺激间隔为2-12秒。测试期间，请注视屏幕中的灰色区域，其中会随机闪现黑色方块。当黑色方块出现时，请点击灰色黑色区域中的任意位置。在确保正确反应的情况下，反应速度越快越好。练习结束后会自动给出测试结果。'
  // },
  // {
  //   flag: '3',
  //   id: '2',
  //   taskCode:"ADDITION",
  //   //description: '在屏幕上不断呈现个位数的加法运算，测试者需要计算加法运算结果，并将计算结果的个位数点击数字键盘作为反馈。例如3+4，则测试者点击7作为反馈，然后进入下一题，4+5+9，测试者点击8作为反馈。连续加法的数字全部随机呈现，首先呈现两位加法，如果测试者连续回答对3道题，则升级为3个数字的加法，测试者如果连续答错两次，自动降级为2位数加法，如果连续答对三次，升级为4个数字的加法，难度升级和降级的规则以此类推。最高难度是6个数字的加法。测试时间为300秒。测试开始前有30秒的连续加法测试，随机呈现2个数字或3个数字的加法。需要记录的行为学指标包括，测试者完成的题目总数，总正确数，总分（总分计算方法如下图）。',
  //   description: '在屏幕上不断呈现个位数的加法运算，测试者需要计算加法运算结果，并将计算结果的个位数点击数字键盘作为反馈。例如3+4，则测试者点击7作为反馈，然后进入下一题，4+5+9，测试者点击8作为反馈。连续加法的数字全部随机呈现。测试时间为300秒。测试开始前有30秒的连续加法测试,如您已清楚测试规则，请点击\'进入练习测试\'按钮进行测试。',
  //   name: '连续加法测试',
  //   imageUrl: '',//,require('../../assets/congnitiveAblitity/continuousAddition.jpg'),
  //   imageName: 'continuousAddition',
  //   testDescription: '连续加法测试练习次数：2次两个数加法，2次三个数加法，2次四个数加法。练习结束后自动判断被试成绩，全部回答正确，说明您已掌握测试规则，请点击开始按钮，进入正式测试。否则请您认真阅读测试规则，点击重新练习按钮继续练习。',
  //   testNum: 0,
  //   type: '1' ,
  //   testExplain:'连续加法测试练习次数：2次两个数加法，2次三个数加法，2次四个数加法。练习结束后自动判断被试成绩，全部回答正确，则弹窗显示\'您已掌握测试规则，请点击开始按钮，进入正式测试\'。否则弹窗显示\'正确率不达标，点击”重新练习“按钮继续练\'。',
  //   pageUrl:'continueAdditionTask'
  // },
  // {
  //   flag: '4',
  //   id: '3',
  //   taskCode:"RIVEN",
  //   description: '瑞文智力测试是一种非文字智力测试，用以测验人的观察力及推理判断能力。每道测试题目中的图都缺少一部分，请您选其中一张小图填补在大图的空缺部分，使整个大图合理、完整。答题时间不要超过40分钟.',
  //   name: '瑞文智力测试',
  //   imageUrl: '',//require('../../assets/congnitiveAblitity/memoryAbility.jpg'),
  //   testDescription: '瑞文智力测试任务说明在本测试中，每次呈现的图片都缺少一部分，请你从下面的另外6个供选择的图片中挑选一块符合图案整体结构的图片填补上去，使整个大图合理、完整。如您已清楚测试规则，请点击“开始”按钮。',
  //   testNum: 0,
  //   type: '1',
  //   testExplain:'连续加法测试练习次数：2次两个数加法，2次三个数加法，2次四个数加法。练习结束后自动判断被试成绩，全部回答正确，则弹窗显示\'您已掌握测试规则，请点击开始按钮，进入正式测试\'。否则弹窗显示\'正确率不达标，点击”重新练习“按钮继续练\'。',
  //   pageUrl:'ruiWenTask'
  // },
  // {
  //   flag: '5',
  //   id: '4',
  //   taskCode:"GO_NO-GO",
  //   // description: 'Go/No-go任务一种共 4个组块，每两个组块间存在 8 秒的间隔休息时间。在每个组块中，屏幕上会连续呈现不同颜色的方块，每个方块呈现500ms，两个方块之间的时间间隔1000ms，没有方块呈现的空白期，在灰色背景中间显示一个小的白色十字。其中红色、蓝色、绿色的方块代表go信号，测试者需要点击屏幕上的按钮进行反应，反应速度越快越好（只有在刺激呈现后1000ms内点击的视为正确反应，超时和多次点击都视为错误反应）。黑色按钮代表no go信号，测试者不能点击按钮。对“no go”信号失抑制而按键的次数（错误反应次数）是反映冲动的重要参数。每个组块go信号共计54个方块（三种颜色每种16个），no go信号18个方块，每次测试随机排序所有方块。需要记录的行为学指标包括对Go信号响应的反应时和NoGo信号响应正确率。如您已清楚测试规则，请点击\'进入练习测试\'按钮进行测试。',
  //   description: '本测试共分四组，每两组之间有8秒的休息间隔。在每组测试中，屏幕上会不断出现不同颜色的方块。测试者需要在屏幕呈现红色、蓝色、绿色三种颜色方块的时候点击屏幕灰色区域内的任意位置进行反馈。如果屏幕上呈现的是黑色方块，则不能点击屏幕。在需要进行点击反馈的时候，不能多次点击屏幕，否则将被当做错误反应。如您已清楚测试规则，请点击\'进入练习测试\'按钮进行练习测试。',
  //   name: 'GO/NO-GO反应抑制测试',
  //   imageUrl: '',//require('../../assets/congnitiveAblitity/memoryAbility.jpg'),
  //   imageName: 'GoNogo',
  //   //testDescription: 'Go/No-Go反应抑制测试练习次数：1组测试。练习结束后自动判断被试成绩，Go和No-Go的反应正确率都超过90%，说明您已掌握测试规则，请点击开始按钮，进入正式测试。否则请您认真阅读测试规则，点击重新练习按钮继续练习。',
  //   testDescription: 'Go/No-Go反应抑制测试练习任务只有1组。练习结束后自动判断被试成绩。如您成绩达标，说明您已掌握测试规则，请点击开始按钮，进入正式测试。否则请您认真阅读测试规则，点击重新练习按钮继续练习。',
  //   testNum: 0,
  //   type: '1',
  //   pageUrl:'goNogoTask',
  //   testExplain:'Go/No-Go反应抑制测试任务说明本测试共分四组，每两组之间有8秒的休息间隔。在每组测试中，屏幕上会不断出现不同颜色的方块。测试者需要在屏幕呈现红色、蓝色、绿色三种颜色方块的时候点击屏幕灰色区域内的任意位置进行反馈。如果屏幕上呈现的是黑色方块，则不能点击屏幕。在需要进行点击反馈的时候，不能多次点击屏幕，否则将被当做错误反应。如您已清楚测试规则，请点击“正式测试”按钮。'
  // },
  // {
  //   flag: '6',
  //   id: '5',
  //   taskCode:"RHYTHM",
  //   // description: 'Go/No-go任务一种共 4个组块，每两个组块间存在 8 秒的间隔休息时间。在每个组块中，屏幕上会连续呈现不同颜色的方块，每个方块呈现500ms，两个方块之间的时间间隔1000ms，没有方块呈现的空白期，在灰色背景中间显示一个小的白色十字。其中红色、蓝色、绿色的方块代表go信号，测试者需要点击屏幕上的按钮进行反应，反应速度越快越好（只有在刺激呈现后1000ms内点击的视为正确反应，超时和多次点击都视为错误反应）。黑色按钮代表no go信号，测试者不能点击按钮。对“no go”信号失抑制而按键的次数（错误反应次数）是反映冲动的重要参数。每个组块go信号共计54个方块（三种颜色每种16个），no go信号18个方块，每次测试随机排序所有方块。需要记录的行为学指标包括对Go信号响应的反应时和NoGo信号响应正确率。如您已清楚测试规则，请点击\'进入练习测试\'按钮进行测试。',
  //   description: '跟随节拍同步敲击',
  //   name: '节奏诊断',
  //   imageUrl: '',//require('../../assets/congnitiveAblitity/memoryAbility.jpg'),
  //   imageName: 'GoNogo',
  //   //testDescription: 'Go/No-Go反应抑制测试练习次数：1组测试。练习结束后自动判断被试成绩，Go和No-Go的反应正确率都超过90%，说明您已掌握测试规则，请点击开始按钮，进入正式测试。否则请您认真阅读测试规则，点击重新练习按钮继续练习。',
  //   testDescription: 'Go/No-Go反应抑制测试练习任务只有1组。练习结束后自动判断被试成绩。如您成绩达标，说明您已掌握测试规则，请点击开始按钮，进入正式测试。否则请您认真阅读测试规则，点击重新练习按钮继续练习。',
  //   testNum: 0,
  //   type: '1',
  //   pageUrl:'RhythmDiagnosis',
  //   testExplain:'Go/No-Go反应抑制测试任务说明本测试共分四组，每两组之间有8秒的休息间隔。在每组测试中，屏幕上会不断出现不同颜色的方块。测试者需要在屏幕呈现红色、蓝色、绿色三种颜色方块的时候点击屏幕灰色区域内的任意位置进行反馈。如果屏幕上呈现的是黑色方块，则不能点击屏幕。在需要进行点击反馈的时候，不能多次点击屏幕，否则将被当做错误反应。如您已清楚测试规则，请点击“正式测试”按钮。'
  // },
  // {
  //   flag: '7',
  //   id: '6',
  //   taskCode:"SHAPE",
  //   // description: 'Go/No-go任务一种共 4个组块，每两个组块间存在 8 秒的间隔休息时间。在每个组块中，屏幕上会连续呈现不同颜色的方块，每个方块呈现500ms，两个方块之间的时间间隔1000ms，没有方块呈现的空白期，在灰色背景中间显示一个小的白色十字。其中红色、蓝色、绿色的方块代表go信号，测试者需要点击屏幕上的按钮进行反应，反应速度越快越好（只有在刺激呈现后1000ms内点击的视为正确反应，超时和多次点击都视为错误反应）。黑色按钮代表no go信号，测试者不能点击按钮。对“no go”信号失抑制而按键的次数（错误反应次数）是反映冲动的重要参数。每个组块go信号共计54个方块（三种颜色每种16个），no go信号18个方块，每次测试随机排序所有方块。需要记录的行为学指标包括对Go信号响应的反应时和NoGo信号响应正确率。如您已清楚测试规则，请点击\'进入练习测试\'按钮进行测试。',
  //   description: '接下来将为您呈现一系列图片，需要您判断图片中的鸭蛋尖朝向，朝左请按“朝左的箭头”，朝右请按“朝右的箭头”。实验中请直视屏幕中央的注视点，尽可能快速、准确地作答。若您准备好了请点击屏幕下方按键进入练习测试。',
  //   name: '形状知觉测试(自下而上)',
  //   imageUrl: require('../assets/congnitiveAblitity/duckEggTask.png'),
  //   imageName: 'SHAPE',
  //   //testDescription: 'Go/No-Go反应抑制测试练习次数：1组测试。练习结束后自动判断被试成绩，Go和No-Go的反应正确率都超过90%，说明您已掌握测试规则，请点击开始按钮，进入正式测试。否则请您认真阅读测试规则，点击重新练习按钮继续练习。',
  //   testDescription: '测试阶段共10张图片，练习结束后，若您已明白测试规则请按“正式测试”按钮进行正式测试。若您尚未明白测试规则请按“练习测试”按钮重新进行练习测试。',
  //   testNum: 0,
  //   type: '1',
  //   pageUrl:'ShapeIntuition',
  //   testExplain:''
  // },
  // {
  //   flag: '8',
  //   id: '7',
  //   taskCode:"MOVEMENT",
  //   // description: 'Go/No-go任务一种共 4个组块，每两个组块间存在 8 秒的间隔休息时间。在每个组块中，屏幕上会连续呈现不同颜色的方块，每个方块呈现500ms，两个方块之间的时间间隔1000ms，没有方块呈现的空白期，在灰色背景中间显示一个小的白色十字。其中红色、蓝色、绿色的方块代表go信号，测试者需要点击屏幕上的按钮进行反应，反应速度越快越好（只有在刺激呈现后1000ms内点击的视为正确反应，超时和多次点击都视为错误反应）。黑色按钮代表no go信号，测试者不能点击按钮。对“no go”信号失抑制而按键的次数（错误反应次数）是反映冲动的重要参数。每个组块go信号共计54个方块（三种颜色每种16个），no go信号18个方块，每次测试随机排序所有方块。需要记录的行为学指标包括对Go信号响应的反应时和NoGo信号响应正确率。如您已清楚测试规则，请点击\'进入练习测试\'按钮进行测试。',
  //   description: '72段随机点运动素材随机呈现。每段素材呈现的最长时间为5秒，两段素材之间间隔5秒。屏幕上呈现的随机运动点，整体运动趋势分为上下左右四个方向。键盘上的上下左右四个方向键分别对应随机点的四个运动方向，请仔细观察随机点的整体运动趋势，并按对应的方向键进行反馈。',
  //   name: '运动知觉测试',
  //   imageUrl: '',
  //   imageName: 'movementPerception',
  //   //testDescription: 'Go/No-Go反应抑制测试练习次数：1组测试。练习结束后自动判断被试成绩，Go和No-Go的反应正确率都超过90%，说明您已掌握测试规则，请点击开始按钮，进入正式测试。否则请您认真阅读测试规则，点击重新练习按钮继续练习。',
  //   testDescription: '测试阶段共8个素材，全部回答正确即可进入正式测试。如您已清楚测试规则，请点击\'开始测试\'按钮进行练习测试。',
  //   testNum: 0,
  //   type: '1',
  //   pageUrl:'movementPerception',
  //   testExplain:''
  // },
  // {
  //   flag: '9',
  //   id: '8',
  //   taskCode:"CDT",
  //   description: '请您画一个钟表盘面，并把表示时间的数字写在正确的位置，然后再画上分时针，把时间指到8点20分。',
  //   name: '画钟测试',
  //   imageUrl: '',
  //   imageName: 'DrawClock',
  //  // testDescription: '测试阶段共8个素材，全部回答正确即可进入正式测试。如您已清楚测试规则，请点击\'开始测试\'按钮进行练习测试。',
  //   testNum: 0,
  //   type: '1',
  //   pageUrl:'DrawClock',
  //   testExplain:''
  // },
  // {
  //   flag: '10',
  //   id: '9',
  //   taskCode:"ANT",
  //   // description: '在屏幕的中央有一个“*”注视点，箭头会在“+”号的上方或下方出现，请您在检查时一定注视着“+”号，有时候，我们会给出一些提示：“*”如果提示在中央或在“+”号的上方及下方同时出现，说明箭头马上出现；如果提示仅在“+”号的上方或下方出现，着说明箭头即将出现在提示的位置，当线索“*”出现时，它提示着箭头马上出现和出现的位置。检查共有4组，第一组是练习，大约2分钟。其余3组是正式检查，每组5分钟。每个检查期间有休息时间。如您已清楚测试规则，请点击\'进入练习测试\'按钮进行测试。',
  //   description: '这是一个检查注意力的测试。您将会在屏幕上看见箭头，它们指向左边或右边。您的任务是看见中间箭头指向左边时，立即按鼠标左键；同样，如果指向右侧，就按右键。请按的又快又准，电脑将自动记录您的反应时间和正确率。比如：<br>&emsp;&emsp;<pre>&#8594 &#8594 &#8594 &#8594 &#8594 按右键 <br>&emsp;&emsp;&#8594 &#8594 &#8592 &#8594 &#8594 按左键</pre><br>&emsp;&emsp;在屏幕的中央有一个“+”注视点，箭头会在“+”号的上方或下方出现。请您在检查时一直注视着+号。有时候，我们会给出一些提示“✱”如果提示在中央或在“+”号的上方及下方同时出现，说明箭头马上会出现；如果提示仅在“+”号的上方或下方出现，这说明箭头即将出现在提示的位置。当线索“*”出现时您应该注意，它提示着箭头马上出现和出现的位置。其它时间请尽量一直看着“+”号。',
  //   name: '注意力网络测试',
  //   imageUrl: '',
  //   imageName: 'ATTENTION_CHECK',
  //   //testDescription: '注意力检查测试阶段。练习结束后自动判断被试成绩，如果反应正确率都超过90%，说明您已掌握测试规则，请点击开始按钮，进入正式测试。否则请您认真阅读测试规则，点击重新练习按钮继续练习。',
  //   testDescription: '检查共有四组。第一组是练习，大约2分钟。其余三组是正式检查，每组5分钟。每个检查间有休息时间。请点击开始按钮，开始练习。',
  //   testNum: 0,
  //   type: '1',
  //   pageUrl:'AttentionCheck',
  //   testExplain:''
  // },
  // {
  //   flag: '11',
  //   id: '10',
  //   //表示进入的测试的id号
  //   taskCode:"MOCA",
  //   // description: 'Go/No-go任务一种共 4个组块，每两个组块间存在 8 秒的间隔休息时间。在每个组块中，屏幕上会连续呈现不同颜色的方块，每个方块呈现500ms，两个方块之间的时间间隔1000ms，没有方块呈现的空白期，在灰色背景中间显示一个小的白色十字。其中红色、蓝色、绿色的方块代表go信号，测试者需要点击屏幕上的按钮进行反应，反应速度越快越好（只有在刺激呈现后1000ms内点击的视为正确反应，超时和多次点击都视为错误反应）。黑色按钮代表no go信号，测试者不能点击按钮。对“no go”信号失抑制而按键的次数（错误反应次数）是反映冲动的重要参数。每个组块go信号共计54个方块（三种颜色每种16个），no go信号18个方块，每次测试随机排序所有方块。需要记录的行为学指标包括对Go信号响应的反应时和NoGo信号响应正确率。如您已清楚测试规则，请点击\'进入练习测试\'按钮进行测试。',
  //   description: '蒙特利尔认知评估量表（MoCA）是一个用来对轻度认知功能损害（MCI）进行快速筛查的评定工具。量表已在高教育程度老年人（平均教育年限 13 年）中验证其发现 MCI 患者及鉴别患者与健康老年人的能力。但量表中许多项目受教育程度影响较大。故我们设计了用于筛查文盲和低教育程度人群 MCI 的新版 MoCA（蒙特利尔认知评估基础量表，MoCA-B）。MoCA-B 与原版 MoCA 评估相同的认知领域：执行功能、语言、定向、计算、抽象思维、记忆、视知觉（而不是视结构技能）、注意和集中。MoCA-B 测试时间约 15 分钟，总分 30 分。',
  //   //显示的介绍详情
  //   name: '蒙特利尔认知评估量表（MoCA）',
  //   //显示的名称
  //   imageUrl: '',
  //   imageName: 'MOCA',
  //   //testDescription: 'Go/No-Go反应抑制测试练习次数：1组测试。练习结束后自动判断被试成绩，Go和No-Go的反应正确率都超过90%，说明您已掌握测试规则，请点击开始按钮，进入正式测试。否则请您认真阅读测试规则，点击重新练习按钮继续练习。',
  //   testDescription: '十道题。',
  //   testNum: 0,
  //   //测试人数
  //   type: '1',
  //   pageUrl:'moca',
  //   testExplain:''
  // },
  // {
  //   flag: '12',
  //   id: '11',
  //   //表示进入的测试的id号
  //   taskCode:"MMSE",
  //   // description: 'Go/No-go任务一种共 4个组块，每两个组块间存在 8 秒的间隔休息时间。在每个组块中，屏幕上会连续呈现不同颜色的方块，每个方块呈现500ms，两个方块之间的时间间隔1000ms，没有方块呈现的空白期，在灰色背景中间显示一个小的白色十字。其中红色、蓝色、绿色的方块代表go信号，测试者需要点击屏幕上的按钮进行反应，反应速度越快越好（只有在刺激呈现后1000ms内点击的视为正确反应，超时和多次点击都视为错误反应）。黑色按钮代表no go信号，测试者不能点击按钮。对“no go”信号失抑制而按键的次数（错误反应次数）是反映冲动的重要参数。每个组块go信号共计54个方块（三种颜色每种16个），no go信号18个方块，每次测试随机排序所有方块。需要记录的行为学指标包括对Go信号响应的反应时和NoGo信号响应正确率。如您已清楚测试规则，请点击\'进入练习测试\'按钮进行测试。',
  //   description: '1975年Polstein等设计了一个用于评定老年人认知功能障碍等级的量表，并且被用于检查Alzheimer病早老性痴呆和治疗的效果，但是对于治疗后的改变其敏感性查。此量表因为设计合理，应用广泛和简洁，是一声很好的选择。',
  //   //显示的介绍详情
  //   name: '简易精神状态检查表（Mini-Mental State Examination On MMSE）',
  //   //显示的名称
  //   imageUrl: '',
  //   imageName: 'MMSE',
  //   //testDescription: 'Go/No-Go反应抑制测试练习次数：1组测试。练习结束后自动判断被试成绩，Go和No-Go的反应正确率都超过90%，说明您已掌握测试规则，请点击开始按钮，进入正式测试。否则请您认真阅读测试规则，点击重新练习按钮继续练习。',
  //   testDescription: 'MMSE。',
  //   testNum: 0,
  //   //测试人数
  //   type: '1',
  //   pageUrl:'MMSE',
  //   testExplain:''
  // },

  // {
  //   flag: '13',
  //   id: '12',
  //   //表示进入的测试的id号
  //   taskCode:"RTC",
  //   description: '记忆检查分为即时测试和延时测试两部分，请注意完成即时测试后要在30分钟之后完成延时测试。',
  //   name: '记忆检查测试',
  //   //显示的名称
  //   imageUrl: '',
  //   testDescription: '记忆检查分为即时测试和延时测试两部分，请一一作答',
  //   testNum: 0,
  //   //测试人数
  //   type: '1',
  //   pageUrl:'RecallTest',
  //   testExplain:''
  // },
  // {
  //   flag: '14',
  //   id: '11',
  //   taskCode:"SHAPE2",
  //   // description: 'Go/No-go任务一种共 4个组块，每两个组块间存在 8 秒的间隔休息时间。在每个组块中，屏幕上会连续呈现不同颜色的方块，每个方块呈现500ms，两个方块之间的时间间隔1000ms，没有方块呈现的空白期，在灰色背景中间显示一个小的白色十字。其中红色、蓝色、绿色的方块代表go信号，测试者需要点击屏幕上的按钮进行反应，反应速度越快越好（只有在刺激呈现后1000ms内点击的视为正确反应，超时和多次点击都视为错误反应）。黑色按钮代表no go信号，测试者不能点击按钮。对“no go”信号失抑制而按键的次数（错误反应次数）是反映冲动的重要参数。每个组块go信号共计54个方块（三种颜色每种16个），no go信号18个方块，每次测试随机排序所有方块。需要记录的行为学指标包括对Go信号响应的反应时和NoGo信号响应正确率。如您已清楚测试规则，请点击\'进入练习测试\'按钮进行测试。',
  //   description: '接下来将为您呈现一系列图片，需要您判断图片中的鸭蛋尖朝向，朝左请按“朝左的箭头”，朝右请按“朝右的箭头”。实验中请保持直视屏幕，尽可能快速、准确地作答。若您准备好了请点击屏幕下方按键进入练习测试。',
  //   name: '形状知觉测试(自上而下)',
  //   imageUrl: require('../assets/congnitiveAblitity/duckEggTask.png'),
  //   imageName: 'SHAPE',
  //   //testDescription: 'Go/No-Go反应抑制测试练习次数：1组测试。练习结束后自动判断被试成绩，Go和No-Go的反应正确率都超过90%，说明您已掌握测试规则，请点击开始按钮，进入正式测试。否则请您认真阅读测试规则，点击重新练习按钮继续练习。',
  //   testDescription: '测试阶段共10张图片，练习结束后，若您已明白测试规则请按“正式测试”按钮进行正式测试。若您尚未明白测试规则请按“练习测试”按钮重新进行练习测试。',
  //   testNum: 0,
  //   type: '1',
  //   pageUrl:'ShapeIntuition2',
  //   testExplain:''
  // }
  // {
  //   flag: '15',
  //   id: '14',
  //   //表示进入的测试的id号
  //   taskCode:"BIC",
  //   //description: 'Go/No-go任务一种共 4个组块，每两个组块间存在 8 秒的间隔休息时间。在每个组块中，屏幕上会连续呈现不同颜色的方块，每个方块呈现500ms，两个方块之间的时间间隔1000ms，没有方块呈现的空白期，在灰色背景中间显示一个小的白色十字。其中红色、蓝色、绿色的方块代表go信号，测试者需要点击屏幕上的按钮进行反应，反应速度越快越好（只有在刺激呈现后1000ms内点击的视为正确反应，超时和多次点击都视为错误反应）。黑色按钮代表no go信号，测试者不能点击按钮。对“no go”信号失抑制而按键的次数（错误反应次数）是反映冲动的重要参数。每个组块go信号共计54个方块（三种颜色每种16个），no go信号18个方块，每次测试随机排序所有方块。需要记录的行为学指标包括对Go信号响应的反应时和NoGo信号响应正确率。如您已清楚测试规则，请点击\'进入练习测试\'按钮进行测试。',
  //   description: '欢迎参加听觉测试。',
  //   //显示的介绍详情
  //   name: '听觉测试',
  //   //显示的名称
  //   imageUrl: '',
  //   imageName: 'listenTest',
  //   //testDescription: 'Go/No-Go反应抑制测试练习次数：1组测试。练习结束后自动判断被试成绩，Go和No-Go的反应正确率都超过90%，说明您已掌握测试规则，请点击开始按钮，进入正式测试。否则请您认真阅读测试规则，点击重新练习按钮继续练习。',
  //   testDescription: '欢迎参加本次实验，您将听到一系列声音组合，来自声音1和声音2，如果是声音1+声音2，请按鼠标右键；如果是声音2+声音1，请按鼠标左键，请确保每次答题尽量准确快速。',
  //   testNum: 0,
  //   //测试人数
  //   type: '1',
  //   pageUrl:'listenTest',
  //   testExplain:''
  // },
  // {
  //   flag: '16',
  //   id: '15',
  //   //表示进入的测试的id号
  //   taskCode:"MemoryTest",
  //   description: '欢迎参工作记忆检查测试',
  //   name: '记忆测试检查（空间记忆版）',
  //   //显示的名称
  //   imageUrl: '',
  //   testDescription: '屏幕中央网格中会随机出现一个图形，请你判断当前网格中出现的图形及其所在位置和前面一张网格图片中出现的图形及其所在位置是否相同？如果相同，请按下鼠标左键；如果不同，请按下鼠标右键。要求反应又快又对，测试将分' +
  //       '两段进行，如果练习测试正确率大于等于60％，则可以参加正式测试。',
  //   testNum: 0,
  //   //测试人数
  //   type: '1',
  //   pageUrl:'memoryTest',
  //   testExplain:''
  // },
    {
      flag: '17',
      id: '16',
      //表示进入的测试的id号
      taskCode:"ETBexperiment_new",
      description: '请你注视眼前屏幕，注视点“+”过后，你将陆续看到一些表情图片，请你想象在看到他人对你做出这种表情时，他有着什么样的情绪。请尽快和尽可能准确的作出判断，并按下相应按键。【按键为：开心、害怕、生气、厌恶、悲伤以及惊讶】。',
      name: '人脸情绪识别任务',
      //显示的名称
      imageUrl: '',
      testDescription: '请你注视眼前屏幕，注视点“+”过后，你将陆续看到一些表情图片，请你想象在看到他人对你做出这种表情时，他有着什么样的情绪。请尽快和尽可能准确的作出判断，并按下相应按键。【按键为：开心、害怕、生气、厌恶、悲伤以及惊讶】。',
      testNum: 0,
      //测试人数
      type: '1',
      pageUrl:'',
      testExplain:''
    }

]

//call interface 




 
export default cognitiveAbilityTaskList


// 箭头列表
const lllll = '&#8592 &#8592 &#8592 &#8592 &#8592';
const rrrrr = '&#8594 &#8594 &#8594 &#8594 &#8594';
const rrlrr = '&#8594 &#8594 &#8592 &#8594 &#8594';
const llrll = '&#8592 &#8592 &#8594 &#8592 &#8592';
const ooloo = '—      —      &#8592 —      —';
const ooroo = '—      —      &#8594 —      —';
const arrowList = [
    // &#8592为向左的箭头 &#8594为向右的箭头 ，cue表示线索出现的位置，no表示没有*，up表示上方，down表示下方，
    // center中间，double表示上下都有
    // position表示箭头出现的位置，up表示上方，down表示下方
    { arrow: lllll, id: 0, answer: 'L', pattern: 'lllll', cue: 'no', position: 'up' },
    { arrow: rrrrr, id: 1, answer: 'R', pattern: 'rrrrr', cue: 'no', position: 'up' },
    { arrow: rrlrr, id: 2, answer: 'L', pattern: 'rrlrr', cue: 'no', position: 'up' },
    { arrow: llrll, id: 3, answer: 'R', pattern: 'llrll', cue: 'no', position: 'up' },
    { arrow: ooloo, id: 4, answer: 'L', pattern: 'ooloo', cue: 'no', position: 'up' },
    { arrow: ooroo, id: 5, answer: 'R', pattern: 'ooroo', cue: 'no', position: 'up' },

    { arrow: lllll, id: 6, answer: 'L', pattern: 'lllll', cue: 'no', position: 'down' },
    { arrow: rrrrr, id: 7, answer: 'R', pattern: 'rrrrr', cue: 'no', position: 'down' },
    { arrow: rrlrr, id: 8, answer: 'L', pattern: 'rrlrr', cue: 'no', position: 'down' },
    { arrow: llrll, id: 9, answer: 'R', pattern: 'llrll', cue: 'no', position: 'down' },
    { arrow: ooloo, id: 10, answer: 'L', pattern: 'ooloo', cue: 'no', position: 'down' },
    { arrow: ooroo, id: 11, answer: 'R', pattern: 'ooroo', cue: 'no', position: 'down' },

    { arrow: lllll, id: 12, answer: 'L', pattern: 'lllll', cue: 'center', position: 'up' },
    { arrow: rrrrr, id: 13, answer: 'R', pattern: 'rrrrr', cue: 'center', position: 'up' },
    { arrow: rrlrr, id: 14, answer: 'L', pattern: 'rrlrr', cue: 'center', position: 'up' },
    { arrow: llrll, id: 15, answer: 'R', pattern: 'llrll', cue: 'center', position: 'up' },
    { arrow: ooloo, id: 16, answer: 'L', pattern: 'ooloo', cue: 'center', position: 'up' },
    { arrow: ooroo, id: 17, answer: 'R', pattern: 'ooroo', cue: 'center', position: 'up' },

    { arrow: lllll, id: 18, answer: 'L', pattern: 'lllll', cue: 'center', position: 'down' },
    { arrow: rrrrr, id: 19, answer: 'R', pattern: 'rrrrr', cue: 'center', position: 'down' },
    { arrow: rrlrr, id: 20, answer: 'L', pattern: 'rrlrr', cue: 'center', position: 'down' },
    { arrow: llrll, id: 21, answer: 'R', pattern: 'llrll', cue: 'center', position: 'down' },
    { arrow: ooloo, id: 22, answer: 'L', pattern: 'ooloo', cue: 'center', position: 'down' },
    { arrow: ooroo, id: 23, answer: 'R', pattern: 'ooroo', cue: 'center', position: 'down' },

    { arrow: lllll, id: 24, answer: 'L', pattern: 'lllll', cue: 'double', position: 'up' },
    { arrow: rrrrr, id: 25, answer: 'R', pattern: 'rrrrr', cue: 'double', position: 'up' },
    { arrow: rrlrr, id: 26, answer: 'L', pattern: 'rrlrr', cue: 'double', position: 'up' },
    { arrow: llrll, id: 27, answer: 'R', pattern: 'llrll', cue: 'double', position: 'up' },
    { arrow: ooloo, id: 28, answer: 'L', pattern: 'ooloo', cue: 'double', position: 'up' },
    { arrow: ooroo, id: 29, answer: 'R', pattern: 'ooroo', cue: 'double', position: 'up' },

    { arrow: lllll, id: 30, answer: 'L', pattern: 'lllll', cue: 'double', position: 'down' },
    { arrow: rrrrr, id: 31, answer: 'R', pattern: 'rrrrr', cue: 'double', position: 'down' },
    { arrow: rrlrr, id: 32, answer: 'L', pattern: 'rrlrr', cue: 'double', position: 'down' },
    { arrow: llrll, id: 33, answer: 'R', pattern: 'llrll', cue: 'double', position: 'down' },
    { arrow: ooloo, id: 34, answer: 'L', pattern: 'ooloo', cue: 'double', position: 'down' },
    { arrow: ooroo, id: 35, answer: 'R', pattern: 'ooroo', cue: 'double', position: 'down' },

    { arrow: lllll, id: 36, answer: 'L', pattern: 'lllll', cue: 'up', position: 'up' },
    { arrow: rrrrr, id: 37, answer: 'R', pattern: 'rrrrr', cue: 'up', position: 'up' },
    { arrow: rrlrr, id: 38, answer: 'L', pattern: 'rrlrr', cue: 'up', position: 'up' },
    { arrow: llrll, id: 39, answer: 'R', pattern: 'llrll', cue: 'up', position: 'up' },
    { arrow: ooloo, id: 40, answer: 'L', pattern: 'ooloo', cue: 'up', position: 'up' },
    { arrow: ooroo, id: 41, answer: 'R', pattern: 'ooroo', cue: 'up', position: 'up' },

    { arrow: lllll, id: 42, answer: 'L', pattern: 'lllll', cue: 'down', position: 'down' },
    { arrow: rrrrr, id: 43, answer: 'R', pattern: 'rrrrr', cue: 'down', position: 'down' },
    { arrow: rrlrr, id: 44, answer: 'L', pattern: 'rrlrr', cue: 'down', position: 'down' },
    { arrow: llrll, id: 45, answer: 'R', pattern: 'llrll', cue: 'down', position: 'down' },
    { arrow: ooloo, id: 46, answer: 'L', pattern: 'ooloo', cue: 'down', position: 'down' },
    { arrow: ooroo, id: 47, answer: 'R', pattern: 'ooroo', cue: 'down', position: 'down' },
]





export { cognitiveAbilityTaskList, arrowList }
