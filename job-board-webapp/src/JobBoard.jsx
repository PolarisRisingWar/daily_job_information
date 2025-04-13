import React, { useState } from "react";

const mockData = [
  {
    id: 1,
    category: "公务员",
    positionType: "选调生",
    title: "某市选调生岗位",
    base: "北京",
    company: "北京市政府",
    salary: "无",
    benefits: "编制内，公积金齐全",
    applyLink: "http://example.com/apply",
    autoApplySupport: "是",
    collectDate: "2025-04-10",
    deadline: "2025-04-20"
  },
  {
    id: 2,
    category: "央国企",
    positionType: "紧缺选调生",
    title: "电网公司管理岗",
    base: "上海",
    company: "国家电网",
    salary: "月薪12000",
    benefits: "五险一金，年终奖",
    applyLink: "http://example.com/apply2",
    autoApplySupport: "否",
    collectDate: "2025-04-11",
    deadline: "2025-04-13"
  }
];

const AutoApplyColor = {
  "是": "bg-green-100 text-green-800",
  "否": "bg-red-100 text-red-800",
  "不需要": "bg-yellow-100 text-yellow-800"
};

const JobTable = ({ data, now }) => {
  const sorted = [...data].sort((a, b) => new Date(b.collectDate) - new Date(a.collectDate));
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(sorted.length / pageSize);
  const visibleJobs = sorted.slice((page - 1) * pageSize, page * pageSize);
  const isExpired = (deadline) => new Date(deadline) < now;

  return (
    <div className="overflow-auto shadow-lg rounded-lg border border-gray-200">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-blue-50 text-gray-700">
          <tr>
            {["序号", "分类", "职位类型", "职位名", "地点", "公司", "工资", "其他待遇", "申请链接", "自动申请支持", "收集日期", "截止日期"].map(
              (th, idx) => (
                <th key={idx} className="p-3 font-medium border-b border-gray-300">
                  {th}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {visibleJobs.map((job, index) => {
            const expired = isExpired(job.deadline);
            return (
              <tr
                key={job.id}
                className={`${expired ? "line-through text-gray-400" : "text-gray-800"} hover:bg-gray-50 transition`}
              >
                <td className="p-3">{index + 1 + (page - 1) * pageSize}</td>
                <td className="p-3">{job.category}</td>
                <td className="p-3">{job.positionType}</td>
                <td className="p-3 font-semibold">{job.title}</td>
                <td className="p-3">{job.base}</td>
                <td className="p-3">{job.company}</td>
                <td className="p-3">{job.salary}</td>
                <td className="p-3">{job.benefits}</td>
                <td className="p-3">
                  <a href={job.applyLink} target="_blank" rel="noreferrer" className="text-blue-600 underline hover:text-blue-800">
                    申请
                  </a>
                </td>
                <td className={`p-3 rounded text-center font-semibold ${AutoApplyColor[job.autoApplySupport] || "bg-gray-100"}`}>{job.autoApplySupport}</td>
                <td className="p-3">{job.collectDate}</td>
                <td className="p-3">{job.deadline}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center justify-center gap-6 py-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 rounded bg-white border shadow hover:bg-gray-100"
        >
          ⬅ 上一页
        </button>
        <span className="text-gray-600">第 {page} / {totalPages} 页</span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          className="px-4 py-2 rounded bg-white border shadow hover:bg-gray-100"
        >
          下一页 ➡
        </button>
      </div>
    </div>
  );
};

export default function JobBoard() {
  const now = new Date();
  const categories = ["全部", "公务员", "事业编", "央国企", "私企"];
  const [selectedTab, setSelectedTab] = useState("全部");

  const filteredJobs =
    selectedTab === "全部" ? mockData : mockData.filter((j) => j.category === selectedTab);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">📋 招聘信息展示平台</h1>
      <div className="flex justify-center flex-wrap gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedTab(cat)}
            className={`px-5 py-2 rounded-full border font-medium transition-all duration-200 ${
              selectedTab === cat ? "bg-blue-600 text-white" : "bg-white text-gray-800 hover:bg-blue-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <JobTable data={filteredJobs} now={now} />
    </div>
  );
}