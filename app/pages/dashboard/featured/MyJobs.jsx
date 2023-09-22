import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Search from "../../../components/Search/Search";
import imagePath from "../../../constants/imagePath";
import styles from "../../../components/Header/styles";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import HeaderCart from "../../../components/Header/HeaderCart";
import Colors from "../../../styles/colors";
import { Chip, Menu } from "react-native-paper";
import _ from "lodash";
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from "accordion-collapse-react-native";
import FontFamily from "../../../constants/FontFamily";
import ModalOffer from "../../../components/Modal/ModalOffer";
import navigationPath from "../../../constants/navigationPath";
import { useNavigation } from "@react-navigation/native";
import CustomMenu from "./CustomMenu";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
const MyJobs = () => {
	const { batch_appointments, workType } = useSelector((state) => state.appointments);
	const [showPrimary, setShowPrimary] = useState(null);
	const navigation = useNavigation();
	const [visible, setVisible] = useState(false);
	const [visible1, setVisible1] = useState(false);
	const [visible3, setVisible3] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const dispatch = useDispatch();
	const [datePickerVisible, setDatePickerVisible] = useState(false);
	const [filterData, setFilterData] = useState({
		work_type: null,
		start_date: null,
		big_type: null,
		group_type: null,
		search: null,
	});
	// const data = [
	// 	{
	// 		id: 41,
	// 		type_of_requsest: "CLU Assessment (34 & 35 Act)",
	// 		post_code: "",
	// 		grouping_type: "work type",
	// 		base_price: null,
	// 		count: "3",
	// 		appointments: [
	// 			{
	// 				id: 255,
	// 				deleted_at: null,
	// 				created_at: "2023-01-23T13:00:45.593243+05:30",
	// 				updated_at: "2023-01-23T13:01:01.381987+05:30",
	// 				is_deleted: false,
	// 				ref_id: "AA00255",
	// 				assessment_by: "field_worker",
	// 				base_price: null,
	// 				instruction: "instruction one",
	// 				start_date: "2023-01-23T13:00:49.651000+05:30",
	// 				end_date: "2023-01-26T13:00:49.680000+05:30",
	// 				duration: "72 h 0 m",
	// 				load_route_distance: false,
	// 				ineligible_suburbs: false,
	// 				all_agents: false,
	// 				waiting_list: true,
	// 				work_type: 8,
	// 				batch: 41,
	// 				appointment_status: 5,
	// 				company: 1,
	// 				job: 374,
	// 				customer: 108,
	// 				agent: 329,
	// 			},
	// 			{
	// 				id: 247,
	// 				deleted_at: null,
	// 				created_at: "2023-01-19T13:12:03.543970+05:30",
	// 				updated_at: "2023-01-19T13:12:25.143951+05:30",
	// 				is_deleted: false,
	// 				ref_id: "AA00247",
	// 				assessment_by: "field_worker",
	// 				base_price: null,
	// 				instruction: "gfgfgf",
	// 				start_date: "2023-01-19T13:12:06.733000+05:30",
	// 				end_date: "2023-01-20T13:12:06.756000+05:30",
	// 				duration: "24 h 0 m",
	// 				load_route_distance: false,
	// 				ineligible_suburbs: false,
	// 				all_agents: false,
	// 				waiting_list: true,
	// 				work_type: 8,
	// 				batch: 41,
	// 				appointment_status: 5,
	// 				company: 1,
	// 				job: 349,
	// 				customer: 242,
	// 				agent: 288,
	// 			},
	// 			{
	// 				id: 246,
	// 				deleted_at: null,
	// 				created_at: "2023-01-19T11:46:29.628356+05:30",
	// 				updated_at: "2023-01-19T17:19:31.040025+05:30",
	// 				is_deleted: false,
	// 				ref_id: "AA00246",
	// 				assessment_by: "field_worker",
	// 				base_price: null,
	// 				instruction: "jlk",
	// 				start_date: "2023-01-20T11:46:32.857000+05:30",
	// 				end_date: "2023-01-20T12:46:32.900000+05:30",
	// 				duration: "1 h 0 m",
	// 				load_route_distance: false,
	// 				ineligible_suburbs: false,
	// 				all_agents: false,
	// 				waiting_list: true,
	// 				work_type: 8,
	// 				batch: 41,
	// 				appointment_status: 5,
	// 				company: 1,
	// 				job: 343,
	// 				customer: 244,
	// 				agent: 318,
	// 			},
	// 		],
	// 		deleted_at: null,
	// 		created_at: "2023-01-23T14:36:03.675957+05:30",
	// 		updated_at: "2023-01-23T14:36:03.679532+05:30",
	// 		is_deleted: false,
	// 		ref_id: "BA00041",
	// 		bid_type: "down",
	// 		min_price: "100.00",
	// 		max_price: "200.00",
	// 		start_date: "2023-01-23",
	// 		end_date: "2023-01-23",
	// 		start_time: "14:36:03.676025",
	// 		end_time: "14:36:03.676041",
	// 		company: 1,
	// 	},
	// 	{
	// 		id: 42,
	// 		type_of_requsest: "A/C Assessment",
	// 		post_code: "",
	// 		grouping_type: "work type",
	// 		base_price: null,
	// 		count: "1",
	// 		appointments: [
	// 			{
	// 				id: 256,
	// 				deleted_at: null,
	// 				created_at: "2023-01-23T15:41:48.095310+05:30",
	// 				updated_at: "2023-01-23T15:42:59.147661+05:30",
	// 				is_deleted: false,
	// 				ref_id: "AA00256",
	// 				assessment_by: "field_worker",
	// 				base_price: null,
	// 				instruction: "instrution one",
	// 				start_date: "2023-01-26T15:41:51.432000+05:30",
	// 				end_date: "2023-01-27T16:41:51.471000+05:30",
	// 				duration: "25 h 0 m",
	// 				load_route_distance: false,
	// 				ineligible_suburbs: false,
	// 				all_agents: false,
	// 				waiting_list: true,
	// 				work_type: 3,
	// 				batch: 42,
	// 				appointment_status: 5,
	// 				company: 1,
	// 				job: 374,
	// 				customer: null,
	// 				agent: 329,
	// 			},
	// 		],
	// 		deleted_at: null,
	// 		created_at: "2023-01-23T15:43:26.631750+05:30",
	// 		updated_at: "2023-01-23T15:43:26.634532+05:30",
	// 		is_deleted: false,
	// 		ref_id: "BA00042",
	// 		bid_type: "only_bid",
	// 		min_price: "100.00",
	// 		max_price: "200.00",
	// 		start_date: "2023-01-24",
	// 		end_date: "2023-01-24",
	// 		start_time: "15:43:26.631804",
	// 		end_time: "15:43:26.631834",
	// 		company: 1,
	// 	},
	// 	{
	// 		id: 43,
	// 		type_of_requsest: "CLU Assessment (34 & 35 Act)",
	// 		post_code: "",
	// 		grouping_type: "work type",
	// 		base_price: null,
	// 		count: "1",
	// 		appointments: [
	// 			{
	// 				id: 245,
	// 				deleted_at: null,
	// 				created_at: "2023-01-18T19:53:29.852828+05:30",
	// 				updated_at: "2023-01-18T22:08:22.860661+05:30",
	// 				is_deleted: false,
	// 				ref_id: "AA00245",
	// 				assessment_by: "field_worker",
	// 				base_price: null,
	// 				instruction: "zdfc",
	// 				start_date: "2023-01-18T19:53:33.187000+05:30",
	// 				end_date: "2023-01-18T20:53:33.213000+05:30",
	// 				duration: "1 h 0 m",
	// 				load_route_distance: false,
	// 				ineligible_suburbs: false,
	// 				all_agents: false,
	// 				waiting_list: true,
	// 				work_type: 8,
	// 				batch: 43,
	// 				appointment_status: 5,
	// 				company: 1,
	// 				job: 336,
	// 				customer: null,
	// 				agent: 318,
	// 			},
	// 		],
	// 		deleted_at: null,
	// 		created_at: "2023-01-23T15:45:00.906358+05:30",
	// 		updated_at: "2023-01-23T15:45:00.909294+05:30",
	// 		is_deleted: false,
	// 		ref_id: "BA00043",
	// 		bid_type: "up",
	// 		min_price: "100.00",
	// 		max_price: "200.00",
	// 		start_date: "2023-01-23",
	// 		end_date: "2023-01-24",
	// 		start_time: "15:45:00.906418",
	// 		end_time: "15:45:00.906434",
	// 		company: 1,
	// 	},
	// 	{
	// 		id: 44,
	// 		type_of_requsest: "CLU Assessment (34 & 35 Act)",
	// 		post_code: "",
	// 		grouping_type: "work type",
	// 		base_price: null,
	// 		count: "1",
	// 		appointments: [
	// 			{
	// 				id: 243,
	// 				deleted_at: null,
	// 				created_at: "2023-01-18T16:49:17.754627+05:30",
	// 				updated_at: "2023-01-18T23:43:26.804436+05:30",
	// 				is_deleted: false,
	// 				ref_id: "AA00243",
	// 				assessment_by: "field_worker",
	// 				base_price: null,
	// 				instruction: "ad",
	// 				start_date: "2023-01-18T17:28:58.570000+05:30",
	// 				end_date: "2023-01-19T18:28:58.615000+05:30",
	// 				duration: "25 h 0 m",
	// 				load_route_distance: false,
	// 				ineligible_suburbs: false,
	// 				all_agents: false,
	// 				waiting_list: true,
	// 				work_type: 8,
	// 				batch: 44,
	// 				appointment_status: 5,
	// 				company: 1,
	// 				job: 332,
	// 				customer: null,
	// 				agent: 318,
	// 			},
	// 		],
	// 		deleted_at: null,
	// 		created_at: "2023-01-23T15:51:04.061520+05:30",
	// 		updated_at: "2023-01-23T15:51:04.064546+05:30",
	// 		is_deleted: false,
	// 		ref_id: "BA00044",
	// 		bid_type: "up",
	// 		min_price: "34.00",
	// 		max_price: "83.00",
	// 		start_date: "2023-01-24",
	// 		end_date: "2023-01-25",
	// 		start_time: "15:51:04.061616",
	// 		end_time: "15:51:04.061634",
	// 		company: 1,
	// 	},
	// 	{
	// 		id: 7,
	// 		type_of_requsest: "Sales Lead",
	// 		post_code: "",
	// 		grouping_type: "work type",
	// 		base_price: null,
	// 		count: "1",
	// 		appointments: [
	// 			{
	// 				id: 66,
	// 				deleted_at: null,
	// 				created_at: "2023-01-09T21:50:17.108892+05:30",
	// 				updated_at: "2023-01-09T22:13:25.057104+05:30",
	// 				is_deleted: false,
	// 				ref_id: "AA00066",
	// 				assessment_by: "field_worker",
	// 				base_price: null,
	// 				instruction: "Xcxvcc",
	// 				start_date: "2023-01-09T00:00:00+05:30",
	// 				end_date: null,
	// 				duration: null,
	// 				load_route_distance: false,
	// 				ineligible_suburbs: false,
	// 				all_agents: false,
	// 				waiting_list: true,
	// 				work_type: 6,
	// 				batch: 7,
	// 				appointment_status: 1,
	// 				company: 1,
	// 				job: 196,
	// 				customer: null,
	// 				agent: null,
	// 			},
	// 		],
	// 		deleted_at: null,
	// 		created_at: "2023-01-09T22:59:05.975257+05:30",
	// 		updated_at: "2023-01-09T22:59:05.978607+05:30",
	// 		is_deleted: false,
	// 		ref_id: "BA00007",
	// 		bid_type: "down",
	// 		min_price: "100.00",
	// 		max_price: "500.00",
	// 		start_date: "2023-01-24",
	// 		end_date: "2023-01-25",
	// 		start_time: "22:59:05.975314",
	// 		end_time: "22:59:05.975329",
	// 		company: 1,
	// 	},
	// 	{
	// 		id: 45,
	// 		type_of_requsest: "Heat Pump Lead (To External)",
	// 		post_code: "",
	// 		grouping_type: "work type",
	// 		base_price: null,
	// 		count: "1",
	// 		appointments: [
	// 			{
	// 				id: 241,
	// 				deleted_at: null,
	// 				created_at: "2023-01-18T13:25:27.747348+05:30",
	// 				updated_at: "2023-01-18T16:48:37.534554+05:30",
	// 				is_deleted: false,
	// 				ref_id: "AA00241",
	// 				assessment_by: "field_worker",
	// 				base_price: null,
	// 				instruction: "xc",
	// 				start_date: "2023-01-18T13:25:31.013000+05:30",
	// 				end_date: "2023-01-21T14:29:31.045000+05:30",
	// 				duration: "73 h 4 m",
	// 				load_route_distance: false,
	// 				ineligible_suburbs: false,
	// 				all_agents: false,
	// 				waiting_list: true,
	// 				work_type: 4,
	// 				batch: 45,
	// 				appointment_status: 5,
	// 				company: 1,
	// 				job: 325,
	// 				customer: 48,
	// 				agent: 318,
	// 			},
	// 		],
	// 		deleted_at: null,
	// 		created_at: "2023-01-23T15:56:24.817968+05:30",
	// 		updated_at: "2023-01-23T15:56:24.825565+05:30",
	// 		is_deleted: false,
	// 		ref_id: "BA00045",
	// 		bid_type: "up",
	// 		min_price: "34.00",
	// 		max_price: "200.00",
	// 		start_date: "2023-01-24",
	// 		end_date: "2023-01-25",
	// 		start_time: "15:56:24.818028",
	// 		end_time: "15:56:24.818045",
	// 		company: 1,
	// 	},
	// 	{
	// 		id: 8,
	// 		type_of_requsest: "Cold Room Assessment",
	// 		post_code: "",
	// 		grouping_type: "work type",
	// 		base_price: "200.00",
	// 		count: "1",
	// 		appointments: [
	// 			{
	// 				id: 81,
	// 				deleted_at: null,
	// 				created_at: "2023-01-09T23:11:07.971963+05:30",
	// 				updated_at: "2023-01-10T04:24:35.061791+05:30",
	// 				is_deleted: false,
	// 				ref_id: "AA00081",
	// 				assessment_by: "field_worker",
	// 				base_price: "200.00",
	// 				instruction: "Geeegdfdf",
	// 				start_date: "2023-01-09T00:00:00+05:30",
	// 				end_date: "2023-01-09T00:00:00+05:30",
	// 				duration: null,
	// 				load_route_distance: false,
	// 				ineligible_suburbs: false,
	// 				all_agents: false,
	// 				waiting_list: true,
	// 				work_type: 5,
	// 				batch: 8,
	// 				appointment_status: 3,
	// 				company: 1,
	// 				job: 210,
	// 				customer: null,
	// 				agent: null,
	// 			},
	// 		],
	// 		deleted_at: null,
	// 		created_at: "2023-01-10T22:17:34.123159+05:30",
	// 		updated_at: "2023-01-10T22:17:34.128414+05:30",
	// 		is_deleted: false,
	// 		ref_id: "BA00008",
	// 		bid_type: "down",
	// 		min_price: "900.00",
	// 		max_price: "100.00",
	// 		start_date: "2023-01-25",
	// 		end_date: "2023-01-26",
	// 		start_time: "22:17:34.123222",
	// 		end_time: "22:17:34.123239",
	// 		company: 1,
	// 	},
	// 	{
	// 		id: 46,
	// 		type_of_requsest: "CLU Assessment (34 & 35 Act)",
	// 		post_code: "",
	// 		grouping_type: "work type",
	// 		base_price: null,
	// 		count: "1",
	// 		appointments: [
	// 			{
	// 				id: 240,
	// 				deleted_at: null,
	// 				created_at: "2023-01-18T13:14:18.328244+05:30",
	// 				updated_at: "2023-01-19T22:46:11.850469+05:30",
	// 				is_deleted: false,
	// 				ref_id: "AA00240",
	// 				assessment_by: "field_worker",
	// 				base_price: null,
	// 				instruction: "sxzdc",
	// 				start_date: "2023-01-18T13:14:21.496000+05:30",
	// 				end_date: "2023-01-19T14:14:21.527000+05:30",
	// 				duration: "25 h 0 m",
	// 				load_route_distance: false,
	// 				ineligible_suburbs: false,
	// 				all_agents: false,
	// 				waiting_list: true,
	// 				work_type: 8,
	// 				batch: 46,
	// 				appointment_status: 5,
	// 				company: 1,
	// 				job: 324,
	// 				customer: null,
	// 				agent: null,
	// 			},
	// 		],
	// 		deleted_at: null,
	// 		created_at: "2023-01-23T15:57:45.221515+05:30",
	// 		updated_at: "2023-01-23T15:57:45.229754+05:30",
	// 		is_deleted: false,
	// 		ref_id: "BA00046",
	// 		bid_type: "only_bid",
	// 		min_price: "34.00",
	// 		max_price: "200.00",
	// 		start_date: "2023-01-24",
	// 		end_date: "2023-01-25",
	// 		start_time: "15:57:45.221619",
	// 		end_time: "15:57:45.221638",
	// 		company: 1,
	// 	},
	// 	{
	// 		id: 11,
	// 		type_of_requsest: "",
	// 		post_code: "",
	// 		grouping_type: "work type",
	// 		base_price: null,
	// 		count: "0",
	// 		appointments: [],
	// 		deleted_at: null,
	// 		created_at: "2023-01-17T09:18:01.884843+05:30",
	// 		updated_at: "2023-01-17T09:18:01.888234+05:30",
	// 		is_deleted: false,
	// 		ref_id: "BA00011",
	// 		bid_type: "up",
	// 		min_price: "30.00",
	// 		max_price: "50.00",
	// 		start_date: "2023-01-18",
	// 		end_date: "2023-01-19",
	// 		start_time: "09:18:01.884910",
	// 		end_time: "09:18:01.884927",
	// 		company: 41,
	// 	},
	// 	{
	// 		id: 17,
	// 		type_of_requsest: "CLU Assessment (34 & 35 Act)",
	// 		post_code: "",
	// 		grouping_type: "work type",
	// 		base_price: null,
	// 		count: "2",
	// 		appointments: [
	// 			{
	// 				id: 211,
	// 				deleted_at: null,
	// 				created_at: "2023-01-17T12:14:32.551448+05:30",
	// 				updated_at: "2023-01-17T13:55:41.321017+05:30",
	// 				is_deleted: false,
	// 				ref_id: "AA00211",
	// 				assessment_by: "field_worker",
	// 				base_price: null,
	// 				instruction: "grrtassessment_by",
	// 				start_date: "2023-01-17T12:14:45.766000+05:30",
	// 				end_date: "2023-01-18T12:14:45.797000+05:30",
	// 				duration: "24",
	// 				load_route_distance: false,
	// 				ineligible_suburbs: false,
	// 				all_agents: false,
	// 				waiting_list: true,
	// 				work_type: 8,
	// 				batch: 17,
	// 				appointment_status: 5,
	// 				company: 1,
	// 				job: 294,
	// 				customer: 108,
	// 				agent: 249,
	// 			},
	// 			{
	// 				id: 195,
	// 				deleted_at: null,
	// 				created_at: "2023-01-16T20:10:42.083876+05:30",
	// 				updated_at: "2023-01-16T20:10:51.649999+05:30",
	// 				is_deleted: false,
	// 				ref_id: "AA00195",
	// 				assessment_by: "field_worker",
	// 				base_price: null,
	// 				instruction: "sdf",
	// 				start_date: "2023-01-16T20:10:45.270000+05:30",
	// 				end_date: "2023-01-17T21:10:45.313000+05:30",
	// 				duration: "1",
	// 				load_route_distance: false,
	// 				ineligible_suburbs: false,
	// 				all_agents: false,
	// 				waiting_list: true,
	// 				work_type: 8,
	// 				batch: 17,
	// 				appointment_status: 1,
	// 				company: 1,
	// 				job: 282,
	// 				customer: null,
	// 				agent: 270,
	// 			},
	// 		],
	// 		deleted_at: null,
	// 		created_at: "2023-01-17T13:31:04.344584+05:30",
	// 		updated_at: "2023-01-17T13:31:04.347013+05:30",
	// 		is_deleted: false,
	// 		ref_id: "BA00017",
	// 		bid_type: "only_bid",
	// 		min_price: "100.00",
	// 		max_price: "500.00",
	// 		start_date: "2023-01-18",
	// 		end_date: "2023-01-18",
	// 		start_time: "13:31:04.344643",
	// 		end_time: "13:31:04.344660",
	// 		company: 1,
	// 	},
	// ];
	const showDatePicker = () => {
		setDatePickerVisible(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisible(false);
	};

	const handleConfirm = (date) => {
		setFilterData({ ...filterData, start_date: date });
		hideDatePicker();
	};
	// useEffect(() => {
	// 	dispatch(getAppointmentWorkType());
	// }, []);
	// useEffect(() => {
	// 	let params = _.omitBy(filterData, _.isNull);
	// 	dispatch(getAppointmentsAsync({ params: { ...params, expand: "appointments.work_type" } }));
	// }, [filterData]);
	const showModal = (props) => {
		setModalVisible(true);
	};
	const hideModal = () => {
		setModalVisible(false);
	};

	useEffect(() => {
		// dispatch(getAppointmentsAsync());
		// setData(k);
	}, []);

	const renderItem = ({ item, index }) => {
		return (
			<>
				<Pressable
					onPress={() => navigation.navigate(navigationPath.FEATURED)}
					style={{
						height: responsiveHeight(20),
						backgroundColor: Colors.WHITE,
						marginHorizontal: responsiveWidth(3),
						borderTopLeftRadius: 5,
						borderTopRightRadius: 5,
						borderColor: "#99999926",
						borderWidth: 1,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							padding: 10,
							backgroundColor: Colors.CARD_HEADER,

							justifyContent: "space-between",
							// borderWidth: 0.2,
							// borderTopLeftRadius: 5,
							// borderTopRightRadius: 5,
							borderColor: Colors.BORDER_GREY,
						}}
					>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								marginHorizontal: responsiveWidth(2),
							}}
						>
							<Image style={{ width: 19, height: 18 }} source={imagePath.CUBE} />
							<Text
								style={{
									marginStart: responsiveWidth(4),
									fontFamily: FontFamily.POPPINS_SEMIBOLD,
									color: Colors.BLACK,
									fontSize: 12,
									flexWrap: "wrap",
								}}
							>
								{item.type_of_requsest}
							</Text>
						</View>
					</View>
					<View
						style={{
							marginLeft: 12,
							marginBottom: 12,
							marginTop: 8,
						}}
					>
						<View
							style={{
								flexDirection: "row",
							}}
						>
							<View style={{ flex: 0.35, marginBottom: 4 }}>
								<Text
									style={{
										fontFamily: FontFamily.POPPINS_REGULAR,
										color: Colors.BLACK,
										fontSize: 10,
										lineHeight: 16,
										flexWrap: "wrap",
									}}
								>
									Post Code
								</Text>
							</View>
							<View style={{ flex: 0.65, marginBottom: 4 }}>
								<Text
									style={{
										fontFamily: FontFamily.POPPINS_REGULAR,
										color: "#666666",
										fontSize: 10,
										flexWrap: "wrap",
										lineHeight: 16,
									}}
								>
									{item.post_code}
								</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection: "row",
							}}
						>
							<View style={{ flex: 0.35, marginBottom: 4 }}>
								<Text
									style={{
										fontFamily: FontFamily.POPPINS_REGULAR,
										color: Colors.BLACK,
										fontSize: 10,
										lineHeight: 16,
										flexWrap: "wrap",
									}}
								>
									Grouping Type
								</Text>
							</View>
							<View style={{ flex: 0.65, marginBottom: 4 }}>
								<Text
									style={{
										fontFamily: FontFamily.POPPINS_REGULAR,
										color: "#666666",
										fontSize: 10,
										flexWrap: "wrap",
										lineHeight: 16,
									}}
								>
									{_.startCase(item.grouping_type)}
								</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection: "row",
							}}
						>
							<View style={{ flex: 0.35, marginBottom: 4 }}>
								<Text
									style={{
										fontFamily: FontFamily.POPPINS_REGULAR,
										color: Colors.BLACK,
										fontSize: 10,
										lineHeight: 16,
										flexWrap: "wrap",
									}}
								>
									Bid start and end date :
								</Text>
							</View>
							<View style={{ flex: 0.65, marginBottom: 4 }}>
								<Text
									style={{
										fontFamily: FontFamily.POPPINS_REGULAR,
										color: "#666666",
										fontSize: 10,
										flexWrap: "wrap",
										lineHeight: 16,
									}}
								>
									{moment(item.start_date).format("ddd Do of MMMM")} -{" "}
									{moment(item.end_date).format("ddd Do MMM")}
								</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection: "row",
							}}
						>
							<View style={{ flex: 0.35, marginBottom: 4 }}>
								<Text
									style={{
										fontFamily: FontFamily.POPPINS_REGULAR,
										color: Colors.BLACK,
										fontSize: 10,
										lineHeight: 16,
										flexWrap: "wrap",
									}}
								>
									Bid Type :
								</Text>
							</View>
							<View style={{ flex: 0.65, marginBottom: 4 }}>
								<Text
									style={{
										fontFamily: FontFamily.POPPINS_REGULAR,
										color: "#666666",
										fontSize: 10,
										flexWrap: "wrap",
										lineHeight: 16,
									}}
								>
									{_.startCase(item.bid_type)}
								</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection: "row",
							}}
						>
							<View style={{ flex: 0.35, marginBottom: 4 }}>
								<Text
									style={{
										fontFamily: FontFamily.POPPINS_REGULAR,
										color: Colors.BLACK,
										fontSize: 10,
										lineHeight: 16,
										flexWrap: "wrap",
									}}
								>
									Base Price :
								</Text>
							</View>
							<View style={{ flex: 0.65, marginBottom: 4 }}>
								<View
									style={{
										height: 17,
										alignItems: "flex-start",
										marginTop: 4,
									}}
								>
									<Text
										style={{
											paddingHorizontal: 4,
											backgroundColor: Colors.GREEN,
											fontFamily: FontFamily.POPPINS_REGULAR,
											color: Colors.WHITE,
											fontSize: 10,
											flexWrap: "wrap",
											lineHeight: 16,
											paddingHorizontal: 7,
										}}
									>
										{item.base_price ? "$" + item.base_price : "NA"}
									</Text>
								</View>
							</View>
						</View>
					</View>
				</Pressable>
				{item.appointments.length > 0 && (
					<ScrollView showsVerticalScrollIndicator={false}>
						<View>
							<View
								style={{
									marginHorizontal: responsiveWidth(3),
									marginBottom: 13,
									backgroundColor: Colors.WHITE,
									flexDirection: "row",
									alignItems: "center",
									backgroundColor: Colors.CARD_GREY,
									borderWidth: 0.5,
									borderBottomLeftRadius: 5,
									borderBottomRightRadius: 5,
									borderColor: Colors.BORDER_GREY,
								}}
							>
								<Collapse
									onToggle={(e) => setShowPrimary({ [item.id]: e })}
									style={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}
								>
									<CollapseHeader>
										<View
											style={{
												flexDirection: "row",
												height: 35,
												alignItems: "center",
												backgroundColor: Colors.CARD_GREY,
												justifyContent: "space-between",
											}}
										>
											<View
												style={{
													flexDirection: "row",
													justifyContent: "center",
													alignItems: "center",
													marginHorizontal: responsiveWidth(4),
												}}
											>
												<View
													style={{
														flex: 1,
														alignItems: "center",
														flexDirection: "row",
														justifyContent: "center",
														marginHorizontal: responsiveWidth(1.8),
													}}
												>
													<Image style={{ width: 20, height: 18 }} source={imagePath.LIST} />

													<Text
														style={{
															color: "#666666",
															marginStart: responsiveWidth(4),
															fontFamily: FontFamily.POPPINS_MEDIUM,
															fontSize: 12,
															flexWrap: "wrap",
														}}
													>
														Appointments
													</Text>
													<Text
														style={{
															color: Colors.RED,
															marginStart: responsiveWidth(2),
															fontFamily: FontFamily.POPPINS_REGULAR,
															fontSize: 12,
															flexWrap: "wrap",
														}}
													>
														{item.appointments.length} Apps
													</Text>
													<Image
														style={{
															width: 10,
															height: 10,
															marginStart: responsiveWidth(2),
															transform: [
																{
																	rotate: showPrimary?.[item.id]
																		? "360deg"
																		: "180deg",
																},
															],
														}}
														source={imagePath.DROPDOWN}
													/>
												</View>
											</View>
										</View>
									</CollapseHeader>
									<CollapseBody
										style={{
											borderColor: Colors.CARD_GREY,
											borderWidth: 0.5,
											borderBottomLeftRadius: 5,
											borderBottomRightRadius: 5,
										}}
									>
										{headPrimary(item.appointments)}
									</CollapseBody>
								</Collapse>
							</View>
						</View>
					</ScrollView>
				)}
			</>
		);
	};
	const headPrimary = (item) => {
		return (
			<View
				style={{
					width: "100%",
					backgroundColor: Colors.WHITE,
					borderBottomLeftRadius: 5,
					borderBottomRightRadius: 5,
				}}
			>
				<FlatList
					horizontal={true}
					scrollEnabled={true}
					showsHorizontalScrollIndicator={false}
					data={item}
					contentContainerStyle={{
						flexDirection: "row",
					}}
					renderItem={({ item, index }) => {
						return (
							<View
								bordered
								style={{
									backgroundColor: Colors.WHITE,
									marginHorizontal: 10,
									marginVertical: 10,
									maxWidth: 162,
									minWidth: 162,
								}}
							>
								<View
									style={{
										flexDirection: "row",
										width: "100%",
										backgroundColor: Colors.WHITE,
									}}
								>
									<Pressable
										style={{
											backgroundColor: index % 2 == 1 ? Colors.NAVY_BLUE : "#F7FAFD",
											paddingVertical: 6,
											paddingHorizontal: 5,
											width: "100%",
										}}
									>
										<View
											style={{
												flexDirection: "row",
												paddingBottom: 6,
												borderBottomWidth: 0.2,
												borderBottomColor: Colors.CARD_GREY,
											}}
										>
											<Image
												style={{
													width: 13,
													height: 12,
													tintColor: index % 2 == 1 ? Colors.WHITE : Colors.BLACK,
												}}
												source={imagePath.APPOINTMENT}
											/>

											<Text
												style={{
													fontSize: 10,
													flex: 1,
													textAlign: "center",
													color: index % 2 == 1 ? Colors.WHITE : Colors.BLACK,
													marginStart: 7,
												}}
											>
												{item?.work_type?.title}
											</Text>
											{/* <Image
           style={{
            width: 10,
            height: 10,
            marginStart: responsiveWidth(2),
            tintColor: index % 2 == 1 ? Colors.WHITE : Colors.BLACK,
           }}
           source={imagePath.CLOSE}
          /> */}
										</View>
										<View
											style={{
												paddingRight: 10,
											}}
										>
											<View
												style={{
													flexDirection: "row",
													justifyContent: "space-between",
													marginTop: 8,
													marginBottom: 3,
												}}
											>
												<Text
													style={{
														fontSize: 10,
														lineHeight: 16,
														fontFamily: FontFamily.POPPINS_REGULAR,
														color: index % 2 == 1 ? Colors.WHITE : Colors.BLACK,
														flexWrap: "wrap",
														flex: 0.5,
													}}
												>
													Appt Id :
												</Text>
												<Text
													style={{
														fontSize: 10,
														lineHeight: 16,
														color: index % 2 == 1 ? Colors.WHITE : "#666666",
														flex: 0.5,
														textAlign: "right",
													}}
												>
													{item.ref_id}
												</Text>
											</View>
											<View
												style={{
													flexDirection: "row",
													justifyContent: "space-between",
													marginBottom: 8,
												}}
											>
												<Text
													style={{
														fontSize: 10,
														lineHeight: 16,
														fontFamily: FontFamily.POPPINS_REGULAR,
														color: index % 2 == 1 ? Colors.WHITE : Colors.BLACK,
														flex: 0.5,
														flexWrap: "wrap",
													}}
												>
													Assessment Date :
												</Text>
												<Text
													style={{
														fontSize: 10,
														lineHeight: 16,
														color: index % 2 == 1 ? Colors.WHITE : "#666666",
														flex: 0.5,
														textAlign: "right",
													}}
												>
													{moment(item.start_date).format("DD-MMM-yyyy")}
												</Text>
											</View>
											<View
												style={{
													flexDirection: "row",
													justifyContent: "space-between",
													// marginBottom: 8,
												}}
											>
												<Text
													style={{
														fontSize: 10,
														lineHeight: 16,
														fontFamily: FontFamily.POPPINS_REGULAR,
														color: index % 2 == 1 ? Colors.WHITE : Colors.BLACK,
														flex: 0.5,
														flexWrap: "wrap",
													}}
												>
													Validation :
												</Text>
												<View style={{ flex: 0.5, alignItems: "flex-end" }}>
													<View
														style={{
															backgroundColor:
																index % 2 == 1 ? Colors.WHITE : Colors.NAVY_BLUE,
															marginBottom: 5,
															height: 25,
															width: 25,
															borderRadius: 2,
															justifyContent: "center",
															alignItems: "center",
														}}
													>
														<Image
															resizeMode="center"
															style={{ width: 18, height: 18 }}
															source={
																index % 2 == 1
																	? imagePath.CELLPHONE_BLUE
																	: imagePath.CELLPHONE
															}
														/>
													</View>
												</View>
											</View>
										</View>
									</Pressable>
								</View>
							</View>
						);
					}}
				/>
			</View>
		);
	};

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<DateTimePickerModal
				date={new Date()}
				isVisible={datePickerVisible}
				mode="date"
				onConfirm={handleConfirm}
				onCancel={hideDatePicker}
			/>
			<View>
				<HeaderCart
					onPress={() => navigation.goBack()}
					image={imagePath.LEFT}
					title="My Jobs"
					menu={imagePath.MENU}
					notification={imagePath.NOTIFICATION}
				/>
			</View>
			<View style={{ marginTop: responsiveHeight(4) }}>
				<Search
					search={imagePath.SEARCH}
					value={filterData.search}
					onChange={(search) => setFilterData({ ...filterData, search })}
					placeholder={"Search"}
				/>
			</View>
			<View>
				<ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ marginTop: 20 }}>
					<View
						style={{
							flexDirection: "row",
							margin: 1,
						}}
					>
						<CustomMenu
							setVisible={setVisible}
							visible={visible}
							anchor={
								<Chip
									onPress={() => {
										setVisible(true);
									}}
									closeIcon={visible ? "angle-up" : "angle-down"}
									onClose={() => setVisible(true)}
								>
									<Text
										style={{
											flexWrap: "wrap",
											color: Colors.BLACK,
											fontFamily: FontFamily.POPPINS_LIGHT,
											fontSize: responsiveFontSize(1.2),
										}}
									>
										Type of request
									</Text>
								</Chip>
							}
						>
							{workType?.map((obj) => {
								return (
									<Menu.Item
										onPress={() => {
											setFilterData({ ...filterData, work_type: obj.id });
											setVisible(false);
										}}
										title={obj.title}
									/>
								);
							})}
						</CustomMenu>

						<CustomMenu
							setVisible={setVisible1}
							visible={visible1}
							anchor={
								<Chip
									onPress={() => {
										setVisible1(true);
									}}
									closeIcon={visible1 ? "angle-up" : "angle-down"}
									onClose={() => setVisible1(true)}
								>
									<Text
										style={{
											flexWrap: "wrap",
											color: Colors.BLACK,
											fontFamily: FontFamily.POPPINS_LIGHT,
											fontSize: responsiveFontSize(1.2),
										}}
									>
										Grouping Type
									</Text>
								</Chip>
							}
						>
							{["Suburb", "State", "LGA"].map((obj) => {
								return (
									<Menu.Item
										onPress={() => {
											setFilterData({ ...filterData, group_type: obj });
											setVisible1(false);
										}}
										title={obj}
									/>
								);
							})}
						</CustomMenu>

						<Chip onPress={showDatePicker} closeIcon={"calendar"} onClose={showDatePicker}>
							<Text
								style={{
									flexWrap: "wrap",
									color: Colors.BLACK,
									fontFamily: FontFamily.POPPINS_LIGHT,
									fontSize: responsiveFontSize(1.2),
								}}
							>
								Date
							</Text>
						</Chip>
						<CustomMenu
							setVisible={setVisible3}
							visible={visible3}
							anchor={
								<Chip
									onPress={() => {
										setVisible3(true);
									}}
									closeIcon={visible3 ? "angle-up" : "angle-down"}
									onClose={() => setVisible3(true)}
								>
									<Text
										style={{
											flexWrap: "wrap",
											color: Colors.BLACK,
											fontFamily: FontFamily.POPPINS_LIGHT,
											fontSize: responsiveFontSize(1.2),
										}}
									>
										Bid Type
									</Text>
								</Chip>
							}
						>
							{["up", "down"].map((obj) => {
								return (
									<Menu.Item
										onPress={() => {
											setFilterData({ ...filterData, bid_type: obj });
											setVisible3(false);
										}}
										title={obj}
									/>
								);
							})}
						</CustomMenu>
					</View>
				</ScrollView>
			</View>
			<View>
				{_.keys(_.omitBy(filterData, _.isNull)).length > 0 && (
					<Text style={{ marginLeft: 10, marginTop: 10, fontSize: 10 }}>Applied Filters</Text>
				)}
				<ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
					<View
						style={{
							flexDirection: "row",
							margin: 1,
							marginTop: 10,
						}}
					>
						{_.keys(_.omitBy(filterData, _.isNull)).map((obj) => {
							let val = filterData[obj];
							if (obj === "start_date") {
								val = moment(val).format("LL");
							}
							if (obj === "work_type") {
								val = workType.filter((o) => o.id === val)[0].title;
							}
							return (
								<Chip
									style={{
										marginLeft: 10,
										backgroundColor: Colors.BLUE,
										color: Colors.WHITE,
									}}
									closeIcon={"close"}
									onClose={() => setFilterData({ ...filterData, [obj]: null })}
								>
									<Text
										style={{
											flexWrap: "wrap",
											color: Colors.WHITE,
											fontFamily: FontFamily.POPPINS_LIGHT,
											fontSize: responsiveFontSize(1.2),
										}}
									>
										{val}
									</Text>
								</Chip>
							);
						})}
					</View>
				</ScrollView>
			</View>
			<View style={{ marginTop: responsiveHeight(2) }}>
				{/* <FlatList
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 150 }}
					data={}
					renderItem={renderItem}
				/> */}

				<ModalOffer visible={modalVisible} onCancel={hideModal} />
			</View>
		</SafeAreaView>
	);
};

export default MyJobs;
