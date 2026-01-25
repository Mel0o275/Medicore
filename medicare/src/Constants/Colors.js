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
    primaryColor,
    secondaryColor,
    primaryText,
    secondaryText,
    darkTheme: "#0F172A", 
  },
  {
    name: "Green",
    primaryColor: "#9EED4C",
    secondaryColor: "#68EDCB",
    primaryText: "#14532D",   // deep green
    secondaryText: "#166534",
    darkTheme: "#0F172A",
  },

  {
    name: "Violet",
    primaryColor: "#C77DFF",
    secondaryColor: "#FFB703",
    primaryText: "#3B0764",   // dark violet (not black)
    secondaryText: "#5B21B6",
      darkTheme: "#0F172A", 
  },

  {
    name: "Orange",
    primaryColor: "#FBBF24",
    secondaryColor: "#FED7AA",
    primaryText: "#7C2D12",   // warm brown-red
    secondaryText: "#9A3412",
    darkTheme: "#0F172A", 
  },

  {
    name: "Blue",
    primaryColor: "#4F46E5",
    secondaryColor: "#C7D2FE",
    primaryText: "#1E3A8A",   // deep blue (better than white)
    secondaryText: "#1D4ED8",
     darkTheme: "#0F172A", 
  },

  {
    name: "Red",
    primaryColor: "#9F1239",
    secondaryColor: "#FB7185",
    primaryText: "#7F1D1D",   // dark red
    secondaryText: "#991B1B",
    darkTheme: "#0F172A", 
  },

  {
    name: "Soft",
    primaryColor: "#C4A1D8",
    secondaryColor: "#E9D5FF",
    primaryText: "#3B0764",   // soft but readable
    secondaryText: "#6B21A8",
     darkTheme: "#0F172A", 
  },

  {
    name: "Silver",
    primaryColor: "#64748B",
    secondaryColor: "#CBD5E1",
    primaryText: "#334155",   // slate gray (not white)
    secondaryText: "#475569",
      darkTheme: "#0F172A", 
  },
];

export { primaryColor, secondaryColor, primaryText, secondaryText };
