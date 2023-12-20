import { ConfigProvider } from "antd";
import { ReactNode } from "react";

interface IThemeProvider {
  children: ReactNode;
}
//

const ThemeProvider = ({ children }: IThemeProvider) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          // colorPrimary: '#edbe6f',
          // colorBgBase: '#edbe6f',
          fontSize: 16,
          colorBgContainer: "#fff",
        },
        components: {
          Layout: {
            headerBg: "#eee",
            headerColor: "#333",
            bodyBg: "#eee",
            siderBg: "#191F2F",
            footerBg: "#f3f3f3",
            lightSiderBg: "red",
            triggerBg: "#fff",
            triggerColor: "#333",
          },
          Menu: {
            colorLinkActive: "red",
            itemSelectedBg: "#c48c46",
            itemSelectedColor: "#fff",
            activeBarBorderWidth: 0,
          },
          Select: {
            optionFontSize: 12,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
