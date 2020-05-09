const colorWhite = '#ffffff'
const colorBlack = '#151515'
const colorGrey = '#242728'
const colorPurple = '#6457e3'
const colorPink = '#ad64e6'
const colorBlue = '#0271c4'
const colorCian = '#0cecf2'
const colorGreyLight = '#e6e6e6'

export default {
		StyleGuide: {
			root: {
				color: colorGrey,
				background: colorGreyLight
			},
			logo: {
				isolated: false,
                padding: [[30, 15, 25, 15]],
				borderBottom: '1px solid ' + colorBlack
            },
            sidebar: {
				width: '260px',
                background: colorGrey,
                '& a': {
                    color: [colorWhite, '!important'],
                    fontWeight: ['bold', '!important']
                },
                '& a:hover': {
                    color: [colorPink, '!important'],
					cursor: ['pointer', '!important'],
					transition: 'color 250ms ease-out'
                }
			},
			content: {
				paddingLeft: 50
			}
		},
		Version: {
			version: {
				isolated: false,
				color: [colorPurple, '!important'],
				width: '50px',
				'margin-top': '15px !important',
				margin: '0 auto !important',
				'text-align': 'center',
				padding: [[4, 8, 5]],
				fontWeight: 'normal',
				lineHeight: 1,
				border: [[1, 'solid', colorPurple]],
				textTransform: 'uppercase',
				fontSize: '12px',
				letterSpacing: '1px',
				borderRadius: 3
			}
		},
		Logo: {
			logo: {
				isolated: false
			}
        },
        Pathline: {
            pathline: {
                color: [colorPurple, '!important']
            },
            copyButton: {
                '&': {
					color: [colorPurple, '!important'],
                    '& svg:hover': {
                        width: '14px',
                        height: '14px',
                        cursor: 'pointer',
						color: [colorPink, '!important'],
						transition: 'color 150ms ease-out'
                    },
                    '& svg:focus': {
                        border: '0'
					},
					'&:focus:not($isActive)': {
						isolate: false,
						outline: 'none'
					}
                }
            }
        },
		Link: {
			link: {
				'&, &:link, &:visited': {
					color: colorPurple
				},
				'&:hover': {
					color: colorPink,
					transition: 'color 150ms ease-out'
				}
			}
		},
		ComponentsList: {
			list: {
                '& & & a': {
                    isolate: false,
                    fontWeight: ['normal', '!important'],
                    color: colorWhite
                }
            }
        },
		TableOfContents: {
			input: {
				isolated: false,
				padding: '8px 16px 9px',
				color: colorWhite,
				border: '1px solid ' + colorBlack,
				boxShadow: 'rgba(0, 0, 0, 0.25) inset 0px 0px 7px 2px',
				background: colorBlack,
				borderRadius: 100,
				'&:focus': {
					'border-color': colorPink,
					boxShadow: 'rgba(173, 100, 230, 0.25) 0px 0px 0px 1px'
				}
			}
		},
		Pre: {
			pre: {
				color: [colorWhite, '!important'],
				background: colorGrey,
				border: '1px solid ' + colorBlack,
				boxShadow: 'rgba(0, 0, 0, 0.25) inset 0px 0px 7px 2px',
				borderRadius: 3
			}
		},
		SectionHeading: {
			sectionName: {
				'&:hover, &:active': {
					isolate: false,
					textDecoration: 'underline',
					cursor: 'pointer'
				}
			},
			wrapper: {
				fontFamily: ["'Fira Sans'", 'Helvetica', 'Arial', 'sans-serif'],
				'& > h1': {
					width: 'calc(100% + 64px)',
					fontSize: '36px',
					fontWeight: 'bold',
					padding: '20px 30px 0px',
					margin: '-16px -30px 0px'
				},
				'& > h2': {
					fontSize: '24px',
					fontWeight: 'bold'
				},
				'& > h1 a:hover': {
					decorator: 'none',
					cursor: 'pointer'
				},
				'& > h2 > a:hover, & > h3 > a:hover': {
					fontSize: '24px',
					decorator: 'none',
					cursor: 'pointer'
				}
			},
			toolbar: {
				display: 'none'
			}
		},
		TabButton: {
			button: {
				color: colorBlack,
				border: 'none',
				cursor: 'pointer',
				'&:hover, &:focus': {
					color: colorBlack
				},
				'&:focus:not($isActive)': {
					outline: 'none'
				}
			},
			isActive: {
				borderBottom: 'none'
			}
		},
		Table: {
			cellHeading: {
				padding: '16px 48px 16px 16px'
			},
			tableHead: {
				borderBottom: [[1, 'rgba(0, 0, 0, 0.1)', 'solid']]
			},
			cell: {
				borderBottom: [[1, 'rgba(0, 0, 0, 0.1)', 'solid']]
			},
			table: {
				'& tr:hover': {
					// backgroundColor: 'rgba(233, 243, 253, 0.3)'
				}
			}
		}
}
