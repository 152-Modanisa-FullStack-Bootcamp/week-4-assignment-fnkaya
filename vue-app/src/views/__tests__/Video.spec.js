import {shallowMount} from "@vue/test-utils";
import Video from "@/views/Video"

describe("Video", () => {
    it('should Video component exists', function () {
        const wrapper = shallowMount(Video)
        expect(wrapper.exists()).toBeTruthy()
    });
})