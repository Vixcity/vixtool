# vixtool

一个JavaScript库

vixtool 作为 Vixcity 工具，作者是 Vixcity

简体中文 | [English](https://github.com/Vixcity/vixtool/blob/master/README.md) 

## 安装

```bash
npm i --save vixtool

# 或者

 yarn add --save vixtool
```

## 使用方法

```js
import vixtool from 'vixtool';

console.log(vixtool)
```

有关更多详细信息，情查看[源码](https://github.com/Vixcity/vixtool)。

## 更新说明

- 添加了更多的函数
- 添加了单元测试

## 待办事项

- 更多的函数
  ...
- 更多的案例
  - [ ] utils
  - [ ] date
  - [ ] number
  - [ ] string
  - [ ] url
  - [ ] object
  - [ ] array
  - [ ] random
  ...
- 创建文档网站
  ...

## 已完成事项

- [x] 创建一个中文版的README.md
- [x] 发布一个npm包
- [x] array/object/date/number/string/utils/url/random 单元测试
- [x] 已完成的函数
  - [x] array
    - [x] sortArrayByProperty,
    - [x] groupByAndNest,
    - [x] uniqueArray,
    - [x] filterArray,
  - [x] object
    - [x] shallowClone,
    - [x] deepClone,
  - [x] url
    - [x] parseUrl,
    - [x] parseQueryParams,
  - [x] date
    - [x] formatDate,
    - [x] formatAMPM,
    - [x] format12Hour,
    - [x] isLeapYear,
    - [x] calculateMonthsYearsDifference,
    - [x] calculateDateDifference,
    - [x] parseDate,
    - [x] getToday,
    - [x] getBeforeOrAfterDate,
    - [x] getYearRange,
    - [x] getSevenDaysInfo,
  - [x] number
    - [x] convertNumberToWords,
    - [x] convertToChineseUpperCase,
    - [x] separateNumberByThousands,
    - [x] convertToRomanNumerals,
    - [x] convertRomanToInteger,
  - [x] string
    - [x] hyphenatedToLowerCamelCase,
    - [x] hyphenatedToUpperCamelCase,
    - [x] camelCaseToHyphenated,
    - [x] generateRandomString,
    - [x] capitalizeWords,
    - [x] countChars,
  - [x] utils
    - [x] deepCompare,
    - [x] isObject,
    - [x] isArray,
    - [x] isNaN,
    - [x] type,
    - [x] checkValueInCollection,
    - [x] prettyLog,
    - [x] isEmpty,
  - [x] random
    - [x] getRandomString,
    - [x] getRandomNum,
    - [x] getRandomFloat,
    - [x] getRandomElement,
    - [x] getRandomBool,
    - [x] getRandomColor,
    - [x] getRandomUUID,
    - [x] shuffleArray,
    - [x] getRandomDate,
    - [x] getRandomTimestamp,
    - [x] getRandomEnum,
    - [x] getRandomBinary,
    - [x] getRandomHex,
