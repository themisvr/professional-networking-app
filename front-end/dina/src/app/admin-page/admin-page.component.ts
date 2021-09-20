import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserModel } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertService } from '../_services/alert.service';
import { MatListOption } from '@angular/material/list';
import { AdminService } from '../_services/admin.service';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  totalUsers: UserModel[];
  selectedUsers: number[];
  private saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    // a.style = "display: none";
    return function (data: any, fileName: any) {
      var blob = new Blob([data], { type: "octet/stream" });
      var url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    };
  }());

  constructor(private http: HttpClient, private userService: UserService, private alertService: AlertService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.userService.getAllUsers()
      .subscribe(
        users => this.totalUsers = users,
        error => this.alertService.errorResponse(error)
      );
  }

  onExportData(usersSelected: MatListOption[], method: string) {
    const formatter = method === "json" ? this.formatJSON : this.formatXML;
    this.selectedUsers = usersSelected.map(obj => obj.value.userId);
    this.adminService.exportUserData(this.selectedUsers, method)
      .subscribe(
        data => {
          const strBody = (data as any) as string;
          const filename = `dina_user_data_${new Date().toJSON().slice(0, 10)}.${method}`;
          this.saveData(formatter(strBody), filename);
        },
        error => this.alertService.errorResponse(error),
      );
  }

  private formatJSON(str: string): string {
    return JSON.stringify(JSON.parse(str), null, 2);
  }

  private formatXML(str: string): string {
    var xmlDoc = new DOMParser().parseFromString(str, 'application/xml');
    var xsltDoc = new DOMParser().parseFromString([
        '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
        '  <xsl:strip-space elements="*"/>',
        '  <xsl:template match="para[content-style][not(text())]">',
        '    <xsl:value-of select="normalize-space(.)"/>',
        '  </xsl:template>',
        '  <xsl:template match="node()|@*">',
        '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
        '  </xsl:template>',
        '  <xsl:output indent="yes"/>',
        '</xsl:stylesheet>',
    ].join('\n'), 'application/xml');

    var xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsltDoc);
    var resultDoc = xsltProcessor.transformToDocument(xmlDoc);
    var resultXml = new XMLSerializer().serializeToString(resultDoc);
    return resultXml;
  }
}