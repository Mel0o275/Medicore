import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import MyTable from "../ProductDetails/MyTable";
import ReviewSection from "../ProductDetails/ReviewSection";

export default function MyTab({ page, reviews = [], productTitle }) {
  const [value, setValue] = React.useState("1");
  const tabs = {
    about: ["Development", "Qualified Team", "Strategy"],
    details: ["Description", "Reviews"],
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="border-[0.1px] border-stone-200 text-stone-500">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered
              sx={{
                "& .MuiTabs-flexContainer": {
                  justifyContent: "center",
                },
                "@media (max-width: 640px)": {
                  "& .MuiTabs-flexContainer": {
                    justifyContent: "flex-start",
                  },
                },

                "& .MuiTab-root.Mui-selected": {
                  color: "#00a297",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#00a297",
                },
              }}
            >
              {page === "about" &&
                tabs.about.map((tab, index) => (
                  <Tab
                    key={index}
                    label={tab}
                    value={(index + 1).toString()}
                    sx={{ fontWeight: "bold" }}
                  />
                ))}
              {page === "details" &&
                tabs.details.map((tab, index) => (
                  <Tab
                    key={index}
                    label={tab}
                    value={(index + 1).toString()}
                    sx={{ fontWeight: "bold" }}
                  />
                ))}
            </TabList>
          </Box>
          {page === "about" && (
            <>
              {" "}
              <TabPanel value="1">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source. Lorem
                Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
                Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
                written in 45 BC. This book is a treatise on the theory of
                ethics, very popular during the Renaissance. The first line of
                Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line
                in section 1.10.32.
                <br /> The standard chunk of Lorem Ipsum used since the 1500s is
                reproduced below for those interested. Sections 1.10.32 and
                1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
                reproduced in their exact original form, accompanied by English
                versions from the 1914 translation by H. Rackham.
              </TabPanel>
              <TabPanel value="2">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn't anything embarrassing
                hidden in the middle of text. All the Lorem Ipsum generators on
                the Internet tend to repeat predefined chunks as necessary,
                making this the first true generator on the Internet. It uses a
                dictionary of over 200 Latin words, combined with a handful of
                model sentence structures, to generate Lorem Ipsum which looks
                reasonable. The generated Lorem Ipsum is therefore always free
                from repetition, injected humour, or non-characteristic words
                etc.
              </TabPanel>
              <TabPanel value="3">
                <span className="font-semibold">Lorem Ipsum</span> is simply
                dummy text of the printing and typesetting industry. Lorem Ipsum
                has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not
                only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised
                in the 1960s with the release of Letraset sheets containing
                Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
              </TabPanel>
            </>
          )}
          {page === "details" && (
            <>
              <TabPanel value="1" className="flex flex-col gap-5">
                <MyTable name="general information" />
                <MyTable name="product information" />
              </TabPanel>
              <TabPanel value={"2"}>
                <ReviewSection reviews={reviews} productTitle={productTitle} />
              </TabPanel>
            </>
          )}
        </TabContext>
      </Box>
    </div>
  );
}
