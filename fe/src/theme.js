export const tokensDark = {
    background: "#F6F5FC",
    primary: {
        100: "#d2e5e5",
        200: "#a4caca",
        300: "#77b0b0",
        400: "#499595",
        500: "#1c7b7b",
        600: "#166262",
        700: "#114a4a",
        800: "#0b3131",
        900: "#061919"
    },
    grey: {
        100: "#d3d3d3",
        200: "#a7a7a7",
        300: "#7a7a7a",
        400: "#4e4e4e",
        500: "#222222",
        600: "#1b1b1b",
        700: "#141414",
        800: "#0e0e0e",
        900: "#070707",
    },
    red: {
        100: "#fedcdc",
        200: "#feb9b9",
        300: "#fd9696",
        400: "#fd7373",
        500: "#fc5050",
        600: "#ca4040",
        700: "#973030",
        800: "#652020",
        900: "#321010"
    },
    secondary: {
        100: "#e6f3df",
        200: "#cde7bf",
        300: "#b3dca0",
        400: "#9ad080",
        500: "#81c460",
        600: "#679d4d",
        700: "#4d763a",
        800: "#344e26",
        900: "#1a2713"
    },

}


// function that reverses the color palette
function reverseTokens(tokensDark) {
    const reversedTokens = {};
    Object.entries(tokensDark).forEach(([key, val]) => {
        const keys = Object.keys(val);
        const values = Object.values(val);
        const length = keys.length;
        const reversedObj = {};
        for (let i = 0; i < length; i++) {
            reversedObj[keys[i]] = values[length - i - 1];
        }
        reversedTokens[key] = reversedObj;
    });
    return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);




//MUI Theme Settings

export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    // palette values for dark mode
                    primary: {
                        ...tokensDark.primary,
                        main: tokensDark.primary[500],
                        light: tokensDark.primary[400],
                    },
                    secondary: {
                        ...tokensDark.secondary,
                        main: tokensDark.secondary[300],
                    },
                    neutral: {
                        ...tokensDark.grey,
                        main: tokensDark.grey[500],
                    },
                    background: {
                        default: tokensDark.grey[100],
                        alt: tokensDark.grey[500],
                    },
                    red: {
                        ...tokensDark.red
                    }
                }
                : {
                    // palette values for light mode
                    primary: {
                        ...tokensLight.primary,
                        main: tokensDark.grey[100],
                        light: tokensDark.grey[200],
                    },
                    secondary: {
                        ...tokensLight.secondary,
                        main: tokensDark.secondary[600],
                        light: tokensDark.secondary[700],
                    },
                    neutral: {
                        ...tokensLight.grey,
                        main: tokensDark.grey[500],
                    },
                    background: {
                        default: tokensDark.grey[100],
                        alt: tokensDark.grey[200],
                    },
                    red: {
                        ...tokensDark.red
                    }
                }),
        },
        typography: {
            fontFamily: ["Rubik", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    }
}