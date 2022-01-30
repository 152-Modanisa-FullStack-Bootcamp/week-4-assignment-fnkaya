import {shallowMount} from "@vue/test-utils";
import Home from "@/views/Home";
import API from "@/utils/Api";
import flushPromises from "flush-promises";
import VideoCard from "@/components/VideoCard";

jest.mock("@/utils/Api")

describe("Home Page", () => {
    it('should component exists', () => {
        const wrapper = shallowMount(Home)
        expect(wrapper.exists()).toBeTruthy()
    });

    it('should title exists and text match',  () => {
        const wrapper = shallowMount(Home)
        const titleElement = wrapper.find("#page-title");
        expect(titleElement.exists()).toBeTruthy()
        expect(titleElement.text()).toMatch("Home Page")
    });

    it('should render home components correctly', async function () {
        const mockResponse = [
            {
                title: "Vue.js Course for Beginners [2021 Tutorial]"
            },
            {
                title: "Vue JS Crash Course"
            },
            {
                title: "Vue 3 - What's New? What Changed? "
            }
        ]

        API.getVideos.mockResolvedValue(mockResponse)
        const wrapper = shallowMount(Home)
        await flushPromises()
        const videoCardComponent = wrapper.findAllComponents(VideoCard)
        expect(videoCardComponent).toHaveLength(mockResponse.length)
    });
})