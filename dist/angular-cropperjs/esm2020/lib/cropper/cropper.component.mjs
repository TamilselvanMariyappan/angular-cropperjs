import { Component, ViewEncapsulation, ViewChild, Input, EventEmitter, Output, } from "@angular/core";
import Cropper from "cropperjs";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class CropperComponent {
    constructor() {
        this.cropperOptions = {};
        this.export = new EventEmitter();
        this.ready = new EventEmitter();
        this.isLoading = true;
    }
    ngOnInit() { }
    ngOnDestroy() {
        if (this.cropper) {
            this.cropper.destroy();
            this.cropper = null;
        }
    }
    /**
     * Image loaded
     * @param ev
     */
    imageLoaded(ev) {
        //
        // Unset load error state
        this.loadError = false;
        //
        // Setup image element
        const image = ev.target;
        this.imageElement = image;
        //
        // Add crossOrigin?
        if (this.cropperOptions.checkCrossOrigin)
            image.crossOrigin = "anonymous";
        //
        // Image on ready event
        image.addEventListener("ready", () => {
            //
            // Emit ready
            this.ready.emit(true);
            //
            // Unset loading state
            this.isLoading = false;
            //
            // Validate cropbox existance
            if (this.cropbox) {
                //
                // Set cropbox data
                this.cropper.setCropBoxData(this.cropbox);
            }
        });
        //
        // Setup aspect ratio according to settings
        let aspectRatio = NaN;
        if (this.settings) {
            const { width, height } = this.settings;
            aspectRatio = width / height;
        }
        //
        // Set crop options
        // extend default with custom config
        this.cropperOptions = {
            ...{
                aspectRatio,
                checkCrossOrigin: true,
            },
            ...this.cropperOptions,
        };
        //
        // Set cropperjs
        if (this.cropper) {
            this.cropper.destroy();
            this.cropper = undefined;
        }
        this.cropper = new Cropper(image, this.cropperOptions);
    }
    /**
     * Image load error
     * @param event
     */
    imageLoadError(event) {
        //
        // Set load error state
        this.loadError = true;
        //
        // Unset loading state
        this.isLoading = false;
    }
    /**
     * Export canvas
     * @param base64
     */
    exportCanvas(base64) {
        //
        // Get and set image, crop and canvas data
        const imageData = this.cropper.getImageData();
        const cropData = this.cropper.getCropBoxData();
        const canvas = this.cropper.getCroppedCanvas();
        const data = { imageData, cropData };
        //
        // Create promise to resolve canvas data
        const promise = new Promise((resolve) => {
            //
            // Validate base64
            if (base64) {
                //
                // Resolve promise with dataUrl
                return resolve({
                    dataUrl: canvas.toDataURL("image/png"),
                });
            }
            canvas.toBlob((blob) => resolve({ blob }));
        });
        //
        // Emit export data when promise is ready
        promise.then((res) => {
            this.export.emit({ ...data, ...res });
        });
    }
}
CropperComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: CropperComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CropperComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.4.0", type: CropperComponent, selector: "angular-cropper", inputs: { imageUrl: "imageUrl", settings: "settings", cropbox: "cropbox", loadImageErrorText: "loadImageErrorText", cropperOptions: "cropperOptions" }, outputs: { export: "export", ready: "ready" }, viewQueries: [{ propertyName: "image", first: true, predicate: ["image"], descendants: true, static: true }], ngImport: i0, template: "<!-- CROPPER WRAPPER -->\r\n<div class=\"cropper-wrapper\">\r\n\r\n    <!-- LOADING -->\r\n    <div class=\"loading-block\" *ngIf=\"isLoading\">\r\n        <div class=\"spinner\"></div>\r\n    </div>\r\n\r\n    <!-- LOAD ERROR -->\r\n    <div class=\"alert alert-warning\" *ngIf=\"loadError\">{{ loadImageErrorText }}</div>\r\n\r\n    <!-- CROPPER -->\r\n    <div class=\"cropper\">\r\n        <img #image alt=\"image\" [src]=\"imageUrl\" (load)=\"imageLoaded($event)\" (error)=\"imageLoadError($event)\" />\r\n    </div>\r\n</div>\r\n", styles: [":host{display:block}.cropper img{max-width:100%;max-height:100%;height:auto}.cropper-wrapper{position:relative;min-height:80px}.cropper-wrapper .loading-block{position:absolute;top:0;left:0;width:100%;height:100%}.cropper-wrapper .loading-block .spinner{width:31px;height:31px;margin:0 auto;border:2px solid rgba(97,100,193,.98);border-radius:50%;border-left-color:transparent;border-right-color:transparent;-webkit-animation:cssload-spin 425ms infinite linear;position:absolute;top:calc(50% - 15px);left:calc(50% - 15px);animation:cssload-spin 425ms infinite linear}@keyframes cssload-spin{to{transform:rotate(360deg)}}/*!\n * Cropper.js v1.4.1\n * https://fengyuanchen.github.io/cropperjs\n *\n * Copyright 2015-present Chen Fengyuan\n * Released under the MIT license\n *\n * Date: 2018-07-15T09:54:43.167Z\n */.cropper-container{direction:ltr;font-size:0;line-height:0;position:relative;touch-action:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}.cropper-container img{display:block;height:100%;image-orientation:0deg;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}.cropper-wrap-box,.cropper-canvas,.cropper-drag-box,.cropper-crop-box,.cropper-modal{inset:0;position:absolute}.cropper-wrap-box,.cropper-canvas{overflow:hidden}.cropper-drag-box{background-color:#fff;opacity:0}.cropper-modal{background-color:#000;opacity:.5}.cropper-view-box{display:block;height:100%;outline-color:#3399ffbf;outline:1px solid #39f;overflow:hidden;width:100%}.cropper-dashed{border:0 dashed #eee;display:block;opacity:.5;position:absolute}.cropper-dashed.dashed-h{border-bottom-width:1px;border-top-width:1px;height:calc(100% / 3);left:0;top:calc(100% / 3);width:100%}.cropper-dashed.dashed-v{border-left-width:1px;border-right-width:1px;height:100%;left:calc(100% / 3);top:0;width:calc(100% / 3)}.cropper-center{display:block;height:0;left:50%;opacity:.75;position:absolute;top:50%;width:0}.cropper-center:before,.cropper-center:after{background-color:#eee;content:\" \";display:block;position:absolute}.cropper-center:before{height:1px;left:-3px;top:0;width:7px}.cropper-center:after{height:7px;left:0;top:-3px;width:1px}.cropper-face,.cropper-line,.cropper-point{display:block;height:100%;opacity:.1;position:absolute;width:100%}.cropper-face{background-color:#fff;left:0;top:0}.cropper-line{background-color:#39f}.cropper-line.line-e{cursor:ew-resize;right:-3px;top:0;width:5px}.cropper-line.line-n{cursor:ns-resize;height:5px;left:0;top:-3px}.cropper-line.line-w{cursor:ew-resize;left:-3px;top:0;width:5px}.cropper-line.line-s{bottom:-3px;cursor:ns-resize;height:5px;left:0}.cropper-point{background-color:#39f;height:5px;opacity:.75;width:5px}.cropper-point.point-e{cursor:ew-resize;margin-top:-3px;right:-3px;top:50%}.cropper-point.point-n{cursor:ns-resize;left:50%;margin-left:-3px;top:-3px}.cropper-point.point-w{cursor:ew-resize;left:-3px;margin-top:-3px;top:50%}.cropper-point.point-s{bottom:-3px;cursor:s-resize;left:50%;margin-left:-3px}.cropper-point.point-ne{cursor:nesw-resize;right:-3px;top:-3px}.cropper-point.point-nw{cursor:nwse-resize;left:-3px;top:-3px}.cropper-point.point-sw{bottom:-3px;cursor:nesw-resize;left:-3px}.cropper-point.point-se{bottom:-3px;cursor:nwse-resize;height:20px;opacity:1;right:-3px;width:20px}@media (min-width: 768px){.cropper-point.point-se{height:15px;width:15px}}@media (min-width: 992px){.cropper-point.point-se{height:10px;width:10px}}@media (min-width: 1200px){.cropper-point.point-se{height:5px;opacity:.75;width:5px}}.cropper-point.point-se:before{background-color:#39f;bottom:-50%;content:\" \";display:block;height:200%;opacity:0;position:absolute;right:-50%;width:200%}.cropper-invisible{opacity:0}.cropper-bg{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC)}.cropper-hide{display:block;height:0;position:absolute;width:0}.cropper-hidden{display:none!important}.cropper-move{cursor:move}.cropper-crop{cursor:crosshair}.cropper-disabled .cropper-drag-box,.cropper-disabled .cropper-face,.cropper-disabled .cropper-line,.cropper-disabled .cropper-point{cursor:not-allowed}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: CropperComponent, decorators: [{
            type: Component,
            args: [{ selector: "angular-cropper", encapsulation: ViewEncapsulation.None, template: "<!-- CROPPER WRAPPER -->\r\n<div class=\"cropper-wrapper\">\r\n\r\n    <!-- LOADING -->\r\n    <div class=\"loading-block\" *ngIf=\"isLoading\">\r\n        <div class=\"spinner\"></div>\r\n    </div>\r\n\r\n    <!-- LOAD ERROR -->\r\n    <div class=\"alert alert-warning\" *ngIf=\"loadError\">{{ loadImageErrorText }}</div>\r\n\r\n    <!-- CROPPER -->\r\n    <div class=\"cropper\">\r\n        <img #image alt=\"image\" [src]=\"imageUrl\" (load)=\"imageLoaded($event)\" (error)=\"imageLoadError($event)\" />\r\n    </div>\r\n</div>\r\n", styles: [":host{display:block}.cropper img{max-width:100%;max-height:100%;height:auto}.cropper-wrapper{position:relative;min-height:80px}.cropper-wrapper .loading-block{position:absolute;top:0;left:0;width:100%;height:100%}.cropper-wrapper .loading-block .spinner{width:31px;height:31px;margin:0 auto;border:2px solid rgba(97,100,193,.98);border-radius:50%;border-left-color:transparent;border-right-color:transparent;-webkit-animation:cssload-spin 425ms infinite linear;position:absolute;top:calc(50% - 15px);left:calc(50% - 15px);animation:cssload-spin 425ms infinite linear}@keyframes cssload-spin{to{transform:rotate(360deg)}}/*!\n * Cropper.js v1.4.1\n * https://fengyuanchen.github.io/cropperjs\n *\n * Copyright 2015-present Chen Fengyuan\n * Released under the MIT license\n *\n * Date: 2018-07-15T09:54:43.167Z\n */.cropper-container{direction:ltr;font-size:0;line-height:0;position:relative;touch-action:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}.cropper-container img{display:block;height:100%;image-orientation:0deg;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}.cropper-wrap-box,.cropper-canvas,.cropper-drag-box,.cropper-crop-box,.cropper-modal{inset:0;position:absolute}.cropper-wrap-box,.cropper-canvas{overflow:hidden}.cropper-drag-box{background-color:#fff;opacity:0}.cropper-modal{background-color:#000;opacity:.5}.cropper-view-box{display:block;height:100%;outline-color:#3399ffbf;outline:1px solid #39f;overflow:hidden;width:100%}.cropper-dashed{border:0 dashed #eee;display:block;opacity:.5;position:absolute}.cropper-dashed.dashed-h{border-bottom-width:1px;border-top-width:1px;height:calc(100% / 3);left:0;top:calc(100% / 3);width:100%}.cropper-dashed.dashed-v{border-left-width:1px;border-right-width:1px;height:100%;left:calc(100% / 3);top:0;width:calc(100% / 3)}.cropper-center{display:block;height:0;left:50%;opacity:.75;position:absolute;top:50%;width:0}.cropper-center:before,.cropper-center:after{background-color:#eee;content:\" \";display:block;position:absolute}.cropper-center:before{height:1px;left:-3px;top:0;width:7px}.cropper-center:after{height:7px;left:0;top:-3px;width:1px}.cropper-face,.cropper-line,.cropper-point{display:block;height:100%;opacity:.1;position:absolute;width:100%}.cropper-face{background-color:#fff;left:0;top:0}.cropper-line{background-color:#39f}.cropper-line.line-e{cursor:ew-resize;right:-3px;top:0;width:5px}.cropper-line.line-n{cursor:ns-resize;height:5px;left:0;top:-3px}.cropper-line.line-w{cursor:ew-resize;left:-3px;top:0;width:5px}.cropper-line.line-s{bottom:-3px;cursor:ns-resize;height:5px;left:0}.cropper-point{background-color:#39f;height:5px;opacity:.75;width:5px}.cropper-point.point-e{cursor:ew-resize;margin-top:-3px;right:-3px;top:50%}.cropper-point.point-n{cursor:ns-resize;left:50%;margin-left:-3px;top:-3px}.cropper-point.point-w{cursor:ew-resize;left:-3px;margin-top:-3px;top:50%}.cropper-point.point-s{bottom:-3px;cursor:s-resize;left:50%;margin-left:-3px}.cropper-point.point-ne{cursor:nesw-resize;right:-3px;top:-3px}.cropper-point.point-nw{cursor:nwse-resize;left:-3px;top:-3px}.cropper-point.point-sw{bottom:-3px;cursor:nesw-resize;left:-3px}.cropper-point.point-se{bottom:-3px;cursor:nwse-resize;height:20px;opacity:1;right:-3px;width:20px}@media (min-width: 768px){.cropper-point.point-se{height:15px;width:15px}}@media (min-width: 992px){.cropper-point.point-se{height:10px;width:10px}}@media (min-width: 1200px){.cropper-point.point-se{height:5px;opacity:.75;width:5px}}.cropper-point.point-se:before{background-color:#39f;bottom:-50%;content:\" \";display:block;height:200%;opacity:0;position:absolute;right:-50%;width:200%}.cropper-invisible{opacity:0}.cropper-bg{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC)}.cropper-hide{display:block;height:0;position:absolute;width:0}.cropper-hidden{display:none!important}.cropper-move{cursor:move}.cropper-crop{cursor:crosshair}.cropper-disabled .cropper-drag-box,.cropper-disabled .cropper-face,.cropper-disabled .cropper-line,.cropper-disabled .cropper-point{cursor:not-allowed}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { image: [{
                type: ViewChild,
                args: ["image", { static: true }]
            }], imageUrl: [{
                type: Input
            }], settings: [{
                type: Input
            }], cropbox: [{
                type: Input
            }], loadImageErrorText: [{
                type: Input
            }], cropperOptions: [{
                type: Input
            }], export: [{
                type: Output
            }], ready: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JvcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWNyb3BwZXJqcy9zcmMvbGliL2Nyb3BwZXIvY3JvcHBlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWNyb3BwZXJqcy9zcmMvbGliL2Nyb3BwZXIvY3JvcHBlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUVULGlCQUFpQixFQUVqQixTQUFTLEVBQ1QsS0FBSyxFQUNMLFlBQVksRUFDWixNQUFNLEdBRVQsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxPQUFPLE1BQU0sV0FBVyxDQUFDOzs7QUFvQmhDLE1BQU0sT0FBTyxnQkFBZ0I7SUFpQnpCO1FBVlMsbUJBQWMsR0FBUSxFQUFFLENBQUM7UUFFeEIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFzQixDQUFDO1FBQ2hELFVBQUssR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlCLGNBQVMsR0FBWSxJQUFJLENBQUM7SUFLbEIsQ0FBQztJQUVoQixRQUFRLEtBQUksQ0FBQztJQUViLFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNILFdBQVcsQ0FBQyxFQUFTO1FBQ2pCLEVBQUU7UUFDRix5QkFBeUI7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFFdkIsRUFBRTtRQUNGLHNCQUFzQjtRQUN0QixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsTUFBMEIsQ0FBQztRQUM1QyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUUx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UUFFSCxFQUFFO1FBQ0YseUNBQXlDO1FBQ3pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtZQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7OzZHQTdJUSxnQkFBZ0I7aUdBQWhCLGdCQUFnQiw0V0MvQjdCLHloQkFnQkE7MkZEZWEsZ0JBQWdCO2tCQU41QixTQUFTOytCQUNJLGlCQUFpQixpQkFHWixpQkFBaUIsQ0FBQyxJQUFJOzBFQUdDLEtBQUs7c0JBQTFDLFNBQVM7dUJBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFFM0IsUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFFSSxNQUFNO3NCQUFmLE1BQU07Z0JBQ0csS0FBSztzQkFBZCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuICAgIE9uSW5pdCxcclxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gICAgRWxlbWVudFJlZixcclxuICAgIFZpZXdDaGlsZCxcclxuICAgIElucHV0LFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgT3V0cHV0LFxyXG4gICAgT25EZXN0cm95LFxyXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCBDcm9wcGVyIGZyb20gXCJjcm9wcGVyanNcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSW1hZ2VDcm9wcGVyU2V0dGluZyB7XHJcbiAgICB3aWR0aDogbnVtYmVyO1xyXG4gICAgaGVpZ2h0OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSW1hZ2VDcm9wcGVyUmVzdWx0IHtcclxuICAgIGltYWdlRGF0YTogQ3JvcHBlci5JbWFnZURhdGE7XHJcbiAgICBjcm9wRGF0YTogQ3JvcHBlci5Dcm9wQm94RGF0YTtcclxuICAgIGJsb2I/OiBCbG9iO1xyXG4gICAgZGF0YVVybD86IHN0cmluZztcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJhbmd1bGFyLWNyb3BwZXJcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vY3JvcHBlci5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL2Nyb3BwZXIuY29tcG9uZW50LmNzc1wiXSxcclxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDcm9wcGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgQFZpZXdDaGlsZChcImltYWdlXCIsIHsgc3RhdGljOiB0cnVlIH0pIGltYWdlOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIEBJbnB1dCgpIGltYWdlVXJsOiBhbnk7XHJcbiAgICBASW5wdXQoKSBzZXR0aW5nczogSW1hZ2VDcm9wcGVyU2V0dGluZztcclxuICAgIEBJbnB1dCgpIGNyb3Bib3g6IENyb3BwZXIuQ3JvcEJveERhdGE7XHJcbiAgICBASW5wdXQoKSBsb2FkSW1hZ2VFcnJvclRleHQ6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIGNyb3BwZXJPcHRpb25zOiBhbnkgPSB7fTtcclxuXHJcbiAgICBAT3V0cHV0KCkgZXhwb3J0ID0gbmV3IEV2ZW50RW1pdHRlcjxJbWFnZUNyb3BwZXJSZXN1bHQ+KCk7XHJcbiAgICBAT3V0cHV0KCkgcmVhZHkgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgcHVibGljIGlzTG9hZGluZzogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgY3JvcHBlcjogQ3JvcHBlcjtcclxuICAgIHB1YmxpYyBpbWFnZUVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgbG9hZEVycm9yOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAgIG5nT25Jbml0KCkge31cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICBpZiAodGhpcy5jcm9wcGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JvcHBlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JvcHBlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW1hZ2UgbG9hZGVkXHJcbiAgICAgKiBAcGFyYW0gZXZcclxuICAgICAqL1xyXG4gICAgaW1hZ2VMb2FkZWQoZXY6IEV2ZW50KSB7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBVbnNldCBsb2FkIGVycm9yIHN0YXRlXHJcbiAgICAgICAgdGhpcy5sb2FkRXJyb3IgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBTZXR1cCBpbWFnZSBlbGVtZW50XHJcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBldi50YXJnZXQgYXMgSFRNTEltYWdlRWxlbWVudDtcclxuICAgICAgICB0aGlzLmltYWdlRWxlbWVudCA9IGltYWdlO1xyXG5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIEFkZCBjcm9zc09yaWdpbj9cclxuICAgICAgICBpZiAodGhpcy5jcm9wcGVyT3B0aW9ucy5jaGVja0Nyb3NzT3JpZ2luKVxyXG4gICAgICAgICAgICBpbWFnZS5jcm9zc09yaWdpbiA9IFwiYW5vbnltb3VzXCI7XHJcblxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gSW1hZ2Ugb24gcmVhZHkgZXZlbnRcclxuICAgICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKFwicmVhZHlcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAvLyBFbWl0IHJlYWR5XHJcbiAgICAgICAgICAgIHRoaXMucmVhZHkuZW1pdCh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIC8vIFVuc2V0IGxvYWRpbmcgc3RhdGVcclxuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIC8vIFZhbGlkYXRlIGNyb3Bib3ggZXhpc3RhbmNlXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNyb3Bib3gpIHtcclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgY3JvcGJveCBkYXRhXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyb3BwZXIuc2V0Q3JvcEJveERhdGEodGhpcy5jcm9wYm94KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIFNldHVwIGFzcGVjdCByYXRpbyBhY2NvcmRpbmcgdG8gc2V0dGluZ3NcclxuICAgICAgICBsZXQgYXNwZWN0UmF0aW8gPSBOYU47XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MpIHtcclxuICAgICAgICAgICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSB0aGlzLnNldHRpbmdzO1xyXG4gICAgICAgICAgICBhc3BlY3RSYXRpbyA9IHdpZHRoIC8gaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBTZXQgY3JvcCBvcHRpb25zXHJcbiAgICAgICAgLy8gZXh0ZW5kIGRlZmF1bHQgd2l0aCBjdXN0b20gY29uZmlnXHJcbiAgICAgICAgdGhpcy5jcm9wcGVyT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgLi4ue1xyXG4gICAgICAgICAgICAgICAgYXNwZWN0UmF0aW8sXHJcbiAgICAgICAgICAgICAgICBjaGVja0Nyb3NzT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAuLi50aGlzLmNyb3BwZXJPcHRpb25zLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gU2V0IGNyb3BwZXJqc1xyXG4gICAgICAgIGlmICh0aGlzLmNyb3BwZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5jcm9wcGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5jcm9wcGVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNyb3BwZXIgPSBuZXcgQ3JvcHBlcihpbWFnZSwgdGhpcy5jcm9wcGVyT3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbWFnZSBsb2FkIGVycm9yXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRcclxuICAgICAqL1xyXG4gICAgaW1hZ2VMb2FkRXJyb3IoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gU2V0IGxvYWQgZXJyb3Igc3RhdGVcclxuICAgICAgICB0aGlzLmxvYWRFcnJvciA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gVW5zZXQgbG9hZGluZyBzdGF0ZVxyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeHBvcnQgY2FudmFzXHJcbiAgICAgKiBAcGFyYW0gYmFzZTY0XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydENhbnZhcyhiYXNlNjQ/OiBhbnkpIHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIEdldCBhbmQgc2V0IGltYWdlLCBjcm9wIGFuZCBjYW52YXMgZGF0YVxyXG4gICAgICAgIGNvbnN0IGltYWdlRGF0YSA9IHRoaXMuY3JvcHBlci5nZXRJbWFnZURhdGEoKTtcclxuICAgICAgICBjb25zdCBjcm9wRGF0YSA9IHRoaXMuY3JvcHBlci5nZXRDcm9wQm94RGF0YSgpO1xyXG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuY3JvcHBlci5nZXRDcm9wcGVkQ2FudmFzKCk7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHsgaW1hZ2VEYXRhLCBjcm9wRGF0YSB9O1xyXG5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIENyZWF0ZSBwcm9taXNlIHRvIHJlc29sdmUgY2FudmFzIGRhdGFcclxuICAgICAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgLy8gVmFsaWRhdGUgYmFzZTY0XHJcbiAgICAgICAgICAgIGlmIChiYXNlNjQpIHtcclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAvLyBSZXNvbHZlIHByb21pc2Ugd2l0aCBkYXRhVXJsXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVVybDogY2FudmFzLnRvRGF0YVVSTChcImltYWdlL3BuZ1wiKSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhbnZhcy50b0Jsb2IoKGJsb2IpID0+IHJlc29sdmUoeyBibG9iIH0pKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBFbWl0IGV4cG9ydCBkYXRhIHdoZW4gcHJvbWlzZSBpcyByZWFkeVxyXG4gICAgICAgIHByb21pc2UudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5leHBvcnQuZW1pdCh7IC4uLmRhdGEsIC4uLnJlcyB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCI8IS0tIENST1BQRVIgV1JBUFBFUiAtLT5cclxuPGRpdiBjbGFzcz1cImNyb3BwZXItd3JhcHBlclwiPlxyXG5cclxuICAgIDwhLS0gTE9BRElORyAtLT5cclxuICAgIDxkaXYgY2xhc3M9XCJsb2FkaW5nLWJsb2NrXCIgKm5nSWY9XCJpc0xvYWRpbmdcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lclwiPjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPCEtLSBMT0FEIEVSUk9SIC0tPlxyXG4gICAgPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXdhcm5pbmdcIiAqbmdJZj1cImxvYWRFcnJvclwiPnt7IGxvYWRJbWFnZUVycm9yVGV4dCB9fTwvZGl2PlxyXG5cclxuICAgIDwhLS0gQ1JPUFBFUiAtLT5cclxuICAgIDxkaXYgY2xhc3M9XCJjcm9wcGVyXCI+XHJcbiAgICAgICAgPGltZyAjaW1hZ2UgYWx0PVwiaW1hZ2VcIiBbc3JjXT1cImltYWdlVXJsXCIgKGxvYWQpPVwiaW1hZ2VMb2FkZWQoJGV2ZW50KVwiIChlcnJvcik9XCJpbWFnZUxvYWRFcnJvcigkZXZlbnQpXCIgLz5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj5cclxuIl19