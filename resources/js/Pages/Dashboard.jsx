import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProfileModal from '@/Components/ProfileModal';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import TeamMemberCardPreview from '@/Pages/Admin/TeamMembers/TeamMemberCardPreview';

function emptyCareersCultureForm() {
    return {
        title: '',
        body: '',
        image_path: '',
        image_file: null,
        display_order: 0,
        is_active: true,
    };
}

function emptyCareersJobForm() {
    return {
        title: '',
        employment_type: 'Full-time',
        location: '',
        summary: '',
        responsibilities: ['', '', ''],
        icon_variant: 1,
        display_order: 0,
        is_active: true,
    };
}

export default function Dashboard() {
    const { props } = usePage();
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [adminTopoffroadProductCategory, setAdminTopoffroadProductCategory] = useState('car-accessories');
    const profileButtonRef = useRef(null);
    const sundia = props.sundia;
    const siam = props.siam;
    const tpsmi = props.tpsmi;
    const topoffroad = props.topoffroad;
    const missionVision = props.missionVision;
    const subsidiaries = props.subsidiaries ?? [];
    const teamMembers = props.teamMembers ?? [];
    const trustedCompanies = props.trustedCompanies ?? [];
    const contactInfos = props.contactInfos ?? [];
    const upcomingEventsFromDb = props.upcomingEvents ?? [];
    const siamProductCategories = props.siamProductCategories ?? [];
    const tpsmiProducts = props.tpsmiProducts ?? [];
    const topoffroadProducts = props.topoffroadProducts ?? [];
    const careersCultureCards = props.careersCultureCards ?? [];
    const careersJobs = props.careersJobs ?? [];
    const careersJobIconOptions = props.careersJobIconOptions ?? [];
    const flashLogoSuccess = props?.flash?.success_logo;
    const flashStatsSuccess = props?.flash?.success_stats;
    const flashVideoSuccess = props?.flash?.success_video;
    const flashSiamVideoSuccess = props?.flash?.success_siam_video;
    const flashTpsmiVideoSuccess = props?.flash?.success_tpsmi_video;
    const flashTpsmiStatsSuccess = props?.flash?.success_tpsmi_stats;
    const flashTopoffroadVideoSuccess = props?.flash?.success_topoffroad_video;
    const flashTopoffroadStatsSuccess = props?.flash?.success_topoffroad_stats;
    const flashMissionVisionSuccess = props?.flash?.success_mission_vision;
    const flashSubsidiarySuccess = props?.flash?.success_subsidiary;
    const flashTeamMemberSuccess = props?.flash?.success_team_member;
    const flashTrustedCompanySuccess = props?.flash?.success_trusted_company;
    const flashContactInfoSuccess = props?.flash?.success_contact_info;
    const flashUpcomingEventSuccess = props?.flash?.success_upcoming_event;
    const flashSiamProductCategorySuccess = props?.flash?.success_siam_product_category;
    const flashSiamCategoryProductSuccess = props?.flash?.success_siam_category_product;
    const flashTpsmiProductSuccess = props?.flash?.success_tpsmi_product;
    const flashTopoffroadProductSuccess = props?.flash?.success_topoffroad_product;
    const flashCareersSuccess = props?.flash?.success_careers;
    const defaultMissionText =
        "Commits to provide solutions to every clients' need through continual improvement in every aspect of its business, efficient approach to Research and Development, and maximize use of its network while continuously expanding and building bridges among and beyond the industries it caters.";
    const defaultVisionText =
        'To be chosen as one of the premiere partners by our clients in each of the subsidiaries products and services for every major industry played upon.';
    const sundiaContent = (() => {
        const raw = sundia?.content;
        if (!raw) return {};
        if (typeof raw === 'object') return raw;
        if (typeof raw === 'string') {
            try {
                const parsed = JSON.parse(raw);
                return parsed && typeof parsed === 'object' ? parsed : {};
            } catch {
                return {};
            }
        }
        return {};
    })();

    const siamContent = (() => {
        const raw = siam?.content;
        if (!raw) return {};
        if (typeof raw === 'object') return raw;
        if (typeof raw === 'string') {
            try {
                const parsed = JSON.parse(raw);
                return parsed && typeof parsed === 'object' ? parsed : {};
            } catch {
                return {};
            }
        }
        return {};
    })();

    const tpsmiContent = (() => {
        const raw = tpsmi?.content;
        if (!raw) return {};
        if (typeof raw === 'object') return raw;
        if (typeof raw === 'string') {
            try {
                const parsed = JSON.parse(raw);
                return parsed && typeof parsed === 'object' ? parsed : {};
            } catch {
                return {};
            }
        }
        return {};
    })();

    const topoffroadContent = (() => {
        const raw = topoffroad?.content;
        if (!raw) return {};
        if (typeof raw === 'object') return raw;
        if (typeof raw === 'string') {
            try {
                const parsed = JSON.parse(raw);
                return parsed && typeof parsed === 'object' ? parsed : {};
            } catch {
                return {};
            }
        }
        return {};
    })();

    const companies = [
        {
            name: 'SUNDIA',
            description: 'Owner Dashboard',
            href: '/',
        },
        {
            name: 'SIAM',
            description: 'Sales & Distribution',
            href: '/siam',
        },
        {
            name: 'TPSMI',
            description: 'Packaging Solutions',
            href: '/tpsmi',
        },
        {
            name: 'TOP OFFROAD',
            description: 'Outdoor & Accessories',
            href: '/topoffroad',
        },
        {
            name: 'CAREERS',
            description: 'Hiring & culture',
            href: '/careers',
        },
    ];

    const [selectedCompany, setSelectedCompany] = useState(companies[0]);

    const defaultSubsidiariesPreview = [
        {
            id: null,
            name: 'SD TRADING C.',
            description:
                'Founded in 1982 and forged an exclusive partnership with Sunstar of Japan, started supplying windshield sealers to local automotive OEMs. Other products introduced include body sealers, D/G, primers, and adhesives',
            logo_path: '/sd-remove.png',
            background_path: '/SD.JPG',
            display_style: 'dark',
            display_order: 0,
            is_active: true,
        },
        {
            id: null,
            name: 'SIAM DIRECT',
            description:
                'Established in 2010 to handle distribution of manufacturing consumables. We also stand as the sales and marketing arm of the whole Sundia group.',
            logo_path: '/siam.png',
            background_path: null,
            display_style: 'light',
            display_order: 1,
            is_active: true,
        },
        {
            id: null,
            name: 'TPMSI',
            description:
                'Offer a broad range of packaging solutions to meet our customer needs and continuously improve our operations to better respond to those needs.',
            logo_path: '/Tpsmilogo.png',
            background_path: '/Tpsmiprod.JPG',
            display_style: 'dark',
            display_order: 2,
            is_active: true,
        },
        {
            id: null,
            name: 'R2R',
            description:
                'A primary painting contractor of automotive, motorcycle, and electronic components that includes ED painting, powder coating, and automotive plastic painting.',
            logo_path: '/Sundialogo.png',
            background_path: null,
            display_style: 'light',
            display_order: 3,
            is_active: true,
        },
        {
            id: null,
            name: 'TOP OFFROAD',
            description:
                'TOP Offroad Philippines have become a major player in the distribution and installation of outdoor and off-road vehicle accessories. We continuously expand our product line to help our customers enjoy the outdoor experience.',
            logo_path: '/topoffroadlogo.png',
            background_path: '/ford.jpg',
            display_style: 'dark',
            display_order: 4,
            is_active: true,
        },
    ];

    const previewSubsidiaries =
        subsidiaries.length > 0 ? subsidiaries : defaultSubsidiariesPreview;

    const defaultTeamMembersPreview = [
        { id: null, name: 'MR. DANTE LAMANDO', title: 'CHAIRMAN', company: 'SUNDIA', company_logo: 'sundia', display_order: 0, is_active: true },
        { id: null, name: 'MR. JEP BERNAS', title: 'PRESIDENT', company: 'TPSMI', company_logo: 'tpsmi', display_order: 1, is_active: true },
        { id: null, name: 'MR. GENER DOCTORA', title: 'VICE PRESIDENT', company: 'TOP OFFROAD', company_logo: 'top', display_order: 2, is_active: true },
        { id: null, name: 'MS. RHOMAY ANTONIO', title: 'ASST. PLANT MANAGER', company: 'SUNDIA', company_logo: 'sundia', display_order: 3, is_active: true },
        { id: null, name: 'MR. RD ELIZONDO', title: 'MARKETING MANAGER', company: 'SUNDIA', company_logo: 'sundia', display_order: 4, is_active: true },
        { id: null, name: 'MR. ROMEO AMORES, JR.', title: 'SR. ACCOUNTS OFFICER', company: 'SUNDIA', company_logo: 'sundia', display_order: 5, is_active: true },
    ];

    const previewTeamMembers =
        teamMembers.length > 0 ? teamMembers : defaultTeamMembersPreview;

    const defaultTrustedCompaniesPreview = [
        { id: null, name: 'Siam Direct', logo_path: '/siam.png', display_order: 0, is_active: true },
        { id: null, name: 'TPSMI', logo_path: '/Tpsmilogo.png', display_order: 1, is_active: true },
        { id: null, name: 'Top Offroad', logo_path: '/topoffroadlogo.png', display_order: 2, is_active: true },
    ];

    const previewTrustedCompanies =
        trustedCompanies.length > 0 ? trustedCompanies : defaultTrustedCompaniesPreview;

    const defaultContactInfosPreview = [
        { id: null, type: 'Address', title: 'ADDRESS', value: '123 Business District, Metro\nManila, Philippines', icon: 'address', display_order: 0, is_active: true },
        { id: null, type: 'Phone', title: 'PHONE', value: '+63 900 000 0000', icon: 'phone', display_order: 1, is_active: true },
        { id: null, type: 'Email', title: 'EMAIL', value: 'info@sundia.com', icon: 'email', display_order: 2, is_active: true },
        { id: null, type: 'Hours', title: 'HOURS', value: 'Mon - Fri\n8:00 AM - 5:00 PM', icon: 'hours', display_order: 3, is_active: true },
    ];

    const previewContactInfos =
        contactInfos.length > 0 ? contactInfos : defaultContactInfosPreview;

    const previewSiamCategoriesRaw = siamProductCategories;

    const previewTpsmiProductsRaw = tpsmiProducts;
    const topoffroadProductCategories = [
        { id: 'car-accessories', label: 'Car Accessories' },
        { id: 'mags-tires', label: 'Mags & Tires' },
        { id: 'lights', label: 'Lights' },
        { id: 'tints', label: 'Tints' },
        { id: 'camping-gears', label: 'Camping Gears' },
    ];
    const filteredTopoffroadProductsForAdmin = topoffroadProducts.filter(
        (p) => (p.category || 'car-accessories') === adminTopoffroadProductCategory
    );
    const previewTopoffroadProductsRaw = filteredTopoffroadProductsForAdmin;
    const [dismissedSiamPreviewKeys, setDismissedSiamPreviewKeys] = useState([]);
    const [dismissedTpsmiPreviewKeys, setDismissedTpsmiPreviewKeys] = useState([]);
    const [dismissedTopoffroadPreviewKeys, setDismissedTopoffroadPreviewKeys] = useState([]);
    const siamCategoryPreviewKey = (c, idx) =>
        c.id ? `id:${c.id}` : `preview:${c.name ?? ''}:${c.display_order ?? idx}`;
    const tpsmiPreviewKey = (p, idx) =>
        p.id ? `id:${p.id}` : `preview:${p.title ?? ''}:${p.display_order ?? idx}`;
    const topoffroadPreviewKey = (p, idx) =>
        p.id
            ? `id:${p.id}`
            : `preview:${p.category ?? 'car-accessories'}:${p.title ?? ''}:${p.display_order ?? idx}`;
    const previewSiamCategories = previewSiamCategoriesRaw.filter(
        (c, idx) => !dismissedSiamPreviewKeys.includes(siamCategoryPreviewKey(c, idx))
    );
    const previewTpsmiProducts = previewTpsmiProductsRaw.filter(
        (p, idx) => !dismissedTpsmiPreviewKeys.includes(tpsmiPreviewKey(p, idx))
    );
    const previewTopoffroadProducts = previewTopoffroadProductsRaw.filter(
        (p, idx) => !dismissedTopoffroadPreviewKeys.includes(topoffroadPreviewKey(p, idx))
    );

    const ContactIcon = ({ icon, type }) => {
        const key = (icon || type || '').toLowerCase();

        if (key === 'address' || key === 'map' || key === 'map-pin' || key === 'pin') {
            return (
                <svg width="40" height="40" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M45 10C33.5 10 24 19.5 24 31C24 48 45 75 45 75C45 75 66 48 66 31C66 19.5 56.5 10 45 10ZM45 40C40 40 36 36 36 31C36 26 40 22 45 22C50 22 54 26 54 31C54 36 50 40 45 40Z" fill="#DC2626" />
                </svg>
            );
        }

        if (key === 'phone' || key === 'call' || key === 'telephone') {
            return (
                <svg width="40" height="40" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M73.1 56.5C67.8 56.5 62.7 55.6 57.9 53.9C56.3 53.3 54.5 53.7 53.3 54.9L46.3 63.5C35.5 58.3 26.7 49.8 21.3 39L29.9 31.7C31.1 30.5 31.5 28.7 30.9 27.1C29.2 22.3 28.3 17.2 28.3 11.9C28.3 9.3 26.2 7.2 23.6 7.2H12.3C9.7 7.2 7.2 8.3 7.2 11.9C7.2 47.9 37.1 77.8 73.1 77.8C76.5 77.8 77.8 75.4 77.8 72.7V61.2C77.8 58.6 75.7 56.5 73.1 56.5Z" fill="#DC2626" />
                </svg>
            );
        }

        if (key === 'email' || key === 'mail' || key === 'envelope') {
            return (
                <svg width="40" height="35" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M75 15H15C11.7 15 9 17.7 9 21V69C9 72.3 11.7 75 15 75H75C78.3 75 81 72.3 81 69V21C81 17.7 78.3 15 75 15ZM75 27L45 48L15 27V21L45 42L75 21V27Z" fill="#DC2626" />
                </svg>
            );
        }

        return (
            <svg width="37" height="37" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M45 7.5C24.3 7.5 7.5 24.3 7.5 45C7.5 65.7 24.3 82.5 45 82.5C65.7 82.5 82.5 65.7 82.5 45C82.5 24.3 65.7 7.5 45 7.5ZM45 75C28.4 75 15 61.6 15 45C15 28.4 28.4 15 45 15C61.6 15 75 28.4 75 45C75 61.6 61.6 75 45 75ZM48.8 41.3L48.8 22.5H41.3V45L58.1 55.1L62.3 48.2L48.8 41.3Z" fill="#DC2626" />
            </svg>
        );
    };

    const MultilineText = ({ value }) => {
        const text = (value ?? '').toString();
        const lines = text.split(/\r?\n/);
        return (
            <>
                {lines.map((line, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <span key={idx}>
                        {line}
                        {idx < lines.length - 1 ? <br /> : null}
                    </span>
                ))}
            </>
        );
    };

    const [editingTeamMember, setEditingTeamMember] = useState(null);
    const teamMemberForm = useForm({
        name: '',
        title: '',
        company: '',
        company_logo: '',
        profile_image_file: null,
        display_order: 0,
        is_active: true,
    });

    useEffect(() => {
        if (!editingTeamMember) {
            teamMemberForm.reset();
            teamMemberForm.setData('display_order', 0);
            teamMemberForm.setData('is_active', true);
            teamMemberForm.clearErrors();
            return;
        }

        teamMemberForm.setData({
            name: editingTeamMember.name ?? '',
            title: editingTeamMember.title ?? '',
            company: editingTeamMember.company ?? '',
            company_logo: editingTeamMember.company_logo ?? '',
            profile_image_file: null,
            display_order: editingTeamMember.display_order ?? 0,
            is_active: editingTeamMember.is_active ?? true,
        });
        teamMemberForm.clearErrors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingTeamMember?.id]);

    const submitTeamMember = (e) => {
        e.preventDefault();
        const options = { forceFormData: true, preserveScroll: true };

        if (!editingTeamMember?.id) {
            teamMemberForm.post(route('team-members.store'), options);
            return;
        }

        teamMemberForm.transform((data) => ({
            name: data.name,
            title: data.title,
            company: data.company,
            company_logo: data.company_logo,
            profile_image_file: data.profile_image_file,
            display_order: data.display_order,
            is_active: data.is_active,
            _method: 'put',
        }));
        teamMemberForm.post(
            route('team-members.update', editingTeamMember.id),
            options,
        );
    };

    const destroyTeamMember = (id) => {
        if (!confirm('Delete this team member?')) return;
        router.delete(route('team-members.destroy', id), { preserveScroll: true });
    };

    const [editingTrustedCompany, setEditingTrustedCompany] = useState(null);
    const trustedCompanyForm = useForm({
        name: '',
        logo_file: null,
        display_order: 0,
        is_active: true,
    });

    useEffect(() => {
        if (!editingTrustedCompany) {
            trustedCompanyForm.reset();
            trustedCompanyForm.setData('display_order', 0);
            trustedCompanyForm.setData('is_active', true);
            trustedCompanyForm.clearErrors();
            return;
        }

        trustedCompanyForm.setData({
            name: editingTrustedCompany.name ?? '',
            logo_file: null,
            display_order: editingTrustedCompany.display_order ?? 0,
            is_active: editingTrustedCompany.is_active ?? true,
        });
        trustedCompanyForm.clearErrors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingTrustedCompany?.id]);

    const submitTrustedCompany = (e) => {
        e.preventDefault();
        const options = { forceFormData: true, preserveScroll: true };

        if (!editingTrustedCompany?.id) {
            trustedCompanyForm.post(route('trusted-companies.store'), options);
            return;
        }

        trustedCompanyForm.transform((data) => ({
            name: data.name,
            logo_file: data.logo_file,
            display_order: data.display_order,
            is_active: data.is_active,
            _method: 'put',
        }));

        trustedCompanyForm.post(
            route('trusted-companies.update', editingTrustedCompany.id),
            options,
        );
    };

    const destroyTrustedCompany = (id) => {
        if (!confirm('Delete this trusted company?')) return;
        router.delete(route('trusted-companies.destroy', id), { preserveScroll: true });
    };

    const [editingContactInfo, setEditingContactInfo] = useState(null);
    const contactInfoForm = useForm({
        type: 'Address',
        title: '',
        value: '',
        icon: 'address',
        display_order: 0,
        is_active: true,
    });

    useEffect(() => {
        if (!editingContactInfo) {
            contactInfoForm.reset();
            contactInfoForm.setData('type', 'Address');
            contactInfoForm.setData('icon', 'address');
            contactInfoForm.setData('display_order', 0);
            contactInfoForm.setData('is_active', true);
            contactInfoForm.clearErrors();
            return;
        }

        contactInfoForm.setData({
            type: editingContactInfo.type ?? 'Address',
            title: editingContactInfo.title ?? '',
            value: editingContactInfo.value ?? '',
            icon: editingContactInfo.icon ?? (editingContactInfo.type ?? 'Address').toLowerCase(),
            display_order: editingContactInfo.display_order ?? 0,
            is_active: editingContactInfo.is_active ?? true,
        });
        contactInfoForm.clearErrors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingContactInfo?.id]);

    const submitContactInfo = (e) => {
        e.preventDefault();
        const options = { preserveScroll: true };

        if (!editingContactInfo?.id) {
            contactInfoForm.post(route('contact-infos.store'), options);
            return;
        }

        contactInfoForm.transform((data) => ({
            ...data,
            _method: 'put',
        }));
        contactInfoForm.post(route('contact-infos.update', editingContactInfo.id), options);
    };

    const destroyContactInfo = (id) => {
        if (!confirm('Delete this contact item?')) return;
        router.delete(route('contact-infos.destroy', id), { preserveScroll: true });
    };

    const [editingUpcomingEvent, setEditingUpcomingEvent] = useState(null);
    const upcomingEventForm = useForm({
        title: '',
        location: '',
        month_label: 'MAR',
        day_label: '30',
        display_order: 0,
        is_active: true,
    });

    useEffect(() => {
        if (!editingUpcomingEvent) {
            upcomingEventForm.reset();
            upcomingEventForm.setData('month_label', 'MAR');
            upcomingEventForm.setData('day_label', '30');
            upcomingEventForm.setData('display_order', 0);
            upcomingEventForm.setData('is_active', true);
            upcomingEventForm.clearErrors();
            return;
        }

        upcomingEventForm.setData({
            title: editingUpcomingEvent.title ?? '',
            location: editingUpcomingEvent.location ?? '',
            month_label: editingUpcomingEvent.month_label ?? 'MAR',
            day_label: editingUpcomingEvent.day_label ?? '30',
            display_order: editingUpcomingEvent.display_order ?? 0,
            is_active: editingUpcomingEvent.is_active ?? true,
        });
        upcomingEventForm.clearErrors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingUpcomingEvent?.id]);

    const submitUpcomingEvent = (e) => {
        e.preventDefault();
        const options = { preserveScroll: true };

        if (!editingUpcomingEvent?.id) {
            upcomingEventForm.post(route('upcoming-events.store'), options);
            return;
        }

        upcomingEventForm.transform((data) => ({
            ...data,
            _method: 'put',
        }));
        upcomingEventForm.post(route('upcoming-events.update', editingUpcomingEvent.id), options);
    };

    const destroyUpcomingEvent = (id) => {
        if (!confirm('Delete this upcoming event?')) return;
        router.delete(route('upcoming-events.destroy', id), { preserveScroll: true });
    };

    const [editingSiamCategory, setEditingSiamCategory] = useState(null);
    const [adminSiamCategoryForProducts, setAdminSiamCategoryForProducts] = useState(null);
    const siamCategoryForm = useForm({
        name: '',
        card_description: '',
        modal_short_description: '',
        image_file: null,
        display_order: 0,
        is_active: true,
    });
    const [siamCategoryImagePreview, setSiamCategoryImagePreview] = useState(null);

    const [editingSiamCategoryProduct, setEditingSiamCategoryProduct] = useState(null);
    const siamCategoryProductForm = useForm({
        siam_product_category_id: '',
        title: '',
        description: '',
        image_file: null,
        display_order: 0,
        is_active: true,
    });
    const [siamCategoryProductImagePreview, setSiamCategoryProductImagePreview] = useState(null);

    useEffect(() => {
        if (siamProductCategories?.length && adminSiamCategoryForProducts === null) {
            setAdminSiamCategoryForProducts(siamProductCategories[0].id);
        }
    }, [siamProductCategories, adminSiamCategoryForProducts]);

    useEffect(() => {
        if (!editingSiamCategory) {
            siamCategoryForm.reset();
            siamCategoryForm.setData('display_order', 0);
            siamCategoryForm.setData('is_active', true);
            siamCategoryForm.clearErrors();
            setSiamCategoryImagePreview(null);
            return;
        }

        siamCategoryForm.setData({
            name: editingSiamCategory.name ?? '',
            card_description: editingSiamCategory.card_description ?? '',
            modal_short_description: editingSiamCategory.modal_short_description ?? '',
            image_file: null,
            display_order: editingSiamCategory.display_order ?? 0,
            is_active: editingSiamCategory.is_active ?? true,
        });
        siamCategoryForm.clearErrors();
        setSiamCategoryImagePreview(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingSiamCategory]);

    useEffect(() => {
        if (!siamCategoryForm.data.image_file) return;
        const url = URL.createObjectURL(siamCategoryForm.data.image_file);
        setSiamCategoryImagePreview(url);
        return () => URL.revokeObjectURL(url);
    }, [siamCategoryForm.data.image_file]);

    useEffect(() => {
        if (!editingSiamCategoryProduct) {
            siamCategoryProductForm.reset();
            siamCategoryProductForm.setData(
                'siam_product_category_id',
                adminSiamCategoryForProducts != null ? String(adminSiamCategoryForProducts) : ''
            );
            siamCategoryProductForm.setData('display_order', 0);
            siamCategoryProductForm.setData('is_active', true);
            siamCategoryProductForm.clearErrors();
            setSiamCategoryProductImagePreview(null);
            return;
        }

        siamCategoryProductForm.setData({
            siam_product_category_id: String(
                editingSiamCategoryProduct.siam_product_category_id ?? adminSiamCategoryForProducts ?? ''
            ),
            title: editingSiamCategoryProduct.title ?? '',
            description: editingSiamCategoryProduct.description ?? '',
            image_file: null,
            display_order: editingSiamCategoryProduct.display_order ?? 0,
            is_active: editingSiamCategoryProduct.is_active ?? true,
        });
        siamCategoryProductForm.clearErrors();
        setSiamCategoryProductImagePreview(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingSiamCategoryProduct, adminSiamCategoryForProducts]);

    useEffect(() => {
        if (!siamCategoryProductForm.data.image_file) return;
        const url = URL.createObjectURL(siamCategoryProductForm.data.image_file);
        setSiamCategoryProductImagePreview(url);
        return () => URL.revokeObjectURL(url);
    }, [siamCategoryProductForm.data.image_file]);

    const submitSiamCategory = (e) => {
        e.preventDefault();
        const options = { forceFormData: true, preserveScroll: true };

        if (!editingSiamCategory?.id) {
            siamCategoryForm.transform((data) => {
                if (!Object.prototype.hasOwnProperty.call(data, '_method')) return data;
                const next = { ...data };
                delete next._method;
                return next;
            });
            siamCategoryForm.post(route('siam-product-categories.store'), options);
            return;
        }

        siamCategoryForm.transform((data) => ({
            name: data.name,
            card_description: data.card_description,
            modal_short_description: data.modal_short_description,
            image_file: data.image_file,
            display_order: data.display_order,
            is_active: data.is_active,
            _method: 'put',
        }));
        siamCategoryForm.post(route('siam-product-categories.update', editingSiamCategory.id), options);
    };

    const destroySiamCategory = (id) => {
        if (!confirm('Delete this SIAM category and all its products?')) return;
        router.delete(route('siam-product-categories.destroy', id), { preserveScroll: true });
    };

    const submitSiamCategoryProduct = (e) => {
        e.preventDefault();
        const options = { forceFormData: true, preserveScroll: true };

        if (!editingSiamCategoryProduct?.id) {
            siamCategoryProductForm.transform((data) => {
                if (!Object.prototype.hasOwnProperty.call(data, '_method')) return data;
                const next = { ...data };
                delete next._method;
                return next;
            });
            siamCategoryProductForm.post(route('siam-category-products.store'), options);
            return;
        }

        siamCategoryProductForm.transform((data) => ({
            siam_product_category_id: data.siam_product_category_id,
            title: data.title,
            description: data.description,
            image_file: data.image_file,
            display_order: data.display_order,
            is_active: data.is_active,
            _method: 'put',
        }));
        siamCategoryProductForm.post(
            route('siam-category-products.update', editingSiamCategoryProduct.id),
            options
        );
    };

    const destroySiamCategoryProduct = (id) => {
        if (!confirm('Delete this product from the category?')) return;
        router.delete(route('siam-category-products.destroy', id), { preserveScroll: true });
    };

    const removeSiamPreviewCategory = (category, idx) => {
        const key = siamCategoryPreviewKey(category, idx);
        if (!confirm('Remove this preview SIAM category from the list?')) return;
        setDismissedSiamPreviewKeys((prev) => [...prev, key]);
        if (editingSiamCategory && siamCategoryPreviewKey(editingSiamCategory, idx) === key) {
            setEditingSiamCategory(null);
        }
    };

    const adminSiamCategoryProducts =
        siamProductCategories.find((c) => c.id === adminSiamCategoryForProducts)?.products ?? [];

    const [editingTpsmiProduct, setEditingTpsmiProduct] = useState(null);
    const tpsmiProductForm = useForm({
        title: '',
        description: '',
        image_file: null,
        display_order: 0,
        is_active: true,
    });
    const [tpsmiProductImagePreview, setTpsmiProductImagePreview] = useState(null);

    useEffect(() => {
        if (!editingTpsmiProduct) {
            tpsmiProductForm.reset();
            tpsmiProductForm.setData('display_order', 0);
            tpsmiProductForm.setData('is_active', true);
            tpsmiProductForm.clearErrors();
            setTpsmiProductImagePreview(null);
            return;
        }

        tpsmiProductForm.setData({
            title: editingTpsmiProduct.title ?? '',
            description: editingTpsmiProduct.description ?? '',
            image_file: null,
            display_order: editingTpsmiProduct.display_order ?? 0,
            is_active: editingTpsmiProduct.is_active ?? true,
        });
        tpsmiProductForm.clearErrors();
        setTpsmiProductImagePreview(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingTpsmiProduct]);

    useEffect(() => {
        if (!tpsmiProductForm.data.image_file) return;
        const url = URL.createObjectURL(tpsmiProductForm.data.image_file);
        setTpsmiProductImagePreview(url);
        return () => URL.revokeObjectURL(url);
    }, [tpsmiProductForm.data.image_file]);

    const submitTpsmiProduct = (e) => {
        e.preventDefault();
        const options = { forceFormData: true, preserveScroll: true };

        if (!editingTpsmiProduct?.id) {
            tpsmiProductForm.post(route('tpsmi-products.store'), options);
            return;
        }

        tpsmiProductForm.transform((data) => ({
            title: data.title,
            description: data.description,
            image_file: data.image_file,
            display_order: data.display_order,
            is_active: data.is_active,
            _method: 'put',
        }));
        tpsmiProductForm.post(route('tpsmi-products.update', editingTpsmiProduct.id), options);
    };

    const destroyTpsmiProduct = (id) => {
        if (!confirm('Delete this TPSMI product?')) return;
        router.delete(route('tpsmi-products.destroy', id), { preserveScroll: true });
    };
    const removeTpsmiPreviewProduct = (product, idx) => {
        const key = tpsmiPreviewKey(product, idx);
        if (!confirm('Remove this preview TPSMI product from the list?')) return;
        setDismissedTpsmiPreviewKeys((prev) => [...prev, key]);
        if (editingTpsmiProduct && tpsmiPreviewKey(editingTpsmiProduct, idx) === key) {
            setEditingTpsmiProduct(null);
        }
    };
    const [editingTopoffroadProduct, setEditingTopoffroadProduct] = useState(null);
    const topoffroadProductForm = useForm({
        category: 'car-accessories',
        title: '',
        description: '',
        image_file: null,
        display_order: 0,
        is_active: true,
    });
    const [topoffroadProductImagePreview, setTopoffroadProductImagePreview] = useState(null);

    useEffect(() => {
        if (!editingTopoffroadProduct) {
            topoffroadProductForm.reset();
            topoffroadProductForm.setData('category', adminTopoffroadProductCategory);
            topoffroadProductForm.setData('display_order', 0);
            topoffroadProductForm.setData('is_active', true);
            topoffroadProductForm.clearErrors();
            setTopoffroadProductImagePreview(null);
            return;
        }

        topoffroadProductForm.setData({
            category: editingTopoffroadProduct.category ?? 'car-accessories',
            title: editingTopoffroadProduct.title ?? '',
            description: editingTopoffroadProduct.description ?? '',
            image_file: null,
            display_order: editingTopoffroadProduct.display_order ?? 0,
            is_active: editingTopoffroadProduct.is_active ?? true,
        });
        topoffroadProductForm.clearErrors();
        setTopoffroadProductImagePreview(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingTopoffroadProduct]);

    useEffect(() => {
        setEditingTopoffroadProduct(null);
        topoffroadProductForm.setData('category', adminTopoffroadProductCategory);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [adminTopoffroadProductCategory]);

    useEffect(() => {
        if (!topoffroadProductForm.data.image_file) return;
        const url = URL.createObjectURL(topoffroadProductForm.data.image_file);
        setTopoffroadProductImagePreview(url);
        return () => URL.revokeObjectURL(url);
    }, [topoffroadProductForm.data.image_file]);

    const submitTopoffroadProduct = (e) => {
        e.preventDefault();
        const options = { forceFormData: true, preserveScroll: true };

        if (!editingTopoffroadProduct?.id) {
            topoffroadProductForm.post(route('topoffroad-products.store'), options);
            return;
        }

        topoffroadProductForm.transform((data) => ({
            category: data.category,
            title: data.title,
            description: data.description,
            image_file: data.image_file,
            display_order: data.display_order,
            is_active: data.is_active,
            _method: 'put',
        }));
        topoffroadProductForm.post(route('topoffroad-products.update', editingTopoffroadProduct.id), options);
    };

    const destroyTopoffroadProduct = (id) => {
        if (!confirm('Delete this TOP OFFROAD product?')) return;
        router.delete(route('topoffroad-products.destroy', id), { preserveScroll: true });
    };
    const removeTopoffroadPreviewProduct = (product, idx) => {
        const key = topoffroadPreviewKey(product, idx);
        if (!confirm('Remove this preview TOP OFFROAD product from the list?')) return;
        setDismissedTopoffroadPreviewKeys((prev) => [...prev, key]);
        if (
            editingTopoffroadProduct &&
            topoffroadPreviewKey(editingTopoffroadProduct, idx) === key
        ) {
            setEditingTopoffroadProduct(null);
        }
    };

    const logoForm = useForm({
        logo: null,
    });

    const statsForm = useForm({
        stats_title_line1: sundiaContent?.stats_title_line1 ?? 'WHAT',
        stats_title_line2: sundiaContent?.stats_title_line2 ?? 'WE',
        stats_title_line3: sundiaContent?.stats_title_line3 ?? 'DO?',
        stats_items: sundiaContent?.stats_items ?? [
            { value: '25+', label: 'Years Experience' },
            { value: '5', label: 'Affiliated Companies' },
            { value: '500+', label: 'Team Members' },
            { value: '1000+', label: 'Projects Completed' },
        ],
    });

    const siamStatsForm = useForm({
        stats_title_line1: siamContent?.stats_title_line1 ?? 'WHAT',
        stats_title_line2: siamContent?.stats_title_line2 ?? 'WE',
        stats_title_line3: siamContent?.stats_title_line3 ?? 'DO?',
        stats_items: siamContent?.stats_items ?? [
            { value: '25+', label: 'Years Experience' },
            { value: '5', label: 'Affiliated Companies' },
            { value: '500+', label: 'Team Members' },
            { value: '1000+', label: 'Projects Completed' },
        ],
    });

    const tpsmiStatsForm = useForm({
        stats_title_line1: tpsmiContent?.stats_title_line1 ?? 'WHAT',
        stats_title_line2: tpsmiContent?.stats_title_line2 ?? 'WE',
        stats_title_line3: tpsmiContent?.stats_title_line3 ?? 'DO?',
        stats_items: tpsmiContent?.stats_items ?? [
            { value: '25+', label: 'Years Experience' },
            { value: '3', label: 'Affiliated Companies' },
            { value: '500+', label: 'Team Members' },
            { value: '1000+', label: 'Projects Completed' },
        ],
    });
    const topoffroadStatsForm = useForm({
        stats_title_line1: topoffroadContent?.stats_title_line1 ?? 'WHAT',
        stats_title_line2: topoffroadContent?.stats_title_line2 ?? 'WE',
        stats_title_line3: topoffroadContent?.stats_title_line3 ?? 'DO?',
        stats_items: topoffroadContent?.stats_items ?? [
            { value: '25+', label: 'Years Experience' },
            { value: '5', label: 'Affiliated Companies' },
            { value: '500+', label: 'Team Members' },
            { value: '1000+', label: 'Projects Completed' },
        ],
    });

    const videoForm = useForm({
        video_title: sundiaContent?.video?.title ?? '',
        video_url: sundiaContent?.video?.url ?? '',
        video_thumbnail: sundiaContent?.video?.thumbnail ?? '',
        video_active: sundiaContent?.video?.active ?? true,
        video_file: null,
        video_thumbnail_file: null,
    });

    const siamVideoForm = useForm({
        video_title: siamContent?.video?.title ?? '',
        video_url: siamContent?.video?.url ?? '',
        video_thumbnail: siamContent?.video?.thumbnail ?? '',
        video_active: siamContent?.video?.active ?? true,
        video_file: null,
        video_thumbnail_file: null,
    });

    const tpsmiVideoForm = useForm({
        video_title: tpsmiContent?.video?.title ?? 'TPSMI Page Video',
        video_url: tpsmiContent?.video?.url ?? '/2025%20Sundia%20Company%20video.mp4',
        video_thumbnail: tpsmiContent?.video?.thumbnail ?? '',
        video_active: tpsmiContent?.video?.active ?? true,
        video_file: null,
        video_thumbnail_file: null,
    });
    const topoffroadVideoForm = useForm({
        video_title: topoffroadContent?.video?.title ?? 'TOP OFFROAD Page Video',
        video_url: topoffroadContent?.video?.url ?? '/2024%20TOP%20Offroad%20presentation.mp4',
        video_thumbnail: topoffroadContent?.video?.thumbnail ?? '',
        video_active: topoffroadContent?.video?.active ?? true,
        video_file: null,
        video_thumbnail_file: null,
    });

    const missionVisionForm = useForm({
        mission_text: missionVision?.mission_text ?? defaultMissionText,
        vision_text: missionVision?.vision_text ?? defaultVisionText,
    });

    const emptySubsidiaryFormState = {
        id: null,
        name: '',
        description: '',
        display_style: 'light',
        display_order: 0,
        is_active: true,
        logo_file: null,
        background_file: null,
        logo_path: '',
        background_path: '',
    };

    const [editingSubsidiary, setEditingSubsidiary] = useState(null);
    const subsidiaryForm = useForm(emptySubsidiaryFormState);

    const [careersEditingCulture, setCareersEditingCulture] = useState(null);
    const [careersEditingJob, setCareersEditingJob] = useState(null);
    const careersCultureForm = useForm(emptyCareersCultureForm());
    const careersJobForm = useForm(emptyCareersJobForm());

    const [videoFilePreviewUrl, setVideoFilePreviewUrl] = useState(null);
    const [thumbFilePreviewUrl, setThumbFilePreviewUrl] = useState(null);
    const [siamVideoFilePreviewUrl, setSiamVideoFilePreviewUrl] = useState(null);
    const [siamThumbFilePreviewUrl, setSiamThumbFilePreviewUrl] = useState(null);
    const [tpsmiVideoFilePreviewUrl, setTpsmiVideoFilePreviewUrl] = useState(null);
    const [tpsmiThumbFilePreviewUrl, setTpsmiThumbFilePreviewUrl] = useState(null);
    const [topoffroadVideoFilePreviewUrl, setTopoffroadVideoFilePreviewUrl] = useState(null);
    const [topoffroadThumbFilePreviewUrl, setTopoffroadThumbFilePreviewUrl] = useState(null);
    const [subsidiaryLogoPreview, setSubsidiaryLogoPreview] = useState(null);
    const [subsidiaryBgPreview, setSubsidiaryBgPreview] = useState(null);

    useEffect(() => {
        if (!videoForm.data.video_file) return;
        const url = URL.createObjectURL(videoForm.data.video_file);
        setVideoFilePreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [videoForm.data.video_file]);

    useEffect(() => {
        if (!videoForm.data.video_thumbnail_file) return;
        const url = URL.createObjectURL(videoForm.data.video_thumbnail_file);
        setThumbFilePreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [videoForm.data.video_thumbnail_file]);

    useEffect(() => {
        if (!siamVideoForm.data.video_file) return;
        const url = URL.createObjectURL(siamVideoForm.data.video_file);
        setSiamVideoFilePreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [siamVideoForm.data.video_file]);

    useEffect(() => {
        if (!siamVideoForm.data.video_thumbnail_file) return;
        const url = URL.createObjectURL(siamVideoForm.data.video_thumbnail_file);
        setSiamThumbFilePreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [siamVideoForm.data.video_thumbnail_file]);

    useEffect(() => {
        if (!tpsmiVideoForm.data.video_file) return;
        const url = URL.createObjectURL(tpsmiVideoForm.data.video_file);
        setTpsmiVideoFilePreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [tpsmiVideoForm.data.video_file]);

    useEffect(() => {
        if (!tpsmiVideoForm.data.video_thumbnail_file) return;
        const url = URL.createObjectURL(tpsmiVideoForm.data.video_thumbnail_file);
        setTpsmiThumbFilePreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [tpsmiVideoForm.data.video_thumbnail_file]);

    useEffect(() => {
        if (!topoffroadVideoForm.data.video_file) return;
        const url = URL.createObjectURL(topoffroadVideoForm.data.video_file);
        setTopoffroadVideoFilePreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [topoffroadVideoForm.data.video_file]);

    useEffect(() => {
        if (!topoffroadVideoForm.data.video_thumbnail_file) return;
        const url = URL.createObjectURL(topoffroadVideoForm.data.video_thumbnail_file);
        setTopoffroadThumbFilePreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [topoffroadVideoForm.data.video_thumbnail_file]);

    useEffect(() => {
        if (!subsidiaryForm.data.logo_file) return;
        const url = URL.createObjectURL(subsidiaryForm.data.logo_file);
        setSubsidiaryLogoPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [subsidiaryForm.data.logo_file]);

    useEffect(() => {
        if (!subsidiaryForm.data.background_file) return;
        const url = URL.createObjectURL(subsidiaryForm.data.background_file);
        setSubsidiaryBgPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [subsidiaryForm.data.background_file]);

    useEffect(() => {
        if (!careersEditingCulture) {
            careersCultureForm.setData(emptyCareersCultureForm());
            careersCultureForm.clearErrors();
            return;
        }
        careersCultureForm.setData({
            title: careersEditingCulture.title ?? '',
            body: careersEditingCulture.body ?? '',
            image_path: careersEditingCulture.image_path ?? '',
            image_file: null,
            display_order: careersEditingCulture.display_order ?? 0,
            is_active: careersEditingCulture.is_active ?? true,
        });
        careersCultureForm.clearErrors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [careersEditingCulture?.id]);

    useEffect(() => {
        if (!careersEditingJob) {
            careersJobForm.setData(emptyCareersJobForm());
            careersJobForm.clearErrors();
            return;
        }
        const resp = careersEditingJob.responsibilities?.length
            ? [...careersEditingJob.responsibilities]
            : ['', '', ''];
        while (resp.length < 3) resp.push('');
        careersJobForm.setData({
            title: careersEditingJob.title ?? '',
            employment_type: careersEditingJob.employment_type ?? 'Full-time',
            location: careersEditingJob.location ?? '',
            summary: careersEditingJob.summary ?? '',
            responsibilities: resp,
            icon_variant: careersEditingJob.icon_variant ?? 1,
            display_order: careersEditingJob.display_order ?? 0,
            is_active: careersEditingJob.is_active ?? true,
        });
        careersJobForm.clearErrors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [careersEditingJob?.id]);

    useEffect(() => {
        if (!flashCareersSuccess) return;
        setSelectedCompany({
            name: 'CAREERS',
            description: 'Hiring & culture',
            href: '/careers',
        });
    }, [flashCareersSuccess]);

    const buildStatsContentPayload = () => ({
        ...sundiaContent,
        stats_title_line1: statsForm.data.stats_title_line1,
        stats_title_line2: statsForm.data.stats_title_line2,
        stats_title_line3: statsForm.data.stats_title_line3,
        stats_items: statsForm.data.stats_items,
    });

    const buildSiamStatsContentPayload = () => ({
        ...siamContent,
        stats_title_line1: siamStatsForm.data.stats_title_line1,
        stats_title_line2: siamStatsForm.data.stats_title_line2,
        stats_title_line3: siamStatsForm.data.stats_title_line3,
        stats_items: siamStatsForm.data.stats_items,
    });

    const buildVideoContentPayload = () => ({
        ...sundiaContent,
        video: {
            ...(sundiaContent?.video ?? {}),
            title: videoForm.data.video_title,
            // keep url if already set; controller will override when a new file is uploaded
            url: videoForm.data.video_url,
            thumbnail: videoForm.data.video_thumbnail,
            active: videoForm.data.video_active,
        },
    });

    const buildSiamVideoContentPayload = () => ({
        ...siamContent,
        video: {
            ...(siamContent?.video ?? {}),
            title: siamVideoForm.data.video_title,
            url: siamVideoForm.data.video_url,
            thumbnail: siamVideoForm.data.video_thumbnail,
            active: siamVideoForm.data.video_active,
        },
    });

    const buildTpsmiStatsContentPayload = () => ({
        ...tpsmiContent,
        stats_title_line1: tpsmiStatsForm.data.stats_title_line1,
        stats_title_line2: tpsmiStatsForm.data.stats_title_line2,
        stats_title_line3: tpsmiStatsForm.data.stats_title_line3,
        stats_items: tpsmiStatsForm.data.stats_items,
    });

    const buildTopoffroadStatsContentPayload = () => ({
        ...topoffroadContent,
        stats_title_line1: topoffroadStatsForm.data.stats_title_line1,
        stats_title_line2: topoffroadStatsForm.data.stats_title_line2,
        stats_title_line3: topoffroadStatsForm.data.stats_title_line3,
        stats_items: topoffroadStatsForm.data.stats_items,
    });

    const buildTpsmiVideoContentPayload = () => ({
        ...tpsmiContent,
        video: {
            ...(tpsmiContent?.video ?? {}),
            title: tpsmiVideoForm.data.video_title,
            url: tpsmiVideoForm.data.video_url,
            thumbnail: tpsmiVideoForm.data.video_thumbnail,
            active: tpsmiVideoForm.data.video_active,
        },
    });

    const buildTopoffroadVideoContentPayload = () => ({
        ...topoffroadContent,
        video: {
            ...(topoffroadContent?.video ?? {}),
            title: topoffroadVideoForm.data.video_title,
            url: topoffroadVideoForm.data.video_url,
            thumbnail: topoffroadVideoForm.data.video_thumbnail,
            active: topoffroadVideoForm.data.video_active,
        },
    });

    const submitLogo = (e) => {
        e.preventDefault();
        router.post(
            route('admin.sundia.logo.update'),
            {
                logo: logoForm.data.logo,
                flash_key: 'logo',
            },
            {
                forceFormData: true,
            }
        );
    };

    const submitStats = (e) => {
        e.preventDefault();
        router.post(route('admin.sundia.logo.update'), {
            content: buildStatsContentPayload(),
            flash_key: 'stats',
        });
    };

    const submitSiamStats = (e) => {
        e.preventDefault();
        router.post(route('admin.siam.update'), {
            content: buildSiamStatsContentPayload(),
            flash_key: 'stats',
        });
    };

    const submitVideo = (e) => {
        e.preventDefault();
        router.post(
            route('admin.sundia.logo.update'),
            {
                content: buildVideoContentPayload(),
                video_file: videoForm.data.video_file,
                video_thumbnail_file: videoForm.data.video_thumbnail_file,
                flash_key: 'video',
            },
            {
                forceFormData: true,
            }
        );
    };

    const submitSiamVideo = (e) => {
        e.preventDefault();
        router.post(
            route('admin.siam.update'),
            {
                content: buildSiamVideoContentPayload(),
                video_file: siamVideoForm.data.video_file,
                video_thumbnail_file: siamVideoForm.data.video_thumbnail_file,
                flash_key: 'video',
            },
            {
                forceFormData: true,
            }
        );
    };

    const submitTpsmiStats = (e) => {
        e.preventDefault();
        router.post(route('admin.tpsmi.update'), {
            content: buildTpsmiStatsContentPayload(),
            flash_key: 'stats',
        });
    };

    const submitTpsmiVideo = (e) => {
        e.preventDefault();
        router.post(
            route('admin.tpsmi.update'),
            {
                content: buildTpsmiVideoContentPayload(),
                video_file: tpsmiVideoForm.data.video_file,
                video_thumbnail_file: tpsmiVideoForm.data.video_thumbnail_file,
                flash_key: 'video',
            },
            {
                forceFormData: true,
            }
        );
    };

    const submitTopoffroadStats = (e) => {
        e.preventDefault();
        router.post(route('admin.topoffroad.update'), {
            content: buildTopoffroadStatsContentPayload(),
            flash_key: 'stats',
        });
    };

    const submitTopoffroadVideo = (e) => {
        e.preventDefault();
        router.post(
            route('admin.topoffroad.update'),
            {
                content: buildTopoffroadVideoContentPayload(),
                video_file: topoffroadVideoForm.data.video_file,
                video_thumbnail_file: topoffroadVideoForm.data.video_thumbnail_file,
                flash_key: 'video',
            },
            {
                forceFormData: true,
            }
        );
    };

    const submitMissionVision = (e) => {
        e.preventDefault();
        missionVisionForm.post(route('admin.mission-vision.update'), {
            preserveScroll: true,
        });
    };

    const startCreateSubsidiary = () => {
        setEditingSubsidiary(null);
        subsidiaryForm.setData(emptySubsidiaryFormState);
        setSubsidiaryLogoPreview(null);
        setSubsidiaryBgPreview(null);
    };

    const startEditSubsidiary = (sub) => {
        setEditingSubsidiary(sub);
        subsidiaryForm.setData({
            id: sub.id,
            name: sub.name ?? '',
            description: sub.description ?? '',
            display_style: sub.display_style ?? 'light',
            display_order: sub.display_order ?? 0,
            is_active: sub.is_active ?? true,
            logo_file: null,
            background_file: null,
            logo_path: sub.logo_path ?? '',
            background_path: sub.background_path ?? '',
        });
        setSubsidiaryLogoPreview(null);
        setSubsidiaryBgPreview(null);
    };

    const submitSubsidiary = (e) => {
        e.preventDefault();
        const options = { forceFormData: true, preserveScroll: true };

        const hasRealId =
            editingSubsidiary && typeof editingSubsidiary.id === 'number';

        if (hasRealId) {
            subsidiaryForm.transform((data) => ({
                name: data.name,
                description: data.description,
                display_style: data.display_style,
                display_order: data.display_order,
                is_active: data.is_active,
                logo_file: data.logo_file,
                background_file: data.background_file,
                _method: 'put',
            }));
            subsidiaryForm.post(`/subsidiaries/${editingSubsidiary.id}`, options);
        } else {
            subsidiaryForm.transform((data) => ({
                name: data.name,
                description: data.description,
                display_style: data.display_style,
                display_order: data.display_order,
                is_active: data.is_active,
                logo_file: data.logo_file,
                background_file: data.background_file,
            }));
            subsidiaryForm.post('/subsidiaries', options);
        }
    };

    const destroySubsidiary = (id) => {
        if (!confirm('Delete this subsidiary?')) return;
        router.delete(`/subsidiaries/${id}`, {
            preserveScroll: true,
        });
    };

    const submitCareersCulture = (e) => {
        e.preventDefault();
        const opts = { forceFormData: true, preserveScroll: true };
        // Use real PUT for updates — no _method spoofing (avoids lingering transform breaking POST /store).
        careersCultureForm.transform((data) => data);
        if (!careersEditingCulture?.id) {
            careersCultureForm.post(route('admin.career-culture-cards.store'), opts);
            return;
        }
        careersCultureForm.put(
            route('admin.career-culture-cards.update', careersEditingCulture.id),
            opts,
        );
    };

    const submitCareersJob = (e) => {
        e.preventDefault();
        const cleaned = (careersJobForm.data.responsibilities || [])
            .map((s) => String(s).trim())
            .filter(Boolean);
        if (cleaned.length === 0) {
            careersJobForm.setError('responsibilities', 'Add at least one responsibility.');
            return;
        }
        careersJobForm.clearErrors('responsibilities');
        const opts = { preserveScroll: true };
        careersJobForm.transform((d) => ({
            ...d,
            responsibilities: cleaned,
        }));
        if (!careersEditingJob?.id) {
            careersJobForm.post(route('admin.career-jobs.store'), opts);
            return;
        }
        careersJobForm.put(route('admin.career-jobs.update', careersEditingJob.id), opts);
    };

    const destroyCareersCulture = (id) => {
        if (!confirm('Delete this culture card?')) return;
        router.delete(route('admin.career-culture-cards.destroy', id), { preserveScroll: true });
    };

    const destroyCareersJob = (id) => {
        if (!confirm('Delete this job opening?')) return;
        router.delete(route('admin.career-jobs.destroy', id), { preserveScroll: true });
    };

    const setCareersResponsibility = (index, value) => {
        const next = [...(careersJobForm.data.responsibilities || [])];
        next[index] = value;
        careersJobForm.setData('responsibilities', next);
    };

    const addCareersResponsibility = () => {
        careersJobForm.setData('responsibilities', [
            ...(careersJobForm.data.responsibilities || []),
            '',
        ]);
    };

    const removeCareersResponsibility = (index) => {
        const next = (careersJobForm.data.responsibilities || []).filter((_, i) => i !== index);
        careersJobForm.setData('responsibilities', next.length ? next : ['']);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="bg-neutral-50">
                {/* Keep layout height locked; only main panel scrolls */}
                <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
                    {/* Sidebar */}
                    <aside className="w-72 shrink-0 bg-white shadow-2xl flex h-full flex-col sticky top-0 overflow-hidden">
                        <div className="border-b border-neutral-200 px-6 py-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-700 shadow-md">
                                    <span className="text-lg font-extrabold tracking-tight text-white">
                                        S
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-red-600">
                                        Sundia Group
                                    </span>
                                    <span className="text-xs font-medium text-neutral-700">
                                        Admin Navigation
                                    </span>
                                </div>
                            </div>
                        </div>

                        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-5 overscroll-contain">
                            {companies.map((company) => {
                                const isActive = company.name === selectedCompany.name;
                                return (
                                    <button
                                        key={company.name}
                                        type="button"
                                        onClick={() => setSelectedCompany(company)}
                                        className={`group flex w-full items-center gap-3 rounded-full px-3 py-2.5 text-left text-xs font-medium tracking-wide transition-all ${
                                            isActive
                                                ? 'bg-red-600 text-white'
                                                : 'text-neutral-700 hover:bg-red-50'
                                        }`}
                                    >
                                        <div
                                            className={`flex h-8 w-8 items-center justify-center rounded-full shadow-md transition-transform group-hover:scale-105 ${
                                                isActive ? 'bg-white text-red-600' : 'bg-red-600 text-white'
                                            }`}
                                        >
                                            <span className="text-[11px] font-bold">
                                                {company.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span
                                                className={`text-[11px] font-semibold uppercase tracking-widest ${
                                                    isActive ? 'text-white' : 'text-neutral-800'
                                                }`}
                                            >
                                                {company.name}
                                            </span>
                                            <span
                                                className={`text-[10px] ${
                                                    isActive ? 'text-red-100' : 'text-neutral-500'
                                                }`}
                                            >
                                                {company.description}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </nav>

                        <div className="mt-auto border-t border-neutral-200 px-6 py-5 space-y-2">
                            <button
                                type="button"
                                ref={profileButtonRef}
                                onClick={() => setShowProfileModal(true)}
                                className="flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-black"
                            >
                                Profile
                            </button>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="flex w-full items-center justify-center gap-2 rounded-full border border-red-600 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-red-600 transition-colors hover:bg-red-600 hover:text-white"
                            >
                                Logout
                            </Link>
                        </div>
                    </aside>

                    <ProfileModal
                        show={showProfileModal}
                        onClose={() => setShowProfileModal(false)}
                        anchorRef={profileButtonRef}
                    />

                    {/* Main content */}
                    <section className="flex-1 h-full overflow-y-auto overflow-x-hidden overscroll-contain">
                        <div className="m-6 overflow-hidden rounded-[3px] bg-white shadow-2xl">
                            <div className="border-b border-neutral-200 bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
                                <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
                                    {selectedCompany.name} Components
                                </h3>
                                <p className="mt-1 text-xs text-red-100">
                                    Customize layouts, sections, and content for {selectedCompany.name}.
                                </p>
                            </div>
                            <div className="px-6 py-6 space-y-8">
                                {flashCareersSuccess && (
                                    <div className="rounded border border-green-200 bg-green-50 px-3 py-2 text-[11px] text-green-800">
                                        {flashCareersSuccess}
                                    </div>
                                )}
                                {selectedCompany.name === 'SIAM' && (
                                    <section className="space-y-6 rounded-[3px] bg-neutral-50 p-5 shadow-sm">
                                        {/* "What we do" stats */}
                                        <div className="rounded-[3px] border border-neutral-200 bg-white p-5">
                                            <form onSubmit={submitSiamStats} className="space-y-6">
                                                <div>
                                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-700">
                                                        "What we do" stats
                                                    </h4>
                                                    <p className="mt-2 text-xs text-neutral-500">
                                                        Manage the heading and numbers shown in the public "WHAT WE DO" card
                                                        on the SIAM page.
                                                    </p>

                                                    <div className="mt-4 grid gap-4 md:grid-cols-[1.2fr,2fr]">
                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Title lines
                                                            </label>
                                                            <div className="space-y-2">
                                                                <input
                                                                    type="text"
                                                                    value={siamStatsForm.data.stats_title_line1}
                                                                    onChange={(e) =>
                                                                        siamStatsForm.setData(
                                                                            'stats_title_line1',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={siamStatsForm.data.stats_title_line2}
                                                                    onChange={(e) =>
                                                                        siamStatsForm.setData(
                                                                            'stats_title_line2',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={siamStatsForm.data.stats_title_line3}
                                                                    onChange={(e) =>
                                                                        siamStatsForm.setData(
                                                                            'stats_title_line3',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Stat items
                                                            </label>
                                                            <div className="grid gap-2 md:grid-cols-2">
                                                                {siamStatsForm.data.stats_items.map((item, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className="rounded border border-neutral-200 bg-white p-2"
                                                                    >
                                                                        <input
                                                                            type="text"
                                                                            value={item.value}
                                                                            onChange={(e) => {
                                                                                const next = [
                                                                                    ...siamStatsForm.data.stats_items,
                                                                                ];
                                                                                next[index] = {
                                                                                    ...next[index],
                                                                                    value: e.target.value,
                                                                                };
                                                                                siamStatsForm.setData('stats_items', next);
                                                                            }}
                                                                            className="mb-1 w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                            placeholder="25+"
                                                                        />
                                                                        <input
                                                                            type="text"
                                                                            value={item.label}
                                                                            onChange={(e) => {
                                                                                const next = [
                                                                                    ...siamStatsForm.data.stats_items,
                                                                                ];
                                                                                next[index] = {
                                                                                    ...next[index],
                                                                                    label: e.target.value,
                                                                                };
                                                                                siamStatsForm.setData('stats_items', next);
                                                                            }}
                                                                            className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                            placeholder="Years Experience"
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-end pt-2">
                                                    <button
                                                        type="submit"
                                                        disabled={siamStatsForm.processing}
                                                        className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-[11px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-black disabled:opacity-60"
                                                    >
                                                        {siamStatsForm.processing ? 'Saving...' : 'Save stats'}
                                                    </button>
                                                </div>

                                                {flashStatsSuccess && (
                                                    <div className="rounded border border-green-200 bg-green-50 px-3 py-2 text-[11px] text-green-800">
                                                        {flashStatsSuccess}
                                                    </div>
                                                )}
                                            </form>
                                        </div>
                                    </section>
                                )}
                                {selectedCompany.name === 'SIAM' && (
                                    <section className="space-y-6 rounded-[3px] bg-neutral-50 p-5 shadow-sm">
                                        <div className="rounded-[3px] border border-neutral-200 bg-white p-5">
                                            <form onSubmit={submitSiamVideo} className="space-y-6">
                                                <div>
                                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-700">
                                                        SIAM page video
                                                    </h4>
                                                    <p className="mt-2 text-xs text-neutral-500">
                                                        Configure the video shown in the SIAM page video section.
                                                    </p>

                                                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                                                        <div className="space-y-3">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Video title (optional)
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={siamVideoForm.data.video_title}
                                                                onChange={(e) =>
                                                                    siamVideoForm.setData(
                                                                        'video_title',
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                placeholder="SIAM Page Video"
                                                            />

                                                            <label className="mt-4 block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Upload video file (recommended)
                                                            </label>
                                                            <input
                                                                type="file"
                                                                accept="video/*"
                                                                onChange={(e) =>
                                                                    siamVideoForm.setData(
                                                                        'video_file',
                                                                        e.target.files?.[0] ?? null
                                                                    )
                                                                }
                                                                className="block w-full text-[11px] text-neutral-700 file:mr-3 file:rounded-full file:border-0 file:bg-red-600 file:px-4 file:py-1.5 file:text-[11px] file:font-semibold file:uppercase file:tracking-widest file:text-white hover:file:bg-red-700"
                                                            />
                                                            <p className="mt-1 text-[10px] text-neutral-500">
                                                                Leave empty to keep the current video. Max size depends on your server limits.
                                                            </p>

                                                            <label className="mt-4 block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Or set video URL (YouTube/Vimeo/direct mp4)
                                                            </label>
                                                            <input
                                                                type="url"
                                                                value={siamVideoForm.data.video_url}
                                                                onChange={(e) =>
                                                                    siamVideoForm.setData(
                                                                        'video_url',
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                placeholder="https://www.youtube.com/watch?v=..."
                                                            />

                                                            <label className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={siamVideoForm.data.video_active}
                                                                    onChange={(e) =>
                                                                        siamVideoForm.setData(
                                                                            'video_active',
                                                                            e.target.checked
                                                                        )
                                                                    }
                                                                    className="h-3 w-3 rounded border-neutral-300"
                                                                />
                                                                <span>Video active</span>
                                                            </label>
                                                        </div>

                                                        <div className="space-y-3">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Upload thumbnail image (optional)
                                                            </label>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) =>
                                                                    siamVideoForm.setData(
                                                                        'video_thumbnail_file',
                                                                        e.target.files?.[0] ?? null
                                                                    )
                                                                }
                                                                className="block w-full text-[11px] text-neutral-700 file:mr-3 file:rounded-full file:border-0 file:bg-red-600 file:px-4 file:py-1.5 file:text-[11px] file:font-semibold file:uppercase file:tracking-widest file:text-white hover:file:bg-red-700"
                                                            />

                                                            {(siamThumbFilePreviewUrl ||
                                                                siamVideoForm.data.video_thumbnail) && (
                                                                <div className="mt-3 flex items-center gap-3">
                                                                    <div className="h-16 w-28 overflow-hidden rounded border border-neutral-200 bg-white">
                                                                        <img
                                                                            src={
                                                                                siamThumbFilePreviewUrl ||
                                                                                siamVideoForm.data.video_thumbnail
                                                                            }
                                                                            alt="SIAM video thumbnail preview"
                                                                            className="h-full w-full object-cover"
                                                                        />
                                                                    </div>
                                                                    <p className="text-[10px] text-neutral-500">
                                                                        This thumbnail will be used as the poster image for the SIAM page video.
                                                                    </p>
                                                                </div>
                                                            )}

                                                            <div className="mt-4 rounded border border-neutral-200 bg-neutral-50 p-3">
                                                                <div className="text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                    Preview
                                                                </div>
                                                                <div className="mt-2 overflow-hidden rounded bg-black">
                                                                    {siamVideoFilePreviewUrl ? (
                                                                        <video
                                                                            src={siamVideoFilePreviewUrl}
                                                                            controls
                                                                            className="aspect-video w-full"
                                                                        />
                                                                    ) : (siamVideoForm.data.video_url ||
                                                                                siamContent?.video?.url) ? (
                                                                        <div className="aspect-video w-full flex items-center justify-center text-[11px] text-white/80 px-4 text-center">
                                                                            URL/video will display on the SIAM page after saving.
                                                                        </div>
                                                                    ) : (
                                                                        <div className="aspect-video w-full flex items-center justify-center text-[11px] text-white/70">
                                                                            No video selected
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {siamVideoForm.progress && (
                                                                    <div className="mt-3">
                                                                        <div className="flex items-center justify-between text-[10px] text-neutral-600">
                                                                            <span>Uploading video…</span>
                                                                            <span>{siamVideoForm.progress.percentage}%</span>
                                                                        </div>
                                                                        <div className="mt-2 h-2 w-full overflow-hidden rounded bg-neutral-200">
                                                                            <div
                                                                                className="h-full bg-red-600 transition-all"
                                                                                style={{
                                                                                    width: `${siamVideoForm.progress.percentage}%`,
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {flashSiamVideoSuccess && (
                                                                    <div className="mt-3 rounded border border-green-200 bg-green-50 px-3 py-2 text-[11px] text-green-800">
                                                                        {flashSiamVideoSuccess}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-end pt-2">
                                                    <button
                                                        type="submit"
                                                        disabled={siamVideoForm.processing}
                                                        className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-[11px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-black disabled:opacity-60"
                                                    >
                                                        {siamVideoForm.processing
                                                            ? 'Uploading / Saving…'
                                                            : 'Save video'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </section>
                                )}
                                {selectedCompany.name === 'SIAM' && (
                                    <section className="space-y-6 rounded-[3px] bg-neutral-50 p-5 shadow-sm">
                                        <div className="rounded-[3px] border border-neutral-200 bg-white p-5 space-y-5">
                                            <div>
                                                <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-700">
                                                    SIAM product categories
                                                </h4>
                                                <p className="mt-2 text-xs text-neutral-500">
                                                    Category cards on the public SIAM page. Each category has its own list of products shown in the modal.
                                                </p>
                                            </div>

                                            <div className="space-y-2">
                                                {previewSiamCategories.map((c, idx) => (
                                                    <div
                                                        key={c.id ?? `siam-category-row-${idx}`}
                                                        className="flex flex-col gap-3 rounded border border-neutral-200 bg-neutral-50 p-3 md:flex-row md:items-center md:justify-between"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-14 w-20 overflow-hidden rounded border border-neutral-200 bg-white">
                                                                <img
                                                                    src={c.card_image_path || 'https://placehold.co/350x269'}
                                                                    alt={c.name || 'SIAM category'}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-700">
                                                                    {c.name}
                                                                </p>
                                                                <p className="mt-1 text-[11px] text-neutral-500">
                                                                    {c.card_description || 'No card description'}
                                                                </p>
                                                                <p className="mt-1 text-[10px] text-neutral-400">
                                                                    Order: {c.display_order ?? 0} | Active: {c.is_active ? 'Yes' : 'No'} | Products:{' '}
                                                                    {c.products?.length ?? 0}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => setEditingSiamCategory(c)}
                                                                className="rounded-full border border-neutral-300 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-neutral-700 hover:bg-neutral-100"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    c.id
                                                                        ? destroySiamCategory(c.id)
                                                                        : removeSiamPreviewCategory(c, idx)
                                                                }
                                                                className="rounded-full border border-red-200 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-red-600 hover:bg-red-50"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <form onSubmit={submitSiamCategory} className="space-y-4 rounded border border-neutral-200 bg-neutral-50 p-4">
                                                <h5 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-700">
                                                    {editingSiamCategory ? 'Edit category' : 'Add category'}
                                                </h5>
                                                <div className="grid gap-4 md:grid-cols-2">
                                                    <div>
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={siamCategoryForm.data.name}
                                                            onChange={(e) => siamCategoryForm.setData('name', e.target.value)}
                                                            className="mt-1 w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Display order
                                                        </label>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            value={siamCategoryForm.data.display_order}
                                                            onChange={(e) =>
                                                                siamCategoryForm.setData(
                                                                    'display_order',
                                                                    Number(e.target.value || 0)
                                                                )
                                                            }
                                                            className="mt-1 w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                        />
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Card description (red bar on public page)
                                                        </label>
                                                        <textarea
                                                            rows={3}
                                                            value={siamCategoryForm.data.card_description}
                                                            onChange={(e) =>
                                                                siamCategoryForm.setData('card_description', e.target.value)
                                                            }
                                                            className="mt-1 w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                        />
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Modal intro (paragraph under header)
                                                        </label>
                                                        <textarea
                                                            rows={3}
                                                            value={siamCategoryForm.data.modal_short_description}
                                                            onChange={(e) =>
                                                                siamCategoryForm.setData(
                                                                    'modal_short_description',
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="mt-1 w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Card image
                                                        </label>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) =>
                                                                siamCategoryForm.setData(
                                                                    'image_file',
                                                                    e.target.files?.[0] ?? null
                                                                )
                                                            }
                                                            className="mt-1 block w-full text-[11px] text-neutral-700 file:mr-3 file:rounded-full file:border-0 file:bg-red-600 file:px-4 file:py-1.5 file:text-[11px] file:font-semibold file:uppercase file:tracking-widest file:text-white hover:file:bg-red-700"
                                                        />
                                                    </div>
                                                    <div className="flex items-end">
                                                        <label className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            <input
                                                                type="checkbox"
                                                                checked={siamCategoryForm.data.is_active}
                                                                onChange={(e) =>
                                                                    siamCategoryForm.setData('is_active', e.target.checked)
                                                                }
                                                                className="h-3 w-3 rounded border-neutral-300"
                                                            />
                                                            <span>Active</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                {(siamCategoryImagePreview || editingSiamCategory?.card_image_path) && (
                                                    <div className="h-20 w-28 overflow-hidden rounded border border-neutral-200 bg-white">
                                                        <img
                                                            src={
                                                                siamCategoryImagePreview ||
                                                                editingSiamCategory?.card_image_path
                                                            }
                                                            alt="SIAM category preview"
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                )}

                                                {flashSiamProductCategorySuccess && (
                                                    <div className="rounded border border-green-200 bg-green-50 px-3 py-2 text-[11px] text-green-800">
                                                        {flashSiamProductCategorySuccess}
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-end gap-2">
                                                    {editingSiamCategory && (
                                                        <button
                                                            type="button"
                                                            onClick={() => setEditingSiamCategory(null)}
                                                            className="rounded-full border border-neutral-300 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-neutral-700 hover:bg-neutral-100"
                                                        >
                                                            Cancel
                                                        </button>
                                                    )}
                                                    <button
                                                        type="submit"
                                                        disabled={siamCategoryForm.processing}
                                                        className="rounded-full bg-neutral-900 px-5 py-2 text-[10px] font-semibold uppercase tracking-widest text-white hover:bg-black disabled:opacity-60"
                                                    >
                                                        {siamCategoryForm.processing
                                                            ? 'Saving...'
                                                            : editingSiamCategory
                                                                ? 'Update category'
                                                                : 'Add category'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>

                                        <div className="rounded-[3px] border border-neutral-200 bg-white p-5 space-y-5">
                                            <div>
                                                <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-700">
                                                    Products inside a category
                                                </h4>
                                                <p className="mt-2 text-xs text-neutral-500">
                                                    Choose a category, then add or edit products shown in that category&apos;s modal on the SIAM page.
                                                </p>
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                    Category
                                                </label>
                                                <select
                                                    value={adminSiamCategoryForProducts ?? ''}
                                                    onChange={(e) => {
                                                        const v = e.target.value;
                                                        setAdminSiamCategoryForProducts(v ? Number(v) : null);
                                                        setEditingSiamCategoryProduct(null);
                                                    }}
                                                    className="mt-1 w-full max-w-md rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                >
                                                    {siamProductCategories.map((c) => (
                                                        <option key={c.id} value={c.id}>
                                                            {c.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                {adminSiamCategoryProducts.length === 0 && (
                                                    <div className="rounded border border-dashed border-neutral-300 bg-neutral-50 px-4 py-8 text-center text-[11px] text-neutral-500">
                                                        No products in this category yet. Add one below.
                                                    </div>
                                                )}

                                                {adminSiamCategoryProducts.map((p, idx) => (
                                                    <div
                                                        key={p.id ?? `siam-cat-product-row-${idx}`}
                                                        className="flex flex-col gap-3 rounded border border-neutral-200 bg-neutral-50 p-3 md:flex-row md:items-center md:justify-between"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-14 w-20 overflow-hidden rounded border border-neutral-200 bg-white">
                                                                <img
                                                                    src={p.image_path || 'https://placehold.co/350x269'}
                                                                    alt={p.title || 'Product'}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-700">
                                                                    {p.title}
                                                                </p>
                                                                <p className="mt-1 text-[11px] text-neutral-500">
                                                                    {p.description || 'No description'}
                                                                </p>
                                                                <p className="mt-1 text-[10px] text-neutral-400">
                                                                    Order: {p.display_order ?? 0} | Active: {p.is_active ? 'Yes' : 'No'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => setEditingSiamCategoryProduct(p)}
                                                                className="rounded-full border border-neutral-300 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-neutral-700 hover:bg-neutral-100"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => destroySiamCategoryProduct(p.id)}
                                                                className="rounded-full border border-red-200 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-red-600 hover:bg-red-50"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <form
                                                onSubmit={submitSiamCategoryProduct}
                                                className="space-y-4 rounded border border-neutral-200 bg-neutral-50 p-4"
                                            >
                                                <h5 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-700">
                                                    {editingSiamCategoryProduct ? 'Edit product' : 'Add product'}
                                                </h5>

                                                <div className="grid gap-4 md:grid-cols-2">
                                                    <div className="md:col-span-2">
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Category
                                                        </label>
                                                        <select
                                                            value={siamCategoryProductForm.data.siam_product_category_id}
                                                            onChange={(e) =>
                                                                siamCategoryProductForm.setData(
                                                                    'siam_product_category_id',
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="mt-1 w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                            required
                                                        >
                                                            <option value="">Select category</option>
                                                            {siamProductCategories.map((c) => (
                                                                <option key={c.id} value={c.id}>
                                                                    {c.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Title
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={siamCategoryProductForm.data.title}
                                                            onChange={(e) =>
                                                                siamCategoryProductForm.setData('title', e.target.value)
                                                            }
                                                            className="mt-1 w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Display order
                                                        </label>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            value={siamCategoryProductForm.data.display_order}
                                                            onChange={(e) =>
                                                                siamCategoryProductForm.setData(
                                                                    'display_order',
                                                                    Number(e.target.value || 0)
                                                                )
                                                            }
                                                            className="mt-1 w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                        />
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Description
                                                        </label>
                                                        <textarea
                                                            rows={3}
                                                            value={siamCategoryProductForm.data.description}
                                                            onChange={(e) =>
                                                                siamCategoryProductForm.setData(
                                                                    'description',
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="mt-1 w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Product image
                                                        </label>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) =>
                                                                siamCategoryProductForm.setData(
                                                                    'image_file',
                                                                    e.target.files?.[0] ?? null
                                                                )
                                                            }
                                                            className="mt-1 block w-full text-[11px] text-neutral-700 file:mr-3 file:rounded-full file:border-0 file:bg-red-600 file:px-4 file:py-1.5 file:text-[11px] file:font-semibold file:uppercase file:tracking-widest file:text-white hover:file:bg-red-700"
                                                        />
                                                    </div>
                                                    <div className="flex items-end">
                                                        <label className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            <input
                                                                type="checkbox"
                                                                checked={siamCategoryProductForm.data.is_active}
                                                                onChange={(e) =>
                                                                    siamCategoryProductForm.setData(
                                                                        'is_active',
                                                                        e.target.checked
                                                                    )
                                                                }
                                                                className="h-3 w-3 rounded border-neutral-300"
                                                            />
                                                            <span>Active</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                {(siamCategoryProductImagePreview ||
                                                    editingSiamCategoryProduct?.image_path) && (
                                                    <div className="h-20 w-28 overflow-hidden rounded border border-neutral-200 bg-white">
                                                        <img
                                                            src={
                                                                siamCategoryProductImagePreview ||
                                                                editingSiamCategoryProduct?.image_path
                                                            }
                                                            alt="SIAM product preview"
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                )}

                                                {flashSiamCategoryProductSuccess && (
                                                    <div className="rounded border border-green-200 bg-green-50 px-3 py-2 text-[11px] text-green-800">
                                                        {flashSiamCategoryProductSuccess}
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-end gap-2">
                                                    {editingSiamCategoryProduct && (
                                                        <button
                                                            type="button"
                                                            onClick={() => setEditingSiamCategoryProduct(null)}
                                                            className="rounded-full border border-neutral-300 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-neutral-700 hover:bg-neutral-100"
                                                        >
                                                            Cancel
                                                        </button>
                                                    )}
                                                    <button
                                                        type="submit"
                                                        disabled={siamCategoryProductForm.processing}
                                                        className="rounded-full bg-neutral-900 px-5 py-2 text-[10px] font-semibold uppercase tracking-widest text-white hover:bg-black disabled:opacity-60"
                                                    >
                                                        {siamCategoryProductForm.processing
                                                            ? 'Saving...'
                                                            : editingSiamCategoryProduct
                                                                ? 'Update product'
                                                                : 'Add product'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </section>
                                )}
                                {selectedCompany.name === 'TPSMI' && (
                                    <section className="space-y-6 rounded-[3px] bg-neutral-50 p-5 shadow-sm">
                                        <div className="rounded-[3px] border border-neutral-200 bg-white p-5">
                                            <form onSubmit={submitTpsmiStats} className="space-y-6">
                                                <div>
                                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-700">
                                                        "What we do" stats
                                                    </h4>
                                                    <p className="mt-2 text-xs text-neutral-500">
                                                        Manage the heading and numbers shown in the public "WHAT WE DO" card
                                                        on the TPSMI page.
                                                    </p>

                                                    <div className="mt-4 grid gap-4 md:grid-cols-[1.2fr,2fr]">
                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Title lines
                                                            </label>
                                                            <div className="space-y-2">
                                                                <input
                                                                    type="text"
                                                                    value={tpsmiStatsForm.data.stats_title_line1}
                                                                    onChange={(e) =>
                                                                        tpsmiStatsForm.setData(
                                                                            'stats_title_line1',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={tpsmiStatsForm.data.stats_title_line2}
                                                                    onChange={(e) =>
                                                                        tpsmiStatsForm.setData(
                                                                            'stats_title_line2',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={tpsmiStatsForm.data.stats_title_line3}
                                                                    onChange={(e) =>
                                                                        tpsmiStatsForm.setData(
                                                                            'stats_title_line3',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Stat items
                                                            </label>
                                                            <div className="grid gap-2 md:grid-cols-2">
                                                                {tpsmiStatsForm.data.stats_items.map((item, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className="rounded border border-neutral-200 bg-white p-2"
                                                                    >
                                                                        <input
                                                                            type="text"
                                                                            value={item.value}
                                                                            onChange={(e) => {
                                                                                const next = [
                                                                                    ...tpsmiStatsForm.data.stats_items,
                                                                                ];
                                                                                next[index] = {
                                                                                    ...next[index],
                                                                                    value: e.target.value,
                                                                                };
                                                                                tpsmiStatsForm.setData('stats_items', next);
                                                                            }}
                                                                            className="mb-1 w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                            placeholder="25+"
                                                                        />
                                                                        <input
                                                                            type="text"
                                                                            value={item.label}
                                                                            onChange={(e) => {
                                                                                const next = [
                                                                                    ...tpsmiStatsForm.data.stats_items,
                                                                                ];
                                                                                next[index] = {
                                                                                    ...next[index],
                                                                                    label: e.target.value,
                                                                                };
                                                                                tpsmiStatsForm.setData('stats_items', next);
                                                                            }}
                                                                            className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                            placeholder="Years Experience"
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-end pt-2">
                                                    <button
                                                        type="submit"
                                                        disabled={tpsmiStatsForm.processing}
                                                        className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-[11px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-black disabled:opacity-60"
                                                    >
                                                        {tpsmiStatsForm.processing ? 'Saving...' : 'Save stats'}
                                                    </button>
                                                </div>

                                                {flashTpsmiStatsSuccess && (
                                                    <div className="rounded border border-green-200 bg-green-50 px-3 py-2 text-[11px] text-green-800">
                                                        {flashTpsmiStatsSuccess}
                                                    </div>
                                                )}
                                            </form>
                                        </div>
                                    </section>
                                )}

                                {selectedCompany.name === 'TPSMI' && (
                                    <section className="space-y-6 rounded-[3px] bg-neutral-50 p-5 shadow-sm">
                                        <div className="rounded-[3px] border border-neutral-200 bg-white p-5">
                                            <form onSubmit={submitTpsmiVideo} className="space-y-6">
                                                <div>
                                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-700">
                                                        TPSMI page video
                                                    </h4>
                                                    <p className="mt-2 text-xs text-neutral-500">
                                                        Configure the video shown in the TPSMI page video section.
                                                    </p>

                                                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                                                        <div className="space-y-3">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Video title (optional)
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={tpsmiVideoForm.data.video_title}
                                                                onChange={(e) =>
                                                                    tpsmiVideoForm.setData(
                                                                        'video_title',
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                placeholder="TPSMI Page Video"
                                                            />

                                                            <label className="mt-4 block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Upload video file (recommended)
                                                            </label>
                                                            <input
                                                                type="file"
                                                                accept="video/*"
                                                                onChange={(e) =>
                                                                    tpsmiVideoForm.setData(
                                                                        'video_file',
                                                                        e.target.files?.[0] ?? null
                                                                    )
                                                                }
                                                                className="block w-full text-[11px] text-neutral-700 file:mr-3 file:rounded-full file:border-0 file:bg-red-600 file:px-4 file:py-1.5 file:text-[11px] file:font-semibold file:uppercase file:tracking-widest file:text-white hover:file:bg-red-700"
                                                            />
                                                            <p className="mt-1 text-[10px] text-neutral-500">
                                                                Leave empty to keep the current video. Max size depends on your server limits.
                                                            </p>

                                                            <label className="mt-4 block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Or set video URL (YouTube/Vimeo/direct mp4)
                                                            </label>
                                                            <input
                                                                type="url"
                                                                value={tpsmiVideoForm.data.video_url}
                                                                onChange={(e) =>
                                                                    tpsmiVideoForm.setData(
                                                                        'video_url',
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                placeholder="https://www.youtube.com/watch?v=..."
                                                            />

                                                            <label className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={tpsmiVideoForm.data.video_active}
                                                                    onChange={(e) =>
                                                                        tpsmiVideoForm.setData(
                                                                            'video_active',
                                                                            e.target.checked
                                                                        )
                                                                    }
                                                                    className="h-3 w-3 rounded border-neutral-300"
                                                                />
                                                                <span>Video active</span>
                                                            </label>
                                                        </div>

                                                        <div className="space-y-3">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Upload thumbnail image (optional)
                                                            </label>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) =>
                                                                    tpsmiVideoForm.setData(
                                                                        'video_thumbnail_file',
                                                                        e.target.files?.[0] ?? null
                                                                    )
                                                                }
                                                                className="block w-full text-[11px] text-neutral-700 file:mr-3 file:rounded-full file:border-0 file:bg-red-600 file:px-4 file:py-1.5 file:text-[11px] file:font-semibold file:uppercase file:tracking-widest file:text-white hover:file:bg-red-700"
                                                            />

                                                            {(tpsmiThumbFilePreviewUrl ||
                                                                tpsmiVideoForm.data.video_thumbnail) && (
                                                                <div className="mt-3 flex items-center gap-3">
                                                                    <div className="h-16 w-28 overflow-hidden rounded border border-neutral-200 bg-white">
                                                                        <img
                                                                            src={
                                                                                tpsmiThumbFilePreviewUrl ||
                                                                                tpsmiVideoForm.data.video_thumbnail
                                                                            }
                                                                            alt="TPSMI video thumbnail preview"
                                                                            className="h-full w-full object-cover"
                                                                        />
                                                                    </div>
                                                                    <p className="text-[10px] text-neutral-500">
                                                                        This thumbnail will be used as the poster image for the TPSMI page video.
                                                                    </p>
                                                                </div>
                                                            )}

                                                            <div className="mt-4 rounded border border-neutral-200 bg-neutral-50 p-3">
                                                                <div className="text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                    Preview
                                                                </div>
                                                                <div className="mt-2 overflow-hidden rounded bg-black">
                                                                    {tpsmiVideoFilePreviewUrl ? (
                                                                        <video
                                                                            src={tpsmiVideoFilePreviewUrl}
                                                                            controls
                                                                            className="aspect-video w-full"
                                                                        />
                                                                    ) : (
                                                                        <div className="aspect-video w-full flex items-center justify-center text-[11px] text-white/80 px-4 text-center">
                                                                            URL/video will display on the TPSMI page after saving.
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {tpsmiVideoForm.progress && (
                                                                    <div className="mt-3">
                                                                        <div className="flex items-center justify-between text-[10px] text-neutral-600">
                                                                            <span>Uploading video…</span>
                                                                            <span>
                                                                                {tpsmiVideoForm.progress.percentage}%
                                                                            </span>
                                                                        </div>
                                                                        <div className="mt-2 h-2 w-full overflow-hidden rounded bg-neutral-200">
                                                                            <div
                                                                                className="h-full bg-red-600 transition-all"
                                                                                style={{
                                                                                    width: `${tpsmiVideoForm.progress.percentage}%`,
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {flashTpsmiVideoSuccess && (
                                                                    <div className="mt-3 rounded border border-green-200 bg-green-50 px-3 py-2 text-[11px] text-green-800">
                                                                        {flashTpsmiVideoSuccess}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-end pt-2">
                                                    <button
                                                        type="submit"
                                                        disabled={tpsmiVideoForm.processing}
                                                        className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-[11px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-black disabled:opacity-60"
                                                    >
                                                        {tpsmiVideoForm.processing ? 'Uploading / Saving…' : 'Save video'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </section>
                                )}
                                {selectedCompany.name === 'TPSMI' && (
                                    <section className="space-y-6 rounded-[3px] bg-neutral-50 p-5 shadow-sm">
                                        <div className="rounded-[3px] border border-neutral-200 bg-white p-5 space-y-5">
                                            <div>
                                                <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-700">
                                                    TPSMI Vacuum Formed Plastic Products
                                                </h4>
                                                <p className="mt-2 text-xs text-neutral-500">
                                                    Fetches current vacuum formed plastic products and lets you add, edit, or delete items.
                                                </p>
                                            </div>

                                            <div className="space-y-2">
                                                {previewTpsmiProducts.map((p, idx) => (
                                                    <div
                                                        key={p.id ?? `tpsmi-product-row-${idx}`}
                                                        className="flex flex-col gap-3 rounded border border-neutral-200 bg-neutral-50 p-3 md:flex-row md:items-center md:justify-between"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-14 w-20 overflow-hidden rounded border border-neutral-200 bg-white">
                                                                <img
                                                                    src={p.image_path || 'https://placehold.co/350x269'}
                                                                    alt={p.title || 'TPSMI product'}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-700">
                                                                    {p.title}
                                                                </p>
                                                                <p className="mt-1 text-[11px] text-neutral-500">
                                                                    {p.description || 'No description'}
                                                                </p>
                                                                <p className="mt-1 text-[10px] text-neutral-400">
                                                                    Order: {p.display_order ?? 0} | Active: {p.is_active ? 'Yes' : 'No'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => setEditingTpsmiProduct(p)}
                                                                className="rounded-full border border-neutral-300 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-neutral-700 hover:bg-neutral-100"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    p.id
                                                                        ? destroyTpsmiProduct(p.id)
                                                                        : removeTpsmiPreviewProduct(p, idx)
                                                                }
                                                                className="rounded-full border border-red-200 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-red-600 hover:bg-red-50"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <form onSubmit={submitTpsmiProduct} className="space-y-4 rounded border border-neutral-200 bg-neutral-50 p-4">
                                                <h5 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-700">
                                                    {editingTpsmiProduct ? 'Edit product' : 'Add product'}
                                                </h5>

                                                <div className="grid gap-4 md:grid-cols-2">
                                                    <div>
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Title
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={tpsmiProductForm.data.title}
                                                            onChange={(e) => tpsmiProductForm.setData('title', e.target.value)}
                                                            className="mt-1 w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                            required
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Display order
                                                        </label>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            value={tpsmiProductForm.data.display_order}
                                                            onChange={(e) =>
                                                                tpsmiProductForm.setData(
                                                                    'display_order',
                                                                    Number(e.target.value || 0)
                                                                )
                                                            }
                                                            className="mt-1 w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                        />
                                                    </div>

                                                    <div className="md:col-span-2">
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Description
                                                        </label>
                                                        <textarea
                                                            rows={3}
                                                            value={tpsmiProductForm.data.description}
                                                            onChange={(e) => tpsmiProductForm.setData('description', e.target.value)}
                                                            className="mt-1 w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Product image
                                                        </label>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) =>
                                                                tpsmiProductForm.setData(
                                                                    'image_file',
                                                                    e.target.files?.[0] ?? null
                                                                )
                                                            }
                                                            className="mt-1 block w-full text-[11px] text-neutral-700 file:mr-3 file:rounded-full file:border-0 file:bg-red-600 file:px-4 file:py-1.5 file:text-[11px] file:font-semibold file:uppercase file:tracking-widest file:text-white hover:file:bg-red-700"
                                                        />
                                                    </div>

                                                    <div className="flex items-end">
                                                        <label className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            <input
                                                                type="checkbox"
                                                                checked={tpsmiProductForm.data.is_active}
                                                                onChange={(e) =>
                                                                    tpsmiProductForm.setData('is_active', e.target.checked)
                                                                }
                                                                className="h-3 w-3 rounded border-neutral-300"
                                                            />
                                                            <span>Active</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                {(tpsmiProductImagePreview ||
                                                    editingTpsmiProduct?.image_path) && (
                                                    <div className="h-20 w-28 overflow-hidden rounded border border-neutral-200 bg-white">
                                                        <img
                                                            src={
                                                                tpsmiProductImagePreview ||
                                                                editingTpsmiProduct?.image_path
                                                            }
                                                            alt="TPSMI product preview"
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                )}

                                                {flashTpsmiProductSuccess && (
                                                    <div className="rounded border border-green-200 bg-green-50 px-3 py-2 text-[11px] text-green-800">
                                                        {flashTpsmiProductSuccess}
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-end gap-2">
                                                    {editingTpsmiProduct && (
                                                        <button
                                                            type="button"
                                                            onClick={() => setEditingTpsmiProduct(null)}
                                                            className="rounded-full border border-neutral-300 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-neutral-700 hover:bg-neutral-100"
                                                        >
                                                            Cancel
                                                        </button>
                                                    )}

                                                    <button
                                                        type="submit"
                                                        disabled={tpsmiProductForm.processing}
                                                        className="rounded-full bg-neutral-900 px-5 py-2 text-[10px] font-semibold uppercase tracking-widest text-white hover:bg-black disabled:opacity-60"
                                                    >
                                                        {tpsmiProductForm.processing
                                                            ? 'Saving...'
                                                            : editingTpsmiProduct
                                                            ? 'Update product'
                                                            : 'Add product'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </section>
                                )}
                                {selectedCompany.name === 'TOP OFFROAD' && (
                                    <section className="space-y-6 rounded-[3px] bg-neutral-50 p-5 shadow-sm">
                                        <div className="rounded-[3px] border border-neutral-200 bg-white p-5">
                                            <form onSubmit={submitTopoffroadStats} className="space-y-6">
                                                <div>
                                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-700">
                                                        "What we do" stats
                                                    </h4>
                                                    <p className="mt-2 text-xs text-neutral-500">
                                                        Manage the heading and numbers shown in the public "WHAT WE DO" card
                                                        on the TOP OFFROAD page.
                                                    </p>

                                                    <div className="mt-4 grid gap-4 md:grid-cols-[1.2fr,2fr]">
                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Title lines
                                                            </label>
                                                            <div className="space-y-2">
                                                                <input
                                                                    type="text"
                                                                    value={topoffroadStatsForm.data.stats_title_line1}
                                                                    onChange={(e) =>
                                                                        topoffroadStatsForm.setData(
                                                                            'stats_title_line1',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={topoffroadStatsForm.data.stats_title_line2}
                                                                    onChange={(e) =>
                                                                        topoffroadStatsForm.setData(
                                                                            'stats_title_line2',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={topoffroadStatsForm.data.stats_title_line3}
                                                                    onChange={(e) =>
                                                                        topoffroadStatsForm.setData(
                                                                            'stats_title_line3',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Stat items
                                                            </label>
                                                            <div className="grid gap-2 md:grid-cols-2">
                                                                {topoffroadStatsForm.data.stats_items.map((item, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className="rounded border border-neutral-200 bg-white p-2"
                                                                    >
                                                                        <input
                                                                            type="text"
                                                                            value={item.value}
                                                                            onChange={(e) => {
                                                                                const next = [
                                                                                    ...topoffroadStatsForm.data.stats_items,
                                                                                ];
                                                                                next[index] = {
                                                                                    ...next[index],
                                                                                    value: e.target.value,
                                                                                };
                                                                                topoffroadStatsForm.setData('stats_items', next);
                                                                            }}
                                                                            className="mb-1 w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                            placeholder="25+"
                                                                        />
                                                                        <input
                                                                            type="text"
                                                                            value={item.label}
                                                                            onChange={(e) => {
                                                                                const next = [
                                                                                    ...topoffroadStatsForm.data.stats_items,
                                                                                ];
                                                                                next[index] = {
                                                                                    ...next[index],
                                                                                    label: e.target.value,
                                                                                };
                                                                                topoffroadStatsForm.setData('stats_items', next);
                                                                            }}
                                                                            className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                            placeholder="Years Experience"
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-end pt-2">
                                                    <button
                                                        type="submit"
                                                        disabled={topoffroadStatsForm.processing}
                                                        className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-[11px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-black disabled:opacity-60"
                                                    >
                                                        {topoffroadStatsForm.processing ? 'Saving...' : 'Save stats'}
                                                    </button>
                                                </div>

                                                {flashTopoffroadStatsSuccess && (
                                                    <div className="rounded border border-green-200 bg-green-50 px-3 py-2 text-[11px] text-green-800">
                                                        {flashTopoffroadStatsSuccess}
                                                    </div>
                                                )}
                                            </form>
                                        </div>
                                    </section>
                                )}

                                {selectedCompany.name === 'TOP OFFROAD' && (
                                    <section className="space-y-6 rounded-[3px] bg-neutral-50 p-5 shadow-sm">
                                        <div className="rounded-[3px] border border-neutral-200 bg-white p-5">
                                            <form onSubmit={submitTopoffroadVideo} className="space-y-6">
                                                <div>
                                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-700">
                                                        TOP OFFROAD page video
                                                    </h4>
                                                    <p className="mt-2 text-xs text-neutral-500">
                                                        Configure the video shown in the TOP OFFROAD page video section.
                                                    </p>

                                                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                                                        <div className="space-y-3">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Video title (optional)
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={topoffroadVideoForm.data.video_title}
                                                                onChange={(e) =>
                                                                    topoffroadVideoForm.setData(
                                                                        'video_title',
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                placeholder="TOP OFFROAD Page Video"
                                                            />

                                                            <label className="mt-4 block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Upload video file (recommended)
                                                            </label>
                                                            <input
                                                                type="file"
                                                                accept="video/*"
                                                                onChange={(e) =>
                                                                    topoffroadVideoForm.setData(
                                                                        'video_file',
                                                                        e.target.files?.[0] ?? null
                                                                    )
                                                                }
                                                                className="block w-full text-[11px] text-neutral-700 file:mr-3 file:rounded-full file:border-0 file:bg-red-600 file:px-4 file:py-1.5 file:text-[11px] file:font-semibold file:uppercase file:tracking-widest file:text-white hover:file:bg-red-700"
                                                            />

                                                            <label className="mt-4 block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Or set video URL (YouTube/Vimeo/direct mp4)
                                                            </label>
                                                            <input
                                                                type="url"
                                                                value={topoffroadVideoForm.data.video_url}
                                                                onChange={(e) =>
                                                                    topoffroadVideoForm.setData(
                                                                        'video_url',
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                placeholder="https://www.youtube.com/watch?v=..."
                                                            />

                                                            <label className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={topoffroadVideoForm.data.video_active}
                                                                    onChange={(e) =>
                                                                        topoffroadVideoForm.setData(
                                                                            'video_active',
                                                                            e.target.checked
                                                                        )
                                                                    }
                                                                    className="h-3 w-3 rounded border-neutral-300"
                                                                />
                                                                <span>Video active</span>
                                                            </label>
                                                        </div>

                                                        <div className="space-y-3">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Upload thumbnail image (optional)
                                                            </label>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) =>
                                                                    topoffroadVideoForm.setData(
                                                                        'video_thumbnail_file',
                                                                        e.target.files?.[0] ?? null
                                                                    )
                                                                }
                                                                className="block w-full text-[11px] text-neutral-700 file:mr-3 file:rounded-full file:border-0 file:bg-red-600 file:px-4 file:py-1.5 file:text-[11px] file:font-semibold file:uppercase file:tracking-widest file:text-white hover:file:bg-red-700"
                                                            />

                                                            {(topoffroadThumbFilePreviewUrl ||
                                                                topoffroadVideoForm.data.video_thumbnail) && (
                                                                <div className="mt-3 flex items-center gap-3">
                                                                    <div className="h-16 w-28 overflow-hidden rounded border border-neutral-200 bg-white">
                                                                        <img
                                                                            src={
                                                                                topoffroadThumbFilePreviewUrl ||
                                                                                topoffroadVideoForm.data.video_thumbnail
                                                                            }
                                                                            alt="TOP OFFROAD video thumbnail preview"
                                                                            className="h-full w-full object-cover"
                                                                        />
                                                                    </div>
                                                                    <p className="text-[10px] text-neutral-500">
                                                                        This thumbnail will be used as the poster image for the TOP OFFROAD page video.
                                                                    </p>
                                                                </div>
                                                            )}

                                                            <div className="mt-4 rounded border border-neutral-200 bg-neutral-50 p-3">
                                                                <div className="text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                    Preview
                                                                </div>
                                                                <div className="mt-2 overflow-hidden rounded bg-black">
                                                                    {topoffroadVideoFilePreviewUrl ? (
                                                                        <video
                                                                            src={topoffroadVideoFilePreviewUrl}
                                                                            controls
                                                                            className="aspect-video w-full"
                                                                        />
                                                                    ) : (
                                                                        <div className="aspect-video w-full flex items-center justify-center text-[11px] text-white/80 px-4 text-center">
                                                                            URL/video will display on the TOP OFFROAD page after saving.
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {topoffroadVideoForm.progress && (
                                                                    <div className="mt-3">
                                                                        <div className="flex items-center justify-between text-[10px] text-neutral-600">
                                                                            <span>Uploading video…</span>
                                                                            <span>
                                                                                {topoffroadVideoForm.progress.percentage}%
                                                                            </span>
                                                                        </div>
                                                                        <div className="mt-2 h-2 w-full overflow-hidden rounded bg-neutral-200">
                                                                            <div
                                                                                className="h-full bg-red-600 transition-all"
                                                                                style={{
                                                                                    width: `${topoffroadVideoForm.progress.percentage}%`,
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {flashTopoffroadVideoSuccess && (
                                                                    <div className="mt-3 rounded border border-green-200 bg-green-50 px-3 py-2 text-[11px] text-green-800">
                                                                        {flashTopoffroadVideoSuccess}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-end pt-2">
                                                    <button
                                                        type="submit"
                                                        disabled={topoffroadVideoForm.processing}
                                                        className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-[11px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-black disabled:opacity-60"
                                                    >
                                                        {topoffroadVideoForm.processing ? 'Uploading / Saving…' : 'Save video'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </section>
                                )}
                                {selectedCompany.name === 'TOP OFFROAD' && (
                                    <section className="space-y-6 rounded-[3px] bg-neutral-50 p-5 shadow-sm">
                                        <div className="rounded-[3px] border border-neutral-200 bg-white p-5 space-y-5">
                                            <div>
                                                <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-700">
                                                    TOP OFFROAD Products
                                                </h4>
                                                <p className="mt-2 text-xs text-neutral-500">
                                                    Fetches current TOP OFFROAD products and lets you add, edit, or delete items.
                                                </p>
                                            </div>

                                            <div className="rounded-[3px] bg-neutral-900 px-4 py-6">
                                                <div className="text-center text-white text-xs font-semibold uppercase tracking-widest">
                                                    OUR PRODUCTS
                                                </div>
                                                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                                                    {topoffroadProductCategories.map((cat) => (
                                                        <button
                                                            key={cat.id}
                                                            type="button"
                                                            aria-pressed={adminTopoffroadProductCategory === cat.id}
                                                            onClick={() => setAdminTopoffroadProductCategory(cat.id)}
                                                            className={`min-w-[160px] h-11 px-6 rounded-2xl border-[3px] border-orange-500 text-[11px] font-medium transition-all duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 ${
                                                                adminTopoffroadProductCategory === cat.id
                                                                    ? 'bg-orange-400 text-white hover:bg-orange-300'
                                                                    : 'bg-transparent text-white hover:bg-orange-500/15'
                                                            }`}
                                                        >
                                                            {cat.label}
                                                        </button>
                                                    ))}
                                                </div>
                                                <p className="mt-4 text-center text-[10px] text-neutral-400">
                                                    Managing products for:{' '}
                                                    <span className="font-semibold text-white">
                                                        {topoffroadProductCategories.find((c) => c.id === adminTopoffroadProductCategory)?.label}
                                                    </span>
                                                </p>
                                            </div>

                                            <div className="space-y-2">
                                                {previewTopoffroadProducts.length === 0 && (
                                                    <div className="rounded border border-dashed border-neutral-300 bg-neutral-50 px-4 py-8 text-center text-[11px] text-neutral-500">
                                                        No products in this category yet. Add one below.
                                                    </div>
                                                )}
                                                {previewTopoffroadProducts.map((p, idx) => (
                                                    <div
                                                        key={p.id ?? `topoffroad-product-row-${idx}`}
                                                        className="flex flex-col gap-3 rounded border border-neutral-200 bg-neutral-50 p-3 md:flex-row md:items-center md:justify-between"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-14 w-20 overflow-hidden rounded border border-neutral-200 bg-white">
                                                                <img
                                                                    src={p.image_path || 'https://placehold.co/350x269'}
                                                                    alt={p.title || 'TOP OFFROAD product'}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-700">
                                                                    {p.title}
                                                                </p>
                                                                <p className="mt-1 text-[11px] text-neutral-500">
                                                                    {p.description || 'No description'}
                                                                </p>
                                                                <p className="mt-1 text-[10px] text-neutral-400">
                                                                    Category: {p.category || 'car-accessories'} | Order: {p.display_order ?? 0} | Active:{' '}
                                                                    {p.is_active ? 'Yes' : 'No'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => setEditingTopoffroadProduct(p)}
                                                                className="rounded-full border border-neutral-300 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-neutral-700 hover:bg-neutral-100"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    p.id
                                                                        ? destroyTopoffroadProduct(p.id)
                                                                        : removeTopoffroadPreviewProduct(p, idx)
                                                                }
                                                                className="rounded-full border border-red-200 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-red-600 hover:bg-red-50"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <form onSubmit={submitTopoffroadProduct} className="space-y-4 rounded border border-neutral-200 bg-neutral-50 p-4">
                                                <h5 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-700">
                                                    {editingTopoffroadProduct ? 'Edit product' : 'Add product'}
                                                </h5>

                                                {Object.keys(topoffroadProductForm.errors).length > 0 && (
                                                    <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-[11px] text-red-700">
                                                        Please fix the form errors below before saving.
                                                    </div>
                                                )}

                                                <div className="grid gap-4 md:grid-cols-2">
                                                    <div>
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Title
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={topoffroadProductForm.data.title}
                                                            onChange={(e) => topoffroadProductForm.setData('title', e.target.value)}
                                                            className="mt-1 w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                            required
                                                        />
                                                        {topoffroadProductForm.errors.title && (
                                                            <p className="mt-1 text-[10px] text-red-600">
                                                                {topoffroadProductForm.errors.title}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Display order
                                                        </label>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            value={topoffroadProductForm.data.display_order}
                                                            onChange={(e) =>
                                                                topoffroadProductForm.setData(
                                                                    'display_order',
                                                                    Number(e.target.value || 0)
                                                                )
                                                            }
                                                            className="mt-1 w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                        />
                                                        {topoffroadProductForm.errors.display_order && (
                                                            <p className="mt-1 text-[10px] text-red-600">
                                                                {topoffroadProductForm.errors.display_order}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="md:col-span-2">
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Description
                                                        </label>
                                                        <textarea
                                                            rows={3}
                                                            value={topoffroadProductForm.data.description}
                                                            onChange={(e) => topoffroadProductForm.setData('description', e.target.value)}
                                                            className="mt-1 w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                        />
                                                        {topoffroadProductForm.errors.description && (
                                                            <p className="mt-1 text-[10px] text-red-600">
                                                                {topoffroadProductForm.errors.description}
                                                            </p>
                                                        )}
                                                        {topoffroadProductForm.errors.category && (
                                                            <p className="mt-1 text-[10px] text-red-600">
                                                                {topoffroadProductForm.errors.category}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Product image
                                                        </label>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) =>
                                                                topoffroadProductForm.setData(
                                                                    'image_file',
                                                                    e.target.files?.[0] ?? null
                                                                )
                                                            }
                                                            className="mt-1 block w-full text-[11px] text-neutral-700 file:mr-3 file:rounded-full file:border-0 file:bg-red-600 file:px-4 file:py-1.5 file:text-[11px] file:font-semibold file:uppercase file:tracking-widest file:text-white hover:file:bg-red-700"
                                                        />
                                                        {topoffroadProductForm.errors.image_file && (
                                                            <p className="mt-1 text-[10px] text-red-600">
                                                                {topoffroadProductForm.errors.image_file}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="flex items-end">
                                                        <label className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            <input
                                                                type="checkbox"
                                                                checked={topoffroadProductForm.data.is_active}
                                                                onChange={(e) =>
                                                                    topoffroadProductForm.setData('is_active', e.target.checked)
                                                                }
                                                                className="h-3 w-3 rounded border-neutral-300"
                                                            />
                                                            <span>Active</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                {(topoffroadProductImagePreview ||
                                                    editingTopoffroadProduct?.image_path) && (
                                                    <div className="h-20 w-28 overflow-hidden rounded border border-neutral-200 bg-white">
                                                        <img
                                                            src={
                                                                topoffroadProductImagePreview ||
                                                                editingTopoffroadProduct?.image_path
                                                            }
                                                            alt="TOP OFFROAD product preview"
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                )}

                                                {flashTopoffroadProductSuccess && (
                                                    <div className="rounded border border-green-200 bg-green-50 px-3 py-2 text-[11px] text-green-800">
                                                        {flashTopoffroadProductSuccess}
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-end gap-2">
                                                    {editingTopoffroadProduct && (
                                                        <button
                                                            type="button"
                                                            onClick={() => setEditingTopoffroadProduct(null)}
                                                            className="rounded-full border border-neutral-300 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-neutral-700 hover:bg-neutral-100"
                                                        >
                                                            Cancel
                                                        </button>
                                                    )}

                                                    <button
                                                        type="submit"
                                                        disabled={topoffroadProductForm.processing}
                                                        className="rounded-full bg-neutral-900 px-5 py-2 text-[10px] font-semibold uppercase tracking-widest text-white hover:bg-black disabled:opacity-60"
                                                    >
                                                        {topoffroadProductForm.processing
                                                            ? 'Saving...'
                                                            : editingTopoffroadProduct
                                                            ? 'Update product'
                                                            : 'Add product'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </section>
                                )}
                                {selectedCompany.name === 'CAREERS' && (
                                    <section className="space-y-6">
                                        <div className="rounded-[3px] border border-neutral-200 bg-white p-5 shadow-sm">
                                            <div className="flex flex-wrap items-start justify-between gap-4">
                                                <div>
                                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-700">
                                                        Culture cards
                                                    </h4>
                                                    <p className="mt-2 text-xs text-neutral-500">
                                                        Images, titles, and copy for the culture section on the public Careers page.
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setCareersEditingCulture(null)}
                                                    className="rounded-full bg-red-600 px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-white hover:bg-red-700"
                                                >
                                                    Add card
                                                </button>
                                            </div>
                                            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                                                <div className="rounded-[3px] border border-neutral-200 p-4">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <span className="text-sm font-semibold text-neutral-900">
                                                            {careersEditingCulture?.id ? 'Edit card' : 'New card'}
                                                        </span>
                                                        {careersEditingCulture?.id && (
                                                            <button
                                                                type="button"
                                                                onClick={() => setCareersEditingCulture(null)}
                                                                className="text-[11px] font-semibold text-neutral-600 hover:text-neutral-900"
                                                            >
                                                                Cancel
                                                            </button>
                                                        )}
                                                    </div>
                                                    <form onSubmit={submitCareersCulture} className="mt-4 space-y-4">
                                                        <div>
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Title
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={careersCultureForm.data.title}
                                                                onChange={(e) =>
                                                                    careersCultureForm.setData('title', e.target.value)
                                                                }
                                                                className="mt-1 w-full rounded border border-neutral-300 px-2 py-1.5 text-[11px]"
                                                            />
                                                            {careersCultureForm.errors.title && (
                                                                <p className="mt-1 text-[11px] text-red-600">
                                                                    {careersCultureForm.errors.title}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Description
                                                            </label>
                                                            <textarea
                                                                rows={4}
                                                                value={careersCultureForm.data.body}
                                                                onChange={(e) =>
                                                                    careersCultureForm.setData('body', e.target.value)
                                                                }
                                                                className="mt-1 w-full rounded border border-neutral-300 px-2 py-1.5 text-[11px]"
                                                            />
                                                            {careersCultureForm.errors.body && (
                                                                <p className="mt-1 text-[11px] text-red-600">
                                                                    {careersCultureForm.errors.body}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Image path (e.g. /lineup.jpg)
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={careersCultureForm.data.image_path}
                                                                onChange={(e) =>
                                                                    careersCultureForm.setData(
                                                                        'image_path',
                                                                        e.target.value,
                                                                    )
                                                                }
                                                                className="mt-1 w-full rounded border border-neutral-300 px-2 py-1.5 text-[11px]"
                                                                placeholder="/coordination.jpg"
                                                            />
                                                            <p className="mt-1 text-[10px] text-neutral-500">
                                                                Used when no new file is uploaded.
                                                            </p>
                                                            {careersCultureForm.errors.image_path && (
                                                                <p className="mt-1 text-[11px] text-red-600">
                                                                    {careersCultureForm.errors.image_path}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Upload image
                                                            </label>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) =>
                                                                    careersCultureForm.setData(
                                                                        'image_file',
                                                                        e.target.files?.[0] ?? null,
                                                                    )
                                                                }
                                                                className="mt-1 block w-full text-[11px] text-neutral-600"
                                                            />
                                                            {careersCultureForm.errors.image_file && (
                                                                <p className="mt-1 text-[11px] text-red-600">
                                                                    {careersCultureForm.errors.image_file}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="grid gap-4 sm:grid-cols-2">
                                                            <div>
                                                                <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                    Sort order
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    min={0}
                                                                    value={careersCultureForm.data.display_order}
                                                                    onChange={(e) =>
                                                                        careersCultureForm.setData(
                                                                            'display_order',
                                                                            Number(e.target.value),
                                                                        )
                                                                    }
                                                                    className="mt-1 w-full rounded border border-neutral-300 px-2 py-1.5 text-[11px]"
                                                                />
                                                            </div>
                                                            <div className="flex items-end pb-1">
                                                                <label className="inline-flex items-center gap-2 text-[11px] font-semibold text-neutral-700">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={careersCultureForm.data.is_active}
                                                                        onChange={(e) =>
                                                                            careersCultureForm.setData(
                                                                                'is_active',
                                                                                e.target.checked,
                                                                            )
                                                                        }
                                                                        className="rounded border-neutral-300 text-red-600"
                                                                    />
                                                                    Active (shown on site)
                                                                </label>
                                                            </div>
                                                        </div>
                                                        {careersCultureForm.progress && (
                                                            <p className="text-[10px] text-neutral-500">
                                                                Uploading… {careersCultureForm.progress.percentage}%
                                                            </p>
                                                        )}
                                                        <button
                                                            type="submit"
                                                            disabled={careersCultureForm.processing}
                                                            className="rounded-full bg-neutral-900 px-5 py-2 text-[10px] font-semibold uppercase tracking-widest text-white hover:bg-black disabled:opacity-60"
                                                        >
                                                            {careersCultureForm.processing
                                                                ? 'Saving...'
                                                                : careersEditingCulture?.id
                                                                ? 'Update card'
                                                                : 'Create card'}
                                                        </button>
                                                    </form>
                                                </div>
                                                <div className="rounded-[3px] border border-neutral-200 p-4">
                                                    <div className="text-[11px] font-semibold text-neutral-900">
                                                        Existing cards
                                                    </div>
                                                    <ul className="mt-3 divide-y divide-neutral-100">
                                                        {careersCultureCards.length === 0 && (
                                                            <li className="py-4 text-[11px] text-neutral-500">
                                                                No cards yet.
                                                            </li>
                                                        )}
                                                        {careersCultureCards.map((c) => (
                                                            <li
                                                                key={c.id}
                                                                className="flex flex-wrap items-center gap-3 py-3"
                                                            >
                                                                <div className="h-14 w-20 shrink-0 overflow-hidden rounded bg-neutral-100">
                                                                    {c.image_path ? (
                                                                        <img
                                                                            src={encodeURI(c.image_path)}
                                                                            alt=""
                                                                            className="h-full w-full object-cover"
                                                                        />
                                                                    ) : (
                                                                        <div className="flex h-full items-center justify-center text-[10px] text-neutral-400">
                                                                            No img
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="min-w-0 flex-1">
                                                                    <div className="truncate text-[11px] font-medium text-neutral-900">
                                                                        {c.title}
                                                                    </div>
                                                                    <div className="text-[10px] text-neutral-500">
                                                                        Order {c.display_order} ·{' '}
                                                                        {c.is_active ? 'active' : 'hidden'}
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-2">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setCareersEditingCulture(c)}
                                                                        className="text-[11px] font-semibold text-red-600 hover:text-red-800"
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => destroyCareersCulture(c.id)}
                                                                        className="text-[11px] font-semibold text-neutral-600 hover:text-neutral-900"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-[3px] border border-neutral-200 bg-white p-5 shadow-sm">
                                            <div className="flex flex-wrap items-start justify-between gap-4">
                                                <div>
                                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-700">
                                                        Job openings
                                                    </h4>
                                                    <p className="mt-2 text-xs text-neutral-500">
                                                        Roles listed under Available Positions on the public Careers page.
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setCareersEditingJob(null)}
                                                    className="rounded-full bg-red-600 px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-white hover:bg-red-700"
                                                >
                                                    Add job
                                                </button>
                                            </div>
                                            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                                                <div className="rounded-[3px] border border-neutral-200 p-4">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <span className="text-sm font-semibold text-neutral-900">
                                                            {careersEditingJob?.id ? 'Edit job' : 'New job'}
                                                        </span>
                                                        {careersEditingJob?.id && (
                                                            <button
                                                                type="button"
                                                                onClick={() => setCareersEditingJob(null)}
                                                                className="text-[11px] font-semibold text-neutral-600 hover:text-neutral-900"
                                                            >
                                                                Cancel
                                                            </button>
                                                        )}
                                                    </div>
                                                    <form onSubmit={submitCareersJob} className="mt-4 space-y-4">
                                                        <div>
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Job title
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={careersJobForm.data.title}
                                                                onChange={(e) =>
                                                                    careersJobForm.setData('title', e.target.value)
                                                                }
                                                                className="mt-1 w-full rounded border border-neutral-300 px-2 py-1.5 text-[11px]"
                                                            />
                                                            {careersJobForm.errors.title && (
                                                                <p className="mt-1 text-[11px] text-red-600">
                                                                    {careersJobForm.errors.title}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="grid gap-4 sm:grid-cols-2">
                                                            <div>
                                                                <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                    Employment type
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={careersJobForm.data.employment_type}
                                                                    onChange={(e) =>
                                                                        careersJobForm.setData(
                                                                            'employment_type',
                                                                            e.target.value,
                                                                        )
                                                                    }
                                                                    className="mt-1 w-full rounded border border-neutral-300 px-2 py-1.5 text-[11px]"
                                                                    placeholder="Full-time"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                    Location
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={careersJobForm.data.location}
                                                                    onChange={(e) =>
                                                                        careersJobForm.setData(
                                                                            'location',
                                                                            e.target.value,
                                                                        )
                                                                    }
                                                                    className="mt-1 w-full rounded border border-neutral-300 px-2 py-1.5 text-[11px]"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Summary
                                                            </label>
                                                            <textarea
                                                                rows={3}
                                                                value={careersJobForm.data.summary}
                                                                onChange={(e) =>
                                                                    careersJobForm.setData('summary', e.target.value)
                                                                }
                                                                className="mt-1 w-full rounded border border-neutral-300 px-2 py-1.5 text-[11px]"
                                                            />
                                                            {careersJobForm.errors.summary && (
                                                                <p className="mt-1 text-[11px] text-red-600">
                                                                    {careersJobForm.errors.summary}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Responsibilities
                                                            </label>
                                                            <div className="mt-2 space-y-2">
                                                                {(careersJobForm.data.responsibilities || []).map(
                                                                    (line, idx) => (
                                                                        <div key={idx} className="flex gap-2">
                                                                            <input
                                                                                type="text"
                                                                                value={line}
                                                                                onChange={(e) =>
                                                                                    setCareersResponsibility(
                                                                                        idx,
                                                                                        e.target.value,
                                                                                    )
                                                                                }
                                                                                className="min-w-0 flex-1 rounded border border-neutral-300 px-2 py-1.5 text-[11px]"
                                                                                placeholder={`Bullet ${idx + 1}`}
                                                                            />
                                                                            <button
                                                                                type="button"
                                                                                onClick={() =>
                                                                                    removeCareersResponsibility(idx)
                                                                                }
                                                                                className="shrink-0 rounded border border-neutral-300 px-2 text-[11px] text-neutral-600 hover:bg-neutral-50"
                                                                            >
                                                                                Remove
                                                                            </button>
                                                                        </div>
                                                                    ),
                                                                )}
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={addCareersResponsibility}
                                                                className="mt-2 text-[11px] font-semibold text-red-600 hover:text-red-800"
                                                            >
                                                                + Add bullet
                                                            </button>
                                                            {careersJobForm.errors.responsibilities && (
                                                                <p className="mt-1 text-[11px] text-red-600">
                                                                    {careersJobForm.errors.responsibilities}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="grid gap-4 sm:grid-cols-2">
                                                            <div>
                                                                <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                    Card icon
                                                                </label>
                                                                <select
                                                                    value={careersJobForm.data.icon_variant}
                                                                    onChange={(e) =>
                                                                        careersJobForm.setData(
                                                                            'icon_variant',
                                                                            Number(e.target.value),
                                                                        )
                                                                    }
                                                                    className="mt-1 w-full rounded border border-neutral-300 px-2 py-1.5 text-[11px]"
                                                                >
                                                                    {careersJobIconOptions.map((opt) => (
                                                                        <option key={opt.value} value={opt.value}>
                                                                            {opt.label}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                    Sort order
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    min={0}
                                                                    value={careersJobForm.data.display_order}
                                                                    onChange={(e) =>
                                                                        careersJobForm.setData(
                                                                            'display_order',
                                                                            Number(e.target.value),
                                                                        )
                                                                    }
                                                                    className="mt-1 w-full rounded border border-neutral-300 px-2 py-1.5 text-[11px]"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <label className="inline-flex items-center gap-2 text-[11px] font-semibold text-neutral-700">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={careersJobForm.data.is_active}
                                                                    onChange={(e) =>
                                                                        careersJobForm.setData(
                                                                            'is_active',
                                                                            e.target.checked,
                                                                        )
                                                                    }
                                                                    className="rounded border-neutral-300 text-red-600"
                                                                />
                                                                Active (shown on site)
                                                            </label>
                                                        </div>
                                                        <button
                                                            type="submit"
                                                            disabled={careersJobForm.processing}
                                                            className="rounded-full bg-neutral-900 px-5 py-2 text-[10px] font-semibold uppercase tracking-widest text-white hover:bg-black disabled:opacity-60"
                                                        >
                                                            {careersJobForm.processing
                                                                ? 'Saving...'
                                                                : careersEditingJob?.id
                                                                ? 'Update job'
                                                                : 'Create job'}
                                                        </button>
                                                    </form>
                                                </div>
                                                <div className="rounded-[3px] border border-neutral-200 p-4">
                                                    <div className="text-[11px] font-semibold text-neutral-900">
                                                        Existing openings
                                                    </div>
                                                    <ul className="mt-3 divide-y divide-neutral-100">
                                                        {careersJobs.length === 0 && (
                                                            <li className="py-4 text-[11px] text-neutral-500">
                                                                No jobs yet.
                                                            </li>
                                                        )}
                                                        {careersJobs.map((j) => (
                                                            <li
                                                                key={j.id}
                                                                className="flex flex-wrap items-start justify-between gap-3 py-4"
                                                            >
                                                                <div className="min-w-0 flex-1">
                                                                    <div className="text-[11px] font-medium text-neutral-900">
                                                                        {j.title}
                                                                    </div>
                                                                    <div className="text-[10px] text-neutral-500">
                                                                        {j.employment_type} · {j.location} · Icon{' '}
                                                                        {j.icon_variant} · Order {j.display_order} ·{' '}
                                                                        {j.is_active ? 'active' : 'hidden'}
                                                                    </div>
                                                                    <p className="mt-1 line-clamp-2 text-[10px] text-neutral-600">
                                                                        {j.summary}
                                                                    </p>
                                                                </div>
                                                                <div className="flex gap-2">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setCareersEditingJob(j)}
                                                                        className="text-[11px] font-semibold text-red-600 hover:text-red-800"
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => destroyCareersJob(j.id)}
                                                                        className="text-[11px] font-semibold text-neutral-600 hover:text-neutral-900"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                )}
                                {selectedCompany.name === 'SUNDIA' && (
                                    <section className="space-y-6 rounded-[3px] bg-neutral-50 p-5 shadow-sm">
                                        {/* Navbar logo */}
                                        <div className="rounded-[3px] border border-neutral-200 bg-white p-5">
                                            <form onSubmit={submitLogo} className="space-y-6">
                                                <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-700">
                                                    Navbar Logo
                                                </h4>
                                                <p className="mt-2 text-xs text-neutral-500">
                                                    Upload a new logo to be shown in the public navbar on all pages.
                                                </p>

                                                <div className="mt-4 flex items-center gap-6">
                                                    <div className="flex h-16 w-40 items-center justify-center rounded-md border border-dashed border-neutral-300 bg-white">
                                                        {sundia?.logo_path ? (
                                                            <img
                                                                src={sundia.logo_path}
                                                                alt="Current Sundia logo"
                                                                className="max-h-12 w-auto object-contain"
                                                            />
                                                        ) : (
                                                            <span className="text-[10px] text-neutral-400">
                                                                No logo set
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="flex flex-col gap-3">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) =>
                                                                logoForm.setData(
                                                                    'logo',
                                                                    e.target.files?.[0] ?? null
                                                                )
                                                            }
                                                            className="block w-60 text-[11px] text-neutral-700 file:mr-3 file:rounded-full file:border-0 file:bg-red-600 file:px-4 file:py-1.5 file:text-[11px] file:font-semibold file:uppercase file:tracking-widest file:text-white hover:file:bg-red-700"
                                                        />
                                                        {logoForm.errors.logo && (
                                                            <p className="text-[10px] text-red-600">
                                                                {logoForm.errors.logo}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                {flashLogoSuccess && (
                                                    <div className="rounded border border-green-200 bg-green-50 px-3 py-2 text-[11px] text-green-800">
                                                        {flashLogoSuccess}
                                                    </div>
                                                )}
                                                <div className="flex items-center justify-end pt-2">
                                                    <button
                                                        type="submit"
                                                        disabled={logoForm.processing}
                                                        className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-[11px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-black disabled:opacity-60"
                                                    >
                                                        {logoForm.processing ? 'Saving...' : 'Save logo'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>

                                        {/* Upcoming events (homepage hero) */}
                                        <div className="rounded-[3px] border border-neutral-200 bg-white p-5">
                                            <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-700">
                                                Upcoming events
                                            </h4>
                                            <p className="mt-2 text-xs text-neutral-500">
                                                Manage the rows in the glass &quot;UPCOMING EVENTS&quot; panel next to the hero on the
                                                public homepage. Inactive items are hidden on the site.
                                            </p>

                                            <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr),minmax(0,1fr)]">
                                                <div className="space-y-2">
                                                    {upcomingEventsFromDb.length === 0 ? (
                                                        <p className="text-[11px] text-neutral-500">
                                                            No events yet. Add one using the form.
                                                        </p>
                                                    ) : (
                                                        upcomingEventsFromDb
                                                            .slice()
                                                            .sort(
                                                                (a, b) =>
                                                                    (a.display_order ?? 0) - (b.display_order ?? 0)
                                                            )
                                                            .map((ev) => (
                                                                <div
                                                                    key={ev.id}
                                                                    className={`flex items-center justify-between gap-2 rounded border border-neutral-200 bg-neutral-50 px-3 py-2 ${ev.is_active === false ? 'opacity-60' : ''}`}
                                                                >
                                                                    <div className="min-w-0 flex-1">
                                                                        <p className="truncate text-[11px] font-bold uppercase text-neutral-900">
                                                                            {ev.title}
                                                                        </p>
                                                                        <p className="truncate text-[10px] text-neutral-600">
                                                                            {ev.location}
                                                                        </p>
                                                                        <p className="text-[10px] text-neutral-500">
                                                                            {ev.month_label} / {ev.day_label}
                                                                            {ev.is_active === false ? ' · inactive' : ''}
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex shrink-0 gap-1">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => setEditingUpcomingEvent(ev)}
                                                                            className="rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-neutral-800 ring-1 ring-neutral-200 hover:bg-neutral-50"
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => destroyUpcomingEvent(ev.id)}
                                                                            className="rounded-full bg-neutral-900 px-2 py-1 text-[10px] font-semibold text-white hover:bg-black"
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ))
                                                    )}
                                                </div>

                                                <form onSubmit={submitUpcomingEvent} className="space-y-3 rounded border border-neutral-200 bg-white p-4">
                                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                                        <div>
                                                            <div className="text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                {editingUpcomingEvent ? 'Edit event' : 'Add event'}
                                                            </div>
                                                        </div>
                                                        {flashUpcomingEventSuccess && (
                                                            <div className="rounded border border-green-200 bg-green-50 px-2 py-1 text-[10px] text-green-800">
                                                                {flashUpcomingEventSuccess}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Title
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={upcomingEventForm.data.title}
                                                            onChange={(e) =>
                                                                upcomingEventForm.setData('title', e.target.value)
                                                            }
                                                            className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                            placeholder="SUNDIA COMPANY OUTING"
                                                        />
                                                        {upcomingEventForm.errors.title && (
                                                            <p className="text-[10px] text-red-600">
                                                                {upcomingEventForm.errors.title}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Location
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={upcomingEventForm.data.location}
                                                            onChange={(e) =>
                                                                upcomingEventForm.setData('location', e.target.value)
                                                            }
                                                            className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                            placeholder="Lobo Batangas"
                                                        />
                                                        {upcomingEventForm.errors.location && (
                                                            <p className="text-[10px] text-red-600">
                                                                {upcomingEventForm.errors.location}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="grid gap-3 sm:grid-cols-2">
                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Month
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={upcomingEventForm.data.month_label}
                                                                onChange={(e) =>
                                                                    upcomingEventForm.setData(
                                                                        'month_label',
                                                                        e.target.value.toUpperCase()
                                                                    )
                                                                }
                                                                className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                placeholder="MAR"
                                                                maxLength={12}
                                                            />
                                                            {upcomingEventForm.errors.month_label && (
                                                                <p className="text-[10px] text-red-600">
                                                                    {upcomingEventForm.errors.month_label}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Day
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={upcomingEventForm.data.day_label}
                                                                onChange={(e) =>
                                                                    upcomingEventForm.setData('day_label', e.target.value)
                                                                }
                                                                className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                placeholder="30"
                                                                maxLength={8}
                                                            />
                                                            {upcomingEventForm.errors.day_label && (
                                                                <p className="text-[10px] text-red-600">
                                                                    {upcomingEventForm.errors.day_label}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="grid gap-3 sm:grid-cols-2">
                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Order
                                                            </label>
                                                            <input
                                                                type="number"
                                                                min={0}
                                                                value={upcomingEventForm.data.display_order}
                                                                onChange={(e) =>
                                                                    upcomingEventForm.setData(
                                                                        'display_order',
                                                                        Number(e.target.value)
                                                                    )
                                                                }
                                                                className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                            />
                                                            {upcomingEventForm.errors.display_order && (
                                                                <p className="text-[10px] text-red-600">
                                                                    {upcomingEventForm.errors.display_order}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Status
                                                            </label>
                                                            <label className="inline-flex items-center gap-2 text-[11px] text-neutral-700">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={!!upcomingEventForm.data.is_active}
                                                                    onChange={(e) =>
                                                                        upcomingEventForm.setData(
                                                                            'is_active',
                                                                            e.target.checked
                                                                        )
                                                                    }
                                                                    className="h-4 w-4 rounded border-neutral-300 text-red-600 focus:ring-red-500"
                                                                />
                                                                Active (show on site)
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between gap-2 pt-1">
                                                        <button
                                                            type="button"
                                                            onClick={() => setEditingUpcomingEvent(null)}
                                                            className="text-[11px] font-semibold text-neutral-600 hover:text-neutral-900"
                                                        >
                                                            Clear
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            disabled={upcomingEventForm.processing}
                                                            className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-[11px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-black disabled:opacity-60"
                                                        >
                                                            {upcomingEventForm.processing
                                                                ? 'Saving...'
                                                                : editingUpcomingEvent
                                                                  ? 'Save event'
                                                                  : 'Add event'}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                        {/* "What we do" stats */}
                                        <div className="rounded-[3px] border border-neutral-200 bg-white p-5">
                                            <form onSubmit={submitStats} className="space-y-6">
                                                <div>
                                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-700">
                                                        "What we do" stats
                                                    </h4>
                                                    <p className="mt-2 text-xs text-neutral-500">
                                                        Manage the heading and numbers shown in the public "WHAT WE DO" card
                                                        on the homepage.
                                                    </p>

                                                    <div className="mt-4 grid gap-4 md:grid-cols-[1.2fr,2fr]">
                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Title lines
                                                            </label>
                                                            <div className="space-y-2">
                                                                <input
                                                                    type="text"
                                                                    value={statsForm.data.stats_title_line1}
                                                                    onChange={(e) =>
                                                                        statsForm.setData(
                                                                            'stats_title_line1',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={statsForm.data.stats_title_line2}
                                                                    onChange={(e) =>
                                                                        statsForm.setData(
                                                                            'stats_title_line2',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={statsForm.data.stats_title_line3}
                                                                    onChange={(e) =>
                                                                        statsForm.setData(
                                                                            'stats_title_line3',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Stat items
                                                            </label>
                                                            <div className="grid gap-2 md:grid-cols-2">
                                                                {statsForm.data.stats_items.map((item, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className="rounded border border-neutral-200 bg-white p-2"
                                                                    >
                                                                        <input
                                                                            type="text"
                                                                            value={item.value}
                                                                            onChange={(e) => {
                                                                                const next = [
                                                                                    ...statsForm.data.stats_items,
                                                                                ];
                                                                                next[index] = {
                                                                                    ...next[index],
                                                                                    value: e.target.value,
                                                                                };
                                                                                statsForm.setData('stats_items', next);
                                                                            }}
                                                                            className="mb-1 w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                            placeholder="25+"
                                                                        />
                                                                        <input
                                                                            type="text"
                                                                            value={item.label}
                                                                            onChange={(e) => {
                                                                                const next = [
                                                                                    ...statsForm.data.stats_items,
                                                                                ];
                                                                                next[index] = {
                                                                                    ...next[index],
                                                                                    label: e.target.value,
                                                                                };
                                                                                statsForm.setData('stats_items', next);
                                                                            }}
                                                                            className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                            placeholder="Years Experience"
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-end pt-2">
                                                    <button
                                                        type="submit"
                                                        disabled={statsForm.processing}
                                                        className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-[11px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-black disabled:opacity-60"
                                                    >
                                                        {statsForm.processing ? 'Saving...' : 'Save stats'}
                                                    </button>
                                                </div>
                                                {flashStatsSuccess && (
                                                    <div className="rounded border border-green-200 bg-green-50 px-3 py-2 text-[11px] text-green-800">
                                                        {flashStatsSuccess}
                                                    </div>
                                                )}
                                            </form>
                                        </div>

                                        {/* Homepage video settings */}
                                        <div className="rounded-[3px] border border-neutral-200 bg-white p-5">
                                            <form onSubmit={submitVideo} className="space-y-6">
                                                <div>
                                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-700">
                                                        Homepage video
                                                    </h4>
                                                    <p className="mt-2 text-xs text-neutral-500">
                                                        Configure the video shown in the homepage video section.
                                                    </p>

                                                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                                                        <div className="space-y-3">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Video title (optional)
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={videoForm.data.video_title}
                                                                onChange={(e) =>
                                                                    videoForm.setData('video_title', e.target.value)
                                                                }
                                                                className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                placeholder="Sundia Group Company Video"
                                                            />

                                                            <label className="mt-4 block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Upload video file (recommended)
                                                            </label>
                                                            <input
                                                                type="file"
                                                                accept="video/*"
                                                                onChange={(e) =>
                                                                    videoForm.setData(
                                                                        'video_file',
                                                                        e.target.files?.[0] ?? null
                                                                    )
                                                                }
                                                                className="block w-full text-[11px] text-neutral-700 file:mr-3 file:rounded-full file:border-0 file:bg-red-600 file:px-4 file:py-1.5 file:text-[11px] file:font-semibold file:uppercase file:tracking-widest file:text-white hover:file:bg-red-700"
                                                            />
                                                            <p className="mt-1 text-[10px] text-neutral-500">
                                                                Leave empty to keep the current video. Max size depends on your server limits.
                                                            </p>

                                                            <label className="mt-4 block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Or set video URL (YouTube/Vimeo/direct mp4)
                                                            </label>
                                                            <input
                                                                type="url"
                                                                value={videoForm.data.video_url}
                                                                onChange={(e) =>
                                                                    videoForm.setData('video_url', e.target.value)
                                                                }
                                                                className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                placeholder="https://www.youtube.com/watch?v=..."
                                                            />

                                                            <label className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={videoForm.data.video_active}
                                                                    onChange={(e) =>
                                                                        videoForm.setData(
                                                                            'video_active',
                                                                            e.target.checked
                                                                        )
                                                                    }
                                                                    className="h-3 w-3 rounded border-neutral-300"
                                                                />
                                                                <span>Video active</span>
                                                            </label>
                                                        </div>

                                                        <div className="space-y-3">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Upload thumbnail image (optional)
                                                            </label>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) =>
                                                                    videoForm.setData(
                                                                        'video_thumbnail_file',
                                                                        e.target.files?.[0] ?? null
                                                                    )
                                                                }
                                                                className="block w-full text-[11px] text-neutral-700 file:mr-3 file:rounded-full file:border-0 file:bg-red-600 file:px-4 file:py-1.5 file:text-[11px] file:font-semibold file:uppercase file:tracking-widest file:text-white hover:file:bg-red-700"
                                                            />

                                                            {(thumbFilePreviewUrl || videoForm.data.video_thumbnail) && (
                                                                <div className="mt-3 flex items-center gap-3">
                                                                    <div className="h-16 w-28 overflow-hidden rounded border border-neutral-200 bg-white">
                                                                        <img
                                                                            src={thumbFilePreviewUrl || videoForm.data.video_thumbnail}
                                                                            alt="Video thumbnail preview"
                                                                            className="h-full w-full object-cover"
                                                                        />
                                                                    </div>
                                                                    <p className="text-[10px] text-neutral-500">
                                                                        This thumbnail will be used as the poster image for the
                                                                        homepage video.
                                                                    </p>
                                                                </div>
                                                            )}

                                                            <div className="mt-4 rounded border border-neutral-200 bg-neutral-50 p-3">
                                                                <div className="text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                    Preview
                                                                </div>
                                                                <div className="mt-2 overflow-hidden rounded bg-black">
                                                                    {videoFilePreviewUrl ? (
                                                                        <video
                                                                            src={videoFilePreviewUrl}
                                                                            controls
                                                                            className="aspect-video w-full"
                                                                        />
                                                                    ) : (videoForm.data.video_url || sundiaContent?.video?.url) ? (
                                                                        <div className="aspect-video w-full flex items-center justify-center text-[11px] text-white/80 px-4 text-center">
                                                                            URL/video will display on the homepage after saving.
                                                                        </div>
                                                                    ) : (
                                                                        <div className="aspect-video w-full flex items-center justify-center text-[11px] text-white/70">
                                                                            No video selected
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {videoForm.progress && (
                                                                    <div className="mt-3">
                                                                        <div className="flex items-center justify-between text-[10px] text-neutral-600">
                                                                            <span>Uploading video…</span>
                                                                            <span>{videoForm.progress.percentage}%</span>
                                                                        </div>
                                                                        <div className="mt-2 h-2 w-full overflow-hidden rounded bg-neutral-200">
                                                                            <div
                                                                                className="h-full bg-red-600 transition-all"
                                                                                style={{ width: `${videoForm.progress.percentage}%` }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {flashVideoSuccess && (
                                                                    <div className="mt-3 rounded border border-green-200 bg-green-50 px-3 py-2 text-[11px] text-green-800">
                                                                        {flashVideoSuccess}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-end pt-2">
                                                    <button
                                                        type="submit"
                                                        disabled={videoForm.processing}
                                                        className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-[11px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-black disabled:opacity-60"
                                                    >
                                                        {videoForm.processing ? 'Uploading / Saving…' : 'Save video'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>

                                        {/* Mission & Vision */}
                                        <div className="rounded-[3px] border border-neutral-200 bg-white p-5">
                                            <form
                                                onSubmit={submitMissionVision}
                                                className="space-y-6"
                                            >
                                                <div>
                                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-700">
                                                        Mission &amp; Vision
                                                    </h4>
                                                    <p className="mt-2 text-xs text-neutral-500">
                                                        Manage the Mission and Vision text displayed on the public homepage.
                                                    </p>
                                                </div>

                                                <div className="grid gap-4 md:grid-cols-2">
                                                    <div className="space-y-2">
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Mission text
                                                        </label>
                                                        <textarea
                                                            value={
                                                                missionVisionForm
                                                                    .data
                                                                    .mission_text
                                                            }
                                                            onChange={(e) =>
                                                                missionVisionForm.setData(
                                                                    'mission_text',
                                                                    e.target.value
                                                                )
                                                            }
                                                            rows={8}
                                                            className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                            placeholder="Enter mission text…"
                                                        />
                                                        {missionVisionForm.errors
                                                            .mission_text && (
                                                            <p className="text-[10px] text-red-600">
                                                                {
                                                                    missionVisionForm
                                                                        .errors
                                                                        .mission_text
                                                                }
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Vision text
                                                        </label>
                                                        <textarea
                                                            value={
                                                                missionVisionForm
                                                                    .data
                                                                    .vision_text
                                                            }
                                                            onChange={(e) =>
                                                                missionVisionForm.setData(
                                                                    'vision_text',
                                                                    e.target.value
                                                                )
                                                            }
                                                            rows={8}
                                                            className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                            placeholder="Enter vision text…"
                                                        />
                                                        {missionVisionForm.errors
                                                            .vision_text && (
                                                            <p className="text-[10px] text-red-600">
                                                                {
                                                                    missionVisionForm
                                                                        .errors
                                                                        .vision_text
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-end pt-2">
                                                    <button
                                                        type="submit"
                                                        disabled={
                                                            missionVisionForm.processing
                                                        }
                                                        className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-[11px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-black disabled:opacity-60"
                                                    >
                                                        {missionVisionForm.processing
                                                            ? 'Saving...'
                                                            : 'Save Mission & Vision'}
                                                    </button>
                                                </div>

                                                {flashMissionVisionSuccess && (
                                                    <div className="rounded border border-green-200 bg-green-50 px-3 py-2 text-[11px] text-green-800">
                                                        {flashMissionVisionSuccess}
                                                    </div>
                                                )}
                                            </form>
                                        </div>
                                    </section>
                                )}

                                {/* Subsidiaries admin CRUD (inline) */}
                                {selectedCompany.name === 'SUNDIA' && (
                                    <section className="rounded-[3px] bg-neutral-50 p-5 shadow-sm">
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-700">
                                                    Subsidiaries
                                                </h4>
                                                <p className="mt-2 text-xs text-neutral-500 max-w-xl">
                                                    Manage the subsidiaries shown in the public homepage grid. Active subsidiaries are displayed in order from left to right.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1.4fr)]">
                                            <div className="overflow-x-auto rounded-[3px] border border-neutral-200 bg-white p-4">
                                                {previewSubsidiaries.length === 0 ? (
                                                    <div className="rounded border border-dashed border-neutral-300 bg-neutral-50 px-4 py-6 text-center text-[11px] text-neutral-500">
                                                        No subsidiaries yet. Use the form on the right to create one.
                                                    </div>
                                                ) : (
                                                    <div className="flex gap-4 pb-2">
                                                        {previewSubsidiaries.map((sub, index) => {
                                                            const isDark = sub.display_style === 'dark';
                                                            return (
                                                                <div
                                                                    key={sub.id ?? `preview-${index}`}
                                                                    className={`relative w-[260px] flex-shrink-0 overflow-hidden rounded-[3px] shadow-md ring-1 ring-black/5 ${
                                                                        isDark ? 'text-white' : 'bg-white text-black'
                                                                    }`}
                                                                >
                                                                    {isDark && (
                                                                        <div className="absolute inset-0">
                                                                            {sub.background_path ? (
                                                                                <img
                                                                                    src={sub.background_path}
                                                                                    alt={sub.name}
                                                                                    className="h-full w-full object-cover"
                                                                                />
                                                                            ) : (
                                                                                <div className="h-full w-full bg-neutral-900" />
                                                                            )}
                                                                            <div className="absolute inset-0 bg-gradient-to-bl from-zinc-500/0 to-black/90 opacity-100" />
                                                                        </div>
                                                                    )}

                                                                    <div className="relative z-10 flex h-full flex-col p-4">
                                                                        <div className="flex items-center justify-between gap-2 text-[10px]">
                                                                            <span className="rounded-full bg-white/70 px-2 py-0.5 font-semibold text-neutral-700">
                                                                                #{sub.display_order ?? 0}
                                                                            </span>
                                                                            <span
                                                                                className={`inline-flex rounded-full px-2 py-0.5 font-semibold ${
                                                                                    sub.is_active
                                                                                        ? 'bg-green-100 text-green-800'
                                                                                        : 'bg-neutral-100 text-neutral-600'
                                                                                }`}
                                                                            >
                                                                                {sub.is_active ? 'Active' : 'Inactive'}
                                                                            </span>
                                                                        </div>

                                                                        <div className="mt-4 flex h-12 items-center justify-center">
                                                                            {sub.logo_path ? (
                                                                                <img
                                                                                    src={sub.logo_path}
                                                                                    alt={sub.name}
                                                                                    className={`max-h-8 w-auto object-contain ${
                                                                                        isDark ? 'brightness-0 invert' : ''
                                                                                    }`}
                                                                                />
                                                                            ) : (
                                                                                <span className="text-[10px] text-neutral-400">
                                                                                    No logo
                                                                                </span>
                                                                            )}
                                                                        </div>

                                                                        <h5
                                                                            className={`mt-4 text-[11px] font-extrabold uppercase tracking-widest ${
                                                                                isDark ? 'text-white' : 'text-neutral-700'
                                                                            }`}
                                                                        >
                                                                            {sub.name}
                                                                        </h5>
                                                                        <p
                                                                            className={`mt-2 line-clamp-3 text-[11px] leading-snug ${
                                                                                isDark
                                                                                    ? 'text-white/90'
                                                                                    : 'text-neutral-600'
                                                                            }`}
                                                                        >
                                                                            {sub.description || 'No description yet.'}
                                                                        </p>

                                                                        <div className="mt-4 flex items-center justify-between gap-2 text-[10px]">
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => startEditSubsidiary(sub)}
                                                                                className="rounded-full bg-white/80 px-3 py-1 font-semibold text-neutral-800 hover:bg-white"
                                                                            >
                                                                                Edit
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => destroySubsidiary(sub.id)}
                                                                                className="rounded-full bg-neutral-900/80 px-3 py-1 font-semibold text-white hover:bg-neutral-900"
                                                                            >
                                                                                Delete
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-3 rounded-[3px] border border-neutral-200 bg-white p-4">
                                                <form onSubmit={submitSubsidiary} className="space-y-4">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <div>
                                                            <div className="text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                {editingSubsidiary ? 'Edit subsidiary' : 'Add subsidiary'}
                                                            </div>
                                                            <p className="mt-1 text-[10px] text-neutral-500">
                                                                Upload logo/background, set style, order, and status.
                                                            </p>
                                                        </div>
                                                        {flashSubsidiarySuccess && (
                                                            <div className="rounded border border-green-200 bg-green-50 px-3 py-1 text-[10px] text-green-800">
                                                                {flashSubsidiarySuccess}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={subsidiaryForm.data.name}
                                                            onChange={(e) =>
                                                                subsidiaryForm.setData('name', e.target.value)
                                                            }
                                                            className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                            placeholder="SD TRADING C."
                                                        />
                                                        {subsidiaryForm.errors.name && (
                                                            <p className="text-[10px] text-red-600">
                                                                {subsidiaryForm.errors.name}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Description
                                                        </label>
                                                        <textarea
                                                            value={subsidiaryForm.data.description}
                                                            onChange={(e) =>
                                                                subsidiaryForm.setData('description', e.target.value)
                                                            }
                                                            rows={4}
                                                            className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                            placeholder="Short description shown on the card."
                                                        />
                                                        {subsidiaryForm.errors.description && (
                                                            <p className="text-[10px] text-red-600">
                                                                {subsidiaryForm.errors.description}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="grid gap-3 sm:grid-cols-2">
                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Style
                                                            </label>
                                                            <div className="inline-flex overflow-hidden rounded-full border border-neutral-300 bg-white">
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        subsidiaryForm.setData('display_style', 'light')
                                                                    }
                                                                    className={`px-3 py-1 text-[11px] font-semibold ${
                                                                        subsidiaryForm.data.display_style === 'light'
                                                                            ? 'bg-neutral-900 text-white'
                                                                            : 'text-neutral-700 hover:bg-neutral-50'
                                                                    }`}
                                                                >
                                                                    Light
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        subsidiaryForm.setData('display_style', 'dark')
                                                                    }
                                                                    className={`px-3 py-1 text-[11px] font-semibold ${
                                                                        subsidiaryForm.data.display_style === 'dark'
                                                                            ? 'bg-neutral-900 text-white'
                                                                            : 'text-neutral-700 hover:bg-neutral-50'
                                                                    }`}
                                                                >
                                                                    Dark
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Order
                                                            </label>
                                                            <input
                                                                type="number"
                                                                min={0}
                                                                value={subsidiaryForm.data.display_order}
                                                                onChange={(e) =>
                                                                    subsidiaryForm.setData(
                                                                        'display_order',
                                                                        Number(e.target.value),
                                                                    )
                                                                }
                                                                className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                            />
                                                            {subsidiaryForm.errors.display_order && (
                                                                <p className="text-[10px] text-red-600">
                                                                    {subsidiaryForm.errors.display_order}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <label className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                        <input
                                                            type="checkbox"
                                                            checked={!!subsidiaryForm.data.is_active}
                                                            onChange={(e) =>
                                                                subsidiaryForm.setData('is_active', e.target.checked)
                                                            }
                                                            className="h-3 w-3 rounded border-neutral-300"
                                                        />
                                                        Active
                                                    </label>

                                                    <div className="grid gap-3 sm:grid-cols-2">
                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Logo
                                                            </label>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) =>
                                                                    subsidiaryForm.setData(
                                                                        'logo_file',
                                                                        e.target.files?.[0] ?? null,
                                                                    )
                                                                }
                                                                className="block w-full text-[11px] text-neutral-700 file:mr-3 file:rounded-full file:border-0 file:bg-red-600 file:px-4 file:py-1.5 file:text-[11px] file:font-semibold file:uppercase file:tracking-widest file:text-white hover:file:bg-red-700"
                                                            />
                                                            {subsidiaryForm.errors.logo_file && (
                                                                <p className="text-[10px] text-red-600">
                                                                    {subsidiaryForm.errors.logo_file}
                                                                </p>
                                                            )}
                                                            <div className="mt-2 flex items-center gap-2">
                                                                <div className="h-12 w-20 overflow-hidden rounded border border-neutral-200 bg-neutral-50">
                                                                    {(subsidiaryLogoPreview ||
                                                                        subsidiaryForm.data.logo_path) && (
                                                                        <img
                                                                            src={
                                                                                subsidiaryLogoPreview ||
                                                                                subsidiaryForm.data.logo_path
                                                                            }
                                                                            alt="Logo preview"
                                                                            className="h-full w-full object-contain bg-white"
                                                                        />
                                                                    )}
                                                                </div>
                                                                <span className="text-[10px] text-neutral-500">
                                                                    Shown at the top of the card.
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Background (dark)
                                                            </label>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) =>
                                                                    subsidiaryForm.setData(
                                                                        'background_file',
                                                                        e.target.files?.[0] ?? null,
                                                                    )
                                                                }
                                                                className="block w-full text-[11px] text-neutral-700 file:mr-3 file:rounded-full file:border-0 file:bg-red-600 file:px-4 file:py-1.5 file:text-[11px] file:font-semibold file:uppercase file:tracking-widest file:text-white hover:file:bg-red-700"
                                                            />
                                                            {subsidiaryForm.errors.background_file && (
                                                                <p className="text-[10px] text-red-600">
                                                                    {subsidiaryForm.errors.background_file}
                                                                </p>
                                                            )}
                                                            <div className="mt-2 flex items-center gap-2">
                                                                <div className="h-12 w-20 overflow-hidden rounded border border-neutral-200 bg-neutral-50">
                                                                    {(subsidiaryBgPreview ||
                                                                        subsidiaryForm.data.background_path) && (
                                                                        <img
                                                                            src={
                                                                                subsidiaryBgPreview ||
                                                                                subsidiaryForm.data.background_path
                                                                            }
                                                                            alt="Background preview"
                                                                            className="h-full w-full object-cover"
                                                                        />
                                                                    )}
                                                                </div>
                                                                <span className="text-[10px] text-neutral-500">
                                                                    Used only for dark cards.
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {subsidiaryForm.progress && (
                                                        <div className="mt-1">
                                                            <div className="flex items-center justify-between text-[10px] text-neutral-600">
                                                                <span>Uploading…</span>
                                                                <span>{subsidiaryForm.progress.percentage}%</span>
                                                            </div>
                                                            <div className="mt-1 h-2 w-full overflow-hidden rounded bg-neutral-200">
                                                                <div
                                                                    className="h-full bg-red-600 transition-all"
                                                                    style={{
                                                                        width: `${subsidiaryForm.progress.percentage}%`,
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="flex items-center justify-end gap-2 pt-2">
                                                        {editingSubsidiary && (
                                                            <button
                                                                type="button"
                                                                onClick={startCreateSubsidiary}
                                                                className="rounded-full border border-neutral-300 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-neutral-600 hover:bg-neutral-50"
                                                            >
                                                                Cancel edit
                                                            </button>
                                                        )}
                                                        <button
                                                            type="submit"
                                                            disabled={subsidiaryForm.processing}
                                                            className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-[11px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-black disabled:opacity-60"
                                                        >
                                                            {subsidiaryForm.processing
                                                                ? 'Saving…'
                                                                : editingSubsidiary
                                                                ? 'Save changes'
                                                                : 'Create new subsidiary'}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </section>
                                )}

                                {/* Team Members admin CRUD (inline) */}
                                {selectedCompany.name === 'SUNDIA' && (
                                    <section className="rounded-[3px] bg-neutral-50 p-5 shadow-sm">
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-700">
                                                    Meet the Team
                                                </h4>
                                                <p className="mt-2 text-xs text-neutral-500 max-w-xl">
                                                    Manage the team members shown on the public homepage. Active members are displayed in order.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1.4fr)]">
                                            <div className="overflow-x-auto rounded-[3px] border border-neutral-200 bg-white p-4">
                                                {previewTeamMembers.length === 0 ? (
                                                    <div className="rounded border border-dashed border-neutral-300 bg-neutral-50 px-4 py-6 text-center text-[11px] text-neutral-500">
                                                        No team members yet. Use the form on the right to create one.
                                                    </div>
                                                ) : (
                                                    <div className="flex gap-4 pb-2">
                                                        {previewTeamMembers.map((m, idx) => (
                                                            <div key={m.id ?? `tm-${idx}`} className="flex-shrink-0">
                                                                <TeamMemberCardPreview
                                                                    member={m}
                                                                    mode="admin"
                                                                    onEdit={(member) => setEditingTeamMember(member)}
                                                                />

                                                                {m.id && (
                                                                    <div className="mt-3 flex items-center justify-between gap-2 text-[10px]">
                                                                        <span className="rounded-full bg-neutral-100 px-2 py-0.5 font-semibold text-neutral-700">
                                                                            #{m.display_order ?? 0}
                                                                        </span>
                                                                        <div className="flex items-center gap-2">
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => setEditingTeamMember(m)}
                                                                                className="rounded-full bg-white px-3 py-1 font-semibold text-neutral-800 ring-1 ring-neutral-200 hover:bg-neutral-50"
                                                                            >
                                                                                Edit
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => destroyTeamMember(m.id)}
                                                                                className="rounded-full bg-neutral-900 px-3 py-1 font-semibold text-white hover:bg-black"
                                                                            >
                                                                                Delete
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-3 rounded-[3px] border border-neutral-200 bg-white p-4">
                                                <form onSubmit={submitTeamMember} className="space-y-4">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <div>
                                                            <div className="text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                {editingTeamMember ? 'Edit member' : 'Add member'}
                                                            </div>
                                                            <p className="mt-1 text-[10px] text-neutral-500">
                                                                Upload photo, set logo/company, order and status.
                                                            </p>
                                                        </div>

                                                        {flashTeamMemberSuccess && (
                                                            <div className="rounded border border-green-200 bg-green-50 px-3 py-1 text-[10px] text-green-800">
                                                                {flashTeamMemberSuccess}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={teamMemberForm.data.name}
                                                            onChange={(e) => teamMemberForm.setData('name', e.target.value)}
                                                            className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                            placeholder="MR. JUAN DELA CRUZ"
                                                        />
                                                        {teamMemberForm.errors.name && (
                                                            <p className="text-[10px] text-red-600">
                                                                {teamMemberForm.errors.name}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Position / Title
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={teamMemberForm.data.title}
                                                            onChange={(e) => teamMemberForm.setData('title', e.target.value)}
                                                            className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                            placeholder="PRESIDENT"
                                                        />
                                                        {teamMemberForm.errors.title && (
                                                            <p className="text-[10px] text-red-600">
                                                                {teamMemberForm.errors.title}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="grid gap-3 sm:grid-cols-2">
                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Company
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={teamMemberForm.data.company}
                                                                onChange={(e) => teamMemberForm.setData('company', e.target.value)}
                                                                className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                                placeholder="SUNDIA"
                                                            />
                                                            {teamMemberForm.errors.company && (
                                                                <p className="text-[10px] text-red-600">
                                                                    {teamMemberForm.errors.company}
                                                                </p>
                                                            )}
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Company Logo
                                                            </label>
                                                            <select
                                                                value={teamMemberForm.data.company_logo || ''}
                                                                onChange={(e) =>
                                                                    teamMemberForm.setData('company_logo', e.target.value)
                                                                }
                                                                className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                            >
                                                                <option value="">Select logo</option>
                                                                <option value="sundia">Sundia</option>
                                                                <option value="tpsmi">TPSMI</option>
                                                                <option value="top">Top Offroad</option>
                                                            </select>
                                                            {teamMemberForm.errors.company_logo && (
                                                                <p className="text-[10px] text-red-600">
                                                                    {teamMemberForm.errors.company_logo}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Profile image
                                                        </label>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) =>
                                                                teamMemberForm.setData(
                                                                    'profile_image_file',
                                                                    e.target.files?.[0] ?? null,
                                                                )
                                                            }
                                                            className="w-full text-[11px] file:mr-3 file:rounded-full file:border-0 file:bg-red-600 file:px-4 file:py-1 file:text-[11px] file:font-semibold file:text-white hover:file:bg-red-700"
                                                        />
                                                        {teamMemberForm.errors.profile_image_file && (
                                                            <p className="text-[10px] text-red-600">
                                                                {teamMemberForm.errors.profile_image_file}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="grid gap-3 sm:grid-cols-2">
                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Order
                                                            </label>
                                                            <input
                                                                type="number"
                                                                min={0}
                                                                value={teamMemberForm.data.display_order}
                                                                onChange={(e) =>
                                                                    teamMemberForm.setData(
                                                                        'display_order',
                                                                        Number(e.target.value),
                                                                    )
                                                                }
                                                                className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                            />
                                                            {teamMemberForm.errors.display_order && (
                                                                <p className="text-[10px] text-red-600">
                                                                    {teamMemberForm.errors.display_order}
                                                                </p>
                                                            )}
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Status
                                                            </label>
                                                            <label className="inline-flex items-center gap-2 text-[11px] text-neutral-700">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={!!teamMemberForm.data.is_active}
                                                                    onChange={(e) =>
                                                                        teamMemberForm.setData('is_active', e.target.checked)
                                                                    }
                                                                    className="h-4 w-4 rounded border-neutral-300 text-red-600 focus:ring-red-500"
                                                                />
                                                                Active
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between gap-2 pt-1">
                                                        <button
                                                            type="button"
                                                            onClick={() => setEditingTeamMember(null)}
                                                            className="text-[11px] font-semibold text-neutral-600 hover:text-neutral-900"
                                                        >
                                                            Clear
                                                        </button>

                                                        <button
                                                            type="submit"
                                                            disabled={teamMemberForm.processing}
                                                            className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-[11px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-black disabled:opacity-60"
                                                        >
                                                            {teamMemberForm.processing
                                                                ? 'Saving...'
                                                                : editingTeamMember
                                                                  ? 'Save Member'
                                                                  : 'Add Member'}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </section>
                                )}

                                {/* Trusted Companies admin CRUD (inline) */}
                                {selectedCompany.name === 'SUNDIA' && (
                                    <section className="rounded-[3px] bg-neutral-50 p-5 shadow-sm">
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-700">
                                                    Trusted Companies
                                                </h4>
                                                <p className="mt-2 text-xs text-neutral-500 max-w-xl">
                                                    Manage the logos shown on the public “Sundia Trusted Companies” section. Active companies are displayed in order.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1.4fr)]">
                                            <div className="overflow-x-auto rounded-[3px] border border-neutral-200 bg-white p-4">
                                                {previewTrustedCompanies.length === 0 ? (
                                                    <div className="rounded border border-dashed border-neutral-300 bg-neutral-50 px-4 py-6 text-center text-[11px] text-neutral-500">
                                                        No trusted companies yet. Use the form on the right to create one.
                                                    </div>
                                                ) : (
                                                    <div className="flex gap-4 pb-2">
                                                        {previewTrustedCompanies.map((c, idx) => (
                                                            <div
                                                                key={c.id ?? `tc-${idx}`}
                                                                className="flex w-56 flex-shrink-0 flex-col rounded-[3px] border border-neutral-200 bg-white p-3"
                                                            >
                                                                <div className="flex h-20 items-center justify-center rounded bg-black">
                                                                    {c.logo_path ? (
                                                                        <img
                                                                            src={c.logo_path}
                                                                            alt={c.name}
                                                                            className="max-h-14 w-auto object-contain"
                                                                        />
                                                                    ) : (
                                                                        <div className="text-[10px] text-white/70">No logo</div>
                                                                    )}
                                                                </div>
                                                                <div className="mt-3 flex items-start justify-between gap-2">
                                                                    <div className="min-w-0">
                                                                        <div className="truncate text-[11px] font-semibold text-neutral-800">
                                                                            {c.name}
                                                                        </div>
                                                                        <div className="mt-1 text-[10px] text-neutral-500">
                                                                            #{c.display_order ?? 0} · {c.is_active ? 'Active' : 'Inactive'}
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {c.id && (
                                                                    <div className="mt-3 flex items-center justify-between gap-2 text-[10px]">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => setEditingTrustedCompany(c)}
                                                                            className="rounded-full bg-white px-3 py-1 font-semibold text-neutral-800 ring-1 ring-neutral-200 hover:bg-neutral-50"
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => destroyTrustedCompany(c.id)}
                                                                            className="rounded-full bg-neutral-900 px-3 py-1 font-semibold text-white hover:bg-black"
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-3 rounded-[3px] border border-neutral-200 bg-white p-4">
                                                <form onSubmit={submitTrustedCompany} className="space-y-4">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <div>
                                                            <div className="text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                {editingTrustedCompany ? 'Edit company' : 'Add company'}
                                                            </div>
                                                            <p className="mt-1 text-[10px] text-neutral-500">
                                                                Upload logo, set order and status.
                                                            </p>
                                                        </div>

                                                        {flashTrustedCompanySuccess && (
                                                            <div className="rounded border border-green-200 bg-green-50 px-3 py-1 text-[10px] text-green-800">
                                                                {flashTrustedCompanySuccess}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={trustedCompanyForm.data.name}
                                                            onChange={(e) => trustedCompanyForm.setData('name', e.target.value)}
                                                            className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                            placeholder="Siam Direct"
                                                        />
                                                        {trustedCompanyForm.errors.name && (
                                                            <p className="text-[10px] text-red-600">
                                                                {trustedCompanyForm.errors.name}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Logo image
                                                        </label>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) =>
                                                                trustedCompanyForm.setData('logo_file', e.target.files?.[0] ?? null)
                                                            }
                                                            className="block w-full text-[11px] text-neutral-700 file:mr-3 file:rounded-full file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:text-[10px] file:font-semibold file:uppercase file:tracking-widest file:text-white hover:file:bg-black"
                                                        />
                                                        {trustedCompanyForm.errors.logo_file && (
                                                            <p className="text-[10px] text-red-600">
                                                                {trustedCompanyForm.errors.logo_file}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="grid gap-3 sm:grid-cols-2">
                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Order
                                                            </label>
                                                            <input
                                                                type="number"
                                                                min={0}
                                                                value={trustedCompanyForm.data.display_order}
                                                                onChange={(e) =>
                                                                    trustedCompanyForm.setData(
                                                                        'display_order',
                                                                        Number(e.target.value),
                                                                    )
                                                                }
                                                                className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                            />
                                                            {trustedCompanyForm.errors.display_order && (
                                                                <p className="text-[10px] text-red-600">
                                                                    {trustedCompanyForm.errors.display_order}
                                                                </p>
                                                            )}
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Status
                                                            </label>
                                                            <label className="inline-flex items-center gap-2 text-[11px] text-neutral-700">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={!!trustedCompanyForm.data.is_active}
                                                                    onChange={(e) =>
                                                                        trustedCompanyForm.setData('is_active', e.target.checked)
                                                                    }
                                                                    className="h-4 w-4 rounded border-neutral-300 text-red-600 focus:ring-red-500"
                                                                />
                                                                Active
                                                            </label>
                                                        </div>
                                                    </div>

                                                    {trustedCompanyForm.progress && (
                                                        <div className="mt-1">
                                                            <div className="flex items-center justify-between text-[10px] text-neutral-600">
                                                                <span>Uploading…</span>
                                                                <span>{trustedCompanyForm.progress.percentage}%</span>
                                                            </div>
                                                            <div className="mt-1 h-2 w-full overflow-hidden rounded bg-neutral-200">
                                                                <div
                                                                    className="h-full bg-red-600 transition-all"
                                                                    style={{
                                                                        width: `${trustedCompanyForm.progress.percentage}%`,
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="flex items-center justify-between gap-2 pt-1">
                                                        <button
                                                            type="button"
                                                            onClick={() => setEditingTrustedCompany(null)}
                                                            className="text-[11px] font-semibold text-neutral-600 hover:text-neutral-900"
                                                        >
                                                            Clear
                                                        </button>

                                                        <button
                                                            type="submit"
                                                            disabled={trustedCompanyForm.processing}
                                                            className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-[11px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-black disabled:opacity-60"
                                                        >
                                                            {trustedCompanyForm.processing
                                                                ? 'Saving...'
                                                                : editingTrustedCompany
                                                                  ? 'Save Company'
                                                                  : 'Add Company'}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </section>
                                )}

                                {/* Contact Info (Get In Touch) admin CRUD (inline) */}
                                {selectedCompany.name === 'SUNDIA' && (
                                    <section className="rounded-[3px] bg-neutral-50 p-5 shadow-sm">
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-700">
                                                    Contact Info (Get In Touch)
                                                </h4>
                                                <p className="mt-2 text-xs text-neutral-500 max-w-xl">
                                                    Manage the cards shown in the red “Get In Touch” section on the public homepage.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1.4fr)]">
                                            <div className="overflow-hidden rounded-[3px] border border-neutral-200 bg-white">
                                                <div className="bg-red-600 pt-10 pb-12">
                                                    <div className="px-6">
                                                        <div className="text-center mb-10">
                                                            <div className="text-white text-4xl font-extrabold font-['Inter'] leading-9">
                                                                Get In Touch
                                                            </div>
                                                            <div className="mt-2 text-white text-xs font-normal font-['Inter'] leading-5">
                                                                We&apos;d love to hear from you
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                                            {previewContactInfos
                                                                .slice()
                                                                .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
                                                                .slice(0, 4)
                                                                .map((i, idx) => (
                                                                    <div
                                                                        key={i.id ?? `ci-${idx}`}
                                                                        className={`relative overflow-hidden rounded-md bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.18)] ring-1 ring-black/5 ${i.is_active === false ? 'opacity-70' : ''}`}
                                                                    >
                                                                        {i.is_active === false && (
                                                                            <div className="absolute left-3 top-3 rounded-full bg-gray-900/80 px-2 py-1 text-[10px] font-semibold text-white">
                                                                                Inactive
                                                                            </div>
                                                                        )}

                                                                        <div className="min-h-[190px] flex flex-col items-center justify-center px-6 py-6">
                                                                            <ContactIcon icon={i.icon} type={i.type} />
                                                                            <div className="mt-4 text-center text-black text-xs font-bold font-['Inter'] uppercase leading-4">
                                                                                {(i.title || i.type || '').toString().toUpperCase()}
                                                                            </div>
                                                                            <div className="mt-2 text-center text-black text-[10px] font-normal font-['Inter'] leading-4">
                                                                                <MultilineText value={i.value || ''} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="h-14 bg-gray-100 flex items-center justify-between px-4">
                                                                            {i.id ? (
                                                                                <>
                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={() => setEditingContactInfo(i)}
                                                                                        className="inline-flex items-center justify-center rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-neutral-800 ring-1 ring-neutral-200 hover:bg-neutral-50"
                                                                                    >
                                                                                        Edit
                                                                                    </button>
                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={() => destroyContactInfo(i.id)}
                                                                                        className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-3 py-1 text-[10px] font-semibold text-white hover:bg-black"
                                                                                    >
                                                                                        Delete
                                                                                    </button>
                                                                                </>
                                                                            ) : (
                                                                                <div className="text-[10px] text-neutral-600">
                                                                                    Preview only
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-3 rounded-[3px] border border-neutral-200 bg-white p-4">
                                                <form onSubmit={submitContactInfo} className="space-y-4">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <div>
                                                            <div className="text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                {editingContactInfo ? 'Edit contact item' : 'Add contact item'}
                                                            </div>
                                                            <p className="mt-1 text-[10px] text-neutral-500">
                                                                Set type, icon, content, order and status.
                                                            </p>
                                                        </div>

                                                        {flashContactInfoSuccess && (
                                                            <div className="rounded border border-green-200 bg-green-50 px-3 py-1 text-[10px] text-green-800">
                                                                {flashContactInfoSuccess}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="grid gap-3 sm:grid-cols-2">
                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Type
                                                            </label>
                                                            <select
                                                                value={contactInfoForm.data.type}
                                                                onChange={(e) => {
                                                                    contactInfoForm.setData('type', e.target.value);
                                                                    const t = (e.target.value || '').toLowerCase();
                                                                    if (['address', 'phone', 'email', 'hours'].includes(t)) {
                                                                        contactInfoForm.setData('icon', t);
                                                                    }
                                                                }}
                                                                className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                            >
                                                                {['Address', 'Phone', 'Email', 'Hours'].map((t) => (
                                                                    <option key={t} value={t}>
                                                                        {t}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            {contactInfoForm.errors.type && (
                                                                <p className="text-[10px] text-red-600">
                                                                    {contactInfoForm.errors.type}
                                                                </p>
                                                            )}
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Icon
                                                            </label>
                                                            <select
                                                                value={contactInfoForm.data.icon || ''}
                                                                onChange={(e) => contactInfoForm.setData('icon', e.target.value)}
                                                                className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                            >
                                                                <option value="address">Address pin</option>
                                                                <option value="phone">Phone</option>
                                                                <option value="email">Email</option>
                                                                <option value="hours">Hours / Clock</option>
                                                            </select>
                                                            {contactInfoForm.errors.icon && (
                                                                <p className="text-[10px] text-red-600">
                                                                    {contactInfoForm.errors.icon}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Title
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={contactInfoForm.data.title}
                                                            onChange={(e) => contactInfoForm.setData('title', e.target.value)}
                                                            className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                            placeholder="ADDRESS"
                                                        />
                                                        {contactInfoForm.errors.title && (
                                                            <p className="text-[10px] text-red-600">
                                                                {contactInfoForm.errors.title}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                            Content / Value
                                                        </label>
                                                        <textarea
                                                            rows={4}
                                                            value={contactInfoForm.data.value}
                                                            onChange={(e) => contactInfoForm.setData('value', e.target.value)}
                                                            className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                            placeholder="Use new lines for line breaks"
                                                        />
                                                        {contactInfoForm.errors.value && (
                                                            <p className="text-[10px] text-red-600">
                                                                {contactInfoForm.errors.value}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="grid gap-3 sm:grid-cols-2">
                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Order
                                                            </label>
                                                            <input
                                                                type="number"
                                                                min={0}
                                                                value={contactInfoForm.data.display_order}
                                                                onChange={(e) =>
                                                                    contactInfoForm.setData('display_order', Number(e.target.value))
                                                                }
                                                                className="w-full rounded border border-neutral-300 px-2 py-1 text-[11px]"
                                                            />
                                                            {contactInfoForm.errors.display_order && (
                                                                <p className="text-[10px] text-red-600">
                                                                    {contactInfoForm.errors.display_order}
                                                                </p>
                                                            )}
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                                                                Status
                                                            </label>
                                                            <label className="inline-flex items-center gap-2 text-[11px] text-neutral-700">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={!!contactInfoForm.data.is_active}
                                                                    onChange={(e) =>
                                                                        contactInfoForm.setData('is_active', e.target.checked)
                                                                    }
                                                                    className="h-4 w-4 rounded border-neutral-300 text-red-600 focus:ring-red-500"
                                                                />
                                                                Active
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between gap-2 pt-1">
                                                        <button
                                                            type="button"
                                                            onClick={() => setEditingContactInfo(null)}
                                                            className="text-[11px] font-semibold text-neutral-600 hover:text-neutral-900"
                                                        >
                                                            Clear
                                                        </button>

                                                        <button
                                                            type="submit"
                                                            disabled={contactInfoForm.processing}
                                                            className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-[11px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-black disabled:opacity-60"
                                                        >
                                                            {contactInfoForm.processing
                                                                ? 'Saving...'
                                                                : editingContactInfo
                                                                  ? 'Save Item'
                                                                  : 'Add Item'}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </section>
                                )}

                                <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {['Hero section', 'Content blocks', 'Media & assets'].map((area) => (
                                        <div
                                            key={area}
                                            className="flex flex-col justify-between rounded-[3px] bg-white p-4 shadow-sm"
                                        >
                                            <div>
                                                <div className="inline-flex rounded-full bg-red-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-red-600">
                                                    {selectedCompany.name}
                                                </div>
                                                <p className="mt-3 text-xs text-neutral-600">
                                                    Configure the {area.toLowerCase()} for {selectedCompany.name}{' '}
                                                    pages and components here.
                                                </p>
                                            </div>
                                            <div className="mt-4">
                                                <Link
                                                    href="#"
                                                    className="text-xs font-semibold text-red-600 hover:text-red-700"
                                                >
                                                    Open {area.toLowerCase()}
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </section>
                        </div>
                    </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
