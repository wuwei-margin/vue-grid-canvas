export default {
    methods: {
        getTextLine(ctx, text, width) {
            if (!text && text !== 0) {
                return null
            }
            const chr = `${text}`.split('')
            let temp = ''
            const row = []
            for (let a = 0; a < chr.length; a += 1) {
                if (ctx.measureText(temp).width >= width - 20) {
                    row.push(temp)
                    temp = ''
                }
                temp += chr[a]
            }
            row.push(temp)
            return row
        },
        getCellAt(x, y) {
            for (const rows of this.displayCells) {
                for (const cell of rows) {
                    if (x >= cell.x && y >= cell.y && x <= cell.x + cell.width && y <= cell.y + cell.height) {
                        return Object.assign({}, cell, { offset: { ...this.offset } })
                    }
                }
            }
            return null
        },
        getCheckboxAt(x, y) {
            for (const check of this.checkboxs) {
                if (x >= check.x && y >= check.y && x <= check.x + check.width && y <= check.y + check.height) {
                    return Object.assign({}, check)
                }
            }
            return null
        },
        getButtonAt(x, y) {
            for (const button of this.renderButtons) {
                if (x >= button.x && y >= button.y && x <= button.x + button.width && y <= button.y + button.height) {
                    return Object.assign({}, button)
                }
            }
            return null
        },
        getCellsBySelect(area) {
            const cells = []
            for (let i = area.rowIndex; i < area.rowIndex + area.rowCount; i += 1) {
                const row = this.allCells[i]
                const temp = []
                let startX = 0
                let maxWidth = Infinity
                for (let j = 0; j < row.length; j += 1) {
                    if (area.cellIndex === j) {
                        maxWidth = startX + area.width
                    }
                    if (startX < maxWidth && j >= area.cellIndex) {
                        temp.push(row[j])
                    } else if (startX > maxWidth) {
                        break
                    }
                    startX += row[j].width + this.fillWidth
                }
                cells.push(temp)
            }
            return cells
        },
        getCellByRowAndKey(rowIndex, key) {
            const cells = this.allCells[rowIndex]
            for (const cell of cells) {
                if (cell.key === key) {
                    return cell
                }
            }
            return null
        },
        showInput(x, y, width, height) {
            this.isEditing = true
            this.inputStyles = {
                position: 'absolute',
                top: `${y - 1}px`,
                left: `${x - 1}px`,
                minWidth: `${width + 2}px`,
                maxWidth: `${this.maxPoint.x - x > 300 ? 300 : this.maxPoint.x - x}px`,
                minHeight: `${height + 2}px`,
            }
        },
        hideInput() {
            this.isEditing = false
            this.inputStyles = {
                top: '-10000px',
                left: '-10000px',
            }
        },
        showTipMessage(message) {
            this.tipMessage = message
            this.showTip = true
            setTimeout(() => {
                this.showTip = false
            }, 2000)
        },
    },
}
