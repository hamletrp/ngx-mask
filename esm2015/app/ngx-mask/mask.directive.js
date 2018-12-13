/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, forwardRef, HostListener, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MaskService } from './mask.service';
export class MaskDirective {
    /**
     * @param {?} document
     * @param {?} _maskService
     */
    constructor(document, _maskService) {
        this.document = document;
        this._maskService = _maskService;
        this._position = null;
        // tslint:disable-next-line
        this.onChange = (_) => { };
        this.onTouch = () => { };
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set maskExpression(value) {
        this._maskValue = value || '';
        if (!this._maskValue) {
            return;
        }
        this._maskService.maskExpression = this._repeatPatternSymbols(this._maskValue);
        this._maskService.formElementProperty = [
            'value',
            this._maskService.applyMask(this._inputValue, this._maskService.maskExpression)
        ];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set specialCharacters(value) {
        if (!value ||
            !Array.isArray(value) ||
            (Array.isArray(value) && !value.length)) {
            return;
        }
        this._maskService.maskSpecialCharacters = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set patterns(value) {
        if (!value) {
            return;
        }
        this._maskService.maskAvailablePatterns = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set prefix(value) {
        if (!value) {
            return;
        }
        this._maskService.prefix = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set sufix(value) {
        if (!value) {
            return;
        }
        this._maskService.sufix = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set dropSpecialCharacters(value) {
        this._maskService.dropSpecialCharacters = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showMaskTyped(value) {
        if (!value) {
            return;
        }
        this._maskService.showMaskTyped = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showTemplate(value) {
        this._maskService.showTemplate = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set clearIfNotMatch(value) {
        this._maskService.clearIfNotMatch = value;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onInput(e) {
        /** @type {?} */
        const el = (/** @type {?} */ (e.target));
        this._inputValue = el.value;
        if (!this._maskValue) {
            this.onChange(el.value);
            return;
        }
        /** @type {?} */
        const position = ((/** @type {?} */ (el.selectionStart))) === 1
            ? ((/** @type {?} */ (el.selectionStart))) + this._maskService.prefix.length
            : (/** @type {?} */ (el.selectionStart));
        /** @type {?} */
        let caretShift = 0;
        this._maskService.applyValueChanges(position, (shift) => (caretShift = shift));
        // only set the selection if the element is active
        if (this.document.activeElement !== el) {
            return;
        }
        el.selectionStart = el.selectionEnd =
            this._position !== null
                ? this._position
                : position +
                    // tslint:disable-next-line
                    (((/** @type {?} */ (e))).inputType === 'deleteContentBackward' ? 0 : caretShift);
        this._position = null;
    }
    /**
     * @return {?}
     */
    onBlur() {
        this._maskService.clearIfNotMatchFn();
        this.onTouch();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onFocus(e) {
        /** @type {?} */
        const el = (/** @type {?} */ (e.target));
        if (el !== null && el.selectionStart !== null &&
            el.selectionStart === el.selectionEnd &&
            el.selectionStart > this._maskService.prefix.length &&
            // tslint:disable-next-line
            ((/** @type {?} */ (e))).keyCode !== 38) {
            return;
        }
        if (this._maskService.showMaskTyped) {
            this._maskService.maskIsShown = this._maskService.maskExpression.replace(/[0-9]/g, '_');
        }
        el.value = !el.value || el.value === this._maskService.prefix
            ? this._maskService.prefix + this._maskService.maskIsShown
            : el.value;
        /** fix of cursor position with prefix when mouse click occur */
        if ((((/** @type {?} */ (el.selectionStart))) || ((/** @type {?} */ (el.selectionEnd)))) <= this._maskService.prefix.length) {
            el.selectionStart = this._maskService.prefix.length;
            return;
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    a(e) {
        /** @type {?} */
        const el = (/** @type {?} */ (e.target));
        if (e.keyCode === 38) {
            e.preventDefault();
        }
        if (e.keyCode === 37 || e.keyCode === 8) {
            if (((/** @type {?} */ (el.selectionStart))) <= this._maskService.prefix.length
                && ((/** @type {?} */ (el.selectionEnd))) <= this._maskService.prefix.length) {
                e.preventDefault();
            }
            this.onFocus(e);
            if (e.keyCode === 8
                && el.selectionStart === 0
                && el.selectionEnd === el.value.length) {
                el.value = this._maskService.prefix;
                this._position = this._maskService.prefix ? this._maskService.prefix.length : 1;
                this.onInput(e);
            }
        }
    }
    /**
     * @return {?}
     */
    onPaste() {
        this._position = Number.MAX_SAFE_INTEGER;
    }
    /**
     * It writes the value in the input
     * @param {?} inputValue
     * @return {?}
     */
    writeValue(inputValue) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (inputValue === undefined) {
                inputValue = '';
            }
            if (typeof inputValue === 'number') {
                inputValue = String(inputValue);
                this._maskService.isNumberValue = true;
            }
            inputValue && this._maskService.maskExpression ||
                this._maskService.maskExpression && (this._maskService.prefix || this._maskService.showMaskTyped)
                ? (this._maskService.formElementProperty = [
                    'value',
                    this._maskService.applyMask(inputValue, this._maskService.maskExpression)
                ])
                : (this._maskService.formElementProperty = ['value', inputValue]);
            this._inputValue = inputValue;
        });
    }
    // tslint:disable-next-line
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
        this._maskService.onChange = this.onChange;
    }
    // tslint:disable-next-line
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    /**
     * It disables the input element
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this._maskService.formElementProperty = ['disabled', isDisabled];
    }
    /**
     * @private
     * @param {?} maskExp
     * @return {?}
     */
    _repeatPatternSymbols(maskExp) {
        return maskExp.match(/{[0-9]+}/)
            && maskExp.split('')
                .reduce((accum, currval, index) => {
                this._start = (currval === '{') ? index : this._start;
                if (currval !== '}') {
                    return this._maskService._findSpecialChar(currval) ? accum + currval : accum;
                }
                this._end = index;
                /** @type {?} */
                const repeatNumber = Number(maskExp
                    .slice(this._start + 1, this._end));
                /** @type {?} */
                const repaceWith = new Array(repeatNumber + 1)
                    .join(maskExp[this._start - 1]);
                return accum + repaceWith;
            }, '') || maskExp;
    }
}
MaskDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mask]',
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => MaskDirective),
                        multi: true
                    },
                    MaskService
                ]
            },] }
];
/** @nocollapse */
MaskDirective.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: MaskService }
];
MaskDirective.propDecorators = {
    maskExpression: [{ type: Input, args: ['mask',] }],
    specialCharacters: [{ type: Input }],
    patterns: [{ type: Input }],
    prefix: [{ type: Input }],
    sufix: [{ type: Input }],
    dropSpecialCharacters: [{ type: Input }],
    showMaskTyped: [{ type: Input }],
    showTemplate: [{ type: Input }],
    clearIfNotMatch: [{ type: Input }],
    onInput: [{ type: HostListener, args: ['input', ['$event'],] }],
    onBlur: [{ type: HostListener, args: ['blur',] }],
    onFocus: [{ type: HostListener, args: ['click', ['$event'],] }],
    a: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    onPaste: [{ type: HostListener, args: ['paste',] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._maskValue;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._inputValue;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._position;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._start;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._end;
    /** @type {?} */
    MaskDirective.prototype.onChange;
    /** @type {?} */
    MaskDirective.prototype.onTouch;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype.document;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._maskService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFzay8iLCJzb3VyY2VzIjpbImFwcC9uZ3gtbWFzay9tYXNrLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBYzdDLE1BQU0sT0FBTyxhQUFhOzs7OztJQVV4QixZQUU0QixRQUFhLEVBQy9CLFlBQXlCO1FBRFAsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUMvQixpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQVYzQixjQUFTLEdBQWtCLElBQUksQ0FBQzs7UUFLakMsYUFBUSxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0IsWUFBTyxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUt2QixDQUFDOzs7OztJQUdMLElBQ1csY0FBYyxDQUFDLEtBQWE7UUFDckMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsR0FBRztZQUN0QyxPQUFPO1lBQ1AsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQ3pCLElBQUksQ0FBQyxXQUFX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InNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgZm9yd2FyZFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIElucHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWFza1NlcnZpY2UgfSBmcm9tICcuL21hc2suc2VydmljZSc7XG5pbXBvcnQgeyBJQ29uZmlnIH0gZnJvbSAnLi9jb25maWcnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWFza10nLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hc2tEaXJlY3RpdmUpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9LFxuICAgIE1hc2tTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTWFza0RpcmVjdGl2ZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgcHJpdmF0ZSBfbWFza1ZhbHVlOiBzdHJpbmc7XG4gIHByaXZhdGUgX2lucHV0VmFsdWU6IHN0cmluZztcbiAgcHJpdmF0ZSBfcG9zaXRpb246IG51bWJlciB8IG51bGwgPSBudWxsO1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgcHJpdmF0ZSBfc3RhcnQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBfZW5kOiBudW1iZXI7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICBwdWJsaWMgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7IH07XG4gIHB1YmxpYyBvblRvdWNoID0gKCkgPT4geyB9O1xuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxuICAgIHByaXZhdGUgX21hc2tTZXJ2aWNlOiBNYXNrU2VydmljZVxuICApIHsgfVxuXG5cbiAgQElucHV0KCdtYXNrJylcbiAgcHVibGljIHNldCBtYXNrRXhwcmVzc2lvbih2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fbWFza1ZhbHVlID0gdmFsdWUgfHwgJyc7XG4gICAgaWYgKCF0aGlzLl9tYXNrVmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fbWFza1NlcnZpY2UubWFza0V4cHJlc3Npb24gPSB0aGlzLl9yZXBlYXRQYXR0ZXJuU3ltYm9scyh0aGlzLl9tYXNrVmFsdWUpO1xuICAgIHRoaXMuX21hc2tTZXJ2aWNlLmZvcm1FbGVtZW50UHJvcGVydHkgPSBbXG4gICAgICAndmFsdWUnLFxuICAgICAgdGhpcy5fbWFza1NlcnZpY2UuYXBwbHlNYXNrKFxuICAgICAgICB0aGlzLl9pbnB1dFZhbHVlLFxuICAgICAgICB0aGlzLl9tYXNrU2VydmljZS5tYXNrRXhwcmVzc2lvblxuICAgICAgKVxuICAgIF07XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IHNwZWNpYWxDaGFyYWN0ZXJzKHZhbHVlOiBJQ29uZmlnWydzcGVjaWFsQ2hhcmFjdGVycyddKSB7XG4gICAgaWYgKFxuICAgICAgIXZhbHVlIHx8XG4gICAgICAhQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHxcbiAgICAgIChBcnJheS5pc0FycmF5KHZhbHVlKSAmJiAhdmFsdWUubGVuZ3RoKVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9tYXNrU2VydmljZS5tYXNrU3BlY2lhbENoYXJhY3RlcnMgPSB2YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgcGF0dGVybnModmFsdWU6IElDb25maWdbJ3BhdHRlcm5zJ10pIHtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tBdmFpbGFibGVQYXR0ZXJucyA9IHZhbHVlO1xuICB9XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBwcmVmaXgodmFsdWU6IElDb25maWdbJ3ByZWZpeCddKSB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXggPSB2YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgc3VmaXgodmFsdWU6IElDb25maWdbJ3N1Zml4J10pIHtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX21hc2tTZXJ2aWNlLnN1Zml4ID0gdmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IGRyb3BTcGVjaWFsQ2hhcmFjdGVycyh2YWx1ZTogSUNvbmZpZ1snZHJvcFNwZWNpYWxDaGFyYWN0ZXJzJ10pIHtcbiAgICB0aGlzLl9tYXNrU2VydmljZS5kcm9wU3BlY2lhbENoYXJhY3RlcnMgPSB2YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgc2hvd01hc2tUeXBlZCh2YWx1ZTogSUNvbmZpZ1snc2hvd01hc2tUeXBlZCddKSB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9tYXNrU2VydmljZS5zaG93TWFza1R5cGVkID0gdmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IHNob3dUZW1wbGF0ZSh2YWx1ZTogSUNvbmZpZ1snc2hvd1RlbXBsYXRlJ10pIHtcbiAgICB0aGlzLl9tYXNrU2VydmljZS5zaG93VGVtcGxhdGUgPSB2YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgY2xlYXJJZk5vdE1hdGNoKHZhbHVlOiBJQ29uZmlnWydjbGVhcklmTm90TWF0Y2gnXSkge1xuICAgIHRoaXMuX21hc2tTZXJ2aWNlLmNsZWFySWZOb3RNYXRjaCA9IHZhbHVlO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignaW5wdXQnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25JbnB1dChlOiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgZWw6IEhUTUxJbnB1dEVsZW1lbnQgPSBlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHRoaXMuX2lucHV0VmFsdWUgPSBlbC52YWx1ZTtcbiAgICBpZiAoIXRoaXMuX21hc2tWYWx1ZSkge1xuICAgICAgdGhpcy5vbkNoYW5nZShlbC52YWx1ZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHBvc2l0aW9uOiBudW1iZXIgPSAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSA9PT0gMVxuICAgICAgPyAoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSArIHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeC5sZW5ndGhcbiAgICAgIDogZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyO1xuICAgIGxldCBjYXJldFNoaWZ0OiBudW1iZXIgPSAwO1xuICAgIHRoaXMuX21hc2tTZXJ2aWNlLmFwcGx5VmFsdWVDaGFuZ2VzKFxuICAgICAgcG9zaXRpb24sXG4gICAgICAoc2hpZnQ6IG51bWJlcikgPT4gKGNhcmV0U2hpZnQgPSBzaGlmdClcbiAgICApO1xuICAgIC8vIG9ubHkgc2V0IHRoZSBzZWxlY3Rpb24gaWYgdGhlIGVsZW1lbnQgaXMgYWN0aXZlXG4gICAgaWYgKHRoaXMuZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gZWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWwuc2VsZWN0aW9uU3RhcnQgPSBlbC5zZWxlY3Rpb25FbmQgPVxuICAgICAgdGhpcy5fcG9zaXRpb24gIT09IG51bGxcbiAgICAgICAgPyB0aGlzLl9wb3NpdGlvblxuICAgICAgICA6IHBvc2l0aW9uICtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgICgoZSBhcyBhbnkpLmlucHV0VHlwZSA9PT0gJ2RlbGV0ZUNvbnRlbnRCYWNrd2FyZCcgPyAwIDogY2FyZXRTaGlmdCk7XG4gICAgdGhpcy5fcG9zaXRpb24gPSBudWxsO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIHB1YmxpYyBvbkJsdXIoKTogdm9pZCB7XG4gICAgdGhpcy5fbWFza1NlcnZpY2UuY2xlYXJJZk5vdE1hdGNoRm4oKTtcbiAgICB0aGlzLm9uVG91Y2goKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uRm9jdXMoZTogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBlbDogSFRNTElucHV0RWxlbWVudCA9IGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgaWYgKFxuICAgICAgZWwgIT09IG51bGwgJiYgZWwuc2VsZWN0aW9uU3RhcnQgIT09IG51bGwgJiZcbiAgICAgIGVsLnNlbGVjdGlvblN0YXJ0ID09PSBlbC5zZWxlY3Rpb25FbmQgJiZcbiAgICAgIGVsLnNlbGVjdGlvblN0YXJ0ID4gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aCAmJlxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgICAoZSBhcyBhbnkpLmtleUNvZGUgIT09IDM4XG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9tYXNrU2VydmljZS5zaG93TWFza1R5cGVkKSB7XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5tYXNrSXNTaG93biA9IHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tFeHByZXNzaW9uLnJlcGxhY2UoL1swLTldL2csICdfJyk7XG4gICAgfVxuICAgIGVsLnZhbHVlID0gIWVsLnZhbHVlIHx8IGVsLnZhbHVlID09PSB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXhcbiAgICAgID8gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4ICsgdGhpcy5fbWFza1NlcnZpY2UubWFza0lzU2hvd25cbiAgICAgIDogZWwudmFsdWU7XG4gICAgLyoqIGZpeCBvZiBjdXJzb3IgcG9zaXRpb24gd2l0aCBwcmVmaXggd2hlbiBtb3VzZSBjbGljayBvY2N1ciAqL1xuICAgIGlmICgoKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgfHwgKGVsLnNlbGVjdGlvbkVuZCBhcyBudW1iZXIpKSA8PSB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXgubGVuZ3RoKSB7XG4gICAgICBlbC5zZWxlY3Rpb25TdGFydCA9IHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeC5sZW5ndGg7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBhKGU6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBlbDogSFRNTElucHV0RWxlbWVudCA9IGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMzgpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMzcgfHwgZS5rZXlDb2RlID09PSA4KSB7XG4gICAgICBpZiAoKGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcikgPD0gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aFxuICAgICAgICAmJiAoZWwuc2VsZWN0aW9uRW5kIGFzIG51bWJlcikgPD0gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgICB0aGlzLm9uRm9jdXMoZSk7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSA4XG4gICAgICAgICYmIGVsLnNlbGVjdGlvblN0YXJ0ID09PSAwXG4gICAgICAgICYmIGVsLnNlbGVjdGlvbkVuZCA9PT0gZWwudmFsdWUubGVuZ3RoKSB7XG4gICAgICAgIGVsLnZhbHVlID0gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4O1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeCA/IHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeC5sZW5ndGggOiAxO1xuICAgICAgICB0aGlzLm9uSW5wdXQoZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigncGFzdGUnKVxuICBwdWJsaWMgb25QYXN0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuICB9XG5cbiAgLyoqIEl0IHdyaXRlcyB0aGUgdmFsdWUgaW4gdGhlIGlucHV0ICovXG4gIHB1YmxpYyBhc3luYyB3cml0ZVZhbHVlKGlucHV0VmFsdWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChpbnB1dFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlucHV0VmFsdWUgPSAnJztcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBpbnB1dFZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgaW5wdXRWYWx1ZSA9IFN0cmluZyhpbnB1dFZhbHVlKTtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLmlzTnVtYmVyVmFsdWUgPSB0cnVlO1xuICAgIH1cbiAgICBpbnB1dFZhbHVlICYmIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tFeHByZXNzaW9uIHx8XG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5tYXNrRXhwcmVzc2lvbiAmJiAodGhpcy5fbWFza1NlcnZpY2UucHJlZml4IHx8IHRoaXMuX21hc2tTZXJ2aWNlLnNob3dNYXNrVHlwZWQpXG4gICAgICA/ICh0aGlzLl9tYXNrU2VydmljZS5mb3JtRWxlbWVudFByb3BlcnR5ID0gW1xuICAgICAgICAndmFsdWUnLFxuICAgICAgICB0aGlzLl9tYXNrU2VydmljZS5hcHBseU1hc2soXG4gICAgICAgICAgaW5wdXRWYWx1ZSxcbiAgICAgICAgICB0aGlzLl9tYXNrU2VydmljZS5tYXNrRXhwcmVzc2lvblxuICAgICAgICApXG4gICAgICBdKVxuICAgICAgOiAodGhpcy5fbWFza1NlcnZpY2UuZm9ybUVsZW1lbnRQcm9wZXJ0eSA9IFsndmFsdWUnLCBpbnB1dFZhbHVlXSk7XG4gICAgdGhpcy5faW5wdXRWYWx1ZSA9IGlucHV0VmFsdWU7XG4gIH1cblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB0aGlzLl9tYXNrU2VydmljZS5vbkNoYW5nZSA9IHRoaXMub25DaGFuZ2U7XG4gIH1cblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2ggPSBmbjtcbiAgfVxuXG4gIC8qKiBJdCBkaXNhYmxlcyB0aGUgaW5wdXQgZWxlbWVudCAqL1xuICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fbWFza1NlcnZpY2UuZm9ybUVsZW1lbnRQcm9wZXJ0eSA9IFsnZGlzYWJsZWQnLCBpc0Rpc2FibGVkXTtcbiAgfVxuICBwcml2YXRlIF9yZXBlYXRQYXR0ZXJuU3ltYm9scyhtYXNrRXhwOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBtYXNrRXhwLm1hdGNoKC97WzAtOV0rfS8pXG4gICAgICAmJiBtYXNrRXhwLnNwbGl0KCcnKVxuICAgICAgICAucmVkdWNlKChhY2N1bTogc3RyaW5nLCBjdXJydmFsOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4ge1xuICAgICAgICAgIHRoaXMuX3N0YXJ0ID0gKGN1cnJ2YWwgPT09ICd7JykgPyBpbmRleCA6IHRoaXMuX3N0YXJ0O1xuXG4gICAgICAgICAgaWYgKGN1cnJ2YWwgIT09ICd9Jykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hc2tTZXJ2aWNlLl9maW5kU3BlY2lhbENoYXIoY3VycnZhbCkgPyBhY2N1bSArIGN1cnJ2YWwgOiBhY2N1bTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fZW5kID0gaW5kZXg7XG4gICAgICAgICAgY29uc3QgcmVwZWF0TnVtYmVyOiBudW1iZXIgPSBOdW1iZXIobWFza0V4cFxuICAgICAgICAgICAgLnNsaWNlKHRoaXMuX3N0YXJ0ICsgMSwgdGhpcy5fZW5kKSk7XG4gICAgICAgICAgY29uc3QgcmVwYWNlV2l0aDogc3RyaW5nID0gbmV3IEFycmF5KHJlcGVhdE51bWJlciArIDEpXG4gICAgICAgICAgICAuam9pbihtYXNrRXhwW3RoaXMuX3N0YXJ0IC0gMV0pO1xuICAgICAgICAgIHJldHVybiBhY2N1bSArIHJlcGFjZVdpdGg7XG4gICAgICAgIH0sICcnKSB8fCBtYXNrRXhwO1xuICB9XG5cbn0iXX0=