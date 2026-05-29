
import { maskedTheme } from "@/styles/MaskedThemes/MaskedThemes";
import { Toaster } from "react-hot-toast";

export default function ToasterApp() {
  return (
    <div>
      <Toaster
        position="top-center"
        containerStyle={{
          top: 85,
        }}
        toastOptions={{
          duration: 4000,
          style: {
            background: `${maskedTheme.colors.baseBlue.base}`,
            color: `${maskedTheme.colors.baseBlue.light40}`,
            borderRadius: `${maskedTheme.radius.md}`,
            padding: `${maskedTheme.spacing.sm} ${maskedTheme.spacing.md}`,
            fontSize: `${maskedTheme.fontSize.sm}`,
          },
          iconTheme: {
            primary: `${maskedTheme.colors.baseBlue.light40}`,
            secondary: `${maskedTheme.colors.baseBlue.dark}`,
          },
          error: {
            style: {
              background: `${maskedTheme.colors.baseRed.base}`,
              color: `${maskedTheme.colors.baseRed.light40}`,
            },
            iconTheme: {
              primary: `${maskedTheme.colors.baseRed.light40}`,
              secondary: `${maskedTheme.colors.baseRed.dark}`,
            },
          },
        }}
      />
    </div>
  );
}

