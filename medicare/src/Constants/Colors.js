// export const darkNavyPalette = {
//   black: "#050608",        // أسود ناعم (مش حاد)
//   darkest: "#0A0F1E",      // أسود كحلي غامق جدًا
//   darker: "#0F172A",       // كحلي غامق (ممتاز للـ body)
//   dark: "#111827",         // كحلي شائع (cards)
//   base: "#1E293B",         // كحلي متوسط
//   soft: "#273449",         // كحلي فاتح شوية
//   border: "#334155",       // للـ borders / dividers
//   mutedText: "#94A3B8",    // نص ثانوي
//   text: "#E5E7EB",         // نص أساسي
// };

// dark-theme {
//     --White: #1e293b;
//     --Heading :#94a3b8: #94a3b8;
//     --Input: #324055;
//     --Body-Text: #fff;
//     --Note: #95989d;
//     --Stroke: #283548;
//     --bg-table: #28354852;
//     --bg-table-1: #28354852;
//     --hv-item: #ffffff24;
//     background: rgb(15, 23, 42);
// }

const primaryColor = "#00a297";
const secondaryColor = "#33B8AC";
const primaryText = "#00B285";
const secondaryText = "#101010";

/*
#33B8AC
#008578
#009BB8
#00B285


*/

export const arrOfColors = [
  {
    name: "Default",
    primaryColor: "#33B8AC",
    secondaryColor: "#008578",
    primaryText: "#008578",
    secondaryText: "#00B285",
    darkTheme: "#0F172A", // darker (body)
  },
  {
    name: "Green",
    primaryColor: "#9eed4c",
    secondaryColor: "#68edcb",
    primaryText: "#ff40a8",
    secondaryText: "#00f9ff",
    darkTheme: "#111827", // dark (neutral + مريح)
  },
  {
    name: "Violate",
    primaryColor: "#cd78e9",
    secondaryColor: "#ffa975",
    primaryText: "#ffd162",
    secondaryText: "#007e9c",
    darkTheme: "#0A0F1E", // darkest (لايق مع البنفسجي)
  },
  {
    name: "Orange",
    primaryColor: "#ffc20e",
    secondaryColor: "#fcd5ce",
    primaryText: "#94021d",
    secondaryText: "#ed6d50",
    darkTheme: "#111827", // dark (يوازن البرتقاني)
  },
  {
    name: "Blue",
    primaryColor: "#3b3bb1",
    secondaryColor: "#e0aaff",
    primaryText: "#9f86c0",
    secondaryText: "#480ca8",
    darkTheme: "#0A0F1E", // darkest (blue + navy perfect)
  },
  {
    name: "Red",
    primaryColor: "#880D1E",
    secondaryColor: "#dd2d4a",
    primaryText: "#F26A8D",
    secondaryText: "#cbeef3",
    darkTheme: "#0F172A", // darker (يهدّي الأحمر)
  },
  {
    name: "Light violate",
    primaryColor: "#b58db6",
    secondaryColor: "#ad6a6c",
    primaryText: "#5d2e46",
    secondaryText: "#2d355c",
    darkTheme: "#1E293B", // base (soft dark)
  },
  {
    name: "Silver",
    primaryColor: "#465979",
    secondaryColor: "#a3abbd",
    primaryText: "#f3f4f6",
    secondaryText: "#5c6289",
    darkTheme: "#111827", // dark (أنسب للـ silver)
  },
];

export { primaryColor, secondaryColor, primaryText, secondaryText };
